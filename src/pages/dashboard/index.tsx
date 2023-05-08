import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import { BetCard, Button, InputField } from "@components";
import { ReactElement, useEffect, useState } from "react";
import { useRouter } from "next/router";
import DashboardLayout from "@/layouts";
import { NextPageWithLayout } from "../_app";
import { betCardType } from "@/components/BetCard";
import Link from "next/link";
// import {betCardType}

function Home() {
	const [loginMode, setLoginMode] = useState(true);
	const { push, query, pathname } = useRouter();

	const tabs = ["All Bets", "Today", "Tomorrow"];

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
				<meta
					name="description"
					content="welcome to selfbet home"
				/>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className="dashboard_home  bg-white w-full h-auto p-4 md:px-12 md:py-16 ">
				<div className=" dashboard_home-content hidden md:block  w-full h-[126px] md:h-[260px] rounded-2xl md:pl-24 pt-10">
					{/*  HOME BANNER CAROUSEL  --desktop*/}
					<div className="banneer_text w-full md:w-[690px]">
						<h1 className=" f-b display-sm f-eb text-white">
							Revolutionize Your Sports Betting
							Experience
						</h1>
						<p className="text-white txt-md f-m mt-[9px] mb-6  w-[90%]">
							Get your friends together for a
							thrilling betting experience. Create
							custom bets, track your progress, and
							win big.
						</p>
						<Link href={"/dashboard/create-bet"}>
							{" "}
							<Button
								text={"Create your bet now"}
								type={"button"}
								primary
							/>
						</Link>
					</div>
				</div>

				{/*  HOME BANNER CAROUSEL --mobile */}

				<div className="md:hidden h-[146px]  dashboard_home-content-sm w-full  rounded-2xl pl-[28px] flex items-center">
					{/*  */}
					<div className="banneer_text   w-[213px] ">
						<h1 className="txt-sm f-b  text-white">
							Revolutionize Your Sports Betting
							Experience
						</h1>
						<p className="text-white text-[8px] mt-[2px] mb-2  md:txt-md f-m">
							Get your friends together for a
							thrilling betting experience, and win
							big.
						</p>
						<Link href={"/dashboard/create-bet"}>
							{" "}
							<button className="bg-sec p-2 px-4 txt-xs text-gray-50 rounded-lg f-b">
								Create your bet now
							</button>
						</Link>
					</div>
				</div>

				{/* active bet listing */}
				{/* <div className="active_tab w-full  h-[30px] mt-8 border-b middle space-x-3">
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
        </div> */}
				<div className="active_bet_wrapper grid md:grid-cols-3 gap-6 w-full  h-auto mt-6 ">
					{Array(9)
						.fill(1)
						.map((i, k) => (
							<div className="" key={k}>
								<BetCard betType={"POINT"} />
							</div>
						))}
				</div>
			</main>
		</>
	);
}
Home.getLayout = function getLayout(page: ReactElement) {
	return <DashboardLayout>{page}</DashboardLayout>;
};

export default Home;
