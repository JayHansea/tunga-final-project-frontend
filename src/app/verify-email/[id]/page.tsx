"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import VerifyEmail from "~/pages/VerifyEmail/verifyEmail";
import { useIsLoggedIn } from "~/shared/hooks/useIsLoggedIn";

export default function VerifyEmailPage() {
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

  return <VerifyEmail />;
}
