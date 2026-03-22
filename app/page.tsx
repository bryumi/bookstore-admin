"use client";
import { useAuth } from "@/hooks/useAuth";
import { useSnackbar } from "@/hooks/useSnackbar";
import api from "@/services/api/api";
import { localStorageKeys } from "@/utils/localStorageKeys";
import { ILoginForm, LoginSchema } from "@/validations/LoginSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function Home() {
  const [viewPassword, setViewPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setUser } = useAuth();
  const { showSnackbar } = useSnackbar();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>({
    resolver: yupResolver(LoginSchema),
  });
  const router = useRouter();
  const onSubmit = async (form: ILoginForm) => {
    try {
      setIsSubmitting(true);
      const { data } = await api.post("/login", {
        email: form.email,
        password: form.password,
      });
      setUser(data.user);
      localStorage.setItem(localStorageKeys.accessToken, data.token);
      localStorage.setItem(localStorageKeys.user, JSON.stringify(data.user));
      router.push("/profile");
    } catch (error) {
      showSnackbar((error as any).response.data.error as string, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="pt-20 p-8 grid-bg min-h-screen">
      <h1 className="text-4xl font-bold mb-4">
        Bem-vindo ao Painel Administrativo
      </h1>
      <div className="flex items-center justify-center z-50 p-4">
        <div className="bg-dark-800 border border-dark-600 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
          <div className="p-6 border-b border-dark-600">
            <h2 className="text-2xl font-display font-bold text-white">
              Login
            </h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                E-mail
              </label>
              <input
                type="email"
                {...register("email")}
                className="input-field w-full"
              />
              {errors.email && (
                <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Senha
              </label>
              <div className="relative">
                <input
                  type={viewPassword ? "text" : "password"}
                  {...register("password")}
                  className="input-field w-full pr-10"
                />
                <button
                  type="button"
                  onClick={() => setViewPassword(!viewPassword)}
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 hover:text-gray-200 transition-colors"
                  aria-label={viewPassword ? "Ocultar senha" : "Ver senha"}
                >
                  {!viewPassword ? (
                    // Ícone olho fechado (ocultar)
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    </svg>
                  ) : (
                    // Ícone olho aberto (ver)
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="flex space-x-3 pt-4">
              <button
                type="submit"
                className="btn-success flex-1"
                disabled={isSubmitting}
              >
                Entrar
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
