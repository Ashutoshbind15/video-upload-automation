"use client";

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
          {children}
          <ReactQueryDevtools initialIsOpen={false} />

          <Toaster />
        </QueryClientProvider>
      </SessionProvider>
    </div>
  );
};

export default Layout;
