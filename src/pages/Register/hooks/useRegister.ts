import { useRouter } from "next/navigation";
import {
  initialValue,
  RegisterFormValuesProps,
  registerValidationSchema,
} from "../register.constants";
import { SubmitHandler, useForm } from "react-hook-form";
import authServices from "~/services/auth.services";
import { yupResolver } from "@hookform/resolvers/yup";
import { UserData } from "~/types/auth";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

export const useRegister = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterFormValuesProps>({
    resolver: yupResolver(registerValidationSchema),
    defaultValues: initialValue,
  });

  const formValues = watch();

  useEffect(() => {
    const { firstname, lastname, email, password, confirmPassword } =
      formValues;
    if (!firstname || !lastname || !email || !password || !confirmPassword) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  }, [formValues]);

  const onSubmit: SubmitHandler<RegisterFormValuesProps> = async (data) => {
    try {
      setLoading(true);
      const userData: UserData = {
        name: `${data.firstname} ${data.lastname}`,
        email: data.email,
        password: data.password,
        role: data.role,
      };
      await authServices.createUser(userData);
      toast.success("SignUp successful", {
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
