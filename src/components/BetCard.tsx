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
import { useUser } from "@/context/userContext";

interface PropTypes {
	betType: "KoloBet" | "PointBet" | undefined;
	data: any;
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

const BetCard = ({ betType, data }: PropTypes) => {
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
	const [copy, setCopy] = useState(false);

	const profileRef = useRef<HTMLDivElement>(null);

	const { User } = useUser();



	function userJoined() {
		// check if current usser is among the playerws
		const yes = data?.Players.find((i: any) => i.userId === User._id);

		// console.log(yes);

		if (yes) return true;
		return false;
	}

	function handleCopy() {
		setCopy(!copy);
	}

	const hasJoined = data?.Creator._id === User._id || userJoined();

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

	

	function tabModeHandler() {
		switch (betTabMode) {
			case tabMode.MATCHES:
				return <Matches data={data} />;
			case tabMode.BET:
				return <Bets data={data} />;
			case tabMode.CREATOR:
				return <Creator data={data} />;
			default:
				break;
		}
	}

	function handleClickOutside(e: any) {
		if (showCardOptions && profileRef.current && profileRef.current !== e.target) {
			setShowCardOptions(false);
		}
	}

	const copyToClipboard = () => {
		// Select the input element
		const inputElement = document.getElementById("betLink");

		// Select the input text
		// @ts-ignore
		inputElement?.select();
		// @ts-ignore
		inputElement?.setSelectionRange(0, 99999); // For mobile devices

		// Copy the text to the clipboard
		document.execCommand("copy");
	};


	// console.log(data.Players);
	

	return (
		<>
			<div
				ref={profileRef}
				onClick={handleClickOutside}
				className="bet_card shadow-bet-card bg-white border border-gray-200 rounded-lg "
			>
				<div className=" p-3 md:p-6 space-y-4">
					<div
						style={{
							backgroundImage: `url(${"/images/home/bet_image.jpg"})`,
							backgroundSize: "cover",
							backgroundPosition: "center",
							backgroundRepeat: "no-repeat",
						}}
						className="bet_banner w-full h-32  relative flex justify-between items-center p-6 bg-[#0000003d] rounded-md"
					>
						<div className="imgTa">
							<Image
								className="team_logo "
								src={
									data?.Criteria?.TeamA?.Logo == "TeamALogoUrl"
										? "/icons/teams/chealse_logo.svg"
										: data?.Criteria?.TeamA?.Logo || data?.Criteria?.TeamA?.logo
								}
								alt={data?.Criteria?.TeamA?.name || data?.Criteria?.TeamA?.TeamName}
								width={48}
								height={48}
							/>
						</div>

						<div className="imgTa">
							<Image
								className="team_logo "
								src={
									data?.Criteria?.TeamB?.Logo == "TeamALogoUrl"
										? "/icons/teams/chealse_logo.svg"
										: data?.Criteria?.TeamB?.Logo || data?.Criteria?.TeamB?.logo
								}
								alt={data?.Criteria?.TeamB?.name || data?.Criteria?.TeamB?.TeamName}
								width={48}
								height={48}
							/>
						</div>
					</div>

					<div className="badge_container space-y-2 ">
						<div className="row-between">
							{showDetails.mode == betCardType.KOLO ? (
								<div className="badge uppercase  p-1 px-2 bg-cyan-50 rounded txt-xs f-b text-cyan-600">KOLO bet</div>
							) : (
								<div className="badge uppercase  p-1 px-2 bg-yellow-100 rounded txt-xs f-b text-yellow-600">
									point bet
								</div>
							)}

							<div
								role="button"
								title="options"
								onClick={() => setShowCardOptions((p) => !p)}
								className="dots relative"
							>
								<Image src={"/icons/dots.svg"} alt={""} width={24} height={24} className="" />

								{showCardOptions && (
									<div
										// ref={profileRef}
										className="bet_card-dropdown dropdown_profile z-50 absolute -right-1/2 top-[30px] bg-white  w-48 rounded-lg p-6 space-y-[18px] shadow-light strictFadeIn"
									>
										{hasJoined && (
											<div
												role="button"
												onClick={() => handleShowDetails(betType)}
												className="profile_item middle space-x-4"
												// href={"/dashboard/profile"}
											>
												<VscSaveAll className=" profile_item-icon" />

												<p className="item_name txt-sm f-m text-gray-700 hover:text-sec">View</p>
											</div>
										)}

										<div role="button" onClick={handleCopy} className="profile_logout middle space-x-4">
											<BiShareAlt className="profile_logout-icon" />

											<p className="item_name txt-sm f-m text-gray-700  hover:text-sec">Share</p>
										</div>
									</div>
								)}
							</div>
						</div>

						<h1 className="bet_name txt-lg f-eb text-gray-600">{data?.BetName}</h1>
					</div>

					<div className="author row-between">
						<h1 className="name txt-xs f-m text-gray-400">
							By <span className="f-b text-gray-600">{data?.Creator.Username}</span>
						</h1>

						<div className="amounts middle space-x-2">
							{data?.Discount?.discount !== 0 && (
								<div className="">
									<h1 className="off txt-xs f-s text-gray-500">{data?.Discount.discount == '' ? '0%' : ` ${data?.Discount.discount}%`} off</h1>
									<h1 className="off txt-xs  text-gray-300 ">/₦{data?.Amount}</h1>
								</div>
							)}

							<h1 className="stake text-gray-500 txt-xl f-b">₦{data?.Amount}</h1>
						</div>
					</div>
				</div>

				<footer className="card_footer row-center w-full rounded-b h-20 bg-gray-100 p-6">
					<div className="row-between  w-full">
						<h1 className="name txt-xs f-m text-gray-400">
							<span className="f-b text-gray-700">{data?.Players.length}</span> Players
						</h1>

						{hasJoined ? (
							<h1 className="name txt-md f-m text-gray-400">
								Payout: <span className="f-s text-gray-700">{data?.Players.length * data?.Amount}</span>
							</h1>
						) : (
							<div
								role="button"
								onClick={() => handleShowDetails(betType)}
								className="join capitalize border border-gray-300 rounded-lg px-2 p-1 txt-md f-s text-gray-700"
							>
								<p> Join now</p>
							</div>
						)}
					</div>
				</footer>
			</div>



			{/* bet side bar  */}
			{showDetails.show && (
				<div className="__ ">
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
															<Button text={hasJoined ? "Joined" : "Join Bet"} type={"button"} primary full />
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
													<div className="det_details grid   md:grid-cols-2 gap-6">{tabModeHandler()}</div>
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
													<div className="det_details   grid gap-6">{tabModeHandler()}</div>
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
						<div className="betInfo overlay z-[70] fixed top-0 flex justify-end left-0 strictFadeIn w-full h-full bg-[#0000005c]">
							<div className="info_panel slideInLeft  relative w-[50%]    h-screen bg-white">
								{/*  */}
								<div
									role="button"
									onClick={() => handleShowDetails()}
									className="cancle_btn absolute -left-16 top-1/2 -translate-y-1/2"
								>
									<Image src={"/icons/dashboard/cancleBtn.svg"} alt={""} width={48} height={48} />
								</div>

								{/* --------bet type details---------- */}
								<div className="content relative overflow-y-scroll custom-scrollbar h-screen">
									<div className="h-auto">
										{/*  */}
										<div className="panel_content  space-y-6  w-full">
											<div className=" w-full p-6">
												<div className="bet_banner w-full h-[192px] relative">
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
											<div className="w-full px-12 sticky top-0   bg-white shadow pt-4 z-20">
												<div className="badge_container row-between ">
													<div className="col space-y-2">
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

															<h1 className="bet_name txt-lg f-eb text-gray-600">{data?.Creator.Username}</h1>
															<h1 className="bet_name txt-xs  text-gray-400">Players: <b>{data?.Players.length}</b></h1>
															

															<div className="temas_logo  relative flex items-center ml-4">
																{
																	data?.Players.map((i: any,k:number) => (
																		<div key={i} className={`logo_box z-${10 * (k + 1)  } -ml-3`}>
																	<div className="rounded-full font-bold text-gray-700 text-sm w-6 h-6 centered">
																		<p>{i.userId?.slice(5,7).toUpperCase()}</p>
																			</div>
																			</div>
																			
																	))
														}
														

														
													</div>

														{/* <Image src={"/images/home/users.png"} alt={""} className="mt-4" width={144} height={24} /> */}
													</div>

													<div className="col">
														<h1 className="amount text-gray-400 txt-xs f-b">Bet amount</h1>
														<h1 className="txt-md f-b text-gray-700 mt-2 mb-4">N {data?.Amount}</h1>
														<Link href={`/dashboard/join?id=${data._id}`}>
															<Button
																disabled={hasJoined}
																text={hasJoined ? "Joined" : "Join Bet"}
																type={"button"}
																primary
																full
															/>
															{/* <Button text={"Join bet"} type={"button"} primary /> */}
														</Link>
													</div>
												</div>

												{/*  --------action tab row*/}

												<div className="active_tab w-full   h-[35px] mt-8  middle space-x-3">
													{tabs.map((i, k) => (
														<div
															role="button"
															onClick={() => setBetTabMode(i.tabMode)}
															className={`tab_item px-3  hover:text-gray-700  border-b-2 space-x-2 ${
																betTabMode == i.tabMode
																	? "text-gray-700 border-gray-700  "
																	: "border-transparent text-gry-500"
															} h-full middle`}
															key={k}
														>
															<p className={`txt-sm  ${betTabMode == i.tabMode ? "f-b" : "f-m"}`}> {i.name}</p>{" "}
															{i.badge && (
																<p className="rounded bg-gray-600 px-2 p-[2px] text-white txt-xs f-m">{i.badge}</p>
															)}
														</div>
													))}
												</div>
											</div>

											<div className="px-12 w-full space-y-4">
												{/* ------be list --------for each tab */}
												<div className="det_details   grid grid-cols-2 gap-6">{tabModeHandler()}</div>
												<div className="w-full h-6 invisible"></div>
												{/*  */}
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					)}
				</div>
			)}

			{copy && (
				<div className="modal top-0 left-0 strictFadeIn fixed w-full h-full bg-[#0000003e] grid place-content-center z-30">
					<div className=" bg-white rounded p-4 py-8 FadeIn space-y-2 relative w-[400px]">
						<div role="button" onClick={() => handleCopy()} className="cancle_btn absolute -right-11  -top-11">
							<Image
								src={"/icons/dashboard/cancleBtn.svg"}
								alt={""}
								width={48}
								height={48}
								//  onClick={toggle}
								role="button"
							/>
						</div>

						<h1 className="txt-sm text-gray-600 f-n">Bet link</h1>

						<div className="w-full relative">
							<input
								id="betLink"
								type="text"
								className="rounded border p-2 text-sm text-gray-400 font-medium w-full"
								value={`https://selfbet.vercel.app/dashboard/join?id=${data?._id}`}
							/>

							<button
								onClick={copyToClipboard}
								className="bg-sec text-white copy absolute right-0  top-0 rounded p-2 px-4 capitalize text-sm "
							>
								copy
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

function Matches({ data }: any)
{
	
	
	return (
		<MatchCard 
			teamData={{
				TeamA: {
					Logo: data.Criteria.TeamA.Logo || data.Criteria.TeamA.logo,
					TeamName: data.Criteria.TeamA.TeamName || data.Criteria.TeamA.name
				},
				TeamB: {
					Logo: data.Criteria.TeamB.Logo || data.Criteria.TeamB.logo,	
					TeamName: data.Criteria.TeamB.TeamName || data.Criteria.TeamB.name
				},
			}}
		/>
	);
}

function Bets({ data }: any) {
	return (
		<>
			{data?.Criteria.Conditions.map((i: any, k: React.Key | null | undefined) => (
				<div key={k} className="teams_display border border-gray-200 rounded-lg px-4 p-5 ">
					<div className="  space-x-4 items-start flex">
						<Image className="team_logo " src={"/icons/green_ball.svg"} alt="chealse" width={48} height={48} />
						<div className="texts">
							<h1 className="team_name txt-sm f-b text-gray-700">{i.Sector}</h1>
							<p className="team_name txt-sm  text-gray-600">Predict who wins or draws</p>
						</div>
					</div>
				</div>
			))}
		</>
	);
}

function Creator({ data }: any) {
	const arrr = typeof data?.CreatorSelection?.Conditions === "string";

	// console.log(arrr);

	// console.log(data);

	return (
		<>
			{/* --team  display baner---- */}
			{!arrr &&
				data?.CreatorSelection?.Conditions?.map(
					(
						i: {
							Codes:
								| string
								| number
								| boolean
								| React.ReactElement<any, string | React.JSXElementConstructor<any>>
								| React.ReactFragment
								| React.ReactPortal
								| null
								| undefined;
							Sector:
								| string
								| number
								| boolean
								| React.ReactElement<any, string | React.JSXElementConstructor<any>>
								| React.ReactFragment
								| React.ReactPortal
								| null
								| undefined;
						},
						k: React.Key | null | undefined
					) => (
						<div key={k} className="creators_card border-gray-200 rounded-lg shadow-md">
							{/* header */}
							<div className="h-12 w-full relative header middle ">
								<h1 className="header_text txt-sm f-b text-gray-50 p-4">
									{data?.Criteria?.TeamA.name || data?.Criteria?.TeamA.TeamName} -{" "}
									{data.Criteria.TeamB.name || data?.Criteria?.TeamB.TeamName}
								</h1>
							</div>

							<div className=" options w-full">
								<div className="middle   px-6  ">
									<div className=" w-full border-b border-dashed py-4 space-x-4 flex">
										<Image className="team_logo " src={"/icons/ball.svg"} alt="chealse" width={24} height={32} />
										<div className="texts w-full">
											<div className="row-between w-full">
												<h1 className="team_name txt-sm f-b text-gray-900">{i.Codes}</h1>

												{/* ssN className="team_name txt-sm f-b text-gray-900">2.45</h1> */}
											</div>
											<p className="team_name txt-xs f-s  text-gray-300">{i.Sector}</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					)
				)}
		</>
	);
}

export default BetCard;
