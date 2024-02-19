import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { CookiesProvider } from "next-client-cookies/server";
import ToastProvider from "@/components/toast/ToastProvider";
import ReactQueryProvider from "@/components/react-query/ReactQueryProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tic Tac Toe",
  description: "Tic Tac Toe game written in MERN",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-slate-200`}
        suppressHydrationWarning
      >
        <ReactQueryProvider>
          <ToastProvider>
            <CookiesProvider>{children}</CookiesProvider>
          </ToastProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
