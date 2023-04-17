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

      <main className="dashboard_home bg-white w-full h-auto ">
        {/* header------ */}
        <div className="bg-gray-50 w-full space-y-4 pt-6 px-12 column h-[auto] middle  sticky top-0 left-0 z-10">
          <div className="w-full">
            <div className="space-x-4 middle ">
              <Image
                src={"/icons/notify/won.svg"}
                alt={""}
                width={48}
                height={48}
              />

              <h1 className="notify display-xs f-b text-gray-700  ">
                Saved Bets
              </h1>
            </div>
          </div>

          {/* ----bet tabs----- */}
          <div className="active_tab w-full  h-[30px] mt-8 border-b middle space-x-3">
            {tabs.map((i, k) => (
              <div
                className={`tab_item px-3 hover:text-gray-700 hover:border-gray-700 border-b-2  ${
                  k == 0
                    ? "text-gray-700 border-gray-700  "
                    : "border-transparent text-gray-400"
                } h-full middle`}
                key={k}
              >
                <p className={`txt-sm  f-m`}> {i}</p>
              </div>
            ))}
          </div>
        </div>

        {/* --------active bet listing----- */}
        <div className="w-full h-full px-12 ">
          {/* -----bet list------ */}
          <div className="active_bet_wrapper grid grid-cols-3 gap-6 w-full  h-auto mt-6 ">
            {Array(9)
              .fill(1)
              .map((i, k) => (
                <div className="" key={k}>
                  <BetCard betType={k % 2 == 0 ? "kolo" : "point"} />
                </div>
              ))}
          </div>
        </div>
      </main>
    </>
  );
}
Home.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Home;
