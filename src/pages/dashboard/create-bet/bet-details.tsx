import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import {
	BetCard,
	Button,
	ConfirmationModal,
	Deposite,
	DropDown,
	InputField,
	PlaceBetLoader,
	Withdraw,
} from "@components";
import { ReactElement, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import DashboardLayout from "@/layouts";
import { useBet } from "@/context/betContext";
import useToast from "@/hooks/useToast";

const statusConst = {
	success: "SUCCESS",
	failed: "FAILED",
};

function Home() {
	const { push, query, pathname } = useRouter();

	const { Bet, isLoading, placing, status, handlePlaceBet, setIsLoading, setStatus, MarketList } = useBet();

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
				<title>Details </title>
				<meta name="description" content="welcome to selfbet home" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<div ref={topRef} className="h-[76px] md:h-0  w-full "></div>

			<main className="bet_details bg-gray-50 w-full overflow-y-scroll custom-scrollbar">
				<div className="h-  p-3 md:p-8 w-full h-auto space-x-6 flex items-start">
					{/* --- */}
					<main className=" w-[100%] space-y-6 pb-20 ">
						{/* bet type banner */}
						<div className="bet_banner w-full h-[124px] md:h-[224px] relative">
							{!true ? (
								<Image
									src={"/images/home/kolo_banner.png"}
									alt={""}
									fill
									className="r"
									// width={300}
									// height={128}
								/>
							) : (
								<Image
									src={"/images/home/point_banner.png"}
									alt={""}
									fill
									className="r"
									// width={300}
									// height={128}
								/>
							)}
						</div>

						{/* ------bet details container */}
						<div className="w-full py-4 space-y-3">
							{/* bet_details  component */}

							{<BetConditionDropdown Bet={Bet} />}
						</div>
						<div className="md:hidden w-full h-28"></div>
					</main>

					<aside className="hidden md:flex  w-[286px] h-auto sticky top-6">
						{/* ----- */}
						<div className="create_aside border-gray-200 w-full rounded-lg shadow-md bg-white ">
							{/* header */}
							<div className="h-[56px]  w-full relative header rounded-t-lg middle ">
								<div className="middle">
									<h1 className="header_text txt-sm f-b text-gray-50 p-4">Betslip</h1>

									<p className="rounded bg-gray-400 px-2 p-[2px] text-white txt-xs f-m">{8}</p>
								</div>
							</div>

							<div className="aside_body p-2 py-6 space-y-3">
								{/* ----bets */}
								{Bet.Conditions.map((i: any, k: number) => (
									<div key={k} className="space-y-2">
										<BetSlipDetails data={i} />
									</div>
								))}

								{/* ----price -box */}
								<div
									className="price_box space-y-2 mt-6 text-gray-500
"
								>
									<div className="row-between w-full">
										<h1 className="p  txt-sm f-m">Stake</h1>
										<h1 className="txt-sm f-b ">N500</h1>
									</div>

									<div className="row-between w-full">
										<h1 className="p  txt-sm f-m">Potential win</h1>
										<h1 className="txt-sm f-b ">N5000</h1>
									</div>

									<Button text={"Place Bet"} type={"button"} isLoading={isLoading} full primary click={handlePlaceBet} />
								</div>
							</div>
						</div>
					</aside>
				</div>

				{/* ------process confirmation modal ------- */}
				<PlaceBetLoader
					show={placing}
					handleClose={handlePlaceBet}
					context={"Deposite"}
					isLoading={isLoading}
					toggleLoader={setIsLoading}
					status={status}
					setStatus={setStatus}
				/>
			</main>
		</>
	);
}
Home.getLayout = function getLayout(page: ReactElement) {
	return <DashboardLayout>{page}</DashboardLayout>;
};

export function BetSlipDetails({ data }: { data: any }) {
	const { Bet, dispatchBet } = useBet();

	// console.log(data, "bet --------bet slip for data---- ");

	const [sowList, setShowList] = useState(false);

	function handleShowList() {
		setShowList((p) => !p);
	}

	return (
		<div className="conditon_card border rounded-lg h-auto">
			{/* --header */}
			<div className="  p-3" role="button" onClick={handleShowList}>
				<div className="row-between">
					<h1 className="txt-sm f-m text-gray-700">
						{Bet.Teams[0]} - {Bet.Teams[1]}
					</h1>

					<Image
						src={"/icons/dashboard/down.svg"}
						alt="wallet"
						width={16}
						height={16}
						role="button"
						// onClick={handleShowProfile}
						className="carret"
					/>
				</div>
			</div>

			{/* ----body */}
			{!sowList && (
				<div className="w-full border-t  strictFadeIn">
					<ol className=" px-4">
						<li className={`selector_item flex w-full h-full py-4  ${"border-b"} space-x-3`}>
							<div className="mt-1">
								<CheckSVG />
							</div>

							<div className="column  space-y-2">
								<h1 className="f-b txt-sm text-gray-900">{data?.Sector} </h1>

								<p className="text-gray-400 txt-xs  f-s">{data?.Codes}</p>
							</div>
						</li>
						{/* {data.map((i, k) => (
							<li key={k} className={`selector_item flex w-full h-full py-4  ${k !== 3 && "border-b"} space-x-3`}>
								<div className="mt-1">
									<CheckSVG />
								</div>

								<div className="column  space-y-2">
									<h1 className="f-b txt-sm text-gray-900">{i.Sector} </h1>

									<p className="text-gray-400 txt-xs  f-s">{i.Codes}</p>
								</div>
							</li>
						))} */}
					</ol>
				</div>
			)}
		</div>
	);
}

function CheckSVG() {
	return (
		<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
			<rect x="0.4" y="0.4" width="15.2" height="15.2" rx="4.4" fill="#4B5563" />
			<path
				d="M11.7342 5.2002L6.60091 10.3335L4.26758 8.0002"
				stroke="white"
				stroke-width="1.6"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
			<rect x="0.4" y="0.4" width="15.2" height="15.2" rx="4.4" stroke="#4B5563" stroke-width="0.8" />
		</svg>
	);
}

function BetConditionDropdown({ Bet }: { Bet: any }) {
	const [isOpen, setIsOpen] = useState(false);
	const { Criteria } = Bet;

	function handleOpen() {
		setIsOpen((p) => !p);
	}

	return (
		<div
			className={`bet-details-dropdown w-full ${isOpen && "active"} border  border-gray-200 rounded-lg shadow-bet-card`}
		>
			{/* ---heaader---- */}
			<div role="button" onClick={handleOpen} className="card-header bg-white rounded-t-lg ">
				<div className="teams_display row-between bg-white border-b  border-gray-200 rounded-lg p-4  ">
					<div className="team_caard team_caard col-center space-y-2">
						<Image className="team_logo " src={Criteria.TeamA.Logo} alt="chealse" width={48} height={48} />
						<h1 className="team_name txt-xs f-s text-gray-600">{Criteria.TeamA.TeamName}</h1>
					</div>

					<div className="event_time txt-xs text-center space-y-1 f-m text-gray-400">
						<h1 className="">Sat, 3 Dec</h1>
						<h1 className="bg-gray-50 txt-xs f-s rounded-lg px-4 p-1 text-gray-500">8:30</h1>
					</div>

					<div className="team_caard col-center  space-y-2">
						<Image className="team_logo " src={Criteria.TeamB.Logo} alt="chealse" width={48} height={48} />
						<h1 className="team_name txt-xs f-s text-gray-600"> {Criteria.TeamB.TeamName}</h1>
					</div>
				</div>{" "}
			</div>

			{/* -------body------- */}
			<div className={`${!true && "active"} transition-all p-4 bg-white  card_body w-full`}>
				<h1 className="txt-xs md:txt-sm f-m text-gray-500">
					You can select only one condition from each bet sector. Each selection counts as the sector point
				</h1>

				{/* ---- */}
				<div className="grid md:grid-cols-2 gap-3 mt-6">
					{Criteria.Conditions.map((i: any, k: number) => (
						<div key={k} className="">
							<BetSelectorDetails sectors={i} />
						</div>
					))}
				</div>
			</div>

			{/* ----footer toggle --- */}
			<div
				role="button"
				title="close list"
				onClick={handleOpen}
				className="card-footer-toggle w-full bg-white row-between p-4 border-t rounded-b-lg px-6"
			>
				<p className="subtitle">0/4 selected</p>
				<Image
					src={"/icons/dashboard/down.svg"}
					alt="wallet"
					width={16}
					height={16}
					role="button"
					// onClick={handleShowProfile}
					className="carret"
				/>
			</div>
		</div>
	);
}

function BetSelectorDetails({ sectors }: { sectors: any }) {
	const [sowList, setShowList] = useState(false);
	const { MarketList } = useBet();
	const { Bet, dispatchBet } = useBet();
	const { notify } = useToast();

	function handleShowList() {
		setShowList((p) => !p);
	}

	function handlePickCondition(i: any) {
		// check if condition already exist		

		if (Bet.Conditions.length > 0) {
			return notify("error", "You can only pick one condition per sector");
		}

		const pickedCondition = {
			Sector: sectors.Sector,
			Codes: i,
		};

		dispatchBet({
			type: "PICK_CONDITION",
			payload: {
				condition: pickedCondition,
			},
		});
	}

	function getDesc(i: string) {

		// get array of codes for given sector
		const codes = MarketList.find((i: any) => i.Sector === sectors.Sector).Codes;

		const desc = codes.find((item: any) => item.value === i).desc;

		return desc;
	}


	return (
		<div className="conditon_card border rounded-lg  h-auto">
			{/* --header */}
			<div className=" p-3 " role="button" onClick={handleShowList}>
				<div className="row-between">
					<h1 className="txt-sm f-b text-gray-500">⚽️{sectors.Sector}</h1>

					<Image
						src={"/icons/dashboard/down.svg"}
						alt="wallet"
						width={16}
						height={16}
						role="button"
						// onClick={handleShowProfile}
						className="carret"
					/>
				</div>
				<p className="txt-sm text-gray-400 mt-1">Predict who wins or draws</p>
			</div>

			{/* ----body */}

			{sowList && (
				<div className="w-full border-t rounded-b-xl">
					<ol className="space-y-4 p-4">
						{sectors.Codes.map((i: any, k: number) => (
							<li
								role="button"
								onClick={() => handlePickCondition(i)}
								key={k}
								className="selector_item rounded-lg bg-gray-50 p-[10px] px-4"
							>
								<h1 className="f-b">
									{i} <span className="text-gray-400 txt-sm f-m">{getDesc(i)}</span>
								</h1>
							</li>
						))}
					</ol>
				</div>
			)}
		</div>
	);
}

export default Home;
