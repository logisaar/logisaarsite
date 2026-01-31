/**
 * Paytm Payment Callback API
 * Vercel Serverless Function
 * 
 * POST /api/paytm/callback
 * Handles payment callback from Paytm and verifies signature
 */

const PaytmChecksum = require('./paytmChecksum');

module.exports = async (req, res) => {
    // Get configuration
    const PAYTM_MERCHANT_KEY = process.env.PAYTM_MERCHANT_KEY;
    const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://www.logisaar.in';

    console.log('Paytm Callback received');
    console.log('Method:', req.method);

    // Allow both GET and POST (Paytm sends POST callback)
    if (req.method !== 'POST' && req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        // Get params from body (POST) or query (GET)
        const paytmResponse = req.method === 'POST' ? (req.body || {}) : (req.query || {});

        console.log('Paytm Callback Data:', JSON.stringify(paytmResponse, null, 2));

        // Extract key transaction details
        const {
            ORDERID: orderId,
            TXNID: txnId,
            TXNAMOUNT: amount,
            STATUS: status,
            RESPMSG: responseMessage,
            PAYMENTMODE: paymentMode,
            GATEWAYNAME: gateway,
            BANKTXNID: bankTxnId,
            CHECKSUMHASH: checksumReceived
        } = paytmResponse;

        // Verify checksum if MERCHANT_KEY is available
        let isValidSignature = true;
        if (checksumReceived && PAYTM_MERCHANT_KEY) {
            try {
                // Remove checksum from params for verification
                const paramsForVerification = { ...paytmResponse };
                delete paramsForVerification.CHECKSUMHASH;

                isValidSignature = await PaytmChecksum.verifySignature(
                    paramsForVerification,
                    PAYTM_MERCHANT_KEY,
                    checksumReceived
                );
                console.log('Signature verification:', isValidSignature);
            } catch (verifyError) {
                console.error('Signature verification error:', verifyError.message);
                // Continue anyway, but log the error
            }
        }

        if (!isValidSignature) {
            console.error('Invalid checksum signature!');
            return res.redirect(302,
                `${APP_URL}/payment?status=failed&error=invalid_signature&orderId=${orderId || ''}`
            );
        }

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
        const redirectUrl = `${APP_URL}/payment?${redirectParams.toString()}`;

        console.log('Redirecting to:', redirectUrl);

        return res.redirect(302, redirectUrl);

    } catch (error) {
        console.error('Callback processing error:', error.message);
        console.error('Error stack:', error.stack);

        // Redirect with error
        return res.redirect(302,
            `${APP_URL}/payment?status=failed&error=processing_error&message=${encodeURIComponent(error.message)}`
        );
    }
};
