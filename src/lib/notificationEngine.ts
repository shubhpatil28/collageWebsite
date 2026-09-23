import { Firestore, Timestamp } from "firebase-admin/firestore";

export interface EnquiryNotificationData {
  fullName: string;
  mobile: string;
  email: string;
  program: string;
  message?: string;
  source?: string;
  createdAt?: Timestamp | { seconds: number; nanoseconds: number } | null;
  notificationStatus?: "pending" | "sent" | "partial" | "failed";
  emailNotification?: {
    status: "pending" | "sent" | "failed" | "pending_configuration";
    sentAt?: Timestamp | null;
    error?: string | null;
    messageId?: string | null;
  };
  whatsappNotification?: {
    status: "pending" | "sent" | "failed" | "pending_configuration" | "skipped";
    sentAt?: Timestamp | null;
    error?: string | null;
    messageId?: string | null;
    attemptCount?: number;
  };
}

export interface NotificationResult {
  emailStatus: "sent" | "failed" | "pending_configuration" | "skipped";
  emailError: string | null;
  whatsappStatus: "sent" | "failed" | "pending_configuration" | "skipped";
  whatsappError: string | null;
  overallStatus: "sent" | "partial" | "failed" | "pending";
}

/**
 * Format timestamp into human-readable string for notification templates.
 */
function formatTimestamp(ts?: Timestamp | { seconds: number; nanoseconds: number } | null): string {
  if (!ts) return new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
  if (ts instanceof Timestamp) {
    return ts.toDate().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
  }
  if (typeof ts === "object" && "seconds" in ts) {
    return new Date(ts.seconds * 1000).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
  }
  return new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
}

/**
 * Send Email Notification via Resend REST API (Server-Side Only).
 */
async function sendEmailNotification(data: EnquiryNotificationData): Promise<{ success: boolean; messageId: string | null; error: string | null }> {
  const apiKey = process.env.RESEND_API_KEY || process.env.EMAIL_PROVIDER_API_KEY;
  const recipientEmail = process.env.ADMISSION_NOTIFICATION_EMAIL;
  const recipientName = process.env.ADMISSION_NOTIFICATION_NAME || "Admission Officer";

  if (!apiKey) {
    console.log(`[Notification Engine] Email skipped: RESEND_API_KEY / EMAIL_PROVIDER_API_KEY is not configured.`);
    return { success: false, messageId: null, error: "Email provider API key not configured in environment variables." };
  }

  if (!recipientEmail) {
    console.log(`[Notification Engine] Email skipped: ADMISSION_NOTIFICATION_EMAIL is not configured.`);
    return { success: false, messageId: null, error: "Recipient email (ADMISSION_NOTIFICATION_EMAIL) not configured." };
  }

  const dateStr = formatTimestamp(data.createdAt);
  const dashboardUrl = "https://collage-website-rho.vercel.app/admin";

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>New Admission Enquiry</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #0f172a; margin: 0; padding: 24px; }
        .container { max-width: 580px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
        .header { background-color: #0a192f; color: #ffffff; padding: 24px; text-align: left; }
        .header h1 { margin: 0; font-size: 20px; font-weight: 800; color: #ffffff; }
        .header p { margin: 4px 0 0 0; font-size: 13px; color: #fbbf24; font-weight: 600; }
        .body { padding: 24px; }
        .field-group { margin-bottom: 16px; }
        .label { font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; }
        .value { font-size: 15px; font-weight: 600; color: #0f172a; background-color: #f8fafc; padding: 10px 14px; border-radius: 8px; border: 1px solid #e2e8f0; }
        .message-box { font-size: 14px; color: #334155; background-color: #fffbeb; border-left: 4px solid #f59e0b; padding: 12px 16px; border-radius: 6px; font-style: italic; }
        .cta-container { text-align: center; margin-top: 24px; padding-top: 20px; border-top: 1px solid #e2e8f0; }
        .btn { display: inline-block; background-color: #f59e0b; color: #0a192f; font-weight: 800; font-size: 14px; text-decoration: none; padding: 12px 24px; border-radius: 10px; }
        .footer { padding: 16px 24px; background-color: #f1f5f9; font-size: 12px; color: #64748b; text-align: center; border-top: 1px solid #e2e8f0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Smt. S. M. Agrawal Institute of Management</h1>
          <p>NEW ADMISSION ENQUIRY RECEIVED</p>
        </div>
        <div class="body">
          <p style="font-size: 14px; color: #475569; margin-top: 0;">
            Hello <strong>${recipientName}</strong>, a new student enquiry has been submitted on the AIM Chalisgaon portal.
          </p>

          <div class="field-group">
            <div class="label">Candidate Full Name</div>
            <div class="value">${data.fullName}</div>
          </div>

          <div style="display: flex; gap: 12px;">
            <div class="field-group" style="flex: 1;">
              <div class="label">Mobile Number</div>
              <div class="value"><a href="tel:${data.mobile}" style="color: #0f172a; text-decoration: none;">+91 ${data.mobile}</a></div>
            </div>
            <div class="field-group" style="flex: 1;">
              <div class="label">Email Address</div>
              <div class="value"><a href="mailto:${data.email}" style="color: #0f172a; text-decoration: none;">${data.email}</a></div>
            </div>
          </div>

          <div class="field-group">
            <div class="label">Program Interested In</div>
            <div class="value" style="color: #b45309; font-weight: 700;">${data.program}</div>
          </div>

          ${
            data.message
              ? `
          <div class="field-group">
            <div class="label">Student Query / Message</div>
            <div class="message-box">"${data.message}"</div>
          </div>`
              : ""
          }

          <div class="field-group" style="margin-top: 16px;">
            <div class="label">Submitted At</div>
            <div style="font-size: 12px; color: #64748b;">${dateStr} (Source: ${data.source || "Website"})</div>
          </div>

          <div class="cta-container">
            <a href="${dashboardUrl}" target="_blank" class="btn">Open Admin Dashboard</a>
          </div>
        </div>
        <div class="footer">
          Smt. S. M. Agrawal Institute of Management (AIM), Chalisgaon, Dist. Jalgaon<br>
          Automated Admission Notification System
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    const fromAddress = process.env.RESEND_FROM_EMAIL || "AIM Admissions <onboarding@resend.dev>";
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromAddress,
        to: [recipientEmail],
        subject: `New Admission Enquiry — ${data.fullName} — ${data.program}`,
        html: htmlContent,
      }),
    });

    if (!response.ok) {
      const errBody = await response.text();
      const safeErr = apiKey ? errBody.replace(apiKey, "[REDACTED]") : errBody;
      console.error(`[Notification Engine] Resend Email API Error (${response.status}):`, safeErr);
      return { success: false, messageId: null, error: `Resend HTTP ${response.status}: ${safeErr}` };
    }

    const resData = await response.json();
    const messageId = resData?.id || null;
    console.log(`[Notification Engine] Email sent successfully via Resend. ID: ${messageId}`);
    return { success: true, messageId, error: null };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Network error sending email via Resend API.";
    console.error("[Notification Engine] Resend Email exception:", err);
    return { success: false, messageId: null, error: msg };
  }
}

/**
 * Send WhatsApp Notification via Meta WhatsApp Cloud API (Server-Side Only).
 */
async function sendWhatsAppNotification(
  data: EnquiryNotificationData
): Promise<{ success: boolean; messageId: string | null; error: string | null }> {
  const token = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneAccountId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const recipientMobile = process.env.WHATSAPP_RECIPIENT_NUMBER;
  const templateName = process.env.WHATSAPP_TEMPLATE_NAME;
  const templateLang = process.env.WHATSAPP_TEMPLATE_LANGUAGE || "en";

  if (!token || !phoneAccountId) {
    console.log(`[Notification Engine] WhatsApp skipped: WHATSAPP_ACCESS_TOKEN / WHATSAPP_PHONE_NUMBER_ID not configured.`);
    return { success: false, messageId: null, error: "WhatsApp Cloud API credentials (TOKEN / PHONE_NUMBER_ID) not configured." };
  }

  if (!recipientMobile) {
    console.log(`[Notification Engine] WhatsApp skipped: WHATSAPP_RECIPIENT_NUMBER is not configured.`);
    return { success: false, messageId: null, error: "WhatsApp recipient number (WHATSAPP_RECIPIENT_NUMBER) not configured." };
  }

  // Sanitize recipient phone (must be international format without + or spaces, e.g. 919876543210)
  let formattedRecipient = recipientMobile.replace(/\D/g, "");
  if (formattedRecipient.length === 10) {
    formattedRecipient = `91${formattedRecipient}`;
  }

  const dateStr = formatTimestamp(data.createdAt);
  const endpoint = `https://graph.facebook.com/v19.0/${phoneAccountId}/messages`;

  let payload: Record<string, unknown>;

  if (templateName) {
    // Approved WhatsApp Template Message
    const isHelloWorld = templateName.toLowerCase() === "hello_world";
    payload = {
      messaging_product: "whatsapp",
      to: formattedRecipient,
      type: "template",
      template: {
        name: templateName,
        language: { code: templateLang || (isHelloWorld ? "en_US" : "en") },
        ...(isHelloWorld
          ? {}
          : {
              components: [
                {
                  type: "body",
                  parameters: [
                    { type: "text", text: data.fullName },
                    { type: "text", text: data.mobile },
                    { type: "text", text: data.email },
                    { type: "text", text: data.program },
                    { type: "text", text: data.message || "N/A" },
                  ],
                },
              ],
            }),
      },
    };
  } else {
    // Direct Text Message (Supported within open 24h window or developer mode testing)
    const textMessage = `🔔 *NEW ADMISSION ENQUIRY*\n\n👤 *Name:* ${data.fullName}\n📱 *Mobile:* +91 ${data.mobile}\n📧 *Email:* ${data.email}\n🎓 *Program:* ${data.program}\n\n💬 *Message:*\n${data.message || "No additional message provided."}\n\n🕐 *Received:* ${dateStr}\n\nPlease open the Admin Dashboard to manage this enquiry:\nhttps://collage-website-rho.vercel.app/admin`;

    payload = {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: formattedRecipient,
      type: "text",
      text: {
        preview_url: false,
        body: textMessage,
      },
    };
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errBody = await response.text();
      // Sanitize token out of log output
      const sanitizedErr = errBody.replace(token, "[REDACTED]");
      console.error(`[Notification Engine] Meta WhatsApp Cloud API Error (${response.status}):`, sanitizedErr);
      return { success: false, messageId: null, error: `Meta API HTTP ${response.status}: ${sanitizedErr}` };
    }

    const resData = await response.json();
    const messageId = resData?.messages?.[0]?.id || null;
    console.log(`[Notification Engine] WhatsApp notification sent successfully. Message ID:`, messageId);
    return { success: true, messageId, error: null };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Network error calling Meta WhatsApp Cloud API.";
    console.error("[Notification Engine] WhatsApp exception:", err);
    return { success: false, messageId: null, error: msg };
  }
}

/**
 * Core Process Function: Handles per-channel idempotency, sends unsent notifications,
 * and updates Firestore document atomically.
 */
export async function processEnquiryNotifications(
  db: Firestore,
  enquiryId: string,
  data: EnquiryNotificationData
): Promise<NotificationResult> {
  console.log(`[Notification Engine] Processing notifications for enquiry ${enquiryId}...`);

  // Per-channel idempotency checks
  const currentEmailStatus = data.emailNotification?.status || "pending";
  const currentWhatsappStatus = data.whatsappNotification?.status || "pending";

  let finalEmailStatus: "sent" | "failed" | "pending_configuration" | "skipped" = currentEmailStatus === "sent" ? "skipped" : "failed";
  let emailError: string | null = data.emailNotification?.error || null;
  let emailMessageId: string | null = data.emailNotification?.messageId || null;

  let finalWhatsappStatus: "sent" | "failed" | "pending_configuration" | "skipped" = currentWhatsappStatus === "sent" ? "skipped" : "failed";
  let whatsappError: string | null = data.whatsappNotification?.error || null;

  // 1. Process Email if not already sent
  if (currentEmailStatus !== "sent") {
    const resendKey = process.env.RESEND_API_KEY || process.env.EMAIL_PROVIDER_API_KEY;
    if (!resendKey || !process.env.ADMISSION_NOTIFICATION_EMAIL) {
      finalEmailStatus = "pending_configuration";
      emailError = "Email provider credentials or recipient email not configured.";
    } else {
      const result = await sendEmailNotification(data);
      if (result.success) {
        finalEmailStatus = "sent";
        emailError = null;
        emailMessageId = result.messageId;
      } else {
        finalEmailStatus = "failed";
        emailError = result.error;
      }
    }
  }

  let whatsappMessageId: string | null = data.whatsappNotification?.messageId || null;
  const currentWAAttemptCount = data.whatsappNotification?.attemptCount || 0;
  let finalWAAttemptCount = currentWAAttemptCount;

  // 2. Process WhatsApp if not already sent
  if (currentWhatsappStatus !== "sent") {
    const waToken = process.env.WHATSAPP_ACCESS_TOKEN;
    const waPhoneId = process.env.WHATSAPP_PHONE_NUMBER_ID;
    const waRecipient = process.env.WHATSAPP_RECIPIENT_NUMBER;

    if (!waToken || !waPhoneId || !waRecipient) {
      finalWhatsappStatus = "pending_configuration";
      whatsappError = "WhatsApp Cloud API credentials or recipient number not configured.";
    } else {
      finalWAAttemptCount += 1;
      const result = await sendWhatsAppNotification(data);
      whatsappMessageId = result.messageId;
      if (result.success) {
        finalWhatsappStatus = "sent";
        whatsappError = null;
      } else {
        finalWhatsappStatus = "failed";
        whatsappError = result.error;
      }
    }
  }

  // 3. Resolve Overall Status
  const isEmailSent = finalEmailStatus === "sent" || currentEmailStatus === "sent";
  const isWhatsappSent = finalWhatsappStatus === "sent" || currentWhatsappStatus === "sent";

  let overallStatus: "sent" | "partial" | "failed" | "pending" = "failed";
  if (isEmailSent && isWhatsappSent) {
    overallStatus = "sent";
  } else if (isEmailSent || isWhatsappSent) {
    overallStatus = "partial";
  } else {
    overallStatus = "failed";
  }

  // 4. Update Firestore document
  const now = Timestamp.now();
  const updatePayload: Record<string, unknown> = {
    notificationStatus: overallStatus,
    updatedAt: now,
  };

  if (finalEmailStatus !== "skipped") {
    updatePayload.emailNotification = {
      status: finalEmailStatus,
      sentAt: finalEmailStatus === "sent" ? now : null,
      error: emailError,
      messageId: emailMessageId,
    };
  }

  if (finalWhatsappStatus !== "skipped") {
    updatePayload.whatsappNotification = {
      status: finalWhatsappStatus,
      sentAt: finalWhatsappStatus === "sent" ? now : null,
      error: whatsappError,
      messageId: whatsappMessageId,
      attemptCount: finalWAAttemptCount,
    };
  }

  if (isEmailSent || isWhatsappSent) {
    updatePayload.notifiedAt = now;
  }

  try {
    const docRef = db.collection("admission_enquiries").doc(enquiryId);
    await docRef.update(updatePayload);
    console.log(`[Notification Engine] Enquiry ${enquiryId} notification status updated to '${overallStatus}'.`);
  } catch (dbErr) {
    console.error(`[Notification Engine] Failed to update Firestore doc ${enquiryId}:`, dbErr);
  }

  return {
    emailStatus: finalEmailStatus,
    emailError,
    whatsappStatus: finalWhatsappStatus,
    whatsappError,
    overallStatus,
  };
}
