import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import { Button, InputField, Navbar, Sidebar } from "@components";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

export default function DashboardLayout({ children }: { children: any }) {

  const mainStyle = {
    width: "100vw",
    height: "100vh",
    // overFlowY: "hidden"

  }



  return (
    <main  className="dashboard_layout-wrapper">
      <Navbar />

      <div  className="flex dashboard_layout-body mt-[76px] lg:mt-0">
        <Sidebar />
        <main className="main_page overflow-y-scroll custom-scrollbar pb-[0px] lg:pb-0">{children}</main>
      </div>
    </main>
  );
}
