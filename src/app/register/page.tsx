"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Register from "~/pages/Register/register";
import { useIsLoggedIn } from "~/shared/hooks/useIsLoggedIn";

export default function RegisterPage() {
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

  return <Register />;
}
