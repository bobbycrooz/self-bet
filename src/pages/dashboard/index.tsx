import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import { BetCard, Button, InputField } from "@components";
import { ReactElement, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import DashboardLayout from "@/layouts";
import { NextPageWithLayout } from "../_app";
import { betCardType } from "@/components/BetCard";
import Link from "next/link";
import { useUser } from "@/context/userContext";
// import {betCardType}

function Home() {
	const [loginMode, setLoginMode] = useState(true);
	const { push, query, pathname } = useRouter();
	const { User } = useUser();
	console.log(User, "this value is loading");

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

	const topRef = useRef(null);
	useEffect(() => {
		if (topRef.current) {
			// @ts-ignore
			topRef.current.scrollIntoView({
				behavior: "smooth",
				block: "start",
				inline: "nearest",
			});
		}
	}, [pathname]);

	return (
		<>
			<Head>
				<title>Selfbet Dasboard</title>
				<meta name="description" content="welcome to selfbet home" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<div ref={topRef} className="h-[76px]  w-full md:h-0"></div>

			<main className="dashboard_home  bg-white w-full h-auto p-4 md:px-12 md:py-16 ">
				<div className=" dashboard_home-content hidden md:block  w-full  md:h-[auto] lg:h-[260px] rounded-2xl lg:pl-24 md:pl-8 lg:pt-10 p-6">
					{/*  HOME BANNER CAROUSEL  --desktop*/}
					<div className="banneer_text w-full lg:w-[690px]">
						<h1 className=" f-b display-sm f-eb text-white">Revolutionize Your Sports Betting Experience</h1>
						<p className="text-[#B9BDC5]  txt-md f-m mt-[9px] mb-6  lg:w-[90%] md:w-[80%]">
							Get your friends together for a thrilling betting experience. Create custom bets, track your progress, and
							win big.
						</p>
						<Link href={"/dashboard/create-bet"}>
							{" "}
							<Button text={"Create your bet now"} type={"button"} primary />
						</Link>
					</div>
				</div>

				{/*  HOME BANNER CAROUSEL --mobile */}
				<div className="md:hidden h-[160px]  dashboard_home-content-sm w-full  rounded-2xl pl-[28px] flex items-center">
					{/*  */}
					<div className="banneer_text   w-[213px] ">
						<h1 className="txt-sm f-bk  text-[#EBEEF3]">Revolutionize Your Sports Betting Experience</h1>
						<p className="text-[#B9BDC5] text-[8px] mt-[8px] mb-2  md:txt-md f-m">
							Get your friends together for a thrilling betting experience, and win big.
						</p>
						<Link href={"/dashboard/create-bet"}>
							{" "}
							<button className="bg-sec p-2 px-4 txt-sm text-gray-50 rounded-lg f-b mt-3">Create your bet now</button>
						</Link>
					</div>
				</div>

				<div className="active_bet_wrapper pb-36 grid md:grid-cols-2 lg:grid-cols-3 gap-6 w-full  h-auto mt-6 ">
					{Array(9)
						.fill(1)
						.map((i, k) => (
							<div className="" key={k}>
								<BetCard betType={"POINT"} />
							</div>
						))}
				</div>
				<div className="bottom_div w-full h-12 md:h-0"></div>
			</main>
		</>
	);
}
Home.getLayout = function getLayout(page: ReactElement) {
	return <DashboardLayout>{page}</DashboardLayout>;
};

export default Home;
