import express, { Request, Response } from 'express';
// Local generateToken implementation to avoid missing ../utils/mpesa module
// Fetches an OAuth token from Safaricom sandbox using MPESA_CONSUMER_KEY and MPESA_CONSUMER_SECRET env vars
async function generateToken(): Promise<string | null> {
  try {
    const key = process.env.MPESA_CONSUMER_KEY;
    const secret = process.env.MPESA_CONSUMER_SECRET;
    if (!key || !secret) {
      console.warn('[mpesa] MPESA_CONSUMER_KEY or MPESA_CONSUMER_SECRET not set');
      return null;
    }
    const auth = Buffer.from(`${key}:${secret}`).toString('base64');
    const url = 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials';
    const resp = await fetch(url, {
      headers: { Authorization: `Basic ${auth}` }
    });
    const text = await resp.text();
    let data: any;
    try { data = text ? JSON.parse(text) : null; } catch { data = { raw: text }; }
    if (!resp.ok) {
      console.error('[mpesa] token fetch failed', resp.status, data);
      return null;
    }
    return data?.access_token || null;
  } catch (err) {
    console.error('[mpesa] token error', err);
    return null;
  }
}

const router = express.Router();

const stkPushHandler: express.RequestHandler = async (req, res) => {
  try {
    console.log('[mpesa] /stk-push called', req.body);
    const { phone, amount } = req.body as { phone?: string; amount?: number };
    if (!phone || !amount) {
      res.status(400).json({ message: 'Phone and amount are required' });
      return;
    }

    const formattedPhone = String(phone).replace(/\D/g, '');
    const token = await generateToken();
    if (!token) {
      res.status(500).json({ message: 'Failed to get MPesa token' });
      return;
    }

    const stkPushUrl = 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest';
    const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, -3);
    const password = Buffer.from(`${process.env.MPESA_SHORTCODE}${process.env.MPESA_PASSKEY}${timestamp}`).toString('base64');

    const response = await fetch(stkPushUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        BusinessShortCode: process.env.MPESA_SHORTCODE,
        Password: password,
        Timestamp: timestamp,
        TransactionType: 'CustomerPayBillOnline',
        Amount: amount,
        PartyA: formattedPhone,
        PartyB: process.env.MPESA_SHORTCODE,
        PhoneNumber: formattedPhone,
        CallBackURL: `${process.env.BASE_URL}/mpesa/callback`,
        AccountReference: 'KyUSDA Church',
        TransactionDesc: 'Church Donation'
      })
    });

    const text = await response.text();
    let data: any;
    try { data = text ? JSON.parse(text) : null; } catch { data = { raw: text }; }
    console.log('[mpesa] STK response', response.status, data);

    if (!response.ok) {
      const msg = data?.errorMessage || data?.error || data?.ResponseDescription || text || `Status ${response.status}`;
      throw new Error(msg);
    }

    if (data && (data.ResponseCode === '0' || data.ResponseCode === 0)) {
      res.json({ message: 'STK push sent. Check your phone.', checkoutRequestID: data.CheckoutRequestID || data.checkoutRequestID });
      return;
    }

    res.json({ message: 'STK push response', data });
    return;
  } catch (err: any) {
    console.error('[mpesa] error', err?.message || err);
    res.status(500).json({ message: err?.message || 'Failed to initiate STK push' });
    return;
  }
};

router.post('/stk-push', stkPushHandler);

export default router;