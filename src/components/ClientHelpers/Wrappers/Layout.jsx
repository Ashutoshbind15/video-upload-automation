"use client";

import Footer from "@/components/Layout/Footer";
import Navbar from "@/components/Layout/Navbar";
import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SessionProvider } from "next-auth/react";

const queryClient = new QueryClient();
const Layout = ({ session, children }) => {
  return (
    <div>
      <SessionProvider session={session}>
        <QueryClientProvider client={queryClient}>
          <div>
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </div>

          <ReactQueryDevtools initialIsOpen={false} />

          <Toaster />
        </QueryClientProvider>
      </SessionProvider>
    </div>
  );
};

export default Layout;
