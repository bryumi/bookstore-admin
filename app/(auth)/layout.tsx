import { AdminProvider } from "@/lib/admin-context";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminProvider>
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 ml-64">
          <Header />
          <main className="pt-20 p-8 grid-bg min-h-screen">{children}</main>
        </div>
      </div>
    </AdminProvider>
  );
}
