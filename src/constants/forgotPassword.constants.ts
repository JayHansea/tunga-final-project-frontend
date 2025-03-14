import * as Yup from "yup";

export interface ForgotPasswordFormValuesProps {
  email: string;
}

export const initialValue: ForgotPasswordFormValuesProps = {
  email: "",
};

export const forgotPasswordValidationSchema = Yup.object({
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Input a valid email address"
    )
    .required("Email is required"),
});
