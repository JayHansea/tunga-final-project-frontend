"use client";
import Link from "next/link";
import React from "react";

const Verification = () => {
  return (
    <div
      className={`flex md:h-full sm:h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 place-content-center `}
    >
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className="text-3xl text-center font-bold ">
          <Link
            href={"/"}
            className="bg-blue-400 text-white px-6 py-2 rounded-md"
          >
            Fleek
          </Link>
        </h1>
        <h2 className="mt-8 text-center text-xl tracking-tight text-gray-500">
          Check your email for verification link
        </h2>
      </div>
    </div>
  );
};

export default Verification;
