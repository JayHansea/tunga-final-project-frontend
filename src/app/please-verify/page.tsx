"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Verification from "~/pages/VerificationPage/verificationPage";
import { useIsLoggedIn } from "~/shared/hooks/useIsLoggedIn";

export default function PleaseVerifyPage() {
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

  return <Verification />;
}
