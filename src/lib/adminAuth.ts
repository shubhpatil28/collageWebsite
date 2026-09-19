import { auth, db } from "@/lib/firebase";
import { signInWithEmailAndPassword, signOut as firebaseSignOut, onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export interface AdminUser {
  uid: string;
  email: string | null;
  role: string;
  active: boolean;
}

/**
 * Verifies if a user UID has an active admin record in the `admins` collection.
 */
export async function checkAdminAuthorization(uid: string): Promise<{ isAuthorized: boolean; adminData?: AdminUser; error?: string }> {
  if (!db) {
    return { isAuthorized: false, error: "Database configuration missing." };
  }

  try {
    const adminDocRef = doc(db, "admins", uid);
    const adminDoc = await getDoc(adminDocRef);

    if (!adminDoc.exists()) {
      return { isAuthorized: false, error: "Your account does not have administrator access." };
    }

    const data = adminDoc.data();
    if (data.role !== "admin" || data.active !== true) {
      return { isAuthorized: false, error: "Your administrator account is currently inactive." };
    }

    return {
      isAuthorized: true,
      adminData: {
        uid,
        email: data.email || null,
        role: data.role,
        active: data.active,
      },
    };
  } catch (err: unknown) {
    console.error("Admin Authorization Check Failed:", err);
    return { isAuthorized: false, error: "Failed to verify admin privileges." };
  }
}

/**
 * Admin Sign Out helper that cleans up session.
 */
export async function adminSignOut(): Promise<void> {
  if (auth) {
    await firebaseSignOut(auth);
  }
}
