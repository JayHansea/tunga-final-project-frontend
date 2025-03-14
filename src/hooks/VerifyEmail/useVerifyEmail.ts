import { useEffect, useState } from "react";
import authServices from "~/services/auth.services";

export const useVerifyEmail = () => {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const url = new URL(window.location.href);
    const token = url.pathname.split("/").pop();
    if (token) {
      setToken(token);
    }
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      const verifyUserEmail = async () => {
        try {
          const tokenData = {
            token,
          };
          await authServices.verifyEmail(tokenData);
          setVerified(true);
        } catch (error: unknown) {
          setError(true);
          if (error instanceof Error) {
            console.error(error.message);
          } else {
            console.error("An unknown error occurred.");
          }
        }
      };

      verifyUserEmail();
    }
  }, [token]);

  return { verified, error, token };
};
