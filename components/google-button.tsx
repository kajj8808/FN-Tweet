"use client";
import { saveUserSession } from "@/app/(auth)/actions";
import { auth } from "@/lib/firebase";
import { convertAuthErrorCodeToErrorMessage } from "@/lib/utile";
import { FirebaseAuthError } from "firebase-admin/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaGoogle } from "react-icons/fa";
import NotificationError from "./notification-error";

export default function GoogleButton() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const onClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();
      await saveUserSession(result.user.uid, token);
      router.push("/");
    } catch (error) {
      const authError = error as FirebaseAuthError;
      setError(convertAuthErrorCodeToErrorMessage(authError.code));
    }
  };

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(null);
      }, 4000);
    }
  }, [error]);

  return (
    <button
      onClick={onClick}
      className="flex justify-center bg-blue-500 p-3 transition-colors hover:bg-blue-600"
    >
      <FaGoogle className="size-6" />
      {error ? <NotificationError message={error} showingSecond={3} /> : null}
    </button>
  );
}
