import { NextRequest, NextResponse } from "next/server";
import { adminAuth, adminDb } from "@/lib/firebaseAdmin";
import { processEnquiryNotifications, EnquiryNotificationData } from "@/lib/notificationEngine";

export async function POST(req: NextRequest) {
  try {
    // 1. Extract Bearer Token
    const authHeader = req.headers.get("authorization") || "";
    if (!authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Unauthorized: Missing or invalid Authorization header." },
        { status: 401 }
      );
    }

    const idToken = authHeader.split("Bearer ")[1].trim();
    if (!idToken) {
      return NextResponse.json(
        { error: "Unauthorized: ID Token is empty." },
        { status: 401 }
      );
    }

    // 2. Verify Firebase ID Token
    let decodedToken;
    try {
      decodedToken = await adminAuth.verifyIdToken(idToken);
    } catch (authErr) {
      console.error("[Retry API] Invalid ID Token:", authErr);
      return NextResponse.json(
        { error: "Unauthorized: Invalid or expired token." },
        { status: 401 }
      );
    }

    const uid = decodedToken.uid;

    // 3. Check Admin Authorization in Firestore admins/{uid}
    const adminDocRef = adminDb.collection("admins").doc(uid);
    const adminDoc = await adminDocRef.get();

    if (!adminDoc.exists) {
      return NextResponse.json(
        { error: "Forbidden: User profile not found in admins collection." },
        { status: 403 }
      );
    }

    const adminData = adminDoc.data();
    if (!adminData || adminData.role !== "admin" || adminData.active !== true) {
      return NextResponse.json(
        { error: "Forbidden: Admin privileges are disabled or inactive." },
        { status: 403 }
      );
    }

    // 4. Parse request body
    const body = await req.json();
    const { enquiryId } = body;

    if (!enquiryId || typeof enquiryId !== "string") {
      return NextResponse.json(
        { error: "Bad Request: enquiryId is required." },
        { status: 400 }
      );
    }

    // 5. Fetch enquiry document
    const enquiryRef = adminDb.collection("admission_enquiries").doc(enquiryId);
    const enquirySnap = await enquiryRef.get();

    if (!enquirySnap.exists) {
      return NextResponse.json(
        { error: `Not Found: Enquiry ${enquiryId} does not exist.` },
        { status: 404 }
      );
    }

    const enquiryData = enquirySnap.data() as EnquiryNotificationData;

    // 6. Execute Notification Retry
    const result = await processEnquiryNotifications(adminDb, enquiryId, enquiryData);

    return NextResponse.json({
      success: true,
      enquiryId,
      result,
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Internal Server Error";
    console.error("[Retry API] Server error:", error);
    return NextResponse.json(
      { error: `Internal Server Error: ${msg}` },
      { status: 500 }
    );
  }
}
