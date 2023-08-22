import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import { BetCard, Button, Deposite, InputField, Withdraw } from "@components";
import { ReactElement, useEffect, useState } from "react";
import { useRouter } from "next/router";
import DashboardLayout from "@/layouts";

function Home() {
	const [isWithdrawing, setIsWithdrawing] = useState(false);
	const [isDepositing, setIsDepositing] = useState(false);
	// const { push, query, pathname } = useRouter();

	const tabs = ["All", "Deposit", "Payouts", "Withdraw"];

	// handlers--------------

	function handleWithdrawal() {
		setIsWithdrawing((p) => !p);
	}

	function handleDeposite() {
		setIsDepositing((p) => !p);
	}

	// useEffects -------------
	// useEffect(() => {
	//   if (query.login) {
	//     setLoginMode(true);
	//   }
	// }, [pathname, query.login]);

	return (
		<>
			<Head>
				<title>my Settings</title>
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

			<main className="dashboard_home bg-white w-full h-auto md:pb-16 ">
				{/* ----header---- */}
				<div className="bg-gray-50 w-full h-[112px] middle p-4 md:p-12 relative">
					<div className="space-x-4 middle ">
						<Image
							src={"/icons/dashboard/settings.svg"}
							alt={""}
							width={48}
							height={48}
						/>

						<h1 className="notify display-xs f-b text-gray-700  ">
							Settings
						</h1>
					</div>
				</div>

				{/*-------- body------ */}
				<div className="md:pl-12 mt-[39px] w-full md:w-[462px] ">
					<div className="profile_setting p-6  rounded-xl space-y-8 ">
						{/* ----avatar----- */}
					{false && <div className="middle space-x-3">
							<Image
								src={
									"/icons/dashboard/olivia.svg"
								}
								alt={""}
								width={48}
								height={48}
							/>

							<div className="txt-sm f-s t-g9 bg-gray-100 rounded-lg md:px-3 p-[10px] px-4 md:p-1">
								Update new Avatar
							</div>
							
						</div>}

						{/* ----form----- */}
						<form
							onSubmit={() => true}
							className="w-full space-y-6"
						>
							<div className="space-y-4">
								<InputField
									type={"text"}
									label="username"
									required
									place={"Enter a username"}
								/>
								<InputField
									type={"email"}
									label="Email"
									place={"***@gmail.com"}
								/>
							</div>

							<Button
								text={"Save changes"}
								type={"submit"}
								disabled={true}
                auth
							/>
						</form>
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
