import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import { BetCard, Button, Deposite, InputField, Withdraw } from "@components";
import { ReactElement, useEffect, useState } from "react";
import { useRouter } from "next/router";
import DashboardLayout from "@/layouts";
import Link from "next/link";

function Home() {
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [isDepositing, setIsDepositing] = useState(false);
  // const { push, query, pathname } = useRouter();

  const tabs = ["All", "Deposit", "Payouts", "Withdraw"];

  // handlers--------------

  function iconTypeHandler(type: string): string {
    switch (type) {
      case "add":
        return "/icons/notify/add.svg";

      case "money":
        return "/icons/notify/withdraw.svg";

      case "win":
        return "/icons/notify/won.svg";

      default:
        return "/icons/notify/add.svg";
    }
  }

  function handleWithdrawal() {
    setIsWithdrawing((p) => !p);
  }

  function handleDeposite() {
    setIsDepositing((p) => !p);
  }
  const notificationArray = [
    {
      header: "Withdrawal Succesful",
      type: "money",
      body: "Your funds have arrived in your bank account",
    },

    {
      header: "Bet won  🎉🎉🎉 ",
      type: "win",
      body: "Congratulations!!! You won the bet! N5000 has been sent to your wallet.",
    },

    {
      header: "You topped up your wallet",
      type: "add",
      body: "You won the bet! N5000 has been sent to your wallet.",
    },

    {
      header: "Congratulations  🎉🎉🎉 ",
      type: "win",
      body: "Congratulations!!! You won the bet! N5000 has been sent to your wallet.",
    },
    {
      header: "You topped up your wallet",
      type: "add",
      body: "You won the bet! N5000 has been sent to your wallet.",
    },

    {
      header: "Congratulations  🎉🎉🎉 ",
      type: "win",
      body: "Congratulations!!! You won the bet! N5000 has been sent to your wallet.",
    },
  ];

  // useEffects -------------
  // useEffect(() => {
  //   if (query.login) {
  //     setLoginMode(true);
  //   }
  // }, [pathname, query.login]);

  return (
    <>
      <Head>
        <title>my wallet</title>
        <meta name="description" content="welcome to selfbet home" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="dashboard_home bg-white w-full h-auto pb-16 ">
        {/* ----header---- */}
        <div className="bg-gray-50 w-full h-44 flex  items-start pt-4 relative">
          {/* ----middle card----- */}
          <div className="absolute row-between p-8 amount_box w-[657px] h-[148px] bg-white shadow-light left-1/2 -translate-x-1/2 rounded-lg -bottom-1/2">
            <div className="middle space-x-4">
              <Image
                src={"/icons/dashboard/wallet.svg"}
                alt="wallet"
                width={40}
                height={40}
                className=""
              />

              <div className="">
                <p className="text-gray-400 txt-xs f-m ">Wallet balance</p>
                <h1 className="notify text-xl f-eb text-gray-900  ">
                  N 40,000
                </h1>
              </div>
            </div>

            {/* 0--------------- */}

            <div className="col-center  space-y-3">
              <Button
                text="Deposite"
                type={"button"}
                primary
                click={handleDeposite}
              />
            </div>

            {/* 0---------------- */}

          <Link href={"/dashboard/my-wallet"}>
          <Image
              src={"/icons/arrow-right.svg"}
              alt="wallet"
              width={24}
              height={24}
              role="button"
              // onClick={handleShowProfile}
              className=""
            /></Link>
          </div>

          {/* ----profile details------ */}
          <div className="row-between  mx-auto w-[570px]">
            <div className="middle justify-between  space-x-4 py-4">
              <Image
                src={"/icons/dashboard/olivia.svg"}
                alt="logo"
                width={40}
                height={40}
                className=""
              />

              <div className="name_box">
                <h1 className="name txt-md text-gray-900 f-eb">Olivia Rhye</h1>
                <p className="sub_name text-sm f-n text-gray-600">
                  zokoropeter@gmail.com
                </p>
              </div>
            </div>

            <div className="settings_button middle space-x-2 px-4 p-3 rounded-lg border border-gray-300">

            <Image
                            src={'/icons/dashboard/cog-2.svg'}
                            alt={""}
                            width={16}
                            height={16}
                            className="mt-1"
                          />
              
              <p className="Se txt-md f-b text-gray-800">Settings</p>
              
              </div>
          </div>
        </div>

        {/*-------- body------ */}
        <div className="pl-12 mt-[116px] w-full pr-[104px]">

          <h1 className="w-full text-gray-800  txt-xl f-b ">My bets</h1>
        <div className="active_tab w-full  h-[30px] mt-4 border-b middle space-x-3">
          {tabs.map((i, k) => (
            <div
              className={`tab_item px-3 hover:text-gray-700 hover:border-gray-700 border-b-2  ${
                k == 0
                  ? "text-gray-700 border-gray-700  "
                  : "border-transparent text-gry-500"
              } h-full middle`}
              key={k}
            >
              <p className={`txt-sm  f-m`}> {i}</p>
            </div>
          ))}
        </div>
        <div className="active_bet_wrapper grid grid-cols-3 gap-6 w-full  h-auto mt-6 ">
          {Array(9)
            .fill(1)
            .map((i, k) => (
             <div className=""  key={k}>
              <BetCard betType={'KOLO'} />
             </div>
            ))}
        </div>
        </div>

        {/* -----withdrawal pane------- */}
        <Withdraw toggle={handleWithdrawal} showNoti={isWithdrawing} />

        {/* -----deposite pane------- */}
        <Deposite toggle={handleDeposite} showNoti={isDepositing} />
      </main>
    </>
  );
}
Home.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Home;
