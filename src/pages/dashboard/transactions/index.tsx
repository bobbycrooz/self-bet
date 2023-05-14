import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import { BetCard, Button, InputField } from "@components";
import { ReactElement, useEffect, useState } from "react";
import { useRouter } from "next/router";
import DashboardLayout from "@/layouts";
import { BackSVG, TransactionSVG } from "@/assets";

function Home() {
	const [loginMode, setLoginMode] = useState(true);
	const { push, query, pathname } = useRouter();

	const tabs = ["All", "Deposit", "Payouts", "Withdraw"]
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
				<title>Transactions</title>
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

			<main className="dashboard_home bg-white w-full h-auto">
				{/* ----header------ */}
				<div className="bg-gray-50 w-full space-y-4 pt-6 px-6 md:px-12 column h-[auto] middle  sticky top-0 left-0 z-10">
					<div className="middle back  space-x-4 w-full">
						<BackSVG/>

						<h1 role="button" onClick={() => history.back()} className="notify txt-sm md:display-xs f-s text-gray-500 capitalize  ">
							back to wallet
							</h1>

					</div>
					
					
					<div className="w-full ">
						<div className="space-x-4 middle ">
						<TransactionSVG/>

							<h1 className="notify txt-xl md:display-xs f-b text-gray-700  ">
							Transactions
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

				{/* --------transacrion list----- */}
				<div className="list-wrapper w-full p-4 md:p-12 md:py-9 py-[26px]">
		
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
							
				</div>
				
			</main>
			</>
	);
}
Home.getLayout = function getLayout(page: ReactElement) {
	return <DashboardLayout>{page}</DashboardLayout>;
};

export default Home;
