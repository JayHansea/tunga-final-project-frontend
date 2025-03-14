"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Login from "~/pages/Login/login";
import { useIsLoggedIn } from "~/shared/hooks/useIsLoggedIn";

export default function LoginPage() {
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

  return <Login />;
}
