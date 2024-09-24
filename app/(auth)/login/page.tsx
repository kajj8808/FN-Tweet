import AuthSocial from "@/components/auth-social";
import LoginForm from "@/components/login-form";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex h-dvh w-full items-center justify-center">
      <div className="flex w-full max-w-xs flex-col gap-8 sm:max-w-sm md:max-w-md">
        <span className="text-xl font-bold">Login</span>
        <LoginForm />
        <div className="relative">
          <div className="border-b border-dashed border-blue-500" />
          <span className="absolute -top-3.5 left-0 right-0 m-auto w-6 bg-neutral-900 text-center">
            or
          </span>
        </div>
        <AuthSocial />
        <div className="flex gap-1 *:text-sm">
          <span>계정이 없으신가요?</span>
          <Link
            href={"/create-account"}
            className="text-blue-500 transition-colors hover:text-blue-600"
          >
            회원가입
          </Link>
        </div>
      </div>
    </div>
  );
}
