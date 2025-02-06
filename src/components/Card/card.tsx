"use client";
import React from "react";
import { formatDate } from "~/utils/helper";
import { useCard } from "./hooks/useCard";
import { Toaster } from "react-hot-toast";
import ReadOnlyContent from "../ReadOnlyContent/readOnlyContent";

export const Card = () => {
  const { posts, loading, error, handlePostClick } = useCard();

  if (loading) {
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

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        <p>An error occurred: {error}</p>
      </div>
    );
  }

  return (
    <>
      <h2 className="mt-5 text-center text-base leading-9 tracking-tight text-white">
        <Toaster />
      </h2>
      <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-y-8 gap-x-4 lg:pt-0 lg:mt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
        {posts.map((post) => (
          <article
            key={post._id}
            className="flex max-w-xl flex-col items-start justify-between border rounded-md p-4"
          >
            <div className="flex items-center gap-x-4 text-xs">
              <time dateTime={post.updatedAt} className="text-gray-500">
                {formatDate(post.updatedAt)}
              </time>
              <div>
                {post.categories.map((category, index) => (
                  <a
                    key={index}
                    href="#"
                    className="relative z-10 mr-2 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                  >
                    {category}
                  </a>
                ))}
              </div>
            </div>
            <div className="group relative">
              <h3 className="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
                <button
                  onClick={() => handlePostClick(post._id)}
                  className="text-left"
                >
                  <span className="absolute inset-0" />
                  {post.title}
                </button>
              </h3>
              <p className="mt-5 line-clamp-3 text-sm/6 text-gray-600">
                <ReadOnlyContent rawContent={post.content} />
              </p>
            </div>
            {/* <div className="relative mt-8 flex items-center gap-x-4">
            <img
              alt=""
              src={post.author.imageUrl}
              className="size-10 rounded-full bg-gray-50"
            />
            <div className="text-sm/6">
              <p className="font-semibold text-gray-900">
                <a href={post.author.href}>
                  <span className="absolute inset-0" />
                  {post.author.name}
                </a>
              </p>
              <p className="text-gray-600">{post.author.role}</p>
            </div>
          </div> */}
          </article>
        ))}
      </div>
    </>
  );
};
