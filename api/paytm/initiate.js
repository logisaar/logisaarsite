/**
 * Paytm Payment Initiation API
 * Vercel Serverless Function
 * 
 * POST /api/paytm/initiate
 * Generates transaction token for Paytm JS Checkout
 */

const https = require('https');
const PaytmChecksum = require('./paytmChecksum');

/**
 * Parse request body - handles both pre-parsed and raw body
 */
async function parseBody(req) {
    // If body is already parsed (object), return it
    if (req.body && typeof req.body === 'object' && Object.keys(req.body).length > 0) {
        return req.body;
    }

    // Otherwise, parse raw body
    return new Promise((resolve, reject) => {
        let data = '';
        req.on('data', chunk => {
            data += chunk;
        });
        req.on('end', () => {
            try {
                if (data) {
                    resolve(JSON.parse(data));
                } else {
                    resolve({});
                }
            } catch (e) {
                reject(new Error('Invalid JSON in request body'));
            }
        });
        req.on('error', reject);
    });
}

module.exports = async (req, res) => {
    // CORS headers - set these first
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    // Handle preflight
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // Get configuration from environment variables
    const PAYTM_MID = process.env.PAYTM_MID;
    const PAYTM_MERCHANT_KEY = process.env.PAYTM_MERCHANT_KEY;
    const PAYTM_WEBSITE = process.env.PAYTM_WEBSITE || 'DEFAULT';
    const PAYTM_HOST = process.env.PAYTM_HOST || 'securegw.paytm.in';
    const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://www.logisaar.in';
    const CALLBACK_URL = `${APP_URL}/api/paytm/callback`;

    try {
        console.log('Paytm Initiate - Starting...');
        console.log('MID configured:', !!PAYTM_MID);
        console.log('Key configured:', !!PAYTM_MERCHANT_KEY);

        // Parse request body
        let body;
        try {
            body = await parseBody(req);
            console.log('Parsed body:', JSON.stringify(body));
        } catch (parseError) {
            console.error('Body parse error:', parseError.message);
            return res.status(400).json({
                error: 'Invalid request body',
                message: parseError.message
            });
        }

        const { amount, customerId, email, phone, firstName, lastName } = body;

        // Validate required fields
        if (!amount || !email || !phone) {
            console.log('Missing fields:', { amount, email, phone });
            return res.status(400).json({
                error: 'Missing required fields: amount, email, phone'
            });
        }

        // Validate environment configuration
        if (!PAYTM_MID || !PAYTM_MERCHANT_KEY) {
            console.error('Paytm credentials not configured');
            return res.status(500).json({
                error: 'Payment gateway not configured properly'
            });
        }

        // Generate unique order ID
        const orderId = `ORD${Date.now()}${Math.random().toString(36).substr(2, 6).toUpperCase()}`;

        // Customer ID
        const custId = customerId || `CUST${Date.now()}`;

        console.log('Order ID:', orderId);
        console.log('Callback URL:', CALLBACK_URL);

        // Paytm transaction parameters
        const paytmBody = {
            requestType: 'Payment',
            mid: PAYTM_MID,
            websiteName: PAYTM_WEBSITE,
            orderId: orderId,
            callbackUrl: CALLBACK_URL,
            txnAmount: {
                value: parseFloat(amount).toFixed(2),
                currency: 'INR'
            },
            userInfo: {
                custId: custId,
                email: email,
                mobile: String(phone).replace(/\D/g, ''),
                firstName: firstName || '',
                lastName: lastName || ''
            }
        };

        console.log('Generating checksum...');

        // Generate checksum for the body
        const checksum = await PaytmChecksum.generateSignature(
            JSON.stringify(paytmBody),
            PAYTM_MERCHANT_KEY
        );

        console.log('Checksum generated');

        // Full params with head and body
        const paytmParams = {
            body: paytmBody,
            head: {
                signature: checksum
            }
        };

        console.log('Calling Paytm API at:', PAYTM_HOST);

        // Call Paytm API to get transaction token
        const txnToken = await initiateTransaction(paytmParams, orderId, PAYTM_MID, PAYTM_HOST);

        console.log('Transaction token received successfully');

        // Return token and order details to frontend
        return res.status(200).json({
            success: true,
            orderId: orderId,
            txnToken: txnToken,
            amount: parseFloat(amount).toFixed(2),
            mid: PAYTM_MID,
            callbackUrl: CALLBACK_URL
        });

    } catch (error) {
        console.error('Payment initiation error:', error.message);
        console.error('Error stack:', error.stack);
        return res.status(500).json({
            error: 'Failed to initiate payment',
            message: error.message
        });
    }
};

/**
 * Call Paytm API to initiate transaction and get token
 */
function initiateTransaction(paytmParams, orderId, mid, host) {
    return new Promise((resolve, reject) => {
        const postData = JSON.stringify(paytmParams);

        console.log('Request to Paytm:', postData.substring(0, 200) + '...');

        const options = {
            hostname: host,
            port: 443,
            path: `/theia/api/v1/initiateTransaction?mid=${mid}&orderId=${orderId}`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(postData)
            }
        };

        const request = https.request(options, (response) => {
            let data = '';

            response.on('data', (chunk) => {
                data += chunk;
            });

            response.on('end', () => {
                console.log('Paytm Response Status:', response.statusCode);
                console.log('Paytm Response:', data.substring(0, 500));

                try {
                    const result = JSON.parse(data);

                    if (result.body && result.body.txnToken) {
                        resolve(result.body.txnToken);
                    } else if (result.body && result.body.resultInfo) {
                        const errMsg = result.body.resultInfo.resultMsg || 'Transaction initiation failed';
                        console.error('Paytm Error:', JSON.stringify(result.body.resultInfo));
                        reject(new Error(errMsg));
                    } else {
                        reject(new Error('Invalid response from Paytm'));
                    }
                } catch (parseError) {
                    console.error('Parse error:', parseError.message);
                    reject(new Error('Failed to parse Paytm response'));
                }
            });
        });

        request.on('error', (error) => {
            console.error('HTTPS Request error:', error.message);
            reject(new Error('Network error connecting to Paytm: ' + error.message));
        });

        request.setTimeout(25000, () => {
            request.destroy();
            reject(new Error('Request to Paytm timed out'));
        });

        request.write(postData);
        request.end();
    });
}
