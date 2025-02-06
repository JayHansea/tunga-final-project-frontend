"use client";

import React from "react";
import { Navbar } from "~/components/Navbar";
import { formatDate } from "~/utils/helper";
import { useBlogPost } from "~/hooks/BlogPost/useBlogPost";
import { FaSpinner } from "react-icons/fa6";
import ReadOnlyContent from "~/components/ReadOnlyContent/readOnlyContent";

const Blogpost = () => {
  const {
    post,
    comments,
    loading,
    pageLoading,
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
    handleDeleteComment,
  } = useBlogPost();

  if (pageLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div
          className="animate-spin inline-block w-8 h-8 border-4 border-l-blue-300 rounded-full"
          role="status"
        >
          <span className="visually"></span>
        </div>
      </div>
    );
  }

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

  return (
    <>
      <Navbar />
      <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
        <div className="flex items-center justify-between text-sm mb-8 relative">
          <time dateTime={post.createdAt} className="text-gray-500">
            {formatDate(post.updatedAt)}
          </time>
          {isPostAuthor && (
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
                        onClick={() => {
                          handleEditPost();
                          togglePostDropdown();
                        }}
                      >
                        Edit Post
                      </button>
                    </li>
                    <li>
                      <button
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                        onClick={() => {
                          openModal();
                          togglePostDropdown();
                        }}
                      >
                        Delete Post
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}
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
          <ReadOnlyContent rawContent={post.content} />
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

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 transition-discrete delay-700 duration-300 ease-in-out">
            <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
            <p>
              Are you sure you want to delete this post? This action cannot be
              undone.
            </p>
            <div className="flex justify-end mt-4">
              <button
                className="mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                onClick={() => {
                  handleDeletePost();
                }}
              >
                {loading ? (
                  <>
                    <span>Deleting...</span>
                    <FaSpinner className="animate-spin ml-2" />
                  </>
                ) : (
                  <span>Delete</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-3xl mx-auto mt-12 mb-14 p-6 bg-gray-50 shadow-md rounded-lg">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Comments</h3>
        <div className="space-y-4">
          {comments?.map((comment) => (
            <div
              key={comment._id}
              className="p-4 border rounded-md bg-white shadow-sm"
            >
              <div className="flex justify-between items-center">
                {editingCommentId === comment._id ? (
                  <div className="flex w-full">
                    <div className="flex-1">
                      <textarea
                        className="w-full p-2 border border-gray-300 rounded-md"
                        value={editedComment}
                        onChange={(e) => setEditedComment(e.target.value)}
                      />
                    </div>
                    <div className="">
                      <button
                        className="bg-blue-500 text-white px-3 py-1 ml-3 mr-1 rounded-md hover:bg-blue-600"
                        onClick={() => handleEditComment(comment._id)}
                      >
                        {posting ? "Saving..." : "Save"}
                      </button>
                      <button
                        className="bg-gray-300 text-gray-700 px-3 py-1 ml-1 mr-3 rounded-md hover:bg-gray-400"
                        onClick={() => {
                          setEditingCommentId("");
                          setDropDownMode(false);
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-gray-700">{comment.content}</p>
                )}

                <div className="relative">
                  <button
                    className="text-gray-500 hover:text-gray-700 focus:outline-none"
                    onClick={() => {
                      setCommentDropdownOpen((prev) =>
                        prev === comment._id ? null : comment._id
                      );
                      setDropDownMode(true);
                    }}
                  >
                    •••
                  </button>
                  {dropDownMode === true &&
                    commentDropdownOpen === comment._id && (
                      <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg z-10">
                        <ul className="py-1">
                          <li>
                            <button
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              onClick={() => {
                                handleEditClick(comment._id, comment.content);
                                setDropDownMode(false);
                              }}
                            >
                              Edit Comment
                            </button>
                          </li>
                          <li>
                            <button
                              className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                              onClick={() => {
                                handleDeleteComment(comment._id);
                                setDropDownMode(false);
                              }}
                            >
                              Delete Comment
                            </button>
                          </li>
                        </ul>
                      </div>
                    )}
                </div>
              </div>
              <time className="block text-xs text-gray-500 mt-2">
                Posted on {formatDate(comment.updatedAt)}
              </time>
            </div>
          ))}
        </div>

        <form className="mt-4">
          <textarea
            className="w-full p-3 border border-gray-300 rounded-md resize-none"
            rows={4}
            placeholder="Write your comment here..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          ></textarea>
          <button
            type="submit"
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            onClick={(e) => {
              e.preventDefault();
              handlePostComment();
            }}
          >
            {posting ? "Posting Comment..." : "Post Comment"}
          </button>
        </form>
      </div>
    </>
  );
};

export default Blogpost;
