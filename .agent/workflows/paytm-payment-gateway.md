---
description: Complete Paytm Payment Gateway Integration for React + Vercel Projects
---

# Paytm Payment Gateway Integration Guide

This workflow documents the complete implementation of Paytm JS Checkout payment gateway for a React application deployed on Vercel.

## Prerequisites

1. **Paytm Merchant Account**: Active account with KYC verified
2. **Paytm Dashboard Access**: https://dashboard.paytm.com/ or https://dashboard.paytmpayments.com/
3. **React Project**: With Vercel deployment
4. **Node.js**: Version 14+

## Step 1: Get Paytm Credentials

1. Log into Paytm Dashboard → **Developer Settings** → **API Keys**
2. Get the following credentials:
   - **Merchant ID (MID)**: 20 characters (e.g., `bnFRXI03661934553961`)
   - **Merchant Key**: 16 characters (secret, never expose to frontend)
   - **Website Name**: Usually `DEFAULT`
   - **Industry Type**: Usually `Retail`
   - **Channel ID**: `WEB` for websites

## Step 2: Set Up Environment Variables

### For Vercel (Production)
Go to Vercel Dashboard → Project → Settings → Environment Variables:

```
PAYTM_MID=your_20_char_merchant_id
PAYTM_MERCHANT_KEY=your_16_char_secret_key
PAYTM_WEBSITE=DEFAULT
PAYTM_INDUSTRY_TYPE=Retail
PAYTM_CHANNEL_ID=WEB
NEXT_PUBLIC_APP_URL=https://your-domain.com
REACT_APP_PAYTM_MID=your_20_char_merchant_id
```

### For Local Development (.env.local)
```env
PAYTM_MID=your_staging_mid
PAYTM_MERCHANT_KEY=your_staging_key
PAYTM_WEBSITE=WEBSTAGING
PAYTM_INDUSTRY_TYPE=Retail
PAYTM_CHANNEL_ID=WEB
NEXT_PUBLIC_APP_URL=http://localhost:3000
REACT_APP_PAYTM_MID=your_staging_mid
```

> **Important**: Use staging credentials for testing (`WEBSTAGING`), production credentials for live (`DEFAULT`)

## Step 3: Install Dependencies

```bash
npm install paytmchecksum
```

Add to `package.json`:
```json
{
  "dependencies": {
    "paytmchecksum": "^1.5.1"
  }
}
```

## Step 4: Create Backend API Files

### File: `api/paytm/initiate.js`

This serverless function initiates the payment transaction and returns a token.

```javascript
/**
 * Paytm Payment Initiation API
 * Vercel Serverless Function
 * 
 * POST /api/paytm/initiate
 * Generates transaction token for Paytm JS Checkout
 */

const PaytmChecksum = require('paytmchecksum');

/**
 * Parse request body - handles both pre-parsed and raw body
 */
async function parseBody(req) {
    if (req.body && typeof req.body === 'object' && Object.keys(req.body).length > 0) {
        return req.body;
    }

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
    // CORS headers
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    // Handle preflight
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // Get configuration from environment
    const PAYTM_MID = process.env.PAYTM_MID;
    const PAYTM_MERCHANT_KEY = process.env.PAYTM_MERCHANT_KEY;
    const PAYTM_WEBSITE = process.env.PAYTM_WEBSITE || 'DEFAULT';
    
    // IMPORTANT: Use the NEW official Paytm domain
    // Old domain (deprecated): securegw.paytm.in
    // New domain (current): secure.paytmpayments.com
    const PAYTM_HOST = process.env.PAYTM_HOST || 'secure.paytmpayments.com';
    
    const APP_URL = (process.env.NEXT_PUBLIC_APP_URL || 'https://your-domain.com').replace(/\/+$/, '');
    const CALLBACK_URL = `${APP_URL}/api/paytm/callback`;

    try {
        console.log('=== Paytm Initiate Started ===');
        console.log('MID:', PAYTM_MID ? PAYTM_MID.substring(0, 8) + '...' : 'NOT SET');
        console.log('KEY:', PAYTM_MERCHANT_KEY ? 'SET (' + PAYTM_MERCHANT_KEY.length + ' chars)' : 'NOT SET');
        console.log('HOST:', PAYTM_HOST);
        console.log('CALLBACK_URL:', CALLBACK_URL);

        let body;
        try {
            body = await parseBody(req);
            console.log('Request body:', JSON.stringify(body));
        } catch (parseError) {
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

        // Validate environment
        if (!PAYTM_MID || !PAYTM_MERCHANT_KEY) {
            return res.status(500).json({
                error: 'Payment gateway not configured',
                details: { mid: !!PAYTM_MID, key: !!PAYTM_MERCHANT_KEY }
            });
        }

        // Generate unique order ID
        const orderId = `ORD${Date.now()}`;
        const custId = customerId || `CUST${Date.now()}`;
        const mobileNumber = String(phone).replace(/\D/g, '');

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
                mobile: mobileNumber,
                email: email,
                firstName: firstName || '',
                lastName: lastName || ''
            }
        };

        console.log('Generating checksum...');
        
        // Generate checksum using official Paytm library
        const checksum = await PaytmChecksum.generateSignature(
            JSON.stringify(paytmBody),
            PAYTM_MERCHANT_KEY
        );

        const paytmParams = {
            body: paytmBody,
            head: {
                signature: checksum
            }
        };

        // Call Paytm API
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
        console.log('Paytm Response:', responseText);

        let result;
        try {
            result = JSON.parse(responseText);
        } catch (e) {
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
        return res.status(500).json({
            error: 'Failed to initiate payment',
            message: error.message
        });
    }
};
```

### File: `api/paytm/callback.js`

This serverless function handles the payment callback from Paytm.

```javascript
/**
 * Paytm Payment Callback API
 * Vercel Serverless Function
 * 
 * POST /api/paytm/callback
 * Handles payment callback from Paytm and verifies signature
 */

const PaytmChecksum = require('paytmchecksum');

module.exports = async (req, res) => {
    const PAYTM_MERCHANT_KEY = process.env.PAYTM_MERCHANT_KEY;
    const APP_URL = (process.env.NEXT_PUBLIC_APP_URL || 'https://your-domain.com').replace(/\/+$/, '');

    console.log('Paytm Callback received');
    console.log('Method:', req.method);

    if (req.method !== 'POST' && req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const paytmResponse = req.method === 'POST' ? (req.body || {}) : (req.query || {});
        console.log('Paytm Callback Data:', JSON.stringify(paytmResponse, null, 2));

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

        // Verify checksum
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
                console.log('Signature verification:', isValidSignature);
            } catch (verifyError) {
                console.error('Signature verification error:', verifyError.message);
            }
        }

        if (!isValidSignature) {
            console.error('Invalid checksum signature!');
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

        const redirectUrl = `${APP_URL}/payment?${redirectParams.toString()}`;
        console.log('Redirecting to:', redirectUrl);

        return res.redirect(302, redirectUrl);

    } catch (error) {
        console.error('Callback processing error:', error.message);
        return res.redirect(302,
            `${APP_URL}/payment?status=failed&error=processing_error&message=${encodeURIComponent(error.message)}`
        );
    }
};
```

## Step 5: Configure Vercel

### File: `vercel.json`

```json
{
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "/api/:path*"
    },
    {
      "source": "/((?!api/).*)",
      "destination": "/index.html"
    }
  ],
  "functions": {
    "api/paytm/initiate.js": {
      "memory": 512,
      "maxDuration": 30
    },
    "api/paytm/callback.js": {
      "memory": 512,
      "maxDuration": 30
    }
  }
}
```

## Step 6: Frontend Integration

### Add Paytm JS SDK to `public/index.html`

Add this in the `<body>` tag, before other scripts:

```html
<!-- Paytm JS Checkout SDK -->
<!-- IMPORTANT: Use the NEW domain: secure.paytmpayments.com -->
<!-- OLD domain (deprecated): securegw.paytm.in - DO NOT USE -->
<script type="application/javascript"
    src="https://secure.paytmpayments.com/merchantpgpui/checkoutjs/merchants/%REACT_APP_PAYTM_MID%.js"
    crossorigin="anonymous"></script>
```

### Checkout Component Example

Create a checkout page component (e.g., `src/pages/Checkout.jsx`):

```javascript
import React, { useState } from 'react';

export default function Checkout() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
    });
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState('');

    const amount = "499.00"; // Your amount

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    const handlePayment = async (e) => {
        e.preventDefault();
        setError('');

        // Validation
        if (!formData.firstName || !formData.email || !formData.phone) {
            setError("Please fill in all required fields.");
            return;
        }

        setIsProcessing(true);

        try {
            // Call backend API to initiate payment
            const response = await fetch('/api/paytm/initiate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    amount: amount,
                    email: formData.email,
                    phone: formData.phone.replace(/\D/g, ''),
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to initiate payment');
            }

            // Initialize Paytm checkout
            if (window.Paytm && window.Paytm.CheckoutJS) {
                const config = {
                    root: "",
                    flow: "DEFAULT",
                    data: {
                        orderId: data.orderId,
                        token: data.txnToken,
                        tokenType: "TXN_TOKEN",
                        amount: data.amount
                    },
                    merchant: {
                        mid: data.mid,
                        redirect: true
                    },
                    handler: {
                        notifyMerchant: function (eventName, data) {
                            console.log("Paytm Event:", eventName, data);
                        },
                        transactionStatus: function (paymentStatus) {
                            console.log("Payment Status:", paymentStatus);
                        }
                    }
                };

                await window.Paytm.CheckoutJS.init(config);
                window.Paytm.CheckoutJS.invoke();
            } else {
                // Fallback: Redirect to Paytm payment page
                // IMPORTANT: Use NEW domain
                const paytmUrl = `https://secure.paytmpayments.com/theia/api/v1/showPaymentPage?mid=${data.mid}&orderId=${data.orderId}&txnToken=${data.txnToken}`;
                window.location.href = paytmUrl;
            }

        } catch (err) {
            console.error('Payment Error:', err);
            setError(err.message || 'Payment initiation failed.');
            setIsProcessing(false);
        }
    };

    return (
        <div>
            <h1>Checkout</h1>
            {error && <p style={{color: 'red'}}>{error}</p>}
            <form onSubmit={handlePayment}>
                <input name="firstName" placeholder="First Name" onChange={handleChange} required />
                <input name="lastName" placeholder="Last Name" onChange={handleChange} />
                <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
                <input name="phone" type="tel" placeholder="Phone" onChange={handleChange} required />
                <button type="submit" disabled={isProcessing}>
                    {isProcessing ? 'Processing...' : `Pay ₹${amount}`}
                </button>
            </form>
        </div>
    );
}
```

### Payment Status Page

Create `src/pages/Payment.jsx` to handle the callback redirect:

```javascript
import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';

export default function Payment() {
    const [searchParams] = useSearchParams();
    
    const status = searchParams.get('status');
    const orderId = searchParams.get('orderId');
    const txnId = searchParams.get('txnId');
    const amount = searchParams.get('amount');
    const message = searchParams.get('message');

    const isSuccess = status === 'success';

    return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
            <h1>{isSuccess ? '✅ Payment Successful!' : '❌ Payment Failed'}</h1>
            <div>
                <p><strong>Order ID:</strong> {orderId}</p>
                {txnId && <p><strong>Transaction ID:</strong> {txnId}</p>}
                {amount && <p><strong>Amount:</strong> ₹{amount}</p>}
                {message && <p><strong>Message:</strong> {message}</p>}
            </div>
            <Link to="/">Go Home</Link>
        </div>
    );
}
```

## Step 7: Configure Paytm Dashboard

1. **Webhook URL**: Go to Developer Settings → Webhook URL → Add:
   - Payment Notification URL: `https://your-domain.com/api/paytm/callback`

2. **Callback URL Whitelist** (if required): Add your domain to allowed callback URLs

## Common Errors and Fixes

### Error: 501 System Error
**Cause**: Wrong API endpoint domain
**Fix**: Use `secure.paytmpayments.com` instead of `securegw.paytm.in`

### Error: Token Session Expired
**Cause**: JS SDK domain mismatch with API domain
**Fix**: Update BOTH:
- `index.html` JS SDK: `https://secure.paytmpayments.com/merchantpgpui/checkoutjs/merchants/{MID}.js`
- API endpoint: `https://secure.paytmpayments.com/theia/api/v1/initiateTransaction`

### Error: Invalid Checksum
**Cause**: Merchant key mismatch or wrong format
**Fix**: 
- Ensure key is exactly 16 characters
- Use the same key for both initiate and callback verification

### Error: MID Not Found
**Cause**: Using staging credentials on production or vice versa
**Fix**: 
- Production: `secure.paytmpayments.com` with production MID/Key
- Staging: `securestage.paytmpayments.com` with staging MID/Key

## File Structure

```
your-project/
├── api/
│   └── paytm/
│       ├── initiate.js      # Payment initiation API
│       └── callback.js      # Payment callback handler
├── public/
│   └── index.html           # Include Paytm JS SDK here
├── src/
│   └── pages/
│       ├── Checkout.jsx     # Checkout form
│       └── Payment.jsx      # Payment status page
├── vercel.json              # Vercel configuration
├── package.json             # Include paytmchecksum dependency
└── .env.local               # Local environment variables
```

## URLs Reference

### Production Environment
- API Host: `secure.paytmpayments.com`
- JS SDK: `https://secure.paytmpayments.com/merchantpgpui/checkoutjs/merchants/{MID}.js`
- Initiate API: `https://secure.paytmpayments.com/theia/api/v1/initiateTransaction`
- Show Payment: `https://secure.paytmpayments.com/theia/api/v1/showPaymentPage`

### Staging/Test Environment
- API Host: `securestage.paytmpayments.com`
- JS SDK: `https://securestage.paytmpayments.com/merchantpgpui/checkoutjs/merchants/{MID}.js`
- Initiate API: `https://securestage.paytmpayments.com/theia/api/v1/initiateTransaction`

---

## How to Use This Guide

### Prompt to give to Claude/AI:
```
Please read the file `.agent/workflows/paytm-payment-gateway.md` and implement Paytm payment gateway in my project following the steps documented there.
```

Or for specific tasks:
```
Please read `.agent/workflows/paytm-payment-gateway.md` and:
1. Create the backend API files for Paytm integration
2. Update my checkout page to use Paytm JS Checkout
3. Add the Paytm SDK to my index.html
```

---

**Last Updated**: February 2026
**Tested With**: Paytm JS Checkout, React 18+, Vercel Serverless Functions
