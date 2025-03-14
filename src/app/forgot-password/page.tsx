"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import ForgotPassword from "~/pages/ForgotPassword/forgotPassword";
import { useIsLoggedIn } from "~/shared/hooks/useIsLoggedIn";

export default function ForgotPasswordPage() {
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

  return <ForgotPassword />;
}
