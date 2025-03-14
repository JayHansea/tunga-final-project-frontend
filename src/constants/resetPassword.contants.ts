import * as Yup from "yup";

export interface ResetPasswordFormValuesProps {
  password: string;
  confirmPassword: string;
}

export const initialValue: ResetPasswordFormValuesProps = {
  password: "",
  confirmPassword: "",
};

export const resetPasswordValidationSchema = Yup.object({
  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_:+])[A-Za-z\d!@#$%^&*()_:+]{8,}$/,
      "Password must contain at least one lowercase, one uppercase, one number, one special character, and be at least 8 characters long"
    )
    .required("Password is required"),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});
