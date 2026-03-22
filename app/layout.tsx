import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Providers/Providers";

export const metadata: Metadata = {
  title: "Admin - Booklovers",
  description: "Painel administrativo Booklovers",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
