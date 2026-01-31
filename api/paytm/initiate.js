/**
 * Paytm Payment Initiation API
 * Vercel Serverless Function
 * 
 * POST /api/paytm/initiate
 * Generates transaction token for Paytm JS Checkout
 */

const https = require('https');
const PaytmChecksum = require('./paytmChecksum');

// Paytm Configuration from Environment Variables
const PAYTM_CONFIG = {
    MID: process.env.PAYTM_MID,
    MERCHANT_KEY: process.env.PAYTM_MERCHANT_KEY,
    WEBSITE: process.env.PAYTM_WEBSITE || 'DEFAULT',
    INDUSTRY_TYPE: process.env.PAYTM_INDUSTRY_TYPE || 'Retail',
    // Production: securegw.paytm.in | Sandbox: securegw-stage.paytm.in
    HOST: process.env.PAYTM_HOST || 'securegw.paytm.in',
    CALLBACK_URL: process.env.NEXT_PUBLIC_APP_URL
        ? `${process.env.NEXT_PUBLIC_APP_URL}/api/paytm/callback`
        : 'http://localhost:3000/api/paytm/callback'
};

module.exports = async (req, res) => {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // CORS headers
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        const { amount, customerId, email, phone, firstName, lastName } = req.body;

        // Validate required fields
        if (!amount || !email || !phone) {
            return res.status(400).json({
                error: 'Missing required fields: amount, email, phone'
            });
        }

        // Validate environment configuration
        if (!PAYTM_CONFIG.MID || !PAYTM_CONFIG.MERCHANT_KEY) {
            console.error('Paytm credentials not configured');
            return res.status(500).json({
                error: 'Payment gateway not configured properly'
            });
        }

        // Generate unique order ID
        const orderId = `ORD_${Date.now()}_${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

        // Customer ID (use email hash if not provided)
        const custId = customerId || `CUST_${Buffer.from(email).toString('base64').substr(0, 20)}`;

        // Paytm transaction parameters
        const paytmParams = {
            body: {
                requestType: 'Payment',
                mid: PAYTM_CONFIG.MID,
                websiteName: PAYTM_CONFIG.WEBSITE,
                orderId: orderId,
                callbackUrl: PAYTM_CONFIG.CALLBACK_URL,
                txnAmount: {
                    value: parseFloat(amount).toFixed(2),
                    currency: 'INR'
                },
                userInfo: {
                    custId: custId,
                    email: email,
                    mobile: phone,
                    firstName: firstName || '',
                    lastName: lastName || ''
                }
            }
        };

        // Generate checksum for the body
        const checksum = await PaytmChecksum.generateSignature(
            JSON.stringify(paytmParams.body),
            PAYTM_CONFIG.MERCHANT_KEY
        );

        paytmParams.head = {
            signature: checksum
        };

        // Call Paytm API to get transaction token
        const txnToken = await initiateTransaction(paytmParams, orderId);

        // Return token and order details to frontend
        return res.status(200).json({
            success: true,
            orderId: orderId,
            txnToken: txnToken,
            amount: parseFloat(amount).toFixed(2),
            mid: PAYTM_CONFIG.MID,
            callbackUrl: PAYTM_CONFIG.CALLBACK_URL
        });

    } catch (error) {
        console.error('Payment initiation error:', error);
        return res.status(500).json({
            error: 'Failed to initiate payment',
            message: error.message
        });
    }
};

/**
 * Call Paytm API to initiate transaction and get token
 */
function initiateTransaction(paytmParams, orderId) {
    return new Promise((resolve, reject) => {
        const postData = JSON.stringify(paytmParams);

        const options = {
            hostname: PAYTM_CONFIG.HOST,
            port: 443,
            path: `/theia/api/v1/initiateTransaction?mid=${PAYTM_CONFIG.MID}&orderId=${orderId}`,
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
                try {
                    const result = JSON.parse(data);

                    if (result.body && result.body.txnToken) {
                        resolve(result.body.txnToken);
                    } else if (result.body && result.body.resultInfo) {
                        reject(new Error(
                            result.body.resultInfo.resultMsg || 'Transaction initiation failed'
                        ));
                    } else {
                        reject(new Error('Invalid response from Paytm'));
                    }
                } catch (parseError) {
                    reject(new Error('Failed to parse Paytm response'));
                }
            });
        });

        request.on('error', (error) => {
            reject(error);
        });

        request.write(postData);
        request.end();
    });
}
