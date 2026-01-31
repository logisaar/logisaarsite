/**
 * Paytm Payment Callback API
 * Vercel Serverless Function
 * 
 * POST /api/paytm/callback
 * Handles payment callback from Paytm and verifies signature
 */

const PaytmChecksum = require('./paytmChecksum');

// Paytm Configuration
const PAYTM_CONFIG = {
    MERCHANT_KEY: process.env.PAYTM_MERCHANT_KEY,
    APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
};

module.exports = async (req, res) => {
    // Only allow POST requests (Paytm sends POST callback)
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const paytmResponse = req.body;

        // Log the callback for debugging (remove in production if not needed)
        console.log('Paytm Callback Received:', JSON.stringify(paytmResponse, null, 2));

        // Extract checksum from response
        const checksumReceived = paytmResponse.CHECKSUMHASH;

        // Remove checksum from params for verification
        const paramsForVerification = { ...paytmResponse };
        delete paramsForVerification.CHECKSUMHASH;

        // Verify checksum signature
        const isValidSignature = PaytmChecksum.verifySignature(
            paramsForVerification,
            PAYTM_CONFIG.MERCHANT_KEY,
            checksumReceived
        );

        if (!isValidSignature) {
            console.error('Invalid checksum signature!');
            // Redirect to payment page with error
            return res.redirect(302,
                `${PAYTM_CONFIG.APP_URL}/payment?status=failed&error=invalid_signature`
            );
        }

        // Extract transaction details
        const {
            ORDERID: orderId,
            TXNID: txnId,
            TXNAMOUNT: amount,
            STATUS: status,
            RESPMSG: responseMessage,
            PAYMENTMODE: paymentMode,
            GATEWAYNAME: gateway,
            BANKTXNID: bankTxnId
        } = paytmResponse;

        // Determine payment status
        const paymentSuccess = status === 'TXN_SUCCESS';

        // Build redirect URL with payment details
        const redirectParams = new URLSearchParams({
            status: paymentSuccess ? 'success' : 'failed',
            orderId: orderId || '',
            txnId: txnId || '',
            amount: amount || '',
            message: responseMessage || '',
            paymentMode: paymentMode || '',
            bankTxnId: bankTxnId || ''
        });

        // Redirect to payment status page
        const redirectUrl = `${PAYTM_CONFIG.APP_URL}/payment?${redirectParams.toString()}`;

        console.log('Redirecting to:', redirectUrl);

        return res.redirect(302, redirectUrl);

    } catch (error) {
        console.error('Callback processing error:', error);

        // Redirect with error
        return res.redirect(302,
            `${PAYTM_CONFIG.APP_URL}/payment?status=failed&error=processing_error`
        );
    }
};
