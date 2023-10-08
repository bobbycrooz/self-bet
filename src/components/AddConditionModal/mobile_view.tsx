import Image from "next/image";
import React, { useState, useEffect, useRef, ChangeEvent } from "react";
import Button from "../Button";
import InputField from "../InputField";

import ConfirmationModal from "../ConfirmationModal";
import CheckIcon, { AddIcon, TimesIcon } from "@/assets";
import useScreen from "@/hooks/useScreen";
import { useBet } from "@/context/betContext";
import useToast from "@/hooks/useToast";
import { SearchComponent } from "../SearchComp";
import { pickRandomItem } from "@/utils/randomItem";

const MobileView = ({
	toggle,
	handleSector,
	showNoti,
	showSectors,
	searchSectorHandler,
	handlePickSector,
	sectorToDisplay,
	conditions,
	handleShowConditionList,
	// handleRefClic,
	handleRemoveItem,
	showConditionList,
	searchConditionHandler,
	handleSelectAllConditions,
	codes,
	codeToD,
	handleSetCondition,
	isExisting,
	saveBetConditions,
	discardConditions,
	handleSetAll,
	currentSector,
}: any) => {
	const tabRef = useRef(null);

	function handleRefClic(e: any) {
		if (e.target === tabRef.current) {
			handleShowConditionList();
		}
	}

	return (
		<div className="betInfo overlay z-[999999999999] fixed top-0 flex items-end left-0  w-full h-full bg-[#0000005c]">
			<div
				className={`overlay_pane-mobile-withdraw info_panel relative w-full fadeIn-w  ${
					showNoti ? "active" : ""
				}     bg-white`}
			>
				{/* ----Cancel button---------  */}
				<div className="cancle_btn absolute left-1/2 -top-16 -translate-x-1/2">
					<Image
						src={"/icons/dashboard/cancleBtn.svg"}
						alt={""}
						width={48}
						height={48}
						onClick={toggle}
						role="button"
					/>
				</div>

				{/* -----------main content----------- */}
				<div className="wrapper w-full h-[600px] overflow-y-scroll custom-scrollbar pb-16">
					<div className=" w-full p-4">
						{/* -----pane_header----- */}
						<div className="w-full column text-gray-500">
							<Image src={"/icons/notify/won.svg"} alt="logo" width={48} height={48} className="" />

							<h1 className="t-header mt-4">Customize Your Bet</h1>

							<p className="txt-sm mt-2 w-full">
								Add conditions to make your bet more exciting. Choose from a range of options to create a unique
								challenge
							</p>
						</div>

						{/* ---Select sector component wrapper---- */}
						<div className="selector-wrapper w-full mt-4 ">
							{/* seclect bet Sector  */}
							<div className="selector">
								<label className="txt-sm f-b text-gray-600">Bet Sector</label>

								<div
									role="button"
									onClick={handleSector}
									className="selector_btn row-between p-4 border rounded-lg mt-[10px]"
								>
									<p className="txt-sm f-m text-gray-500">{currentSector.Sector || "Select sector"}</p>

									<Image
										src={"/icons/dashboard/down.svg"}
										alt="wallet"
										width={16}
										height={16}
										role="button"
										// onClick={handleShowProfile}
										className=""
									/>
								</div>

								{/* body */}
								{showSectors && (
									<div
										// ref={cardRef}
										// onClick={handleCardClick}
										className="dropdown_body space-y-1 column mt-1 transform w-full shadow-soft left-0 top-12 border-gray-100  grid grid-cols-3 gap-2 border-x border-2 rounded-lg"
									>
										{/* search component */}
										<SearchComponent onChangeHandler={searchSectorHandler} place="Search sectors..." />

										<ol className="team_options w-full p-4">
											<p className="txt-xs f-b text-gray-900">Pick a sector</p>
											{/* @ts-ignore */}
											<div className="h-fullw-full">
												{/* @ts-ignore */}
												{sectorToDisplay?.map((i, k) => (
													<li
														key={k}
														role="button"
														onClick={() => handlePickSector(i)}
														className="option middle  mt-2  w-full  h-8 space-x-3"
													>
														<div
															className={`h-full w-1 rounded-lg ${pickRandomItem([
																"bg-green-300",
																"bg-orange-300",
																"bg-blue-300",
															])}`}
														></div>

														<h1 className="text-gray-500 txt-sm f-m capitalize">{i}</h1>
													</li>
												))}
											</div>
										</ol>
									</div>
								)}
							</div>

							{/* ----select points */}
							{!true && (
								<div className="selector mt-4">
									<InputField label={"Sector Point"} type={"text"} place={"e.g 2.5"} />
								</div>
							)}
							{/* --select Sector Conditions--- */}
							<div className="selector mt-4">
								<label className="txt-sm f-b text-gray-600"> Select conditions</label>

								<div role="button" className="selector_btn row-between p-2 border rounded-lg mt-[10px]">
									{!conditions.length ? (
										<p onClick={handleShowConditionList} className="txt-sm p-2 f-m text-gray-500  w-full h-full">
											Select conditions
										</p>
									) : (
										<div ref={tabRef} onClick={handleRefClic} className="w-full h-full flex flex-wrap gap-2 gap-y-1">
											{/* @ts-ignore */}
											{conditions.map((i, k) => (
												<div
													key={k}
													role="button"
													onClick={() => handleRemoveItem(i)}
													className=" p-2 middle space-x-3 rounded-lg bg-gray-100"
												>
													<h1 className="f-m text-gray-700">
														{i.value}
														{":"}
														<span className="text-gray-400 txt-sm f-m ml-1">{i.desc}</span>
													</h1>

													<button className="text-xs text-gray-400">
														<TimesIcon />
													</button>
												</div>
											))}
										</div>
									)}
								</div>

								{/* body */}
								{showConditionList && (
									<div
										// ref={cardRef}
										// onClick={handleCardClick}
										className="dropdown_body space-y-1 mt-1 column transform w-full shadow-soft left-0 top-12 border-gray-100  grid grid-cols-3 gap-2 border-x border-2 rounded-lg"
									>
										{/* search component */}
										<SearchComponent onChangeHandler={searchConditionHandler} place="Search conditions..." />

										{/* ---Condition list----- */}
										<ol className="team_options w-full px-4 p-2 space-y-2">
											<div className="w-full justify-between p-2 flex items-center">
												<p className="txt-xs f-b text-gray-900">Select one or more conditions</p>

												<button
													onClick={handleSelectAllConditions}
													className="hover:bg-gray-200 text-gray-700 font-medium p-2 px-4 text-sm rounded-xl hover:text-gray-800"
												>
													{codes.length == conditions.length ? "Unselect All" : "Select All"}
												</button>
											</div>

											{codeToD.length ? (
												// @ts-ignore
												codeToD.map((i: any, k) => (
													<li
														key={k}
														role="button"
														className="option middle  w-full  px-4 p-3 space-x-3"
														onClick={() => handleSetCondition(i)}
													>
														<div className="icon">{!isExisting(i) ? <AddIcon /> : <CheckIcon />}</div>

														<h1 className="f-m text-gray-700">
															{i.value}
															{":"}
															<span className="text-gray-400 txt-sm f-m ml-1">{i.desc}</span>
														</h1>
													</li>
												))
											) : (
												<p className="text-sm  p-2 text-center text-gray-400">No sector selected.</p>
											)}
										</ol>
									</div>
								)}
							</div>

							{/* ---save btn */}
							<div className="mt-8 space-y-2">
								<Button
									click={saveBetConditions}
									text={"Save bet Conditions"}
									type={"button"}
									primary
									full
									disabled={conditions.length < 1}
								/>
								<Button click={discardConditions} text={"Discard"} type={"button"} ghost full />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MobileView;
