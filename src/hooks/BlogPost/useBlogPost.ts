import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import commentService from "~/services/comment.services";
import postService from "~/services/post.services";
import { Comment, Comments } from "~/types/comment";
import { Post } from "~/types/post";
import { getUserDataFromLocalStorage } from "~/utils/helper";

export const useBlogPost = () => {
  const params = useParams();
  const router = useRouter();
  const userData = getUserDataFromLocalStorage();
  const [post, setPost] = useState<Post>();
  const [comments, setComments] = useState<Comments>();
  const [loading, setLoading] = useState<boolean>(false);
  const [pageLoading, setPageLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPostAuthor, setIsPostAuthor] = useState<boolean>(false);
  const [editingCommentId, setEditingCommentId] = useState("");
  const [editedComment, setEditedComment] = useState("");
  const [commentDropdownOpen, setCommentDropdownOpen] = useState<string | null>(
    null
  );
  const [dropDownMode, setDropDownMode] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [posting, setPosting] = useState<boolean>(false);
  const [editing, setEditing] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<boolean>(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  console.log(post);

  const handleEditClick = (commentId: string, text: string) => {
    setEditingCommentId(commentId);
    setEditedComment(text);
  };

  const handleEditComment = async (commentId: string) => {
    if (editing) return;
    try {
      setEditing(true);
      const postId = params?.id as string;
      const comment = { content: editedComment };

      await commentService.editComment(
        commentId,
        comment,
        userData?.token ?? ""
      );

      toast.success("Comment edited successfully", {
        style: {
          backgroundColor: "#cef7ea",
          color: "#306844",
        },
      });

      setTimeout(() => {
        setPosting(false);
        router.push(`/blog-post/${postId}`);
      }, 500);
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message, {
          style: {
            backgroundColor: "#FFCBDD",
            color: "#f00",
          },
          duration: 3000,
        });
      } else {
        toast.error("An unexpected error occurred", {
          style: {
            backgroundColor: "#FFCBDD",
            color: "#f00",
          },
          duration: 3000,
        });
      }
    } finally {
      setEditingCommentId("");
      setDropDownMode(false);
      setEditing(false);
    }
  };

  const handlePostComment = async () => {
    if (posting) return;
    try {
      setPosting(true);
      console.log("triggered");
      const postId = params?.id as string;
      const comment = { content: newComment };

      console.log(comment);
      await commentService.createComment(
        postId,
        comment,
        userData?.token ?? ""
      );

      toast.success("Comment created successfully", {
        style: {
          backgroundColor: "#cef7ea",
          color: "#306844",
        },
        duration: 3000,
      });

      setNewComment("");

      setTimeout(() => {
        setPosting(false);
        router.push(`/blog-post/${postId}`);
      }, 3000);
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message, {
          style: {
            backgroundColor: "#FFCBDD",
            color: "#f00",
          },
          duration: 3000,
        });
      } else {
        toast.error("An unexpected error occurred", {
          style: {
            backgroundColor: "#FFCBDD",
            color: "#f00",
          },
          duration: 3000,
        });
      }
    } finally {
      setPosting(false);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (deleting) return;
    try {
      setDeleting(true);
      const postId = params?.id as string;

      await commentService.deleteComment(commentId, userData?.token ?? "");

      toast.success("Comment edited successfully", {
        style: {
          backgroundColor: "#cef7ea",
          color: "#306844",
        },
      });

      setTimeout(() => {
        setPosting(false);
        router.push(`/blog-post/${postId}`);
      }, 500);
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message, {
          style: {
            backgroundColor: "#FFCBDD",
            color: "#f00",
          },
          duration: 3000,
        });
      } else {
        toast.error("An unexpected error occurred", {
          style: {
            backgroundColor: "#FFCBDD",
            color: "#f00",
          },
          duration: 3000,
        });
      }
    } finally {
      setDeleting(false);
    }
  };

  useEffect(() => {
    const fetchPostNComments = async () => {
      try {
        setPageLoading(true);
        const postId = params?.id as string;

        if (!postId) {
          throw new Error("Post ID is missing");
        }

        const postRes = await postService.getPostById(
          postId,
          userData?.token ?? ""
        );
        const commentsRes = await commentService.getAllComments(
          postId,
          userData?.token ?? ""
        );
        setPost(postRes);

        const filteredComments = commentsRes.filter(
          (comment: Comment) => comment.postId === postRes._id
        );

        console.log({ filteredComments });
        setComments(filteredComments);
      } catch (err) {
        setError((err as Error).message || "Error fetching post or comments.");
      } finally {
        setPageLoading(false);
      }
    };

    fetchPostNComments();
  }, [params, userData?.token]);

  useEffect(() => {
    if (post && userData?.user.id === post.authorId._id) {
      setIsPostAuthor(true);
    } else {
      setIsPostAuthor(false);
    }
  }, [post, userData]);

  const togglePostDropdown = () => setDropdownOpen((prev) => !prev);

  const handleEditPost = () => {
    const postId = params?.id as string;

    router.push(`/write/${postId}`);
    setDropdownOpen(false);
  };

  const handleDeletePost = async () => {
    try {
      setLoading(true);
      const token = userData?.token ?? null;
      const postId = params?.id as string;

      await postService.deletePost(postId, token ?? "");

      toast.success("Post deleted successfully", {
        style: {
          backgroundColor: "#cef7ea",
          color: "#306844",
        },
        duration: 3000,
      });

      closeModal();

      setTimeout(() => {
        setLoading(false);
        router.push("/");
      }, 3000);
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message, {
          style: {
            backgroundColor: "#FFCBDD",
            color: "#f00",
          },
          duration: 3000,
        });
      } else {
        toast.error("An unexpected error occurred", {
          style: {
            backgroundColor: "#FFCBDD",
            color: "#f00",
          },
          duration: 3000,
        });
      }
    } finally {
      setLoading(false);
    }
    setDropdownOpen(false);
  };

  return {
    post,
    comments,
    loading,
    pageLoading,
    error,
    dropdownOpen,
    togglePostDropdown,
    handleEditPost,
    handleDeletePost,
    isModalOpen,
    closeModal,
    openModal,
    isPostAuthor,
    editingCommentId,
    editedComment,
    commentDropdownOpen,
    setCommentDropdownOpen,
    handleEditClick,
    handleEditComment,
    setEditedComment,
    setEditingCommentId,
    setDropDownMode,
    dropDownMode,
    setNewComment,
    newComment,
    handlePostComment,
    posting,
    editing,
    handleDeleteComment,
  };
};
