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
import { formatMatchDate, hasToken } from "@/utils";
import Link from "next/link";
import { joinBetAPI } from "@/axios/endpoints/bet.endpoint";

const statusConst = {
	success: "SUCCESS",
	failed: "FAILED",
};

function Home() {
	const { push, query, pathname } = useRouter();

	const [joinBetDetails, setjoinBet] = useState({
		betId: "",
		betType: "",
		Conditions: [
			// {
			// 	Sector: "H_TEAM/A_TEAM/DRAW",
			// 	Codes: "1",
			// 	FixtureId: 868135,
			// },
		],
		FixtureId: 0,
	});

	const { notify } = useToast();

	const [currentBet, setCurrentBet] = useState<any>();

	const { Bet, isLoading, placing, status, setIsLoading, setStatus, MarketList, BetList } = useBet();

	const topRef = useRef(null);

	async function handlePlaceBet() {
		const { error, serverResponse } = await joinBetAPI(joinBetDetails);

		// @ts-ignore
		if (error) return notify("error", serverResponse);

		setjoinBet({
			...joinBetDetails,
			Conditions: [],
		});

		notify("success", "joined bet successfully");
	}

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

	useEffect(() => {
		if (query.id) {
			// setCurrentBetId(query.id as string);
			// get current bet detailsBeList
			const currentBet = BetList.find((i: any) => i._id === query.id);

			if (currentBet) {
				setCurrentBet(currentBet);
				setjoinBet({
					...joinBetDetails,
					betId: query.id as string,
					betType: currentBet.Type,
					FixtureId: currentBet.Criteria.FixtureId,
				});
			}
		} else {
			notify("error", "Can't find bet id");
		}
	}, [query, pathname]);

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
							{currentBet?.Type == "KoloBet" ? (
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

						{/* ------bet details container------ */}
						<div className="w-full py-4 space-y-3">
							{/* bet_details  component */}
							<Link href={`/dashboard`} role="button" className="middle space-x-2">
								<div className="back_icon">
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
										<path
											d="M9.57 5.92999L3.5 12L9.57 18.07"
											stroke="#292D32"
											stroke-width="1.5"
											stroke-miterlimit="10"
											stroke-linecap="round"
											stroke-linejoin="round"
										/>
										<path
											d="M20.4999 12H3.66992"
											stroke="#292D32"
											stroke-width="1.5"
											stroke-miterlimit="10"
											stroke-linecap="round"
											stroke-linejoin="round"
										/>
									</svg>
								</div>
								<p className="txt-sm">Back </p>
							</Link>

							{currentBet !== undefined && (
								<BetConditionDropdown Bet={currentBet} joinBetDetails={joinBetDetails} setjoinBet={setjoinBet} />
							)}
						</div>
						<div className="md:hidden w-full h-28"></div>
					</main>

					{/* -- Aside -- */}
					<aside className="hidden md:flex  w-[286px] h-auto sticky top-6">
						{/* ----- */}
						<div className="create_aside border-gray-200 w-full rounded-lg shadow-md bg-white ">
							{/* header */}
							<div className="h-[56px]  w-full relative header rounded-t-lg middle ">
								<div className="middle">
									<h1 className="header_text txt-sm f-b text-gray-50 p-4">Betslip</h1>

									<p className="rounded bg-gray-400 px-2 p-[2px] text-white txt-xs f-m">
										{joinBetDetails?.Conditions?.length}
									</p>
								</div>
							</div>

							<div className="aside_body p-2 py-6 space-y-3">
								{/* ----bets */}
								{joinBetDetails.Conditions.map((i: any, k: number) => (
									<div key={k} className="space-y-2">
										<BetSlipDetails data={i} bet={currentBet} joinBetDetails={joinBetDetails} setjoinBet={setjoinBet} />
									</div>
								))}

								{/* ----price -box */}
								<div
									className="price_box space-y-2 mt-6 text-gray-500
"
								>
									<div className="row-between w-full">
										<h1 className="p  txt-sm f-m">Stake</h1>
										<h1 className="txt-sm f-b ">N {currentBet?.Amount}</h1>
									</div>

									<div className="row-between w-full">
										<h1 className="p  txt-sm f-m">Potential win</h1>
										<h1 className="txt-sm f-b ">N {currentBet?.Amount}</h1>
									</div>

									<Button
										text={"join Bet"}
										type={"button"}
										isLoading={isLoading}
										full
										primary
										disabled={
											(!hasToken() || joinBetDetails.betType.length < 1) || joinBetDetails.Conditions.length < 1
										}
										click={handlePlaceBet}
									/>
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

export function BetSlipDetails({ data, joinBetDetails, setjoinBet, bet }: any) {
	const { Bet, dispatchBet } = useBet();

	const [sowList, setShowList] = useState(false);

	function handleShowList() {
		setShowList((p) => !p);
	}

	function handleRemoveCondition() {
		const newlist = Bet.Conditions.filter((i: any) => i.Sector !== data.Sector);

		setjoinBet({
			...joinBetDetails,
			Conditions: newlist,
		});
	}

	return (
		<div className="conditon_card border rounded-lg h-auto">
			{/* --header */}
			<div className="  p-3" role="button" onClick={handleShowList}>
				<div className="row-between">
					<h1 className="txt-sm f-m text-gray-700">
						{bet?.Criteria?.TeamA?.name || bet?.Criteria?.TeamA?.TeamName} -{" "}
						{bet?.Criteria?.TeamB?.name || bet?.Criteria?.TeamB?.TeamName}
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
							<div onClick={handleRemoveCondition} className="mt-1">
								<CheckSVG />
							</div>

							<div className="column  space-y-2">
								<h1 className="f-b txt-sm text-gray-900">{data?.Sector} </h1>

								<p className="text-gray-400 txt-xs  f-s">{data?.Codes}</p>
							</div>
						</li>
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

function BetConditionDropdown({ Bet, joinBetDetails, setjoinBet }: any) {
	const [isOpen, setIsOpen] = useState(false);
	const { Criteria } = Bet;

	function handleOpen() {
		setIsOpen((p) => !p);
	}

	const [time, dateR] = formatMatchDate(Bet?.Criteria?.MatchDate);

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
						<h1 className="">{time}</h1>
						<h1 className="bg-gray-50 txt-xs f-s rounded-lg px-4 p-1 text-gray-500">{dateR}</h1>
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
							<BetSelectorDetails sectors={i} joinBetDetails={joinBetDetails} setjoinBet={setjoinBet} />
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

function BetSelectorDetails({ sectors, joinBetDetails, setjoinBet }: any) {
	const [sowList, setShowList] = useState(false);
	const { MarketList } = useBet();
	const { Bet, dispatchBet } = useBet();
	const { notify } = useToast();

	function handleShowList() {
		setShowList((p) => !p);
	}

	function handlePickCondition(i: any) {
		// check if condition already exist i a specific sector
		if (joinBetDetails.Conditions.length > 0) {
			const allSelectedSector: any[] = [];

			joinBetDetails.Conditions.map((i: any) => {
				return allSelectedSector.push(i.Sector);
			});

			if (allSelectedSector.includes(sectors.Sector)) {
				return notify("error", "You can only pick one condition per sector");
			}
		}

		const pickedCondition = {
			Sector: sectors.Sector,
			Codes: i,
			FixtureId: joinBetDetails.FixtureId,
		};

		setjoinBet({
			...joinBetDetails,
			Conditions: [...joinBetDetails.Conditions, pickedCondition],
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
