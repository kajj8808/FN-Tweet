import { InputHTMLAttributes } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface AuthInputProps {
  register: UseFormRegisterReturn;
  label: string;
  id: string;
  error?: string;
}

export default function AuthInput({
  register,
  label,
  id,
  error,
  ...rest
}: AuthInputProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex flex-col gap-2.5">
      <label htmlFor={id} className="text-xs font-semibold">
        {label}
      </label>
      <div className="flex flex-col gap-1">
        <input
          {...register}
          className="border border-neutral-500 bg-transparent px-3 py-1.5 outline-none transition-colors placeholder:text-sm placeholder:text-neutral-500 focus:border-blue-500"
          {...rest}
        />
        {error ? (
          <span className="text-xs text-red-500">{error}</span>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}
