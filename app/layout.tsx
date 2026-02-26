import type { Metadata } from "next";
import "./globals.css";
import { AdminProvider } from "@/lib/admin-context";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Admin - Livraria Elegante",
  description: "Painel administrativo da Livraria Elegante",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
