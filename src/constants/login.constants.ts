import * as Yup from "yup";

export interface LoginFormValuesProps {
  email: string;
  password: string;
}

export const initialValue: LoginFormValuesProps = {
  email: "",
  password: "",
};

export const loginValidationSchema = Yup.object({
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Input a valid email address"
    )
    .required("Email is required"),

  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_:+])[A-Za-z\d!@#$%^&*()_:+]{8,}$/,
      "Password must contain at least one lowercase, one uppercase, one number, one special character, and be at least 8 characters long"
    )
    .required("Password is required"),
});
