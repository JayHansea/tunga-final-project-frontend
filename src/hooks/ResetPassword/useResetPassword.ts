import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import authServices from "~/services/auth.services";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import {
  initialValue,
  ResetPasswordFormValuesProps,
  resetPasswordValidationSchema,
} from "~/constants/resetPassword.contants";

export const useResetPassword = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [token, setToken] = useState("");
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ResetPasswordFormValuesProps>({
    resolver: yupResolver(resetPasswordValidationSchema),
    defaultValues: initialValue,
  });

  const formValues = watch();

  useEffect(() => {
    const { password, confirmPassword } = formValues;
    if (!password || !confirmPassword) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  }, [formValues]);

  useEffect(() => {
    const url = new URL(window.location.href);
    const token = url.pathname.split("/").pop();
    if (token) {
      setToken(token);
    }
  }, []);

  const onSubmit: SubmitHandler<ResetPasswordFormValuesProps> = async (
    data
  ) => {
    try {
      setLoading(true);
      const userPassword = {
        token,
        newPassword: data.password,
      };
      await authServices.resetPassword(userPassword);

      toast.success("Password reset successful", {
        style: {
          backgroundColor: "#cef7ea",
          color: "#306844",
        },
        duration: 3000,
      });
      setTimeout(() => {
        setLoading(false);
        router.push("/login");
      }, 3000);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message, {
          style: {
            backgroundColor: "#FFCBDD",
            color: "#f00",
          },
          duration: 3000,
        });
      } else {
        toast.error("An unknown error occurred", {
          style: {
            backgroundColor: "#FFCBDD",
            color: "#f00",
          },
          duration: 3000,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    buttonDisabled,
    control,
    handleSubmit,
    errors,
    onSubmit,
  };
};
