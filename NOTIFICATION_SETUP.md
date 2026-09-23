# Real-Time Admission Enquiry Notification Setup Guide

This guide provides step-by-step instructions for configuring, deploying, testing, and troubleshooting the **Real-Time Email & WhatsApp Notification System** for AIM College admission enquiries.

---

## Architectural Principles

1. **Firestore is the Source of Truth:** Student enquiry documents created in `admission_enquiries` are saved immediately. Notification failures **never** cancel or delete enquiries.
2. **Asynchronous Background Processing:** Firebase Cloud Function `onAdmissionEnquiryCreated` handles automatic notification dispatch.
3. **Per-Channel Idempotency:** Email and WhatsApp delivery states are tracked independently (`emailNotification.status` & `whatsappNotification.status`). Already-sent notifications are never resent.
4. **Protected Admin Manual Retry:** Admins can trigger retries from `/admin` via the authenticated `/api/admin/notifications/retry` API endpoint.

---

## A. Email Provider Setup (Resend)

We use **Resend** as the transactional email engine.

1. Sign up for a free account at [Resend.com](https://resend.com).
2. Go to **API Keys** and click **Create API Key**.
3. Name it `AIM Website Production` and set permission to **Full Access**.
4. Copy the key (starts with `re_...`).
5. Add the environment variable to Vercel / Firebase Functions:
   ```bash
   RESEND_API_KEY=re_123456789_abcdefghijklmnopqrstuvwxyz
   ADMISSION_NOTIFICATION_EMAIL=clerk@aimcollege.edu.in
   ADMISSION_NOTIFICATION_NAME="Admission Desk"
   ```

*Note: For testing, Resend allows sending emails to your account owner email address with domain `onboarding@resend.dev` out of the box.*

---

## B. Meta WhatsApp Cloud API Setup

We use the official **Meta WhatsApp Cloud API**.

### 1. Register Meta Developer Account & App
1. Go to [Meta for Developers](https://developers.facebook.com/).
2. Create a **Business App**.
3. Add the **WhatsApp** product to your app.

### 2. Obtain Credentials
From the WhatsApp Getting Started page:
- **Temporary / Permanent Access Token:** `WHATSAPP_ACCESS_TOKEN`
- **Phone Number ID:** `WHATSAPP_PHONE_NUMBER_ID`
- **Recipient WhatsApp Number:** `WHATSAPP_RECIPIENT_NUMBER` (e.g. `919876543210`)

### 3. Template vs. Text Message Modes
- **Text Mode (Default):** If `WHATSAPP_TEMPLATE_NAME` is omitted, the system sends a formatted text message to the recipient number.
- **Template Mode:** To use a pre-approved Meta WhatsApp Template, configure:
  ```bash
  WHATSAPP_TEMPLATE_NAME=admission_alert
  WHATSAPP_TEMPLATE_LANGUAGE=en
  ```

---

## C. Firebase Cloud Functions Deployment

The automatic background trigger is located in `functions/index.js`.

### Deployment Steps
1. Install Firebase CLI globally if needed:
   ```bash
   npm install -g firebase-tools
   ```
2. Log in to Firebase:
   ```bash
   firebase login
   ```
3. Set environment secrets for Cloud Functions:
   ```bash
   firebase functions:secrets:set RESEND_API_KEY
   firebase functions:secrets:set ADMISSION_NOTIFICATION_EMAIL
   firebase functions:secrets:set WHATSAPP_ACCESS_TOKEN
   firebase functions:secrets:set WHATSAPP_PHONE_NUMBER_ID
   firebase functions:secrets:set WHATSAPP_RECIPIENT_NUMBER
   ```
4. Deploy Cloud Functions:
   ```bash
   firebase deploy --only functions
   ```

---

## D. Environment Variables Reference

| Variable Name | Environment | Description |
|---------------|-------------|-------------|
| `ADMISSION_NOTIFICATION_EMAIL` | Vercel & Firebase Secrets | Recipient email address for admission alerts |
| `ADMISSION_NOTIFICATION_NAME` | Vercel & Firebase Secrets | Name of the recipient clerk / officer |
| `RESEND_API_KEY` | Vercel & Firebase Secrets | Resend REST API authorization key |
| `WHATSAPP_ACCESS_TOKEN` | Vercel & Firebase Secrets | Meta WhatsApp Cloud API bearer token |
| `WHATSAPP_PHONE_NUMBER_ID` | Vercel & Firebase Secrets | Meta WhatsApp phone number ID |
| `WHATSAPP_RECIPIENT_NUMBER` | Vercel & Firebase Secrets | Recipient mobile number (with 91 country code) |
| `WHATSAPP_TEMPLATE_NAME` | Vercel & Firebase Secrets | (Optional) Meta approved WhatsApp template name |
| `WHATSAPP_TEMPLATE_LANGUAGE` | Vercel & Firebase Secrets | (Optional) Template language code (e.g., `en`) |

---

## E. Testing Procedures

### 1. Test Student Submission & Firestore Save
1. Navigate to `https://collage-website-rho.vercel.app/admissions`.
2. Fill out the Admission Enquiry Form.
3. Submit the form.
4. **Expected Result:** Instant green success banner displayed to student.

### 2. Test Real-Time Admin Dashboard
1. Open `https://collage-website-rho.vercel.app/admin` in another browser window.
2. Sign in as an authorized admin.
3. **Expected Result:**
   - The newly submitted enquiry appears automatically in real time without refreshing.
   - A visual **"NEW"** badge is displayed.
   - If a new enquiry arrives while viewing, a toast notification `🔔 New admission enquiry received...` pops up.

### 3. Test Manual Retry & Idempotency
1. Open the enquiry details modal in `/admin`.
2. View **Notification Delivery Status**.
3. Click **Retry Notifications**.
4. **Expected Result:** The system retries **only** channels that failed or were unconfigured. Already-sent channels are skipped.

---

## F. Troubleshooting & Common Issues

### 1. WhatsApp Notifications Failing
- **Cause:** Invalid token, expired temporary token, or missing recipient country code.
- **Fix:** Verify `WHATSAPP_ACCESS_TOKEN` in Meta App dashboard. Ensure `WHATSAPP_RECIPIENT_NUMBER` includes country code (e.g. `91...`).

### 2. Email Notifications Failing
- **Cause:** Missing `RESEND_API_KEY` or domain verification issue.
- **Fix:** Test with `onboarding@resend.dev` sender domain or verify your custom sending domain in Resend.

### 3. How to Disable WhatsApp Safely
To temporarily disable WhatsApp without breaking enquiries or email:
- Simply remove or leave `WHATSAPP_ACCESS_TOKEN` empty.
- The system will cleanly mark WhatsApp status as `pending_configuration` or `failed` in Firestore while Email continues working normally.

---

## G. Changing Recipient Information

To update the clerk's email or mobile number:
1. Update `ADMISSION_NOTIFICATION_EMAIL` or `WHATSAPP_RECIPIENT_NUMBER` in Vercel Environment Variables.
2. Redeploy Vercel environment / update Firebase secrets (`firebase functions:secrets:set ...`).
3. No code modifications are needed!
