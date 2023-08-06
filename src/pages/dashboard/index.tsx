import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import { BetCard, Button, InputField } from "@components";
import { ReactElement, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import DashboardLayout from "@/layouts";

import Link from "next/link";

import { useBet } from "@/context/betContext";
// import {betCardType}

function Home() {
	const [searchMode, setSearchMode] = useState(true);
	const [doneLoading, setDoneLoading] = useState(true);
	const { query, pathname } = useRouter();
	// const { User } = useUser();
	const { BetList } = useBet();
	const topRef = useRef(null);

	// console.log();
	

	// handlers--------------

	const handleFetch = () => {
		if (BetList?.length == 0) {
			setDoneLoading(false);

			setTimeout(() => {
				setDoneLoading(true);
			}, 3500);
		}
	};

	// useEffects -------------
	useEffect(() => {

		if (Boolean(query.search)) {
			setSearchMode(true);
			window?.scrollTo({
				top: 0,
				left: 0,
				behavior: "smooth",
			});
		} else {
			setSearchMode(false);
		}
	}, [pathname, query]);

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

	useEffect(() =>
	{
		handleFetch()
		
		
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [BetList]);

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
				{!searchMode && (
					<div className=" dashboard_home-content hidden md:block  w-full  md:h-[auto] lg:h-[260px] rounded-2xl lg:pl-24 md:pl-8 lg:pt-10 p-6">
						{/*  HOME BANNER CAROUSEL  --desktop*/}
						<div className="banneer_text w-full lg:w-[690px]">
							<h1 className=" f-b display-sm f-eb text-white">Revolutionize Your Sports Betting Experience</h1>
							<p className="text-[#B9BDC5]  txt-md f-m mt-[9px] mb-6  lg:w-[90%] md:w-[80%]">
								Get your friends together for a thrilling betting experience. Create custom bets, track your progress,
								and win big.
							</p>
							<Link href={"/dashboard/create-bet"}>
								{" "}
								<Button text={"Create your bet now"} type={"button"} primary />
							</Link>
						</div>
					</div>
				)}

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

				{BetList?.length > 0 ? (
					<div className="active_bet_wrapper pb-36 grid md:grid-cols-2 lg:grid-cols-3 gap-6 w-full  h-auto mt-6 ">
						{BetList?.map((i: any, k: number) => (
							<div className="" key={k}>
								<BetCard betType={i.Type} data={i} />
							</div>
						))}
					</div>
				) : (
					<div className="loading w-full ">
						{doneLoading ? (
							<div className="nothing w-full centered mt-6">
								<div className="nothing_content col-center">
									<Image src={"/images/home/nothing.svg"} alt="" width={200} height={200} />

									<p className="nothing_text mt-8 w-[500px]">
										No bets matched your search. Try using <span>search options</span> such as bet creator, team, bet
										amount and more.
									</p>
								</div>
							</div>
						) : (
							<div className="w-full flex justify-center py-14">fetching bets ...</div>
						)}
					</div>
				)}

				<div className="bottom_div w-full h-12 md:h-0"></div>
			</main>
		</>
	);
}
Home.getLayout = function getLayout(page: ReactElement) {
	return <DashboardLayout>{page}</DashboardLayout>;
};

export default Home;
