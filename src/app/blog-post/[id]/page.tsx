"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Blogpost from "~/pages/BlogPost/blogPost";
import { useIsLoggedIn } from "~/shared/hooks/useIsLoggedIn";

export default function BlogPostPage() {
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

  return <Blogpost />;
}
