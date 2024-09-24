import { auth } from "@/lib/firebase";
import { useEffect } from "react";

/** user를 갱신하고 얻어오는 hook */
export default function useUserSession() {
  useEffect(() => {
    auth.onAuthStateChanged((user) => console.log(user));
  }, []);
}
