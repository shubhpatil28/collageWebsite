const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const { initializeApp, getApps } = require("firebase-admin/app");
const { getFirestore, Timestamp } = require("firebase-admin/firestore");

if (!getApps().length) {
  initializeApp();
}

const db = getFirestore();

/**
 * Format timestamp into human-readable string.
 */
function formatTimestamp(ts) {
  if (!ts) return new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
  if (ts.toDate) return ts.toDate().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
  if (ts.seconds) return new Date(ts.seconds * 1000).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
  return new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
}

/**
 * Resend Email Notification
 */
async function sendEmailNotification(data) {
  const apiKey = process.env.RESEND_API_KEY || process.env.EMAIL_PROVIDER_API_KEY;
  const recipientEmail = process.env.ADMISSION_NOTIFICATION_EMAIL;
  const recipientName = process.env.ADMISSION_NOTIFICATION_NAME || "Admission Officer";

  if (!apiKey || !recipientEmail) {
    return { success: false, error: "Email provider API key or recipient email not configured." };
  }

  const dateStr = formatTimestamp(data.createdAt);
  const dashboardUrl = "https://collage-website-rho.vercel.app/admin";

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"></head>
    <body style="font-family: sans-serif; background-color: #f8fafc; padding: 24px;">
      <div style="max-width: 580px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; padding: 24px;">
        <h2 style="color: #0a192f; margin-top: 0;">Smt. S. M. Agrawal Institute of Management</h2>
        <h3 style="color: #d97706; margin-bottom: 20px;">NEW ADMISSION ENQUIRY RECEIVED</h3>
        <p>Hello <strong>${recipientName}</strong>, a new student enquiry has been submitted.</p>
        <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
        <p><strong>Candidate Name:</strong> ${data.fullName}</p>
        <p><strong>Mobile:</strong> +91 ${data.mobile}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Program:</strong> ${data.program}</p>
        ${data.message ? `<p><strong>Message:</strong> "${data.message}"</p>` : ""}
        <p><strong>Received At:</strong> ${dateStr}</p>
        <div style="margin-top: 24px; text-align: center;">
          <a href="${dashboardUrl}" style="background-color: #f59e0b; color: #0a192f; font-weight: bold; text-decoration: none; padding: 12px 24px; border-radius: 8px;">Open Admin Dashboard</a>
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
      // Redact any API key that may appear in error body
      const safeErr = apiKey ? errBody.replace(apiKey, "[REDACTED]") : errBody;
      console.error(`[Cloud Function] Resend Email API Error (${response.status}):`, safeErr);
      return { success: false, messageId: null, error: `Resend HTTP ${response.status}: ${safeErr}` };
    }
    const resData = await response.json();
    const messageId = resData?.id || null;
    console.log(`[Cloud Function] Email sent successfully via Resend. ID: ${messageId}`);
    return { success: true, messageId, error: null };
  } catch (err) {
    console.error("[Cloud Function] Resend Email exception:", err);
    return { success: false, messageId: null, error: err.message || "Network error sending email." };
  }
}

/**
 * Meta WhatsApp Cloud API Notification
 */
async function sendWhatsAppNotification(data) {
  const token = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneAccountId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const recipientMobile = process.env.WHATSAPP_RECIPIENT_NUMBER;
  const templateName = process.env.WHATSAPP_TEMPLATE_NAME;
  const templateLang = process.env.WHATSAPP_TEMPLATE_LANGUAGE || "en";

  if (!token || !phoneAccountId || !recipientMobile) {
    return { success: false, error: "WhatsApp credentials or recipient number not configured." };
  }

  let formattedRecipient = recipientMobile.replace(/\D/g, "");
  if (formattedRecipient.length === 10) formattedRecipient = `91${formattedRecipient}`;

  const dateStr = formatTimestamp(data.createdAt);
  const endpoint = `https://graph.facebook.com/v19.0/${phoneAccountId}/messages`;

  let payload;
  if (templateName) {
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
    const textMessage = `🔔 *NEW ADMISSION ENQUIRY*\n\n👤 *Name:* ${data.fullName}\n📱 *Mobile:* +91 ${data.mobile}\n📧 *Email:* ${data.email}\n🎓 *Program:* ${data.program}\n\n💬 *Message:*\n${data.message || "No additional message provided."}\n\n🕐 *Received:* ${dateStr}\n\nPlease open the Admin Dashboard:\nhttps://collage-website-rho.vercel.app/admin`;
    payload = {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: formattedRecipient,
      type: "text",
      text: { preview_url: false, body: textMessage },
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
      const sanitizedErr = errBody.replace(token, "[REDACTED]");
      return { success: false, messageId: null, error: `Meta API HTTP ${response.status}: ${sanitizedErr}` };
    }
    const resData = await response.json();
    const messageId = resData?.messages?.[0]?.id || null;
    return { success: true, messageId, error: null };
  } catch (err) {
    return { success: false, messageId: null, error: err.message || "Network error calling Meta WhatsApp API." };
  }
}

/**
 * Cloud Function Trigger: Runs automatically when a new document is created in admission_enquiries
 */
exports.onAdmissionEnquiryCreated = onDocumentCreated(
  {
    document: "admission_enquiries/{enquiryId}",
    region: "asia-south1",
  },
  async (event) => {
    const snap = event.data;
    if (!snap) {
      console.log("No data associated with event");
      return;
    }

    const enquiryId = event.params.enquiryId;
    const data = snap.data();

    console.log(`[Cloud Function] Processing new admission enquiry trigger: ${enquiryId}`);

    // Re-read fresh doc from Firestore to enforce idempotency
    const docRef = db.collection("admission_enquiries").doc(enquiryId);
    const freshSnap = await docRef.get();
    if (!freshSnap.exists) return;
    const freshData = freshSnap.data();

    const currentEmailStatus = freshData.emailNotification?.status || "pending";
    const currentWhatsappStatus = freshData.whatsappNotification?.status || "pending";

    // 1. Process Email if not already sent
    let finalEmailStatus = currentEmailStatus === "sent" ? "skipped" : "failed";
    let emailError = freshData.emailNotification?.error || null;
    let emailMessageId = freshData.emailNotification?.messageId || null;

    if (currentEmailStatus !== "sent") {
      const resendKey = process.env.RESEND_API_KEY || process.env.EMAIL_PROVIDER_API_KEY;
      if (!resendKey || !process.env.ADMISSION_NOTIFICATION_EMAIL) {
        finalEmailStatus = "pending_configuration";
        emailError = "Email provider credentials or recipient email not configured.";
        console.warn(`[Cloud Function] Email skipped: missing RESEND_API_KEY or ADMISSION_NOTIFICATION_EMAIL`);
      } else {
        const result = await sendEmailNotification(freshData);
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

    // 2. Process WhatsApp if not already sent
    let finalWhatsappStatus = currentWhatsappStatus === "sent" ? "skipped" : "failed";
    let whatsappError = freshData.whatsappNotification?.error || null;
    let whatsappMessageId = freshData.whatsappNotification?.messageId || null;
    const currentWAAttemptCount = freshData.whatsappNotification?.attemptCount || 0;
    let finalWAAttemptCount = currentWAAttemptCount;

    if (currentWhatsappStatus !== "sent") {
      const waToken = process.env.WHATSAPP_ACCESS_TOKEN;
      const waPhoneId = process.env.WHATSAPP_PHONE_NUMBER_ID;
      const waRecipient = process.env.WHATSAPP_RECIPIENT_NUMBER;

      if (!waToken || !waPhoneId || !waRecipient) {
        finalWhatsappStatus = "pending_configuration";
        whatsappError = "WhatsApp Cloud API credentials or recipient number not configured.";
      } else {
        finalWAAttemptCount += 1;
        const result = await sendWhatsAppNotification(freshData);
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

    // 3. Overall status calculation
    const isEmailSent = finalEmailStatus === "sent" || currentEmailStatus === "sent";
    const isWhatsappSent = finalWhatsappStatus === "sent" || currentWhatsappStatus === "sent";

    let overallStatus = "failed";
    if (isEmailSent && isWhatsappSent) overallStatus = "sent";
    else if (isEmailSent || isWhatsappSent) overallStatus = "partial";
    else overallStatus = "failed";

    // 4. Update Firestore doc
    const now = Timestamp.now();
    const updatePayload = {
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

    await docRef.update(updatePayload);
    console.log(`[Cloud Function] Finished processing ${enquiryId}. Result: ${overallStatus}`);
  }
);
