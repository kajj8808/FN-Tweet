"use client";

import { clearUserSession } from "@/app/(auth)/actions";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  const onClick = async () => {
    await signOut(auth);
    await clearUserSession();
    router.push("/login");
  };
  return <button onClick={onClick}>Logout...</button>;
}
