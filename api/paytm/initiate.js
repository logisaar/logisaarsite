/**
 * Paytm Payment Initiation API
 * Vercel Serverless Function
 * 
 * POST /api/paytm/initiate
 * Generates transaction token for Paytm JS Checkout
 */

const https = require('https');
const PaytmChecksum = require('./paytmChecksum');

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
        // Log for debugging (will appear in Vercel Function Logs)
        console.log('Paytm Initiate - Starting...');
        console.log('MID configured:', !!PAYTM_MID);
        console.log('Key configured:', !!PAYTM_MERCHANT_KEY);
        console.log('Callback URL:', CALLBACK_URL);

        const { amount, customerId, email, phone, firstName, lastName } = req.body || {};

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
            console.log('MID:', PAYTM_MID);
            console.log('KEY length:', PAYTM_MERCHANT_KEY ? PAYTM_MERCHANT_KEY.length : 0);
            return res.status(500).json({
                error: 'Payment gateway not configured properly'
            });
        }

        // Generate unique order ID
        const orderId = `ORD${Date.now()}${Math.random().toString(36).substr(2, 6).toUpperCase()}`;

        // Customer ID (use email hash if not provided)
        const custId = customerId || `CUST${Date.now()}`;

        console.log('Order ID:', orderId);
        console.log('Customer ID:', custId);

        // Paytm transaction parameters (body only for checksum)
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
                mobile: phone.replace(/\D/g, ''),
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

        console.log('Checksum generated successfully');

        // Full params with head and body
        const paytmParams = {
            body: paytmBody,
            head: {
                signature: checksum
            }
        };

        console.log('Calling Paytm API...');

        // Call Paytm API to get transaction token
        const txnToken = await initiateTransaction(paytmParams, orderId, PAYTM_MID, PAYTM_HOST);

        console.log('Transaction token received');

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

        console.log('Paytm API Host:', host);
        console.log('Request path:', `/theia/api/v1/initiateTransaction?mid=${mid}&orderId=${orderId}`);

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
                console.log('Paytm API Response:', data);

                try {
                    const result = JSON.parse(data);

                    if (result.body && result.body.txnToken) {
                        resolve(result.body.txnToken);
                    } else if (result.body && result.body.resultInfo) {
                        const errMsg = result.body.resultInfo.resultMsg || 'Transaction initiation failed';
                        console.error('Paytm Error:', result.body.resultInfo);
                        reject(new Error(errMsg));
                    } else {
                        reject(new Error('Invalid response from Paytm: ' + data));
                    }
                } catch (parseError) {
                    console.error('Parse error:', parseError);
                    reject(new Error('Failed to parse Paytm response: ' + data));
                }
            });
        });

        request.on('error', (error) => {
            console.error('Request error:', error);
            reject(error);
        });

        request.write(postData);
        request.end();
    });
}
