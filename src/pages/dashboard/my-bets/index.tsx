import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import { BetCard, Button, InputField } from "@components";
import { ReactElement, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import DashboardLayout from "@/layouts";

function Home() {
	const [loginMode, setLoginMode] = useState(true);
	const { push, query, pathname } = useRouter();

	const tabs = ["All Bets", "My Created", "Saved Bet"];

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

											<div ref={topRef} className="h-[76px]  w-full md:h-0"></div>




			<main className="dashboard_home bg-white w-full h-auto">
				{/* ----header------ */}
				<div className="bg-gray-50 w-full space-y-4 pt-6 px-6 md:px-12 column h-[auto] middle  sticky top-0 left-0 z-10">
					<div className="w-full">
						<div className="space-x-4 middle ">
							<Image
								src={"/icons/notify/won.svg"}
								alt={""}
								width={48}
								height={48}
							/>

							<h1 className="notify txt-xl md:display-xs f-b text-gray-700  ">
								My Bets
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
								<p className={`txt-sm  f-m`}>
									{" "}
									{i}
								</p>
							</div>
						))}
					</div>
				</div>

				{/* --------active bet listing----- */}
				<div className="w-full h-auto px-4 md:px-12 pt-1/2 ">
					{/* -----bet list------ */}
					{true ? (
						<div className="active_bet_wrapper pb-36 grid md:grid-cols-2 lg:grid-cols-3 gap-6 w-full  h-auto mt-6  pb-[200px]nmd:pb-0">
							{Array(9)
								.fill(1)
								.map((i, k) => (
									<div className="" key={k}>
										<BetCard
											betType={k % 2 ==
												0
												? "KoloBet"
												: "PointBet"} data={undefined}										/>
									</div>
								))}
						</div>
					) : (
						<div className={`nothing  p-2 text-center  w-full mx-auto md:w-[400px] ${true && "py-20"}`}>
							<h1 className="txt-md f-eb t-g7 md:txt-sm">
								Your bets will appear here
							</h1>
							<h1 className="txt-sm f-m t-g5 mt-1">
								Start by creating a bet or
								joining a bet
							</h1>
							<div className="h-6"></div>
							<Button
								text={"create new bet"}
								type={"button"}
								primary
								full
							/>
							<h1 className="txt-md f-b t-g5 md:txt-sm mt-3">
								Join bet
							</h1>
						</div>
					)}
				</div>
			</main>
		</>
	);
}
Home.getLayout = function getLayout(page: ReactElement) {
	return <DashboardLayout>{page}</DashboardLayout>;
};

export default Home;
