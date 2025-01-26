"use client";
import React, { useState } from "react";
import { Navbar } from "~/components/Navbar";
import RichEditor from "~/components/RichEditor/richEditor";

const WriteBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState(""); // This will hold the editor's content
  const [tags, setTags] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [newCategory, setNewCategory] = useState("");

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

  const handlePublish = () => {
    const blogData = {
      title,
      content, // The content will now include the editor's data
      tags,
      categories,
    };
    console.log("Publishing blog:", blogData);
    // TODO: Add logic to send `blogData` to the server
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-8">Write a New Blog</h1>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="title">
            Title
          </label>
          <input
            id="title"
            type="text"
            className="w-full border border-gray-300 rounded-md p-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter blog title"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="content">
            Content
          </label>
          <RichEditor setContent={setContent} />
        </div>

        {/* Tags Section */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="tags">
            Tags
          </label>
          <div className="flex items-center gap-2 p-1 border border-gray-300 rounded-md">
            <input
              id="tags"
              type="text"
              className="flex-1 rounded-md p-2 focus:outline-none"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              placeholder="Add a tag"
            />
            <button
              type="button"
              className="bg-blue-400 text-white px-4 py-2 rounded-md"
              onClick={addTag}
            >
              Add
            </button>
          </div>
          <div className="mt-2 flex gap-2 flex-wrap">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="bg-gray-200 text-sm px-2 py-1 rounded-full"
              >
                {tag}{" "}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(index)}
                  className="remove-btn ml-2"
                >
                  x
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Categories Section */}
        <div className="mb-4">
          <label
            className="block text-sm font-medium mb-2"
            htmlFor="categories"
          >
            Categories
          </label>
          <div className="flex items-center gap-2 p-1 border border-gray-300 rounded-md">
            <input
              id="categories"
              type="text"
              className="flex-1 rounded-md p-2 focus:outline-none"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Add a category"
            />
            <button
              type="button"
              className="bg-blue-400 text-white px-4 py-2 rounded-md"
              onClick={addCategory}
            >
              Add
            </button>
          </div>
          <div className="mt-2 flex gap-2 flex-wrap">
            {categories.map((category, index) => (
              <span
                key={index}
                className="bg-gray-200 text-sm px-2 py-1 rounded-full"
              >
                {category}{" "}
                <button
                  type="button"
                  onClick={() => handleRemoveCategory(index)}
                  className="remove-btn ml-2"
                >
                  x
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Publish Button */}
        <button
          type="button"
          className="bg-green-500 text-white px-6 py-2 rounded-md"
          onClick={handlePublish}
        >
          Publish
        </button>
      </div>
    </>
  );
};

export default WriteBlog;
