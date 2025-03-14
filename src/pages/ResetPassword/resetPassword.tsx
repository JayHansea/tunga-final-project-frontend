"use client";
import Link from "next/link";
import React, { useState } from "react";
import { FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa6";
import { Toaster } from "react-hot-toast";
import { useResetPassword } from "~/hooks/ResetPassword/useResetPassword";
import { Controller } from "react-hook-form";

const ResetPassword = () => {
  const { loading, buttonDisabled, control, handleSubmit, errors, onSubmit } =
    useResetPassword();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div
      className={`flex md:h-full sm:h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 place-content-center ${
        loading && "cursor-wait"
      } `}
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
          Reset Password
        </h2>
        <h2 className="mt-5 text-center text-base leading-9 tracking-tight text-white">
          <Toaster />
        </h2>
      </div>
      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-500"
              >
                Password
              </label>
              <div className="mt-2 relative">
                <Controller
                  control={control}
                  name="password"
                  render={({ field }) => (
                    <input
                      {...field}
                      type={showPassword ? "text" : "password"}
                      id="password"
                      autoComplete="current-password"
                      required
                      className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-300 sm:text-sm sm:leading-6"
                    />
                  )}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center px-3 cursor-pointer stroke-cyan-500 hover:stroke-cyan-700"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium leading-6 text-gray-500"
              >
                Retype Password
              </label>
              <div className="mt-2 relative">
                <Controller
                  control={control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <input
                      {...field}
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      autoComplete="current-password"
                      required
                      className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-300 sm:text-sm sm:leading-6"
                    />
                  )}
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm">
                    {errors.confirmPassword.message}
                  </p>
                )}
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center px-3 cursor-pointer stroke-cyan-500 hover:stroke-cyan-700"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={buttonDisabled}
              className={`flex w-full justify-center items-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm hover:bg-blue-600 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300 bg-blue-300 text-black ${
                buttonDisabled &&
                "bg-gray-400 text-gray-700 cursor-not-allowed hover:bg-gray-400"
              }  ${loading && "cursor-wait"}`}
            >
              {loading ? (
                <>
                  <span>Processing...</span>
                  <FaSpinner className="animate-spin ml-2" />
                </>
              ) : (
                <span>Submit</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
