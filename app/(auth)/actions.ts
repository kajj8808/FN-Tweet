"use server";
import getSession from "@/lib/session";

export async function saveUserSession(uid?: string, token?: string) {
  const session = await getSession();
  session.uid = uid;
  session.token = token;
  await session.save();
}

export async function clearUserSession() {
  const session = await getSession();
  session.uid = undefined;
  session.token = undefined;
  await session.save();
}
