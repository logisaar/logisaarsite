/**
 * Paytm Payment Initiation API
 * Vercel Serverless Function
 * 
 * POST /api/paytm/initiate
 * Generates transaction token for Paytm JS Checkout
 */

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
        console.log('=== Paytm Initiate Started ===');
        console.log('MID:', PAYTM_MID ? PAYTM_MID.substring(0, 8) + '...' : 'NOT SET');
        console.log('KEY:', PAYTM_MERCHANT_KEY ? 'SET (' + PAYTM_MERCHANT_KEY.length + ' chars)' : 'NOT SET');
        console.log('HOST:', PAYTM_HOST);
        console.log('WEBSITE:', PAYTM_WEBSITE);

        // Parse request body
        let body;
        try {
            body = await parseBody(req);
            console.log('Request body:', JSON.stringify(body));
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
            return res.status(400).json({
                error: 'Missing required fields: amount, email, phone',
                received: { amount: !!amount, email: !!email, phone: !!phone }
            });
        }

        // Validate environment configuration
        if (!PAYTM_MID || !PAYTM_MERCHANT_KEY) {
            return res.status(500).json({
                error: 'Payment gateway not configured',
                details: { mid: !!PAYTM_MID, key: !!PAYTM_MERCHANT_KEY }
            });
        }

        // Generate unique order ID (alphanumeric only, max 50 chars)
        const orderId = `ORD${Date.now()}`;
        const custId = customerId || `CUST${Date.now()}`;
        const mobileNumber = String(phone).replace(/\D/g, '');

        console.log('Order ID:', orderId);
        console.log('Customer ID:', custId);
        console.log('Amount:', amount);

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
                mobile: mobileNumber,
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

        // Call Paytm API using fetch (better for serverless)
        const paytmUrl = `https://${PAYTM_HOST}/theia/api/v1/initiateTransaction?mid=${PAYTM_MID}&orderId=${orderId}`;
        console.log('Calling Paytm API:', paytmUrl);

        const paytmResponse = await fetch(paytmUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(paytmParams)
        });

        const responseText = await paytmResponse.text();
        console.log('Paytm Response Status:', paytmResponse.status);
        console.log('Paytm Response:', responseText.substring(0, 500));

        let result;
        try {
            result = JSON.parse(responseText);
        } catch (e) {
            console.error('Failed to parse Paytm response');
            return res.status(500).json({
                error: 'Invalid response from Paytm',
                rawResponse: responseText.substring(0, 200)
            });
        }

        if (result.body && result.body.txnToken) {
            console.log('Transaction token received!');
            return res.status(200).json({
                success: true,
                orderId: orderId,
                txnToken: result.body.txnToken,
                amount: parseFloat(amount).toFixed(2),
                mid: PAYTM_MID,
                callbackUrl: CALLBACK_URL
            });
        } else if (result.body && result.body.resultInfo) {
            console.error('Paytm rejected:', JSON.stringify(result.body.resultInfo));
            return res.status(400).json({
                error: 'Paytm rejected the request',
                message: result.body.resultInfo.resultMsg,
                code: result.body.resultInfo.resultCode
            });
        } else {
            return res.status(500).json({
                error: 'Unexpected response from Paytm',
                response: result
            });
        }

    } catch (error) {
        console.error('=== Payment Error ===');
        console.error('Error:', error.message);
        console.error('Stack:', error.stack);
        return res.status(500).json({
            error: 'Failed to initiate payment',
            message: error.message
        });
    }
};
