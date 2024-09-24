import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

interface SessionContent {
  uid?: string;
  token?: string;
}

export default function getSession() {
  return getIronSession<SessionContent>(cookies(), {
    cookieName: "sakura-laurel",
    password: process.env.COOKIE_PASSWORD!,
  });
}
