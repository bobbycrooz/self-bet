import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import { AddCondition, BetCard, Button, DropDown, InputField, Toggle, Notification } from "@components";
import { ReactElement, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import DashboardLayout from "@/layouts";
import { CarretRightSvg, MoreSvg, SvgElement, UploadSvg } from "@/assets";
import CreateBet from "./components/Createbet";
import BetCondition from "./components/BetCondition";
import BetDetails from "./components/Details";
import SelectMatch from "./components/Matches";
import { useBet } from "@/context/betContext";
import useToast from "@/hooks/useToast";
// import { NextPageWithLayout } from "../_app";

function CreateBetPage() {
	const [loginMode, setLoginMode] = useState(true);
	const [step, setStep] = useState(1);
	const { push, query, pathname } = useRouter();
	const [isAdding, setIsAdding] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const progressRef = useRef(null);
	const { Bet, dispatchBet, fetchAlllMarkets, MarketList } = useBet();
	const { BetImg} = useBet()

	const { notify } = useToast();
	const [BetDetailsData, setBetDetailsData] = useState({
		BetName: "",
		Amount: "",
		Discount: 0,
		NumberOfPeople: 0,
	});

	console.log(step, "step ------------ ");

	function handleAddCondition() {
		setIsAdding((p) => !p);
	}

	// handlers--------------
	function handleAuthMode() {
		setLoginMode((p) => !p);
		window?.scrollTo({
			top: 0,
			left: 0,
			behavior: "smooth",
		});
	}

	function next() {
		// validation
		// [1] a match must be selected
		let hasSelectedOneMatch = Bet.Criteria.TeamA?.TeamName?.length > 1;
		let hasSelectedCondition = Bet.Criteria?.Conditions?.length > 1;
		let hasName = BetDetailsData.BetName?.length > 4;
		let hasAmount = BetDetailsData.Amount?.length > 4;
		

		 console.log(BetImg)
		
		if (step == 2 && !hasSelectedOneMatch) {
			return notify("warn", "One match is required for KOLO bet");
		}
		
		if (step == 3 && !hasSelectedCondition) {
			return notify("warn", "You must add a bet condition!");
		}
		
		if (step == 4 && !hasName) {
			return notify("warn", "You must specfy a bet name!");
		}
		
		if (step == 4 && !hasAmount) {
			return notify("warn", "You must specfy a bet Amount!");
		}
		

		if (step == 4 && !BetImg) {
			return notify("warn", "You must upload a bet image!");
		}
		
		
		if (step === 4) {
			setIsLoading(true);

			dispatchBet({
				type: "BET_DETAILS",
				payload: {
					amount: BetDetailsData.Amount,
					discount: {
						discount: BetDetailsData.Discount,
						max: BetDetailsData.NumberOfPeople,
					},

					betName: BetDetailsData.BetName,
				},
			});

			setIsLoading(false);

			return push("/dashboard/create-bet/bet-details");
		}

		if (step > 1) setStep(step + 1);
	}

	function prev() {
		if (step > 1) setStep(step - 1);
	}

	function stepHandler(to: number) {
		setStep(to);
	}

	function handleBetCreationStep(step: number) {
		switch (step) {
			case 1:
				return <CreateBet stepHandler={stepHandler} />;

			case 2:
				return <SelectMatch />;

			case 3:
				return <BetCondition isAdding={isAdding} handleAddCondition={handleAddCondition} />;

			case 4:
				return <BetDetails BetDetailsData={BetDetailsData} setBetDetailsData={setBetDetailsData} />;

			default:
				return <CreateBet stepHandler={stepHandler} />;
		}
	}

	function handleProgressBar(step: number) {
		switch (step) {
			case 2:
				return 25 + "%";

			case 3:
				return 50 + "%";

			case 4:
				return 75 + "%";

			case 5:
				return 100 + "%";

			default:
				return "0";
		}
	}
	// console.log(handleProgressBar(step), "the progress bar");

	// useEffects -------------
	useEffect(() => {
		if (query.login) {
			setLoginMode(true);
		}
	}, [pathname, query.login]);

	// to focus on the progress bar
	useEffect(() => {
		if (progressRef.current) {
			// @ts-ignore
			progressRef.current.scrollIntoView({
				behavior: "smooth",
				block: "end",
				inline: "nearest",
			});
		}
	}, [step]);

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
				<title>Create bet</title>
				<meta name="description" content="welcome to selfbet home" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<div ref={topRef} className="h-[76px] md:h-0  w-full "></div>
			<main className="dashboard_create bg-white  w-full h-auto pb-[]   p-4 md:p-8 space-y-6">
				<h1 className="txt-xl f-b t-g7  md:t-header1 w-full text-left pb-[0px] border-b">Create new bet</h1>

				<div className="bet_type-select dashboard_create-inner   relative inner_shadow space-y-4   md:space-y-8 p-4 md:p-8  rounded-lg">
					{handleBetCreationStep(step)}

					{/* progress handler */}
					{step >= 2 && (
						<div ref={progressRef} className=" fixed lg:static bottom-0 left-0 w-full">
							<div className="bar w-full h-1 bg-gray-50 transition-all">
								<div
									style={{
										width: `${handleProgressBar(step)}`,
									}}
									className={`progress bg-gray-500 h-full transition-all`}
								></div>
							</div>

							<div className="progress_bar row-between w-full md:px-8 p-4 bg-gray-50 h-[84px] inner_shadow border-t-0  ">
								<div role="button" onClick={prev} className="back capitalize middle space-x-3 px-4 p-3 ">
									<Image className="" src={"/images/create/arrow-left.svg"} alt="arrow" width={16} height={16} />
									<p className="t-header1">back</p>
								</div>

								{step === 2 && <div className="hidden md:flex match_count capitalize t-headerb7">Match Selected</div>}

								<Button
									text={step !== 4 ? "Proceed" : "Proceed to placing bet"}
									type={"button"}
									primary
									click={next}
									isLoading={isLoading}
								/>
							</div>
						</div>
					)}
				</div>
			</main>

			{/* ---Add new bet condition */}
			<AddCondition toggle={handleAddCondition} showNoti={isAdding} />
		</>
	);
}
CreateBetPage.getLayout = function getLayout(page: ReactElement) {
	return <DashboardLayout>{page}</DashboardLayout>;
};

export default CreateBetPage;
