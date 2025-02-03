import { LoginResponse } from "~/types/auth";

export const formatDate = (isoDateString: string) => {
  const date = new Date(isoDateString);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
};

export const getUserDataFromLocalStorage = (): LoginResponse | null => {
  if (typeof window === "undefined") {
    return null;
  }

  const authToken = localStorage.getItem("authToken");

  if (!authToken) {
    return null;
  }

  try {
    return JSON.parse(authToken) as LoginResponse;
  } catch (error) {
    console.error("Error parsing auth token from localStorage", error);
    return null;
  }
};
