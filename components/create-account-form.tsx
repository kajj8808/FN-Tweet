"use client";

import { useForm } from "react-hook-form";
import AuthInput from "./auth-input";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { saveUserSession } from "@/app/(auth)/actions";
import AuthButton from "./auth-button";
import {
  EMAIL_REQUIRED_ERROR,
  NICKNAME_MIN_ERROR,
  NICKNAME_MIN_LENGTH,
  NICKNAME_REQUIRED_ERROR,
  PASSWORD_MIN_ERROR,
  PASSWORD_MIN_LENGTH,
  PASSWORD_REQUIRED_ERROR,
} from "@/lib/constants";
import { FirebaseAuthError } from "firebase-admin/auth";
import { convertAuthErrorCodeToErrorMessage } from "@/lib/utile";

interface CreateAccountFormData {
  email: string;
  password: string;
  nickname: string;
}
export default function CreateAccountForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<CreateAccountFormData>();

  const onValid = async (formdata: CreateAccountFormData) => {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        formdata.email,
        formdata.password,
      );
      await updateProfile(result.user, {
        displayName: formdata.nickname,
      });
      const token = await result.user.getIdToken();
      await saveUserSession(result.user.uid, token);
      router.push("/");
    } catch (error) {
      const authError = error as FirebaseAuthError;
      setError("root", {
        message: convertAuthErrorCodeToErrorMessage(authError.code),
      });
    }
  };
  return (
    <form onSubmit={handleSubmit(onValid)} className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <AuthInput
          label="NICK NAME *"
          register={register("nickname", {
            required: {
              value: true,
              message: NICKNAME_REQUIRED_ERROR,
            },
            minLength: {
              value: NICKNAME_MIN_LENGTH,
              message: NICKNAME_MIN_ERROR,
            },
          })}
          placeholder="Nickname"
          id="nickname"
          type="text"
          error={errors.nickname?.message}
          required
        />
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
      <AuthButton text="CREATE ACCOUNT" error={errors.root?.message} />
    </form>
  );
}
