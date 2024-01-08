import * as Yup from "yup";

export const loginSchema = Yup.object({
  email: Yup.string().email().required("Please enter your email"),
  password: Yup.string().min(8).required("Please enter your password"),
});
export const updateMeSchema = Yup.object({
  name: Yup.string().min(3).required("Please enter your name"),
});

export const updatePasswordSchema = Yup.object({
  currentPassword: Yup.string()
    .min(8)
    .required("Please enter your current password"),
  newPassword: Yup.string().min(8).required("Please enter your new password"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("newPassword"), null],
    "Passwords must match",
  ),
});
