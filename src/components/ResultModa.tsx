import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useRef, ChangeEventHandler } from "react";
import Button from "./Button";
import DropDown from "./DropDown";
import useScreen from "@/hooks/useScreen";
import { BallSvg } from "@/assets";
import { BiShareAlt } from "react-icons/bi";
import { VscSaveAll } from "react-icons/vsc";
import MatchCard from "./MatchCard";
import { Label } from "./ResultCard";

interface PropTypes {
	betType?: "KoloBet" | "PointBet" | undefined;
	data: any;
	show: boolean;
	handleShow: any;
}

const tabMode = {
	MATCHES: "MATCHES",
	BET: "BET",
	CREATOR: "CREATOR",
};

export const betCardType = {
	KOLO: "KoloBet",
	POINT: "PointBet",
};

const tabs = [
	{
		name: "Matches",
		badge: "9",
		tabMode: tabMode.MATCHES,
	},

	{
		name: "Bet conditions",
		badge: "1",
		tabMode: tabMode.BET,
	},

	{
		name: "Creator’s Bet",
		tabMode: tabMode.CREATOR,
	},
];

const DataD = {
	_id: "64d627b30e2acfd941e37d0f",
	BetId: "64d62736524fb45415c19b45",
	OutCome: [
		[
			{
				Away_Score: 1,
				Home_Score: 0,
				H_first_score: 0,
				H_second_score: 0,
				A_first_score: 1,
				A_second_score: 1,
				Teams: {
					Home: {
						name: "Southampton",
						logo: "https://media-3.api-sports.io/football/teams/41.png",
					},
					Away: {
						name: "Nottingham Forest",
						logo: "https://media-1.api-sports.io/football/teams/65.png",
					},
				},
				FixtureId: 868135,
			},
		],
	],
	FixtureId: 868135,
	Players: [
		{
			userId: "64d3894dde9e45bc765c76be",
			state: "Tie",
		},
	],
	Created: "2023-08-11T12:21:07.940Z",
	__v: 0,
};

const ResultModal = ({ betType, show, data, handleShow }: PropTypes) => {
	const [showDetails, setShowDetails] = useState<{
		show: boolean;
		mode: string | undefined;
	}>({
		show: false,
		mode: betType,
	});
	const [betTabMode, setBetTabMode] = useState(tabMode.MATCHES);

	const { isTablet, isMobile } = useScreen();

	const [showCardOptions, setShowCardOptions] = useState(false);

	const profileRef = useRef<HTMLDivElement>(null);

	// console.log(data, "this unfocrmation");

	function handleShowDetails(cardType?: "KoloBet" | "PointBet") {
		if (showDetails.show) {
			setShowDetails({
				...showDetails,
				show: false,
			});
		} else {
			setShowDetails({
				...showDetails,
				show: true,
				mode: cardType,
			});
		}
	}

	// function tabModeHandler() {
	// 	switch (betTabMode) {
	// 		case tabMode.MATCHES:
	// 			return <Matches data={data} />;
	// 		case tabMode.BET:
	// 			return <Bets data={data} />;
	// 		case tabMode.CREATOR:
	// 			return <Creator data={data} />;
	// 		default:
	// 			break;
	// 	}
	// }

	function handleClickOutside(e: any) {
		if (showCardOptions && profileRef.current && profileRef.current !== e.target) {
			setShowCardOptions(false);
		}
	}

	return show ? (
		<div className="__">
			{isMobile || isTablet ? (
				<div className="betInfo overlay z-[999999999999] fixed top-0 flex items-end left-0  w-full h-full bg-[#0000005c]">
					{true ? (
						<div
							className={`overlay_pane-mobile-deposite  info_panel relative w-full fadeIn-d   ${
								showDetails.show ? "active" : ""
							}  bg-white`}
						>
							{/*  */}

							<div
								role="button"
								onClick={() => handleShowDetails()}
								className="cancle_btn absolute left-1/2 -top-16 -translate-x-1/2"
							>
								<Image
									src={"/icons/dashboard/cancleBtn.svg"}
									alt={""}
									width={48}
									height={48}
									//  onClick={toggle}
									role="button"
								/>
							</div>

							{/* --------bet type details---------- */}
							<div className="content relative overflow-y-scroll custom-scrollbar h-screen">
								<div className="h-auto">
									{/*  */}
									<div className="panel_content  space-y-6  w-full">
										{/* -----------banner row-------- */}

										<div className="p-4 w-full">
											<div className="bet_banner w-full h-[120px] relative">
												{showDetails.mode === betCardType.KOLO ? (
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
										</div>

										{/* -----------second badge row-------- */}
										<div className="w-full px-4 sticky top-0   bg-white shadow pt-4 z-20">
											{/* bet details name and bages------------ */}
											<div className="badge_container row-between ">
												<div className="col">
													<div className="row-between ">
														{showDetails.mode === betCardType.KOLO ? (
															<div className="badge uppercase  p-1 px-2 bg-cyan-50 rounded txt-xs f-b text-cyan-600">
																KOLO bet
															</div>
														) : (
															<div className="badge uppercase  p-1 px-2 bg-yellow-100 rounded txt-xs f-b text-yellow-600">
																point bet
															</div>
														)}
													</div>

													<h1 className="bet_name txt-lg f-eb text-gray-600">Battle of best banterers</h1>

													<Image src={"/images/home/users.png"} alt={""} className="mt-4" width={144} height={24} />
												</div>

												<div className="col">
													<h1 className="amount text-gray-400 txt-xs f-b">Bet amount:</h1>
													<h1 className="txt-md f-b text-gray-700 mt-2 mb-4 text-right">N5000</h1>
												</div>
											</div>

											<div className="mt-4">
												<Link href={"/dashboard/create-bet/bet-details"}>
													<Button text={"Join bet"} type={"button"} primary full />
												</Link>
											</div>

											{/*  --------action tab row-------*/}
											<div className="active_tab w-full   h-[35px] mt-8  overflow-x-scroll custom-scrollbar">
												<div className="w-[400px]  active_tab    h-[35px]  middle space-x-3">
													{tabs.map((i, k) => (
														<div
															role="button"
															onClick={() => setBetTabMode(i.tabMode)}
															className={`tab_item px-3  hover:text-gray-700 border-b-2 space-x-2 ${
																betTabMode == i.tabMode
																	? "text-gray-700 border-gray-700  "
																	: "border-transparent text-gray-500"
															} h-full middle`}
															key={k}
														>
															<p className={`txt-sm f-m`}> {i.name}</p>{" "}
															{i.badge && (
																<p
																	className={`rounded bg-gray-500  px-2 p-[2px] text-white txt-xs f-m ${
																		betTabMode == i.tabMode ? " bg-gray-700 border-gray-700 " : " text-gray-500"
																	}  `}
																>
																	{i.badge}
																</p>
															)}
														</div>
													))}
												</div>
											</div>
										</div>

										<div className="px-4 w-full space-y-4  pb-[200px] ]">
											{/* ------be list --------for each tab */}
											{/* <div className="det_details grid   md:grid-cols-2 gap-6">{tabModeHandler()}</div> */}
											{/*  */}
										</div>
									</div>
								</div>
							</div>
						</div>
					) : (
						<div
							className={`overlay_pane-mobile-deposite  info_panel relative w-full fadeIn-d   ${
								showDetails.show ? "active" : ""
							}  bg-white`}
						>
							{/*  */}

							<div
								role="button"
								onClick={() => handleShowDetails()}
								className="cancle_btn absolute left-1/2 -top-16 -translate-x-1/2"
							>
								<Image
									src={"/icons/dashboard/cancleBtn.svg"}
									alt={""}
									width={48}
									height={48}
									//  onClick={toggle}
									role="button"
								/>
							</div>

							{/* --------bet type details---------- */}
							<div className="content relative overflow-y-scroll custom-scrollbar h-screen">
								<div className="h-auto">
									{/*  */}
									<div className="panel_content  w-full">
										{/* Header --details */}
										<div className="card_header h-[120px] bg-gray-50 w-full p-4 space-y-3">
											<div className="row_one middle space-x-3">
												<BallSvg />
												<h1 className="bet_name txt-lg f-b text-gray-600">Battle of best banterers</h1>

												{showDetails.mode === betCardType.KOLO ? (
													<div className="badge uppercase  p-1 px-2 bg-cyan-50 rounded txt-xs f-b text-cyan-600">
														KOLO bet
													</div>
												) : (
													<div className="badge uppercase  p-1 px-2 bg-yellow-100 rounded txt-xs f-b text-yellow-600">
														point bet
													</div>
												)}
											</div>

											{/* name row */}

											<div className="row_two  space-x-0 ml-12">
												<h1 className="amount text-gray-400 txt-sm f-b">
													Creator: <span className="txt-sm f-b text-gray-700">Peter Zokoro</span>{" "}
												</h1>
											</div>
										</div>

										{/* -----------result  row-------- */}

										<div className="w-full   p-4 sticky top-0 bg-white z-50 ">
											<div className="result_card rounded-lg shadow-bet-card p-6 flex justify-around w-full">
												<div className="col ">
													<h1 className=" text-gray-400 txt-xs f-m">state</h1>
													<h1 className="display-xs  f-eb text-gray-700 ">N4000</h1>
												</div>

												<div className="col ">
													<h1 className=" text-gray-400 txt-xs f-m">Potential Payout</h1>
													<h1 className="display-xs  f-eb text-gray-700 ">N50,000</h1>
												</div>
											</div>

											{/* -----------won section and players avatar list row-------- */}

											<div className="won  w-full row-between mt-6 ">
												<div className="badge uppercase p-1 px-2 bg-[#ECFDF3] rounded txt-sm f-m text-[#027A48]">
													won
												</div>
												<div className="">
													<Image src={"/images/home/users.png"} alt={""} className="" width={144} height={24} />
												</div>
											</div>

											{/* -----------reslut list row-------- */}

											{/* header */}
											<div className="create_aside mt-[46px]">
												<div
													role="button"
													// onClick={handleShowBet}
													className="h-[46px]    w-full relative header rounded-t-lg middle "
												>
													<div className="middle">
														<h1 className="header_text txt-sm f-b text-gray-50 p-4">Results</h1>

														<p className="rounded bg-gray-400 px-2 p-[2px] text-white txt-xs f-m">{8}</p>
													</div>
												</div>
											</div>
										</div>

										<div className="px-4 w-full space-y-4 mt-6  pb-[200px] ]">
											{/* ------be list --------for each tab */}
											{/* <div className="det_details   grid gap-6">{tabModeHandler()}</div> */}
											{/*  */}
										</div>
									</div>
								</div>
							</div>
						</div>
					)}
				</div>
			) : (
				// ----desktop----
				<div className="betInfo overlay z-10 fixed top-0 flex justify-end left-0 strictFadeIn w-full h-full bg-[#0000005c]">
					<div className="info_panel slideInLeft  relative w-[40%]    h-screen bg-white">
						{/*  */}
						<div role="button" onClick={handleShow} className="cancle_btn absolute -left-16 top-1/2 -translate-y-1/2">
							<Image src={"/icons/dashboard/cancleBtn.svg"} alt={""} width={48} height={48} />
						</div>

						{/* --------bet type details---------- */}
						<div className="content relative overflow-y-scroll custom-scrollbar h-screen">
							<div className="h-auto">
								{/*  */}
								<div className="panel_content_result  space-y-6  w-full">
									<div className="header  w-ful">
										<div className="details">
											<div className="ball">
												<BaLLSVG />
											</div>

											<h1 className="name">{data.BetId.BetName}</h1>
										</div>

										<div className="sub_heaer  px-[64px]">
											<h1 className="sub_name">
												Creator: <span>Peter Zokoro</span>
											</h1>
										</div>
									</div>

									{/* -----------amount stake row-------- */}
									<div className="w-full px-12 sticky top-0">
										<div className="ele_card">
											<div className="amount_">
												<p className="am_">Stake</p>
												<h1 className="am">N {"0"}</h1>
											</div>

											<div className="amount_">
												<p className="am_">Payout</p>
												<h1 className="am">N {"0"}</h1>
											</div>
										</div>
									</div>

									{/*  --------action tab row*/}
									<div className="w-full px-[48px] justify-between flex items-end">
										<Label status={data.Players[0]?.state} />

										<p className="players text-sm font-normal text-gray-400">
											Players: <span className="font-bold text-gray-500">{data.Players.length}</span>
										</p>
									</div>
								</div>

								<div className="px-12 w-full space-y-4 mt-6">
									<div className="create_aside border-gray-200 w-full rounded-lg shadow-md bg-[#F9FAFB]">
										{/* header */}
										<div className="h-[56px]  w-full relative header rounded-t-lg middle">
											<div className="middle">
												<h1 className="header_text txt-sm f-b text-gray-50 p-4">Betslip</h1>

												<p className="rounded bg-gray-400 px-2 p-[2px] text-white txt-xs f-m">{9}</p>
											</div>
										</div>

										<div className="body mt-6  p-6 space-y-4">
											<div className="teams p-6 py-4 flex items-center justify-between bg-white rounded-lg">
												<div className="flex space-x-2 items-center">
													<div className="temas_logo  relative flex items-center">
														<div className="logo_box z-10">
															<Image
																src={data.BetId.Criteria?.TeamA?.logo || data.BetId.Criteria?.TeamA?.Logo}
																alt={""}
																className=""
																width={16}
																height={16}
															/>
														</div>

														<div className="logo_box -ml-2 z-20">
															<Image
																src={data.BetId.Criteria?.TeamB?.logo || data.BetId.Criteria?.TeamB?.Logo}
																alt={""}
																className=""
																width={16}
																height={16}
															/>
														</div>
													</div>

													<h1 className="teams_name">
														{data.BetId.Criteria?.TeamA?.name || data.BetId.Criteria?.TeamA?.TeamName} -{" "}
														{data.BetId.Criteria?.TeamB?.name || data.BetId.Criteria?.TeamB?.TeamName}
													</h1>
												</div>

												<Label status={data.Players[0]?.state} />
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	) : null;
};

function BaLLSVG() {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
			<g clip-path="url(#clip0_3608_11753)">
				<path
					d="M11.9961 2.00146C6.47609 2.00146 1.99609 6.48147 1.99609 12.0015C1.99609 17.5215 6.47609 22.0015 11.9961 22.0015C17.5161 22.0015 21.9961 17.5215 21.9961 12.0015C21.9961 6.48147 17.5161 2.00146 11.9961 2.00146ZM12.9961 5.30147L14.3461 4.35146C16.1661 4.91147 17.7161 6.11147 18.7261 7.69147L18.3361 9.03147L16.9861 9.49147L12.9961 6.70147V5.30147ZM9.64609 4.35146L10.9961 5.30147V6.70147L7.00609 9.49147L5.65609 9.03147L5.26609 7.69147C6.27609 6.12147 7.82609 4.92147 9.64609 4.35146ZM7.07609 17.1115L5.93609 17.2115C4.72609 15.8115 3.99609 13.9915 3.99609 12.0015C3.99609 11.8815 4.00609 11.7715 4.01609 11.6515L5.01609 10.9215L6.39609 11.4015L7.85609 15.7415L7.07609 17.1115ZM14.4961 19.5915C13.7061 19.8515 12.8661 20.0015 11.9961 20.0015C11.1261 20.0015 10.2861 19.8515 9.49609 19.5915L8.8061 18.1015L9.44609 17.0015H14.5561L15.1961 18.1115L14.4961 19.5915ZM14.2661 15.0015H9.72609L8.37609 10.9815L11.9961 8.44147L15.6261 10.9815L14.2661 15.0015ZM18.0561 17.2115L16.9161 17.1115L16.1261 15.7415L17.5861 11.4015L18.9761 10.9315L19.9761 11.6615C19.9861 11.7715 19.9961 11.8815 19.9961 12.0015C19.9961 13.9915 19.2661 15.8115 18.0561 17.2115Z"
					fill="#374151"
				/>
			</g>
			<defs>
				<clipPath id="clip0_3608_11753">
					<rect width="24" height="24" fill="white" />
				</clipPath>
			</defs>
		</svg>
	);
}
// function Matches({ data }: any) {
// 	return (
// 		<MatchCard
// 			teamData={{
// 				TeamA: {
// 					Logo: data.Criteria.TeamA.Logo,
// 					TeamName: data.Criteria.TeamA.TeamName,
// 				},
// 				TeamB: {
// 					Logo: data.Criteria.TeamB.Logo,
// 					TeamName: data.Criteria.TeamB.TeamName,
// 				},
// 			}}
// 		/>
// 	);
// }

// function Bets({ data }: any) {
// 	return (
// 		<>
// 			{data?.Criteria.Conditions.map((i: any, k: React.Key | null | undefined) => (
// 				<div key={k} className="teams_display border border-gray-200 rounded-lg px-4 p-5 ">
// 					<div className="  space-x-4 items-start flex">
// 						<Image className="team_logo " src={"/icons/green_ball.svg"} alt="chealse" width={48} height={48} />
// 						<div className="texts">
// 							<h1 className="team_name txt-sm f-b text-gray-700">{i.Sector}</h1>
// 							<p className="team_name txt-sm  text-gray-600">Predict who wins or draws</p>
// 						</div>
// 					</div>
// 				</div>
// 			))}
// 		</>
// 	);
// }

// function Creator({ data }: any)
// {

// 	const arrr = typeof data?.CreatorSelection?.Conditions === 'string'

// 	// console.log(arrr);

// 	console.log(data);

// 	return (
// 		<>
// 			{/* --team  display baner---- */}
// 			{!arrr &&  data?.CreatorSelection?.Conditions?.map(
// 				(
// 					i: {
// 						Codes:
// 							| string
// 							| number
// 							| boolean
// 							| React.ReactElement<any, string | React.JSXElementConstructor<any>>
// 							| React.ReactFragment
// 							| React.ReactPortal
// 							| null
// 							| undefined;
// 						Sector:
// 							| string
// 							| number
// 							| boolean
// 							| React.ReactElement<any, string | React.JSXElementConstructor<any>>
// 							| React.ReactFragment
// 							| React.ReactPortal
// 							| null
// 							| undefined;
// 					},
// 					k: React.Key | null | undefined
// 				) => (
// 					<div key={k} className="creators_card border-gray-200 rounded-lg shadow-md">
// 						{/* header */}
// 						<div className="h-12 w-full relative header middle ">
// 							<h1 className="header_text txt-sm f-b text-gray-50 p-4">
// 								{data?.Criteria?.TeamA.name || data?.Criteria?.TeamA.TeamName} - {data.Criteria.TeamB.name  || data?.Criteria?.TeamB.TeamName}
// 							</h1>
// 						</div>

// 						<div className=" options w-full">
// 							<div className="middle   px-6  ">
// 								<div className=" w-full border-b border-dashed py-4 space-x-4 flex">
// 									<Image className="team_logo " src={"/icons/ball.svg"} alt="chealse" width={24} height={32} />
// 									<div className="texts w-full">
// 										<div className="row-between w-full">
// 											<h1 className="team_name txt-sm f-b text-gray-900">{i.Codes}</h1>

// 											{/* ssN className="team_name txt-sm f-b text-gray-900">2.45</h1> */}
// 										</div>
// 										<p className="team_name txt-xs f-s  text-gray-300">{i.Sector}</p>
// 									</div>
// 								</div>
// 							</div>
// 						</div>
// 					</div>
// 				)
// 			)}
// 		</>
// 	);
// }

export default ResultModal;
