# AIM 2.0 — Phase 3: Firebase & Admin Dashboard Setup Guide

This guide provides step-by-step instructions to configure Firebase Authentication, Cloud Firestore, Firestore Security Rules, and Admin Authorization for the AIM 2.0 website.

---

## 1. Firebase Project Setup

1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Click **Create a project** (or select an existing project).
3. Name your project (e.g. `aim-chalisgaon-prod`) and complete the creation wizard.

---

## 2. Register Web App & Get Config Keys

1. In your Firebase project overview, click the **Web icon (`</>`)** to add a Web App.
2. App nickname: `AIM 2.0 Web`.
3. Click **Register app**.
4. Copy the `firebaseConfig` credentials object:
   - `apiKey`
   - `authDomain`
   - `projectId`
   - `storageBucket`
   - `messagingSenderId`
   - `appId`

---

## 3. Enable Cloud Firestore Database

1. In the left navigation menu, go to **Build -> Firestore Database**.
2. Click **Create database**.
3. Choose your nearest database location (e.g. `asia-south1 (Mumbai)`).
4. Start in **Production mode** (Security rules will be deployed in Step 6).

---

## 4. Enable Firebase Authentication

1. Go to **Build -> Authentication**.
2. Click **Get started**.
3. Under the **Sign-in method** tab, select **Email/Password**.
4. Enable **Email/Password** and click **Save**.

---

## 5. Create First Administrator Account

### A. Create Auth User
1. In **Authentication -> Users** tab, click **Add user**.
2. Enter the official administrator email (e.g. `admin@aimchalisgaon.ac.in`) and a strong password.
3. Click **Add user**.
4. **Copy the generated `User UID`** (e.g., `8f7xK9pQ2mLz...`).

### B. Authorize Admin in Firestore
1. Go to **Firestore Database -> Data** tab.
2. Click **Start collection**.
3. Collection ID: `admins`.
4. Document ID: **Paste the exact Admin User `UID` copied from Authentication**.
5. Add the following document fields:
   - `email` (string): `admin@aimchalisgaon.ac.in`
   - `role` (string): `admin`
   - `active` (boolean): `true`
6. Click **Save**.

---

## 6. Deploy Firestore Security Rules & Indexes

### Firestore Security Rules (`firestore.rules`)
In Firebase Console -> **Firestore Database -> Rules**, paste the contents of `firestore.rules`:

```rules
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {

    function isAuthenticated() {
      return request.auth != null;
    }

    function isAdmin() {
      return isAuthenticated() &&
        exists(/databases/$(database)/documents/admins/$(request.auth.uid)) &&
        get(/databases/$(database)/documents/admins/$(request.auth.uid)).data.role == "admin" &&
        get(/databases/$(database)/documents/admins/$(request.auth.uid)).data.active == true;
    }

    match /admission_enquiries/{enquiryId} {
      allow create: if true
                    && request.resource.data.fullName is string
                    && request.resource.data.fullName.size() >= 2
                    && request.resource.data.mobile is string
                    && request.resource.data.mobile.size() == 10
                    && request.resource.data.email is string
                    && request.resource.data.program is string
                    && request.resource.data.status == "new";

      allow read, update, delete: if isAdmin();
    }

    match /admins/{userId} {
      allow read: if isAuthenticated() && request.auth.uid == userId;
      allow write: if isAdmin();
    }

    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

Click **Publish**.

---

## 7. Environment Variables Configuration

### Local Development (`.env.local`)
Create `.env.local` in the project root directory and add your Firebase credentials:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=aim-chalisgaon-prod.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=aim-chalisgaon-prod
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=aim-chalisgaon-prod.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=1234567890
NEXT_PUBLIC_FIREBASE_APP_ID=1:1234567890:web:abcdef...
```

### Vercel Production Environment
1. Go to your [Vercel Dashboard](https://vercel.com/) -> Select project `collage-website`.
2. Go to **Settings -> Environment Variables**.
3. Add each `NEXT_PUBLIC_FIREBASE_*` variable for **Production** environment.
4. Trigger a deployment or push a commit to `main`.

---

## 8. Verification & Testing Checklist

- [ ] **Public Form Test**: Navigate to `/admissions`, submit a valid enquiry -> verify document appears in `admission_enquiries` collection in Firestore with `status: "new"`.
- [ ] **Spam Protection**: Submit enquiry with honeypot -> confirm no document written to database.
- [ ] **Admin Login Test**: Navigate to `/admin/login`, sign in with admin credentials -> verify redirect to `/admin`.
- [ ] **Admin Authorization Test**: Sign in with an account NOT present in `admins/{uid}` -> confirm error *"Your account does not have administrator access."* and automatic sign-out.
- [ ] **Admin Dashboard**: Change enquiry status to `contacted` / `converted` -> confirm stat cards update dynamically.
- [ ] **CSV Export**: Click **Export CSV** -> verify downloaded file contains filtered records.
