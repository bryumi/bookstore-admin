/* eslint-disable react/jsx-no-constructed-context-values */

"use client";

import { localStorageKeys } from "@/utils/localStorageKeys";
import { redirect, usePathname } from "next/navigation";
import {
  createContext,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

export interface User {
  id: number;
  documentId: string;
  email: string;
  username: string;
}

interface IUserProvider {
  user: User;
  setUser: React.Dispatch<SetStateAction<User>>;
  isAuthenticated: boolean;
  logout: () => void;
}

interface ChildrenProps {
  children: ReactNode;
}

const AuthContext = createContext({} as IUserProvider);

const AuthProvider = ({ children }: ChildrenProps) => {
  const [user, setUser] = useState<User>({} as User);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const dataUser = localStorage.getItem(localStorageKeys.user);

    if (dataUser) {
      setUser(JSON.parse(dataUser));
    }

    setLoading(false);
  }, []);

  const isAuthenticated = !!user.id;

  const logout = () => {
    localStorage.removeItem(localStorageKeys.user);
    localStorage.removeItem(localStorageKeys.accessToken);
    setUser({} as User);
  };

  const publicRoutes = ["/", "/esqueci-senha", "/redefinir-senha"];

  useEffect(() => {
    if (!loading && !isAuthenticated && !publicRoutes.includes(pathname)) {
      redirect("/");
    } else if (isAuthenticated && publicRoutes.includes(pathname)) {
      redirect("/dashboard");
    }
  }, [loading, isAuthenticated, pathname]);

  if (loading) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ user, setUser, isAuthenticated, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
export const useAuth = () => useContext(AuthContext);
