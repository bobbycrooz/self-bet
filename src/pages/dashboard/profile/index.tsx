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

	const tabs = ["All Bets", "My created bets", "Saved Bet"];

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
				<title>my profile</title>
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

			<main className="dashboard_home bg-white w-full h-auto pb-16 ">
				{/* ----header---- */}
				<div className="bg-gray-50 w-full h-44 flex  items-start md:pt-4 relative p-6 pt-8">
					{/* ----middle card-----desktop view */}
					<div className=" hidden md:flex absolute  md:row-between p-8 amount_box md:w-[657px] h-[148px] bg-white shadow-light left-1/2 -translate-x-1/2 rounded-lg -bottom-1/2">
						<div className="middle space-x-4">
							<Image
								src={
									"/icons/dashboard/wallet.svg"
								}
								alt="wallet"
								width={40}
								height={40}
								className=""
							/>

							<div className="">
								<p className="text-gray-400 txt-xs f-m ">
									Wallet balance
								</p>
								<h1 className="notify text-xl f-eb text-gray-900  ">
									N 40,000
								</h1>
							</div>
						</div>

						{/* 0--------------- */}

						<div className="col-center  br space-y-3">
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
							/>
						</Link>
					</div>

					{/* ----middle card-----phone view */}
					<div className="flex absolute  middle row-between p-8 amount_box w-[90%] h-[148px] bg-white shadow-light left-1/2 -translate-x-1/2 rounded-lg -bottom-1/2">
						<div className="wallet_col_1  stack w-[70%]">
							<div className="wallet_row middle space-x-4">
								<Image
									src={
										"/icons/dashboard/wallet.svg"
									}
									alt="wallet"
									width={40}
									height={40}
									className=""
								/>

								<div className="">
									<p className="text-gray-400 txt-xs f-m ">
										Wallet balance
									</p>
									<h1 className="notify text-xl f-eb text-gray-900  ">
										N 40,000
									</h1>
								</div>
							</div>

							{/* button */}
							<div className="">
								{/* <Button
									text="Deposite"
									type={"button"}
									primary
                  full
									click={handleDeposite}
								/> */}

                <button onClick={handleDeposite} className="txt-sm f-b text-white rounded-lg bg-sec p-3 w-full">
                  Deposite
                </button>
							</div>
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
							/>
						</Link>
					</div>

					{/* ----profile details------ */}
					<div className="row-between  mx-auto w-[570px]">
						<div className="middle justify-between  space-x-4 py-4">
							<Image
								src={
									"/icons/dashboard/olivia.svg"
								}
								alt="logo"
								width={40}
								height={40}
								className=""
							/>

							<div className="name_box">
								<h1 className="name txt-md t-g9 f-eb">
									Olivia Rhye
								</h1>
								<p className="sub_name text-sm f-n t-g6">
									zokoropeter@gmail.com
								</p>
							</div>
						</div>

						<div className="settings_button middle space-x-2 px-4 p-3 rounded-lg border border-gray-300">
							<Image
								src={
									"/icons/dashboard/cog-2.svg"
								}
								alt={""}
								width={16}
								height={16}
								className="mt-1"
							/>

							<p className="Se txt-md f-b text-gray-800 md:flex hidden">
								Settings
							</p>
						</div>
					</div>
				</div>

				{/*-------- body------ */}
				<div className="p-4 md:pl-12 mt-[116px] w-full md:pr-[104px]">
					<h1 className="w-full text-gray-800 txt-md f-eb md:txt-xl md:f-b ">
						My bets
					</h1>

          {/* action tabs -- */}
					<div className="active_tab w-full  h-[30px] mt-4 border-b middle space-x-3">
						{tabs.map((i, k) => (
							<div
								className={`tab_item px-3 hover:text-gray-700 hover:border-gray-700 border-b-2  ${
									k == 0
										? "text-gray-900 border-gray-900  f-b"
										: "border-transparent text-gray-500 f-m"
								} h-full middle`}
								key={k}
							>
								<p className={`txt-sm`}>
									{" "}
									{i}
								</p>
							</div>
						))}
					</div>

          {/* active bet section */}
					<div className="active_bet_wrapper grid md:grid-cols-3 gap-4 md:gap-6 w-full  h-auto mt-6 ">
						{Array(9)
							.fill(1)
							.map((i, k) => (
								<div className="" key={k}>
									<BetCard
										betType={"KOLO"}
									/>
								</div>
							))}
					</div>
				</div>

				{/* -----withdrawal pane------- */}
				<Withdraw
					toggle={handleWithdrawal}
					showNoti={isWithdrawing}
				/>

				{/* -----deposite pane------- */}
				<Deposite
					toggle={handleDeposite}
					showNoti={isDepositing}
				/>
			</main>
		</>
	);
}
Home.getLayout = function getLayout(page: ReactElement) {
	return <DashboardLayout>{page}</DashboardLayout>;
};

export default Home;
