import * as Yup from "yup";

export interface RegisterFormValuesProps {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: "Reader" | "Author";
}

export const initialValue: RegisterFormValuesProps = {
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  confirmPassword: "",
  role: "Reader",
};

export const registerValidationSchema = Yup.object({
  firstname: Yup.string()
    .max(50, "First name must be at most 50 characters")
    .required("First name is required"),

  lastname: Yup.string()
    .max(50, "Last name must be at most 50 characters")
    .required("Last name is required"),

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

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),

  role: Yup.string().oneOf(["Reader", "Author"]).required("Role is required"),
});
