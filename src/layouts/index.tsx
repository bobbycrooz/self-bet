import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import { Button, InputField, Navbar, Sidebar } from "@components";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
// import Dasboa

const inter = Inter({ subsets: ["latin"] });

export default function DashboardLayout({ children }: { children: any }) {
  const [loginMode, setLoginMode] = useState(true);
  const { push, query, pathname } = useRouter();

  const mainStyle = {
    width: "100vw",
    height: "100vh",
    // overFlowY: "hidden"

  }
  // <main style={mainStyle} className="dashboard max-w-screen h-screen overflow-y-hidden">





  return (
    <main  className="dashboard_layout-wrapper">
      <Navbar />

      <div className="flex dashboard_layout-body ">
        <Sidebar />
        <main className="main_page overflow-y-scroll custom-scrollbar">{children}</main>
      </div>
    </main>
  );
}
