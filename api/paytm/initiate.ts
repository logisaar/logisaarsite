import type { VercelRequest, VercelResponse } from '@vercel/node';
import PaytmChecksum from 'paytmchecksum';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // CORS headers
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const PAYTM_MID = process.env.PAYTM_MID;
    const PAYTM_MERCHANT_KEY = process.env.PAYTM_MERCHANT_KEY;
    const PAYTM_WEBSITE = process.env.PAYTM_WEBSITE || 'DEFAULT';
    const PAYTM_HOST = process.env.PAYTM_HOST || 'secure.paytmpayments.com';
    const APP_URL = (process.env.NEXT_PUBLIC_APP_URL || 'https://logisaar.com').replace(/\/+$/, '');
    const CALLBACK_URL = `${APP_URL}/api/paytm/callback`;

    try {
        const { amount, customerId, email, phone, firstName, lastName, planName } = req.body || {};

        if (!amount || !email || !phone) {
            return res.status(400).json({
                error: 'Missing required fields: amount, email, phone',
                received: { amount: !!amount, email: !!email, phone: !!phone }
            });
        }

        if (!PAYTM_MID || !PAYTM_MERCHANT_KEY) {
            return res.status(500).json({
                error: 'Payment gateway not configured',
                details: { mid: !!PAYTM_MID, key: !!PAYTM_MERCHANT_KEY }
            });
        }

        const orderId = `ORD${Date.now()}`;
        const custId = customerId || `CUST${Date.now()}`;
        const mobileNumber = String(phone).replace(/\D/g, '');

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
                mobile: mobileNumber,
                email: email,
                firstName: firstName || '',
                lastName: lastName || ''
            }
        };

        const checksum = await PaytmChecksum.generateSignature(
            JSON.stringify(paytmBody),
            PAYTM_MERCHANT_KEY
        );

        const paytmParams = {
            body: paytmBody,
            head: { signature: checksum }
        };

        const paytmUrl = `https://${PAYTM_HOST}/theia/api/v1/initiateTransaction?mid=${PAYTM_MID}&orderId=${orderId}`;

        const paytmResponse = await fetch(paytmUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(paytmParams)
        });

        const responseText = await paytmResponse.text();
        let result: any;
        try {
            result = JSON.parse(responseText);
        } catch {
            return res.status(500).json({
                error: 'Invalid response from Paytm',
                rawResponse: responseText.substring(0, 200)
            });
        }

        if (result.body?.txnToken) {
            return res.status(200).json({
                success: true,
                orderId,
                txnToken: result.body.txnToken,
                amount: parseFloat(amount).toFixed(2),
                mid: PAYTM_MID,
                callbackUrl: CALLBACK_URL
            });
        } else if (result.body?.resultInfo) {
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
    } catch (error: any) {
        return res.status(500).json({
            error: 'Failed to initiate payment',
            message: error.message
        });
    }
}
