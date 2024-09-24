import AuthSocial from "@/components/auth-social";
import CreateAccountForm from "@/components/create-account-form";
import Link from "next/link";

export default function CreateAccountPage() {
  return (
    <div className="flex h-dvh w-full items-center justify-center">
      <div className="flex w-full max-w-xs flex-col gap-8 sm:max-w-sm md:max-w-md">
        <span className="text-xl font-bold">CreateAccount</span>
        <CreateAccountForm />
        <div className="relative">
          <div className="border-b border-dashed border-blue-500" />
          <span className="absolute -top-3.5 left-0 right-0 m-auto w-6 bg-neutral-900 text-center">
            or
          </span>
        </div>
        <AuthSocial />
        <div className="flex gap-1 *:text-sm">
          <span>계정이 있으신가요?</span>
          <Link
            href={"/login"}
            className="text-blue-500 transition-colors hover:text-blue-600"
          >
            로그인
          </Link>
        </div>
      </div>
    </div>
  );
}
