import { useRouter, usePathname } from "next/navigation";

export const useLogout = () => {
  const router = useRouter();
  const pathname = usePathname();

  const logout = () => {
    localStorage.removeItem("authToken");
    router.push("/");

    if (pathname === "/") {
      window.location.reload();
    }
  };

  // const autoLogout = () => {
  //   const storedAuth = localStorage.getItem("authToken");

  //   if (storedAuth) {
  //     const { token, expiry } = JSON.parse(storedAuth);

  //     if (new Date().getTime() > expiry) {
  //       localStorage.removeItem("authToken");
  //       return null;
  //     }

  //     return token;
  //   }

  //   return null;
  // };

  return { logout };
};
