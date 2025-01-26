import { useEffect, useState } from "react";
import { postService } from "~/services/post.services";
import { Post } from "~/types/post";

type UseCardResult = {
  posts: Post[];
  loading: boolean;
  error: string | null;
};

export const useCard = (): UseCardResult => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await postService.getAllPosts();
        setPosts(response);
      } catch (err) {
        setError((err as Error).message || "Failed to fetch posts.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return { posts, loading, error };
};
