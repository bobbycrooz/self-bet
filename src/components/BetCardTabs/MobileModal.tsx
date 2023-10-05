import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useRef, ChangeEventHandler } from "react";
import Button from "../Button";
import DropDown from "../DropDown";
import useScreen from "@/hooks/useScreen";
import { BallSvg } from "@/assets";
import { BiShareAlt } from "react-icons/bi";
import { VscSaveAll } from "react-icons/vsc";
import MatchCard from "../MatchCard";
import { useUser } from "@/context/userContext";
import { getUserProfile } from "@/axios/endpoints/auth.endpoint";
import { Bets, Creator, Matches } from ".";
import { PlayerAvatar } from "./DesktopModal";

export function MobileModal({
	showDetails,
	handleShowDetails,
	betCardType,
	hasJoined,
	tabs,
	setBetTabMode,
	betTabMode,
	tabModeHandler,
	handleCopy,
	data,
}: any) {
	return (
		<div className="betInfo overlay z-[99] fixed top-0 flex items-end left-0  w-full h-full bg-[#0000005c]">
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

											<h1 className="bet_name txt-lg f-eb text-gray-600">{data?.Creator.Username}</h1>
											<div className="temas_logo  relative flex items-center ml-4">
												{data?.Players.map((i: any, k: number) => (
													<div key={i} className={`logo_box z-${10 * (k + 1)} -ml-3`}>
														<PlayerAvatar id={i.userId} />
													</div>
												))}
											</div>
										</div>

										<div className="col">
											<h1 className="amount text-gray-400 txt-xs f-b">Bet amount:</h1>
											<h1 className="txt-md f-b text-gray-700 mt-2 mb-4 text-right">N {data?.Amount}</h1>
										</div>
									</div>

									<div className="mt-4 space-x-4 items-center w-full  grid grid-cols-5">
										<div className="col-span-4">
											<Link href={`/dashboard/join?id=${data._id}`}>
												<Button text={hasJoined ? "Joined" : "Join Bet"} type={"button"} primary full />
											</Link>
										</div>

										<div role="button" onClick={handleCopy} className="border centered p-4 rounded-xl">
											<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
												<path
													d="M10.541 12.3578L10.6696 11.9719L10.318 11.7675L5.61803 9.03412L5.30628 8.85282L5.03586 9.09142C4.88941 9.22064 4.72685 9.32107 4.54612 9.39405L4.54536 9.39435C4.37264 9.46443 4.1921 9.49967 4 9.49967C3.57554 9.49967 3.23094 9.35684 2.93689 9.06279C2.64283 8.76873 2.5 8.42414 2.5 7.99967C2.5 7.57521 2.64283 7.23062 2.93689 6.93656C3.23094 6.64251 3.57554 6.49967 4 6.49967C4.19229 6.49967 4.37299 6.53477 4.54578 6.6045C4.72667 6.67794 4.88935 6.77866 5.03586 6.90793L5.30628 7.14653L5.61803 6.96523L10.318 4.2319L10.6696 4.02742L10.541 3.64156C10.5305 3.6099 10.52 3.56659 10.5123 3.5091C10.5039 3.4456 10.5 3.387 10.5 3.33301C10.5 2.90855 10.6428 2.56395 10.9369 2.26989L10.5833 1.91634L10.9369 2.26989C11.2309 1.97584 11.5755 1.83301 12 1.83301C12.4245 1.83301 12.7691 1.97584 13.0631 2.26989C13.3572 2.56395 13.5 2.90855 13.5 3.33301C13.5 3.75747 13.3572 4.10207 13.0631 4.39612C12.7691 4.69018 12.4245 4.83301 12 4.83301C11.8079 4.83301 11.6274 4.79776 11.4546 4.72769L11.4539 4.72738C11.2732 4.6544 11.1106 4.55397 10.9641 4.42475L10.6937 4.18615L10.382 4.36745L5.68197 7.10079L5.33037 7.30526L5.45899 7.69112C5.46956 7.72284 5.48003 7.76626 5.48774 7.82393L5.98331 7.75768L5.4877 7.82358C5.49614 7.88709 5.5 7.94568 5.5 7.99967C5.5 8.05366 5.49614 8.11192 5.48774 8.17475L5.4877 8.1751C5.47996 8.2333 5.46947 8.27678 5.45899 8.30823L5.33037 8.69409L5.68197 8.89856L10.382 11.6319L10.6937 11.8132L10.9641 11.5746C11.1107 11.4453 11.2734 11.3446 11.4543 11.2711C11.6271 11.2014 11.8077 11.1663 12 11.1663C12.4245 11.1663 12.7691 11.3092 13.0631 11.6032C13.3572 11.8973 13.5 12.2419 13.5 12.6663C13.5 13.0908 13.3572 13.4354 13.0631 13.7295C12.7691 14.0235 12.4245 14.1663 12 14.1663C11.5755 14.1663 11.2309 14.0235 10.9369 13.7295C10.6428 13.4354 10.5 13.0908 10.5 12.6663C10.5 12.6124 10.5038 12.554 10.5123 12.4906C10.52 12.4329 10.5304 12.3895 10.541 12.3578ZM11.1718 4.16189L11.5253 3.80834L11.1718 4.16189C11.3979 4.38803 11.6855 4.49967 12 4.49967C12.3145 4.49967 12.6021 4.38803 12.8282 4.16189C13.0544 3.93568 13.1667 3.64808 13.1667 3.33301C13.1667 3.01794 13.0544 2.73034 12.8282 2.50412C12.6021 2.27799 12.3145 2.16634 12 2.16634C11.6855 2.16634 11.3979 2.27799 11.1718 2.50412L11.5253 2.85767L11.1718 2.50412C10.9456 2.73034 10.8333 3.01794 10.8333 3.33301C10.8333 3.64808 10.9456 3.93568 11.1718 4.16189ZM4.8295 7.1714L4.82827 7.17017C4.60193 6.94462 4.31452 6.83301 4 6.83301C3.68548 6.83301 3.39807 6.94462 3.17173 7.17017L3.1705 7.1714C2.94494 7.39774 2.83333 7.68515 2.83333 7.99967C2.83333 8.31422 2.94498 8.60176 3.17111 8.82789L3.52467 8.47434L3.17111 8.8279C3.39733 9.05411 3.68493 9.16634 4 9.16634C4.31507 9.16634 4.60267 9.05411 4.82889 8.8279C5.05502 8.60176 5.16667 8.31422 5.16667 7.99967C5.16667 7.68515 5.05506 7.39774 4.8295 7.1714ZM13.1667 12.6663C13.1667 12.3515 13.0546 12.064 12.8282 11.8381C12.6023 11.6117 12.3148 11.4997 12 11.4997C11.6852 11.4997 11.3977 11.6117 11.1718 11.8381C10.9454 12.064 10.8333 12.3515 10.8333 12.6663C10.8333 12.9811 10.9454 13.2686 11.1718 13.4946C11.3977 13.7209 11.6852 13.833 12 13.833C12.3148 13.833 12.6023 13.7209 12.8282 13.4946C13.0546 13.2686 13.1667 12.9811 13.1667 12.6663Z"
													fill="#374151"
													stroke="#374151"
												/>
											</svg>
										</div>
									</div>

									{/*  --------action tab row-------*/}
									<div className="active_tab w-full   h-[35px] mt-8  overflow-x-scroll custom-scrollbar">
										<div className="w-[400px]  active_tab    h-[35px]  middle space-x-3">
											{tabs.map((i: any, k: number) => (
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
										<div className="badge uppercase p-1 px-2 bg-[#ECFDF3] rounded txt-sm f-m text-[#027A48]">won</div>
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
	);
}

// <div className="betInfo overlay z-[999999999999] fixed top-0 flex items-end left-0  w-full h-full bg-[#0000005c]">
// 						{true ? (
// 							<div
// 								className={`overlay_pane-mobile-deposite  info_panel relative w-full fadeIn-d   ${
// 									showDetails.show ? "active" : ""
// 								}  bg-white`}
// 							>
// 								{/*  */}

// 								<div
// 									role="button"
// 									onClick={() => handleShowDetails()}
// 									className="cancle_btn absolute left-1/2 -top-16 -translate-x-1/2"
// 								>
// 									<Image
// 										src={"/icons/dashboard/cancleBtn.svg"}
// 										alt={""}
// 										width={48}
// 										height={48}
// 										//  onClick={toggle}
// 										role="button"
// 									/>
// 								</div>

// 								{/* --------bet type details---------- */}
// 								<div className="content relative overflow-y-scroll custom-scrollbar h-screen">
// 									<div className="h-auto">
// 										{/*  */}
// 										<div className="panel_content  space-y-6  w-full">
// 											{/* -----------banner row-------- */}

// 											<div className="p-4 w-full">
// 												<div className="bet_banner w-full h-[120px] relative">
// 													{showDetails.mode === betCardType.KOLO ? (
// 														<Image
// 															src={"/images/home/kolo_banner.png"}
// 															alt={""}
// 															fill
// 															className="r"
// 															// width={300}
// 															// height={128}
// 														/>
// 													) : (
// 														<Image
// 															src={"/images/home/point_banner.png"}
// 															alt={""}
// 															fill
// 															className="r"
// 															// width={300}
// 															// height={128}
// 														/>
// 													)}
// 												</div>
// 											</div>

// 											{/* -----------second badge row-------- */}
// 											<div className="w-full px-4 sticky top-0   bg-white shadow pt-4 z-20">
// 												{/* bet details name and bages------------ */}
// 												<div className="badge_container row-between ">
// 													<div className="col">
// 														<div className="row-between ">
// 															{showDetails.mode === betCardType.KOLO ? (
// 																<div className="badge uppercase  p-1 px-2 bg-cyan-50 rounded txt-xs f-b text-cyan-600">
// 																	KOLO bet
// 																</div>
// 															) : (
// 																<div className="badge uppercase  p-1 px-2 bg-yellow-100 rounded txt-xs f-b text-yellow-600">
// 																	point bet
// 																</div>
// 															)}
// 														</div>

// 														<h1 className="bet_name txt-lg f-eb text-gray-600">Battle of best banterers</h1>

// 														<Image src={"/images/home/users.png"} alt={""} className="mt-4" width={144} height={24} />
// 													</div>

// 													<div className="col">
// 														<h1 className="amount text-gray-400 txt-xs f-b">Bet amount:</h1>
// 														<h1 className="txt-md f-b text-gray-700 mt-2 mb-4 text-right">N5000</h1>
// 													</div>
// 												</div>

// 												<div className="mt-4 space-x-2 flex items-center">
// 													<Link href={"/dashboard/create-bet/bet-details"}>
// 														<Button text={hasJoined ? "Joined" : "Join Bet"} type={"button"} primary full />
// 													</Link>

// 													<div className="border centered w-10 h-10">
// 														<svg
// 															xmlns="http://www.w3.org/2000/svg"
// 															width="16"
// 															height="16"
// 															viewBox="0 0 16 16"
// 															fill="none"
// 														>
// 															<path
// 																d="M10.541 12.3578L10.6696 11.9719L10.318 11.7675L5.61803 9.03412L5.30628 8.85282L5.03586 9.09142C4.88941 9.22064 4.72685 9.32107 4.54612 9.39405L4.54536 9.39435C4.37264 9.46443 4.1921 9.49967 4 9.49967C3.57554 9.49967 3.23094 9.35684 2.93689 9.06279C2.64283 8.76873 2.5 8.42414 2.5 7.99967C2.5 7.57521 2.64283 7.23062 2.93689 6.93656C3.23094 6.64251 3.57554 6.49967 4 6.49967C4.19229 6.49967 4.37299 6.53477 4.54578 6.6045C4.72667 6.67794 4.88935 6.77866 5.03586 6.90793L5.30628 7.14653L5.61803 6.96523L10.318 4.2319L10.6696 4.02742L10.541 3.64156C10.5305 3.6099 10.52 3.56659 10.5123 3.5091C10.5039 3.4456 10.5 3.387 10.5 3.33301C10.5 2.90855 10.6428 2.56395 10.9369 2.26989L10.5833 1.91634L10.9369 2.26989C11.2309 1.97584 11.5755 1.83301 12 1.83301C12.4245 1.83301 12.7691 1.97584 13.0631 2.26989C13.3572 2.56395 13.5 2.90855 13.5 3.33301C13.5 3.75747 13.3572 4.10207 13.0631 4.39612C12.7691 4.69018 12.4245 4.83301 12 4.83301C11.8079 4.83301 11.6274 4.79776 11.4546 4.72769L11.4539 4.72738C11.2732 4.6544 11.1106 4.55397 10.9641 4.42475L10.6937 4.18615L10.382 4.36745L5.68197 7.10079L5.33037 7.30526L5.45899 7.69112C5.46956 7.72284 5.48003 7.76626 5.48774 7.82393L5.98331 7.75768L5.4877 7.82358C5.49614 7.88709 5.5 7.94568 5.5 7.99967C5.5 8.05366 5.49614 8.11192 5.48774 8.17475L5.4877 8.1751C5.47996 8.2333 5.46947 8.27678 5.45899 8.30823L5.33037 8.69409L5.68197 8.89856L10.382 11.6319L10.6937 11.8132L10.9641 11.5746C11.1107 11.4453 11.2734 11.3446 11.4543 11.2711C11.6271 11.2014 11.8077 11.1663 12 11.1663C12.4245 11.1663 12.7691 11.3092 13.0631 11.6032C13.3572 11.8973 13.5 12.2419 13.5 12.6663C13.5 13.0908 13.3572 13.4354 13.0631 13.7295C12.7691 14.0235 12.4245 14.1663 12 14.1663C11.5755 14.1663 11.2309 14.0235 10.9369 13.7295C10.6428 13.4354 10.5 13.0908 10.5 12.6663C10.5 12.6124 10.5038 12.554 10.5123 12.4906C10.52 12.4329 10.5304 12.3895 10.541 12.3578ZM11.1718 4.16189L11.5253 3.80834L11.1718 4.16189C11.3979 4.38803 11.6855 4.49967 12 4.49967C12.3145 4.49967 12.6021 4.38803 12.8282 4.16189C13.0544 3.93568 13.1667 3.64808 13.1667 3.33301C13.1667 3.01794 13.0544 2.73034 12.8282 2.50412C12.6021 2.27799 12.3145 2.16634 12 2.16634C11.6855 2.16634 11.3979 2.27799 11.1718 2.50412L11.5253 2.85767L11.1718 2.50412C10.9456 2.73034 10.8333 3.01794 10.8333 3.33301C10.8333 3.64808 10.9456 3.93568 11.1718 4.16189ZM4.8295 7.1714L4.82827 7.17017C4.60193 6.94462 4.31452 6.83301 4 6.83301C3.68548 6.83301 3.39807 6.94462 3.17173 7.17017L3.1705 7.1714C2.94494 7.39774 2.83333 7.68515 2.83333 7.99967C2.83333 8.31422 2.94498 8.60176 3.17111 8.82789L3.52467 8.47434L3.17111 8.8279C3.39733 9.05411 3.68493 9.16634 4 9.16634C4.31507 9.16634 4.60267 9.05411 4.82889 8.8279C5.05502 8.60176 5.16667 8.31422 5.16667 7.99967C5.16667 7.68515 5.05506 7.39774 4.8295 7.1714ZM13.1667 12.6663C13.1667 12.3515 13.0546 12.064 12.8282 11.8381C12.6023 11.6117 12.3148 11.4997 12 11.4997C11.6852 11.4997 11.3977 11.6117 11.1718 11.8381C10.9454 12.064 10.8333 12.3515 10.8333 12.6663C10.8333 12.9811 10.9454 13.2686 11.1718 13.4946C11.3977 13.7209 11.6852 13.833 12 13.833C12.3148 13.833 12.6023 13.7209 12.8282 13.4946C13.0546 13.2686 13.1667 12.9811 13.1667 12.6663Z"
// 																fill="#374151"
// 																stroke="#374151"
// 															/>
// 														</svg>
// 													</div>
// 												</div>

// 												{/*  --------action tab row-------*/}
// 												<div className="active_tab w-full   h-[35px] mt-8  overflow-x-scroll custom-scrollbar">
// 													<div className="w-[400px]  active_tab    h-[35px]  middle space-x-3">
// 														{tabs.map((i, k) => (
// 															<div
// 																role="button"
// 																onClick={() => setBetTabMode(i.tabMode)}
// 																className={`tab_item px-3  hover:text-gray-700 border-b-2 space-x-2 ${
// 																	betTabMode == i.tabMode
// 																		? "text-gray-700 border-gray-700  "
// 																		: "border-transparent text-gray-500"
// 																} h-full middle`}
// 																key={k}
// 															>
// 																<p className={`txt-sm f-m`}> {i.name}</p>{" "}
// 																{i.badge && (
// 																	<p
// 																		className={`rounded bg-gray-500  px-2 p-[2px] text-white txt-xs f-m ${
// 																			betTabMode == i.tabMode ? " bg-gray-700 border-gray-700 " : " text-gray-500"
// 																		}  `}
// 																	>
// 																		{i.badge}
// 																	</p>
// 																)}
// 															</div>
// 														))}
// 													</div>
// 												</div>
// 											</div>

// 											<div className="px-4 w-full space-y-4  pb-[200px] ]">
// 												{/* ------be list --------for each tab */}
// 												<div className="det_details grid   md:grid-cols-2 gap-6">{tabModeHandler()}</div>
// 												{/*  */}
// 											</div>
// 										</div>
// 									</div>
// 								</div>
// 							</div>
// 						) : (
// 							<div
// 								className={`overlay_pane-mobile-deposite  info_panel relative w-full fadeIn-d   ${
// 									showDetails.show ? "active" : ""
// 								}  bg-white`}
// 							>
// 								{/*  */}

// 								<div
// 									role="button"
// 									onClick={() => handleShowDetails()}
// 									className="cancle_btn absolute left-1/2 -top-16 -translate-x-1/2"
// 								>
// 									<Image
// 										src={"/icons/dashboard/cancleBtn.svg"}
// 										alt={""}
// 										width={48}
// 										height={48}
// 										//  onClick={toggle}
// 										role="button"
// 									/>
// 								</div>

// 								{/* --------bet type details---------- */}
// 								<div className="content relative overflow-y-scroll custom-scrollbar h-screen">
// 									<div className="h-auto">
// 										{/*  */}
// 										<div className="panel_content  w-full">
// 											{/* Header --details */}
// 											<div className="card_header h-[120px] bg-gray-50 w-full p-4 space-y-3">
// 												<div className="row_one middle space-x-3">
// 													<BallSvg />
// 													<h1 className="bet_name txt-lg f-b text-gray-600">Battle of best banterers</h1>

// 													{showDetails.mode === betCardType.KOLO ? (
// 														<div className="badge uppercase  p-1 px-2 bg-cyan-50 rounded txt-xs f-b text-cyan-600">
// 															KOLO bet
// 														</div>
// 													) : (
// 														<div className="badge uppercase  p-1 px-2 bg-yellow-100 rounded txt-xs f-b text-yellow-600">
// 															point bet
// 														</div>
// 													)}
// 												</div>

// 												{/* name row */}

// 												<div className="row_two  space-x-0 ml-12">
// 													<h1 className="amount text-gray-400 txt-sm f-b">
// 														Creator: <span className="txt-sm f-b text-gray-700">Peter Zokoro</span>{" "}
// 													</h1>
// 												</div>
// 											</div>

// 											{/* -----------result  row-------- */}

// 											<div className="w-full   p-4 sticky top-0 bg-white z-50 ">
// 												<div className="result_card rounded-lg shadow-bet-card p-6 flex justify-around w-full">
// 													<div className="col ">
// 														<h1 className=" text-gray-400 txt-xs f-m">state</h1>
// 														<h1 className="display-xs  f-eb text-gray-700 ">N4000</h1>
// 													</div>

// 													<div className="col ">
// 														<h1 className=" text-gray-400 txt-xs f-m">Potential Payout</h1>
// 														<h1 className="display-xs  f-eb text-gray-700 ">N50,000</h1>
// 													</div>
// 												</div>

// 												{/* -----------won section and players avatar list row-------- */}

// 												<div className="won  w-full row-between mt-6 ">
// 													<div className="badge uppercase p-1 px-2 bg-[#ECFDF3] rounded txt-sm f-m text-[#027A48]">
// 														won
// 													</div>
// 													<div className="">
// 														<Image src={"/images/home/users.png"} alt={""} className="" width={144} height={24} />
// 													</div>
// 												</div>

// 												{/* -----------reslut list row-------- */}

// 												{/* header */}
// 												<div className="create_aside mt-[46px]">
// 													<div
// 														role="button"
// 														// onClick={handleShowBet}
// 														className="h-[46px]    w-full relative header rounded-t-lg middle "
// 													>
// 														<div className="middle">
// 															<h1 className="header_text txt-sm f-b text-gray-50 p-4">Results</h1>

// 															<p className="rounded bg-gray-400 px-2 p-[2px] text-white txt-xs f-m">{8}</p>
// 														</div>
// 													</div>
// 												</div>
// 											</div>

// 											<div className="px-4 w-full space-y-4 mt-6  pb-[200px] ]">
// 												{/* ------be list --------for each tab */}
// 												<div className="det_details   grid gap-6">{tabModeHandler()}</div>
// 												{/*  */}
// 											</div>
// 										</div>
// 									</div>
// 								</div>
// 							</div>
// 						)}
// 					</div>
