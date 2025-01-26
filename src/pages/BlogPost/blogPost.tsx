"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { posts, comments, users } from "~/constants/data";
import { Navbar } from "~/components/Navbar";
import { formatDate } from "~/utils/helper";

const Blogpost = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false); // Track post dropdown state
  const [commentDropdown, setCommentDropdown] = useState<string | null>(null); // Track comment dropdown state
  const [allComments, setAllComments] = useState(
    comments.map((comment) => ({ ...comment, editMode: false }))
  ); // State for comments with editMode flag

  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const post = posts.find((p) => p.id === id);

  if (!post) {
    return (
      <div>
        <Navbar />
        <h3 className="text-center text-2xl font-semibold mt-10">
          Blog post not found!
        </h3>
      </div>
    );
  }

  const postComments = allComments.filter(
    (comment) => comment.postId.id === id
  );

  const togglePostDropdown = () => setDropdownOpen((prev) => !prev);

  const toggleCommentDropdown = (commentId: string) => {
    setCommentDropdown((prev) => (prev === commentId ? null : commentId));
  };

  const handleEditPost = () => {
    router.push("/write");
    setDropdownOpen(false);
  };

  const handleDeletePost = () => {
    if (confirm("Are you sure you want to delete this post?")) {
      alert(`Deleted post: ${post.title}`);
    }
    setDropdownOpen(false);
  };

  const handleEditComment = (commentId: string) => {
    setAllComments((prev) =>
      prev.map((comment) =>
        comment.id === commentId ? { ...comment, editMode: true } : comment
      )
    );
    setCommentDropdown(null);
  };

  const handleSaveComment = (commentId: string, updatedContent: string) => {
    setAllComments((prev) =>
      prev.map((comment) =>
        comment.id === commentId
          ? {
              ...comment,
              content: updatedContent,
              editMode: false,
              updatedAt: { date: new Date().toISOString() },
            }
          : comment
      )
    );
  };

  const handleCancelEdit = (commentId: string) => {
    setAllComments((prev) =>
      prev.map((comment) =>
        comment.id === commentId ? { ...comment, editMode: false } : comment
      )
    );
  };

  const handleDeleteComment = (commentId: string) => {
    if (confirm("Are you sure you want to delete this comment?")) {
      setAllComments((prev) =>
        prev.filter((comment) => comment.id !== commentId)
      );
    }
    setCommentDropdown(null);
  };

  const findUserName = (userId: string) => {
    const user = users.find((user) => user.id === userId);
    return user ? user.name : "Unknown User";
  };

  return (
    <>
      <Navbar />
      <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
        <div className="flex items-center justify-between text-sm mb-8 relative">
          <time dateTime={post.createdAt.date} className="text-gray-500">
            {formatDate(post.updatedAt.date)}
          </time>
          <div className="relative">
            <button
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
              onClick={togglePostDropdown}
            >
              •••
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg z-10">
                <ul className="py-1">
                  <li>
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={handleEditPost}
                    >
                      Edit Post
                    </button>
                  </li>
                  <li>
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      onClick={handleDeletePost}
                    >
                      Delete Post
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col items-center justify-start text-sm mb-8">
          <h3 className="text-3xl mb-4 font-semibold text-gray-900 text-center">
            {post.title}
          </h3>
          <div className="flex gap-2">
            {post.categories.map((category, index) => (
              <a
                key={index}
                href="#"
                className="rounded-full bg-gray-100 px-3 py-1.5 text-gray-600 font-medium hover:bg-gray-200"
              >
                {category}
              </a>
            ))}
          </div>
        </div>
        <p className="mt-6 text-lg text-gray-700 leading-relaxed">
          {post.content}
        </p>
        <div className="flex flex-wrap gap-2 mt-5">
          {post.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-600 text-sm px-3 py-1 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-3xl mx-auto mt-12 p-6 bg-gray-50 shadow-md rounded-lg">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Comments</h3>
        <div className="space-y-4">
          {postComments.map((comment) => (
            <div
              key={comment.id}
              className="p-4 border rounded-md bg-white shadow-sm"
            >
              <div className="flex justify-between items-center">
                {comment.editMode ? (
                  <div className="flex w-full gap-2">
                    <div className="flex-1">
                      <textarea
                        className="flex-grow w-full p-2 border border-gray-300 rounded-md resize-none"
                        defaultValue={comment.content}
                        onChange={(e) =>
                          setAllComments((prev) =>
                            prev.map((c) =>
                              c.id === comment.id
                                ? { ...c, content: e.target.value }
                                : c
                            )
                          )
                        }
                      />
                    </div>
                    <div>
                      <button
                        className="bg-blue-500 text-white px-3 py-1 mr-2 rounded-md hover:bg-blue-600"
                        onClick={() =>
                          handleSaveComment(comment.id, comment.content)
                        }
                      >
                        Save
                      </button>
                      <button
                        className="bg-gray-300 text-gray-700 px-3 py-1 rounded-md hover:bg-gray-400"
                        onClick={() => handleCancelEdit(comment.id)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="text-sm text-gray-700">
                      <span className="font-bold">
                        {findUserName(comment.userId.id)}:
                      </span>{" "}
                      {comment.content}
                    </p>
                    <div className="relative">
                      <button
                        className="text-gray-500 hover:text-gray-700 focus:outline-none"
                        onClick={() => toggleCommentDropdown(comment.id)}
                      >
                        •••
                      </button>
                      {commentDropdown === comment.id && (
                        <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg z-10">
                          <ul className="py-1">
                            <li>
                              <button
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                onClick={() => handleEditComment(comment.id)}
                              >
                                Edit Comment
                              </button>
                            </li>
                            <li>
                              <button
                                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                onClick={() => handleDeleteComment(comment.id)}
                              >
                                Delete Comment
                              </button>
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
              <time
                className="block text-xs text-gray-500 mt-2"
                dateTime={comment.updatedAt.date}
              >
                Posted on {formatDate(comment.updatedAt.date)}
              </time>
            </div>
          ))}
          <form className="mt-4">
            <textarea
              className="w-full p-3 border border-gray-300 rounded-md resize-none"
              rows={4}
              placeholder="Write your comment here..."
            ></textarea>
            <button
              type="submit"
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Post Comment
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Blogpost;
