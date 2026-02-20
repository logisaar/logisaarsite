import type { VercelRequest, VercelResponse } from '@vercel/node';
import PaytmChecksum from 'paytmchecksum';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    const PAYTM_MERCHANT_KEY = process.env.PAYTM_MERCHANT_KEY;
    const APP_URL = (process.env.NEXT_PUBLIC_APP_URL || 'https://logisaar.com').replace(/\/+$/, '');

    if (req.method !== 'POST' && req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const paytmResponse = req.method === 'POST' ? (req.body || {}) : (req.query || {});

        const {
            ORDERID: orderId,
            TXNID: txnId,
            TXNAMOUNT: amount,
            STATUS: status,
            RESPMSG: responseMessage,
            PAYMENTMODE: paymentMode,
            BANKTXNID: bankTxnId,
            CHECKSUMHASH: checksumReceived
        } = paytmResponse;

        let isValidSignature = true;
        if (checksumReceived && PAYTM_MERCHANT_KEY) {
            try {
                const paramsForVerification = { ...paytmResponse };
                delete paramsForVerification.CHECKSUMHASH;

                isValidSignature = PaytmChecksum.verifySignature(
                    paramsForVerification,
                    PAYTM_MERCHANT_KEY,
                    checksumReceived
                );
            } catch {
                console.error('Signature verification error');
            }
        }

        if (!isValidSignature) {
            return res.redirect(302,
                `${APP_URL}/payment?status=failed&error=invalid_signature&orderId=${orderId || ''}`
            );
        }

        const paymentSuccess = status === 'TXN_SUCCESS';

        const redirectParams = new URLSearchParams({
            status: paymentSuccess ? 'success' : 'failed',
            orderId: orderId || '',
            txnId: txnId || '',
            amount: amount || '',
            message: responseMessage || '',
            paymentMode: paymentMode || '',
            bankTxnId: bankTxnId || ''
        });

        return res.redirect(302, `${APP_URL}/payment?${redirectParams.toString()}`);

    } catch (error: any) {
        return res.redirect(302,
            `${APP_URL}/payment?status=failed&error=processing_error&message=${encodeURIComponent(error.message)}`
        );
    }
}
