"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import ResetPassword from "~/pages/ResetPassword/resetPassword";
import { useIsLoggedIn } from "~/shared/hooks/useIsLoggedIn";

export default function ResetPasswordPage() {
  const { isLoggedIn } = useIsLoggedIn();
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      router.replace("/");
    }
  }, [isLoggedIn, router]);

  if (isLoggedIn === undefined) {
    return null;
  }

  return <ResetPassword />;
}
