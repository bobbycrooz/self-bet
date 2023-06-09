import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import { BetCard, Button, Deposite, InputField, Withdraw } from "@components";
import { ReactElement, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import DashboardLayout from "@/layouts";
import { PlusSvg } from "@/assets";
import Link from "next/link";

function Home() {
	const [isWithdrawing, setIsWithdrawing] = useState(false);
	const [isDepositing, setIsDepositing] = useState(false);
	const { push, query, pathname } = useRouter();

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
				<title>my wallet</title>
				<meta name="description" content="welcome to selfbet home" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
							<div ref={topRef} className="h-[76px]  w-full md:h-0"></div>



			<main className="dashboard_home bg-white w-full h-auto pb-16 ">
				{/* ----header---- */}
				<div className="bg-gray-50 w-full lg:h-[112px]  h-[122px] middle md:p-12 relative ">
					{/* ----side card --desktop view */}
					<div className="absolute lg:flex  lg:justify-between hidden  p-8 amount_box md:w-[557px] h-[148px] bg-white shadow-light md:right-[105px] rounded-lg md:-bottom-1/2 -bottom-[90%]">
						<div className="">
							<p className="text-gray-400 txt-sm f-m ">Wallet balance</p>
							<h1 className="notify display-sm f-eb text-gray-700  ">N 40,000</h1>
						</div>

						{/* 0--------------- */}

						<div className="col-center  space-y-3">
							<div role="button" onClick={handleDeposite} className="rounded-lg bg-sec p-3">
								<PlusSvg />
							</div>
							<p className="text-gray-700 txt-md f-m ">Deposit</p>
						</div>

						{/* 0---------------- */}

						<div className="col-center  space-y-3">
							<Image
								src={"/icons/dashboard/wallet-sq.svg"}
								alt={""}
								width={48}
								height={48}
								role={"button"}
								onClick={handleWithdrawal}
							/>

							<p className="txt-md f-m text-gray-700">Withdraw</p>
						</div>
					</div>

					{/* ----side card --phone view */}
					<div className="absolute coulumn lg:hidden p-4 space-y-6 amount_box w-[90%] md:w-[80%] h-auto bg-white shadow-light  left-1/2 -translate-x-1/2 rounded-lg -bottom-[140%]">
						<div className=" text-center">
							<p className="text-gray-400 txt-sm f-m">Wallet balance</p>
							<h1 className="notify display-sm f-eb text-gray-700  ">N 40,000</h1>
						</div>

						{/* 0--------------- */}

						{/* action columns */}
						<div className="w-full flex justify-around  ">
							<div className="col-center  space-y-3">
								<div role="button" onClick={handleDeposite} className="rounded-lg bg-sec p-2">
									<PlusSvg />
								</div>
								<p className="text-gray-700 txt-md  f-b md:f-m ">Deposit</p>
							</div>

							<div className="col-center  space-y-3">
								<Image
									src={"/icons/dashboard/wallet-sq.svg"}
									alt={""}
									width={40}
									height={40}
									role={"button"}
									onClick={handleWithdrawal}
								/>

								<p className="txt-md f-m text-gray-700">Withdraw</p>
							</div>
						</div>
					</div>

					{/* -------end--------- */}

					<div className="space-x-4 middle mx-auto lg:mx-0   justify-center">
						<Image src={"/icons/dashboard/wallet.svg"} alt={""} width={48} height={48} />

						<h1 className="notify display-xs f-b text-gray-700  ">My wallet</h1>
					</div>
				</div>

				{/*-------- body------ */}
				<div className="lg:pl-12 mt-[206px]  p-2 md:p-6 lg:mt-[116px]  pb-12 lg:pb-0 w-full lg:pr-[104px]">
					<div className="transaction_list p-4 md:p-8 border  rounded-xl  border-gray-200">
						<h1 className="t-header hidden lg:flex">Transactions</h1>

						<div className="w-full row-between lg:hidden">
							<h1 className="t-header">Transactions</h1>

							<Link href={"/dashboard/transactions"}>
								<h1 className="capitalize f-b txt-sm text-sec">see all</h1>
							</Link>
						</div>

						{/* -----tabs--------- */}
						<div className="active_tab w-full h-[40px] md:h-[30px] mt-8 border-b middle space-x-3">
							{tabs.map((i, k) => (
								<div
									className={`tab_item px-3 hover:text-gray-700 hover:border-gray-700 border-b-2 ${
										k == 2 ? "text-gray-700 border-gray-700 f-b " : "border-transparent text-gray-500 f-m"
									} h-full middle`}
									key={k}
								>
									<p className={`txt-sm`}> {i}</p>
								</div>
							))}
						</div>

						{/* --------tab_body----- */}

						{!true ? (
							<div className="h-auto border border-gray-100 centered">
								<div className="column col-center p-6">
									<div className="bg-gray-400 w-20 h-20 rounded-lg"></div>

									<h1 className="t-header mt-4">No transactions to show!</h1>
									<p className="t-subtitle mt-2">Your transaction history will appear here</p>
								</div>
							</div>
						) : (
							<>
								<div className="w-full  py-6 ">
									<h1 className="t-subtitle">Tuesday</h1>

									{/* ----transaction-list */}
									<div className="w-full space-y-6 mt-6 ">
										{notificationArray.map((i, k) => (
											<div key={k} className="notification_list-item flex items-center justify-between ">
												<div className="space-x-4 md:space-x-6  middle">
													<Image src={iconTypeHandler(i.type)} alt={""} width={40} height={40} />

													<div className="noti_text w-[90%] md:w-full">
														<h1 className="notify t-header1 ">{i.header}</h1>

														<p className="t-xs-subtitle w-[80%] md:w-full">{i.body}</p>
													</div>
												</div>

												<p
													className={`txt-sm md:txt-md f-eb  w-[100px] text-right ${
														i.type === "add" ? "text-gray-700" : "text-green-500"
													}`}
												>
													-N5,000
												</p>
											</div>
										))}
									</div>
								</div>
							</>
						)}
					</div>
				</div>

				{/* -----withdrawal pane------- */}
				<Withdraw toggle={handleWithdrawal} showNoti={isWithdrawing} />

				{/* <WithdrawMobile
					toggle={handleWithdrawal}
					visibility={isWithdrawing}
				/> */}
				{/* -----deposite pane------- */}
				<Deposite toggle={handleDeposite} showNoti={isDepositing} />

				{/* <DepositeMobile
					toggle={handleDeposite}
					visibility={isDepositing}
				/> */}
			</main>
		</>
	);
}
Home.getLayout = function getLayout(page: ReactElement) {
	return <DashboardLayout>{page}</DashboardLayout>;
};

export default Home;
