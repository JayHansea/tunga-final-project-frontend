import { useRouter } from "next/navigation";

export const useLogout = () => {
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("authToken");
    router.push("/");
  };

  return logout;
};
