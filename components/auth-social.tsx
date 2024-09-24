import GithubButton from "./github-button";
import GoogleButton from "./google-button";

export default function AuthSocial() {
  return (
    <div className="grid grid-cols-2 gap-3">
      <GithubButton />
      <GoogleButton />
    </div>
  );
}
