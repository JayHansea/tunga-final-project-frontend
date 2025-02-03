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

  return logout;
};
