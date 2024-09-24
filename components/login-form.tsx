"use client";

import { useForm } from "react-hook-form";
import AuthInput from "./auth-input";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import AuthButton from "./auth-button";
import { FirebaseAuthError } from "firebase-admin/auth";
import {
  EMAIL_REQUIRED_ERROR,
  PASSWORD_MIN_ERROR,
  PASSWORD_MIN_LENGTH,
  PASSWORD_REQUIRED_ERROR,
} from "@/lib/constants";
import { useRouter } from "next/navigation";
import { saveUserSession } from "@/app/(auth)/actions";
import { convertAuthErrorCodeToErrorMessage } from "@/lib/utile";

interface LoginFormData {
  email: string;
  password: string;
}
export default function LoginForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormData>();

  const onValid = async (formdata: LoginFormData) => {
    try {
      const result = await signInWithEmailAndPassword(
        auth,
        formdata.email,
        formdata.password,
      );
      const token = await result.user.getIdToken();
      await saveUserSession(result.user.uid, token);
      router.push("/");
    } catch (error) {
      const authError = error as FirebaseAuthError;
      setError("root", {
        message: convertAuthErrorCodeToErrorMessage(authError.code),
      });
      console.log(authError.code);
    }
  };
  return (
    <form onSubmit={handleSubmit(onValid)} className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <AuthInput
          label="EMAIL *"
          register={register("email", {
            required: {
              value: true,
              message: EMAIL_REQUIRED_ERROR,
            },
          })}
          placeholder="Email"
          id="email"
          type="email"
          error={errors.email?.message}
          required
        />
        <AuthInput
          label="PASSWORD *"
          register={register("password", {
            required: {
              value: true,
              message: PASSWORD_REQUIRED_ERROR,
            },
            minLength: {
              value: PASSWORD_MIN_LENGTH,
              message: PASSWORD_MIN_ERROR,
            },
          })}
          placeholder="Password"
          id="password"
          type="password"
          error={errors.password?.message}
          required
        />
      </div>
      <AuthButton text="LOG IN" error={errors.root?.message} />
    </form>
  );
}
