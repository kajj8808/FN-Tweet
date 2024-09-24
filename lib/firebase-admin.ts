import * as admin from "firebase-admin";
import { getApps } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

const getFirebaseApp = () => {
  const apps = getApps();
  const firebaseApp = apps.find((app) => app.name === "[DEFAULT]");

  if (firebaseApp) {
    return firebaseApp;
  } else {
    const firebaseApp = admin.initializeApp({
      credential: admin.credential.cert({
        clientEmail: process.env.CLIENT_EMAIL,
        privateKey: process.env.PRIVATE_KEY?.replace(/\\n/g, "\n"), // 줄바꿈 처리
        projectId: process.env.PROJECT_ID,
      }),
    });
    return firebaseApp;
  }
};

export const db = getFirestore(getFirebaseApp());

export const authAdmin = getAuth(getFirebaseApp());
