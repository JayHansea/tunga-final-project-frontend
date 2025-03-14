"use client";
import React from "react";
import Link from "next/link";
import { useVerifyEmail } from "~/hooks/VerifyEmail/useVerifyEmail";

const VerifyEmail = () => {
  const { token, verified, error } = useVerifyEmail();

  return (
    <div className="flex md:h-full sm:h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 place-content-center">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className="text-3xl text-center font-bold ">
          <Link
            href="/"
            className="bg-blue-400 text-white px-6 py-2 rounded-md"
          >
            Fleek
          </Link>
        </h1>
      </div>
      <div className="my-16 text-center font-semibold text-sm text-gray-500">
        {token ? (
          <div className="break-words overflow-x-auto p-2 border border-gray-300 rounded-md text-gray-800 bg-gray-100 max-w-full">
            {token}
          </div>
        ) : (
          <span>
            Error... Token missing <span className="text-2xl">😢</span>
          </span>
        )}
      </div>
      {verified && (
        <div className="text-center">
          <h2 className="text-xl text-green-600">Email Verified</h2>
          <p className="mt-2 text-sm text-gray-600">
            You can now{" "}
            <Link
              className="font-semibold leading-6 text-indigo-600 hover:underline"
              href="/login"
            >
              Login
            </Link>
          </p>
        </div>
      )}
      {error && (
        <div className="text-center mt-4">
          <h2 className="text-xl text-red-600">Email Verification Error</h2>
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;
