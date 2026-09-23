import * as admin from "firebase-admin";

if (!admin.apps.length) {
  try {
    const projectId = process.env.FIREBASE_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const privateKey = process.env.FIREBASE_PRIVATE_KEY
      ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n")
      : undefined;

    if (clientEmail && privateKey) {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId,
          clientEmail,
          privateKey,
        }),
      });
      console.log("[Firebase Admin] Initialized with Service Account.");
    } else {
      // Default Application Credentials (GCP / Firebase Cloud Functions / Vercel with env vars)
      admin.initializeApp({
        projectId,
      });
      console.log("[Firebase Admin] Initialized with Default Credentials.");
    }
  } catch (error) {
    console.error("[Firebase Admin] Initialization failed:", error);
  }
}

export const adminDb = admin.firestore();
export const adminAuth = admin.auth();
