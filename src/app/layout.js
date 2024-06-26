import { Inter } from "next/font/google";
import "./globals.css";
import Layout from "@/components/ClientHelpers/Wrappers/Layout";
import Navbar from "@/components/Layout/Navbar";
import "@uploadthing/react/styles.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ session, children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Layout session={session}>{children}</Layout>
      </body>
    </html>
  );
}
