import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { postService } from "~/services/post.services";
import { useIsLoggedIn } from "~/shared/hooks/useIsLoggedIn";
import { Post } from "~/types/post";

type UseCardResult = {
  posts: Post[];
  loading: boolean;
  error: string | null;
  handlePostClick: (arg0: string) => void;
};

export const useCard = (): UseCardResult => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { isLoggedIn } = useIsLoggedIn();
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await postService.getAllPosts();

        const sortedPosts = response.sort(
          (a: Post, b: Post) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        setPosts(sortedPosts);
      } catch (err) {
        setError((err as Error).message || "Failed to fetch posts.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handlePostClick = (postId: string) => {
    if (isLoggedIn) {
      router.push(`/blog-post/${postId}`);
    } else {
      toast.error("You have to be logged in first", {
        style: {
          backgroundColor: "#FFCBDD",
          color: "#f00",
        },
        duration: 3000,
      });
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    }
  };

  return { posts, loading, error, handlePostClick };
};
