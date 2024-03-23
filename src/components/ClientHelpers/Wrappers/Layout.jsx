"use client";

import { SessionProvider } from "next-auth/react";

const Layout = ({ session, children }) => {
  return (
    <div>
      <SessionProvider session={session}>{children}</SessionProvider>
    </div>
  );
};

export default Layout;
