import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import authServices from "~/services/auth.services";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import {
  initialValue,
  ForgotPasswordFormValuesProps,
  forgotPasswordValidationSchema,
} from "~/constants/forgotPassword.constants";

export const useForgotPassword = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ForgotPasswordFormValuesProps>({
    resolver: yupResolver(forgotPasswordValidationSchema),
    defaultValues: initialValue,
  });

  const formValues = watch();

  useEffect(() => {
    const { email } = formValues;
    if (!email) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  }, [formValues]);

  const onSubmit: SubmitHandler<ForgotPasswordFormValuesProps> = async (
    data
  ) => {
    try {
      setLoading(true);
      const userData = {
        email: data.email,
      };

      await authServices.forgotPassword(userData);

      toast.success("Reset link sent to email", {
        style: {
          backgroundColor: "#cef7ea",
          color: "#306844",
        },
        duration: 3000,
      });
      setTimeout(() => {
        setLoading(false);
        router.push("/");
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
