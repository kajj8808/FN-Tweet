import LogoutButton from "@/components/logout-button";
import Navbar from "@/components/nav-bar";
import getSession from "@/lib/session";

export default async function Home() {
  const session = await getSession();
  console.log(session);
  return (
    <div>
      <Navbar />
      <LogoutButton />
    </div>
  );
}
