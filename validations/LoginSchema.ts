import * as yup from "yup";

export type ILoginForm = yup.InferType<typeof LoginSchema>;
export type IForgotPassword = yup.InferType<typeof ForgotPasswordSchema>;
export type INewPassword = yup.InferType<typeof NewPasswordSchema>;
export type IChangePassword = yup.InferType<typeof ChangePasswordSchema>;

export const LoginSchema = yup.object({
  email: yup
    .string()
    .email("Insira um e-mail válido")
    .required("O e-mail é obrigatório"),
  password: yup.string().required("Senha é obrigatória"),
});

export const ForgotPasswordSchema = yup.object({
  email: yup
    .string()
    .email("Insira um e-mail válido")
    .required("E-mail é obrigatório"),
});

export const NewPasswordSchema = yup.object({
  password: yup
    .string()
    .required("Nova senha é obrigatória")
    .min(8, "A senha deve ter no mínimo 8 caracteres"),
  confirmPassword: yup
    .string()
    .required("Confirmação de senha é obrigatória")
    .oneOf([yup.ref("password")], "As senhas devem ser iguais"),
});

export const ChangePasswordSchema = yup.object({
  oldPassword: yup.string().required("Senha atual é obrigatória"),

  password: yup
    .string()
    .required("Nova senha é obrigatória")
    .min(8, "A senha deve ter no mínimo 8 caracteres")
    .matches(/[A-Z]/, "A senha deve conter ao menos uma letra maiúscula")
    .matches(/[a-z]/, "A senha deve conter ao menos uma letra minúscula")
    .matches(
      /[^A-Za-z0-9]/,
      "A senha deve conter ao menos um caractere especial",
    )
    .test(
      "password-different",
      "A nova senha deve ser diferente da senha atual",
      function (value) {
        const { oldPassword } = this.parent;
        if (!value || !oldPassword) return true; // evita erro quando ainda não preenchido
        return value !== oldPassword;
      },
    ),

  confirmPassword: yup
    .string()
    .required("Confirmação de senha é obrigatória")
    .oneOf([yup.ref("password")], "As senhas devem ser iguais"),
});
