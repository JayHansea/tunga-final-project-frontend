"use client";
import Link from "next/link";
import { useState } from "react";
import { useIsLoggedIn } from "~/shared/hooks/useIsLoggedIn";
import { useLogout } from "~/shared/hooks/useLogout";

export const Navbar = () => {
  const { isLoggedIn } = useIsLoggedIn();
  const logout = useLogout();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-400 p-4 sticky top-0 z-50">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-white text-3xl font-bold">
          Fleek
        </Link>

        {/* Hamburger Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white lg:hidden focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            ></path>
          </svg>
        </button>

        <div
          className={`w-full ${isOpen ? "block" : "hidden"} lg:flex lg:w-auto`}
        >
          <div>
            <ul className="flex flex-col lg:flex-row items-center lg:space-x-2 mt-4 lg:mt-0">
              {isLoggedIn === undefined ? null : isLoggedIn ? (
                <>
                  {/* Make a Post Button */}
                  <li>
                    <Link
                      href="/write"
                      className="mb-4 bg-blue-800 text-white hover:bg-blue-700 rounded-md block lg:inline py-3 px-6"
                    >
                      Make a Post
                    </Link>
                  </li>

                  {/* Logout Button */}
                  <li>
                    <button
                      onClick={logout}
                      className="bg-red-600 text-white hover:bg-red-500 rounded-md block lg:inline py-2 px-6"
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  {/* Sign In Link */}
                  <li>
                    <Link
                      href="/login"
                      className="text-white hover:text-blue-700 p-2 rounded block lg:inline"
                    >
                      Sign In
                    </Link>
                  </li>

                  {/* Sign Up Link */}
                  <li>
                    <Link
                      href="/register"
                      className="bg-blue-800 text-white hover:bg-blue-700 rounded-md block lg:inline py-3 px-6"
                    >
                      Sign Up
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};
