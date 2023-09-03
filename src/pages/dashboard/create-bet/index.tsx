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
import { ConditionTypes } from "@/components/AddCondition";
import { hasToken } from "@/utils";
// import { NextPageWithLayout } from "../_app";

function CreateBetPage() {
	const [loginMode, setLoginMode] = useState(true);
	const [step, setStep] = useState(1);
	const { push, query, pathname } = useRouter();
	const [isAdding, setIsAdding] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const progressRef = useRef(null);
	const { Bet, dispatchBet, BetDetailsData,
setBetDetailsData } = useBet();
	const { BetImg, setBetImg, MarketList, setNoImg , noImg} = useBet();

	const { notify } = useToast();
	
	const [currentSector, setCurrentSector] = useState({
		Sector: "",
		Codes: [],
	});
	const [conditions, setConditions] = useState<Array<ConditionTypes>>([]);
	const [showDiscount, setShowDiscount] = useState(true);


	function handleAddCondition()
	{
		setIsEditing(false);
			setCurrentSector({
			...currentSector,
			// Sector: 'H_TEAM/A_TEAM/DRAW',
				Codes: [],

		});
		setIsAdding((p) => !p);
	}

	// handlers--------------

	function next() {
		// validation
		// [1] a match must be selected
		let hasSelectedOneMatch = Bet.Criteria.TeamA?.TeamName?.length > 1;
		let hasSelectedCondition = Bet.Criteria?.Conditions?.length > 0;
		let hasName = BetDetailsData.BetName?.length !== 0;
		let hasAmount = BetDetailsData.Amount?.length > 2;

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
		console.log(BetImg, "BetImg", noImg);
		

		if (step == 4 && !BetImg) {
			notify("warn", "Defualt bet image will be set!");

			// return console.log(typeof BetImg);

			const toDataURL = (url: RequestInfo | URL) =>
				fetch(url)
					.then((response) => response.blob())
					.then(
						(blob) =>
							new Promise((resolve, reject) => {
								const reader = new FileReader();
								reader.onloadend = () => resolve(reader.result);
								reader.onerror = reject;
								reader.readAsDataURL(blob);
							})
					);

			toDataURL("/images/home/bet_image.jpg").then((dataUrl: string | unknown) => {
				// @ts-ignore
				const base64String = btoa(dataUrl);

				console.log(base64String, "base64String");

				setBetImg(base64String);

				function dataURLtoFile(dataurl: any, filename: string) {
					var arr = dataurl.split(","),
						mime = arr[0].match(/:(.*?);/)[1],
						bstr = atob(arr[arr.length - 1]),
						n = bstr.length,
						u8arr = new Uint8Array(n);
					while (n--) {
						u8arr[n] = bstr.charCodeAt(n);
					}
					return new File([u8arr], filename, { type: mime });
				}

				const file = dataURLtoFile(dataUrl, "bet_image.jpg");

				setNoImg(true);
				setBetImg(file);
			});
		}

		if (step == 4 && showDiscount && BetDetailsData.Discount.length < 2) {
			return notify("warn", "Specify a discount percentage!");
		}

		if (step == 4 && showDiscount && BetDetailsData.NumberOfPeople == 0) {
			return notify("warn", "Specify Number of players!");
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
				return (
					<BetCondition
						isAdding={isAdding}
						handleAddCondition={handleAddCondition}
						editBetConditons={editBetConditons}
						deleteBetConditons={deleteBetConditons}
						// setCurrentSector={setCurrentSector}
						// conditions={conditions}
					/>
				);

			case 4:
				return (
					<BetDetails
						BetDetailsData={BetDetailsData}
						setBetDetailsData={setBetDetailsData}
						showDiscount={showDiscount}
						setShowDiscount={setShowDiscount}
					/>
				);

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

	function editBetConditons(data: any) {
		// get selected condition details to be edited
		setIsEditing(true)
		console.log('editing data----');
		

		function getDesc(i: string) {
		// get array of codes for given sector
		const codes = MarketList.find((i: any) => i.Sector === data.Sector).Codes;

		const desc = codes.find((item: any) => item.value === i).desc;

		return desc;
	}

		const selectedConditons: { value: any; desc: any; }[] = []

		data.Codes.map((i: any) =>
		{
			selectedConditons.push({
				value: i,
				desc: getDesc(i),
			})
		})

		// set the current sector to the sector to e edited.
		setCurrentSector({
			...currentSector,
			Sector: data.Sector,
				Codes: selectedConditons as any,

		});

		
				setIsAdding((p) => !p);

	}

	function deleteBetConditons(data: any) {
		// get selected condition details to be edited
		const newConditons = Bet.Criteria.Conditions.filter((i: any) => i.Sector !== data.Sector);

		dispatchBet({ type: "BET_CONDITIONS_EDIT", payload: { conditions: newConditons } });

		notify("success", "This sector has been deleted succesfully!");
	}


	// useEffects -------------
	useEffect(() => {
		if (query.step)
		{
			
			setStep(Number(query.step));
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pathname]);

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

	// // Guarding routes
	// useEffect(() => {
	// 	if (!hasToken()) {
	// 		notify("info", "You need to create an account to create a bet");
	// 	}
	// });

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
			<AddCondition
				toggle={handleAddCondition}
				showNoti={isAdding}
				currentSector={currentSector}
				setCurrentSector={setCurrentSector}
				conditions={conditions}
				setConditions={setConditions} isEditing={isEditing}				// deleteBetConditons={deleteBetConditons}
			/>
		</>
	);
}
CreateBetPage.getLayout = function getLayout(page: ReactElement) {
	return <DashboardLayout>{page}</DashboardLayout>;
};

export default CreateBetPage;
