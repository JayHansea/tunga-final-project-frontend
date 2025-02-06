import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import postService from "~/services/post.services";
import { Post } from "~/types/post";
import { getUserDataFromLocalStorage } from "~/utils/helper";

export const useWriteBlog = () => {
  const params = useParams();
  const router = useRouter();
  const postId = params?.id as string;
  const userData = getUserDataFromLocalStorage();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isEditMode, setIsEditMode] = useState<boolean>(!!postId);

  useEffect(() => {
    if (!postId) return;

    const fetchPost = async () => {
      try {
        setLoading(true);
        const postRes = await postService.getPostById(
          postId,
          userData?.token ?? ""
        );

        setTitle(postRes.title);
        setContent(postRes.content);
        setTags(postRes.tags);
        setCategories(postRes.categories);
        setIsEditMode(true);
      } catch (err) {
        setError((err as Error).message || "Error fetching post.");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId, userData?.token]);

  const addTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag("");
    }
  };

  const addCategory = () => {
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      setNewCategory("");
    }
  };

  const handleRemoveTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleRemoveCategory = (index: number) => {
    setCategories(categories.filter((_, i) => i !== index));
  };

  const handlePublish = async () => {
    const blogData: Partial<Post> = {
      title,
      content,
      tags,
      categories,
    };

    setLoading(true);
    setError(null);

    try {
      const token = userData?.token ?? null;
      let newPost;

      if (isEditMode && postId) {
        newPost = await postService.editPost(postId, blogData, token);
        toast.success("Post edited successfully", {
          style: {
            backgroundColor: "#cef7ea",
            color: "#306844",
          },
          duration: 3000,
        });
      } else {
        newPost = await postService.createPost(blogData, token);
        toast.success("Post created successfully", {
          style: {
            backgroundColor: "#cef7ea",
            color: "#306844",
          },
          duration: 3000,
        });
      }

      setTitle("");
      setContent("");
      setTags([]);
      setCategories([]);

      setTimeout(() => {
        setLoading(false);
        router.push(`/blog-post/${newPost.post._id}`);
      }, 3000);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
        toast.error(err.message, {
          style: {
            backgroundColor: "#FFCBDD",
            color: "#f00",
          },
          duration: 3000,
        });
      } else {
        setError("An unexpected error occurred.");
        toast.error("An unexpected error occurred", {
          style: {
            backgroundColor: "#FFCBDD",
            color: "#f00",
          },
          duration: 3000,
        });
      }
      console.error("Error publishing blog:", err);
    } finally {
      setLoading(false);
    }
  };

  return {
    error,
    title,
    setTitle,
    setContent,
    newTag,
    setNewTag,
    addTag,
    tags,
    handleRemoveTag,
    newCategory,
    setNewCategory,
    addCategory,
    categories,
    handleRemoveCategory,
    handlePublish,
    loading,
    content,
  };
};
