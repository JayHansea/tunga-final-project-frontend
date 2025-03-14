"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import WriteBlog from "~/pages/WriteBlog/writeBlog";
import { useIsLoggedIn } from "~/shared/hooks/useIsLoggedIn";

export default function Write() {
  const { isLoggedIn } = useIsLoggedIn();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace("/login");
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) {
    return null;
  }

  return <WriteBlog />;
}
