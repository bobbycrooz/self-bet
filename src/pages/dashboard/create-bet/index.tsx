import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import { BetCard, Button, InputField } from "@components";
import { ReactElement, useEffect, useState } from "react";
import { useRouter } from "next/router";
import DashboardLayout from "@/layouts";
import { NextPageWithLayout } from "../_app";

function Home() {
  const [loginMode, setLoginMode] = useState(true);
  const { push, query, pathname } = useRouter();

  const tabs = ["All Bets", "My Created", "Saved Bet", "Results"];

  // handlers--------------
  function handleAuthMode() {
    setLoginMode((p) => !p);
    window?.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }

  function handleGoogle() {
    push("/auth/continue");
  }

  function handleForgotPassword() {
    push("/auth/forgot-password");
  }

  // useEffects -------------
  useEffect(() => {
    if (query.login) {
      setLoginMode(true);
    }
  }, [pathname, query.login]);

  return (
    <>
      <Head>
        <title>Selfbet Dasboard</title>
        <meta name="description" content="welcome to selfbet home" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="dashboard_home bg-white w-full h-auto centered">
      
<h1 className="t-header">nothing yet</h1>
      
      </main>
    </>
  );
}
Home.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Home;
