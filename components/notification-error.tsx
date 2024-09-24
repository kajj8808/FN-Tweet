"use clinet";
import { ExclamationTriangleIcon } from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";
interface NotificationErrorProps {
  message: string;
  showingSecond: number;
}

export default function NotificationError({
  message,
  showingSecond,
}: NotificationErrorProps) {
  const [isShowing, setIsShowing] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsShowing(false);
    }, showingSecond * 1000);
  }, [showingSecond]);
  return (
    <div
      className={`absolute bottom-12 left-0 right-0 m-auto flex max-w-xs items-center justify-center gap-2 rounded-lg bg-red-500 p-2 sm:max-w-sm md:max-w-md ${isShowing ? "animate-fade-up" : "animate-fade animate-reverse"}`}
    >
      <ExclamationTriangleIcon className="size-8" />
      <span className="line-clamp-1 text-pretty text-sm font-semibold">
        {message}
      </span>
    </div>
  );
}
