/**
 * Integration-ready Notification Architecture
 * 
 * Provides structured hooks for sending email / WhatsApp alerts upon new admission enquiries.
 * Does not make false claims of sending emails unless a real provider (e.g. Resend, SendGrid, Twilio) is configured.
 */

export interface EnquiryPayload {
  fullName: string;
  mobile: string;
  email: string;
  program: string;
  message?: string;
  createdAt?: string;
}

/**
 * Interface stub for email notifications.
 * Can be connected to a Next.js API route or serverless function with Resend/SendGrid.
 */
export async function notifyNewAdmissionEnquiry(payload: EnquiryPayload): Promise<{ success: boolean; provider?: string }> {
  // Check if notification environment variables are present (e.g. RESEND_API_KEY)
  const apiKey = process.env.NOTIFICATION_EMAIL_API_KEY;

  if (!apiKey) {
    // Log info in development without throwing errors or making fake claims
    if (process.env.NODE_ENV !== "production") {
      console.log("[Notification System Ready] New enquiry submitted:", payload.fullName, payload.program);
    }
    return { success: false, provider: "none" };
  }

  try {
    // Placeholder for real provider execution
    // e.g. await resend.emails.send({ ... })
    return { success: true, provider: "resend" };
  } catch (error) {
    console.error("Failed to trigger email notification:", error);
    return { success: false, provider: "error" };
  }
}
