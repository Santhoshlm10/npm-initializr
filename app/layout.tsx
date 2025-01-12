import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import "./globals.css";
import ReactQueryProvider from "./ReactQueryProvider";


const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ["latin"],
  weight: "400"
})


export const metadata: Metadata = {
  title: "NPM initializer",
  description: "Project initializer tool for Node JS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable}  antialiased`}
      >
        <ReactQueryProvider>
        {children}
        </ReactQueryProvider>
      </body>
    </html>
  );
}
