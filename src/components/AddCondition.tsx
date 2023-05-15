import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useRef, ChangeEventHandler } from "react";
import Button from "./Button";
import DropDown from "./DropDown";
import InputField from "./InputField";
import DropdownBtn from "./DropBtn";
import Toggle from "./Toggle";
import DynamicModal from "./DynamicModal";
import ConfirmationModal from "./ConfirmationModal";
import CheckIcon, { AddIcon, TimesIcon } from "@/assets";
import useScreen from "@/hooks/useScreen";

interface PropTypes {
	toggle: any;
	showNoti: boolean;
}

interface ConditionTypes {
	betType: string;
	name: string;
	id: number;
}

const statusConst = {
	success: "SUCCESS",
	failed: "FAILED",
};

const AddCondition = ({ toggle, showNoti }: PropTypes) => {
	const [show, toggleShow] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [showSectors, setShowSectors] = useState(false);
	const [showConditionList, setShowConditionList] = useState(false);
	const [status, setStatus] = useState(statusConst.failed);
	const [conditions, setConditions] = useState<Array<ConditionTypes>>([]);
	const tabRef = useRef(null);
	const { isMobile, isTablet } = useScreen();

	function processHandler() {
		toggleShow((p) => !p);
	}

	function handleSector(e: any) {
		setShowSectors((p) => !p);
	}

	function handleShowConditionList() {
		setShowConditionList((p) => !p);
	}

	const sectors = [
		{
			type: "Home team / Away team / Draw",
			color: "bg-green-700",
			meta: {},
		},

		{
			type: "Half time (O/U)",
			color: "bg-orange-700",
			meta: {},
		},

		{
			type: "Home / Away (O/U)",
			color: "bg-yellow-700",
			meta: {},
		},

		{
			type: "Odd / Even",
			color: "bg-blue-700",
			meta: {},
		},
	];

	const conditionList = [
		{
			betType: '"1"',
			name: "Home to win",
			id: 1,
		},

		{
			betType: '"2"',
			name: "Away to win",
			id: 2,
		},

		{
			betType: '"X"',
			name: "Draw ",
			id: 3,
		},

		{
			betType: '"1XDC"',
			name: "Home to win or draw",
			id: 4,
		},
	];

	function handleSetCondition(condition: ConditionTypes) {
		let updatedArray = [...conditions];

		console.log(updatedArray.length > 0, "thsi is the initaial array");

		// find existing condition
		if (updatedArray.length > 0) {
			let existing = updatedArray.filter((i: ConditionTypes, a) => i.id === condition.id);

			if (existing.length > 0) {
				return console.log("there is something in the array so i left");
			} else {
				console.log("there was nothing and i added it to the array");

				updatedArray.push(condition);

				setConditions(updatedArray);
			}
		} else {
			console.log("there was nothing and i added it to the array");

			updatedArray.push(condition);

			setConditions(updatedArray);
		}
	}

	function handleSetAll() {
		let updatedArray = [...conditions];

		conditionList.map((it, k) => {
			let existing = updatedArray.filter((i: ConditionTypes, a) => i.id === it.id);
			if (existing.length > 0) {
				return;
			} else {
				updatedArray.push(it);

				setConditions(updatedArray);
			}
		});
	}

	function handleRemoveItem(condition: any) {
		let currentArray = [...conditions];

		// find existing condition
		let existing = currentArray.filter((i: ConditionTypes, a) => i.id === condition.id);

		if (existing.length > 0) {
			const updatedArray = currentArray?.filter((i: ConditionTypes, a) => i.id !== condition.id);

			setConditions(updatedArray);
		} else {
			console.log("this item does not exist in the array");
		}
	}

	function isExisting(condition: ConditionTypes) {
		let currentArray = [...conditions];

		// find existing condition
		let existing = currentArray.filter((i: ConditionTypes, a) => i.id === condition.id);

		if (existing.length > 0) {
			return true;
		} else {
			return false;
		}
	}

	function handleRefClic(e: any) {
		if (e.target === tabRef.current) {
			handleShowConditionList();
		}
	}

	return showNoti ? (
		<>
			<div className="wrapper">
				{isMobile || isTablet ? (
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

										<p className="txt-sm mt-2 w-[430px]">
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
												<p className="txt-sm f-m text-gray-500">Select sector</p>

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
													<div className="search border-b py-3 w-full p-4">
														<div
															role="button"
															//   onClick={searchToggle}
															className="search_container relative bg-gray-50 rounded-lg w-full h-10"
														>
															<Image
																src={"/icons/dashboard/search.svg"}
																alt="logo"
																width={20}
																height={20}
																className=" absolute top-1/2 -translate-y-1/2 left-2 txt-sm f-m text-gray-400"
															/>

															<input
																type="text"
																name=""
																id=""
																className="bg-transparent w-full  h-full pl-9 outline-none"
																placeholder="Search teams..."
															/>
														</div>
													</div>

													<ol className="team_options w-full p-4">
														<p className="txt-xs f-b text-gray-900">Pick a sector</p>
														{sectors.map((i, k) => (
															<li key={k} role="button" className="option middle  mt-2  w-full  h-8 space-x-3">
																<div className={`h-full w-1 rounded-lg ${i.color}`}></div>

																<h1 className="text-gray-500 txt-sm f-m capitalize">{i.type}</h1>
															</li>
														))}
													</ol>
												</div>
											)}
										</div>

										{/* ----select points */}
										<div className="selector mt-4">
											<InputField label={"Sector Point"} type={"text"} place={"e.g 2.5"} />
										</div>

										{/* --select Sector Conditions--- */}
										<div className="selector mt-4">
											<label className="txt-sm f-b text-gray-600"> Select conditions</label>

											<div role="button" className="selector_btn row-between p-2 border rounded-lg mt-[10px]">
												{!conditions.length ? (
													<p onClick={handleShowConditionList} className="txt-sm p-2 f-m text-gray-500  w-full h-full">
														Select conditions
													</p>
												) : (
													<div
														ref={tabRef}
														onClick={handleRefClic}
														className="w-full h-full flex flex-wrap gap-2 gap-y-1"
													>
														{conditions.map((i, k) => (
															<div
																key={k}
																role="button"
																onClick={() => handleRemoveItem(i)}
																className=" p-2 middle space-x-3 rounded-lg bg-gray-100"
															>
																<h1 className="f-m text-gray-700">
																	{i.betType}
																	{":"}
																	<span className="text-gray-400 txt-sm f-m ml-1">{i.name}</span>
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
													<div className="search border-b py-3 w-full p-4">
														<div
															role="button"
															//   onClick={searchToggle}
															className="search_container relative bg-gray-50 rounded-lg w-full h-10"
														>
															<Image
																src={"/icons/dashboard/search.svg"}
																alt="logo"
																width={20}
																height={20}
																className=" absolute top-1/2 -translate-y-1/2 left-2 txt-sm f-m text-gray-400"
															/>

															<input
																type="text"
																name=""
																id=""
																className="bg-transparent w-full  h-full pl-9 outline-none"
																placeholder="Search teams..."
															/>
														</div>
													</div>

													{/* ---Condition list----- */}
													<ol className="team_options w-full px-4 p-2 space-y-2">
														<div className="space-y-2">
															<p className="txt-xs f-b text-gray-900">Select one or more conditions</p>
															<div role="button" onClick={handleSetAll} className="middle space-x-2">
																<input onChange={handleSetAll} type="checkbox" name="all" id="" />
																<p className="txt-xs f-s text-gray-500">Select All</p>

															</div>
														</div>

														{conditionList.map((i, k) => (
															<li
																key={k}
																role="button"
																className="option middle  w-full  px-4 p-3 space-x-3"
																onClick={() => handleSetCondition(i)}
															>
																<div className="icon">{!isExisting(i) ? <AddIcon /> : <CheckIcon />}</div>

																<h1 className="f-m text-gray-700">
																	{i.betType}
																	{":"}
																	<span className="text-gray-400 txt-sm f-m ml-1">{i.name}</span>
																</h1>
															</li>
														))}
													</ol>
												</div>
											)}
										</div>

										{/* ---save btn */}
										<div className="mt-8">
											<Button text={"Save bet Conditions"} type={"button"} primary full />
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				) : (
					<div className="betInfo overlay z-20 fixed top-0 flex justify-end left-0 strictFadeIn w-full h-full bg-[#0000005c]">
						{/* ----Add sector Card---------  */}
						<div className="info_panel slideInLeft relative w-[35%] h-screen bg-white rounded-l-lg">
							{/* -------cancle button-------- */}
							<div className="cancle_btn absolute -left-16 top-1/2 -translate-y-1/2">
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
							<div className="wrapper w-full h-screen overflow-y-scroll custom-scrollbar">
								<div className="  w-full p-8">
									{/* -----pane_header----- */}
									<div className="w-full column text-gray-500">
										<Image src={"/icons/notify/won.svg"} alt="logo" width={48} height={48} className="" />

										<h1 className="t-header mt-4">Customize Your Bet</h1>

										<p className="txt-sm mt-2 w-[430px]">
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
												<p className="txt-sm f-m text-gray-500">Select sector</p>

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
													<div className="search border-b py-3 w-full p-4">
														<div
															role="button"
															//   onClick={searchToggle}
															className="search_container relative bg-gray-50 rounded-lg w-full h-10"
														>
															<Image
																src={"/icons/dashboard/search.svg"}
																alt="logo"
																width={20}
																height={20}
																className=" absolute top-1/2 -translate-y-1/2 left-2 txt-sm f-m text-gray-400"
															/>

															<input
																type="text"
																name=""
																id=""
																className="bg-transparent w-full  h-full pl-9 outline-none"
																placeholder="Search teams..."
															/>
														</div>
													</div>

													<ol className="team_options w-full p-4">
														<p className="txt-xs f-b text-gray-900">Pick a sector</p>
														{sectors.map((i, k) => (
															<li key={k} role="button" className="option middle  mt-2  w-full  h-8 space-x-3">
																<div className={`h-full w-1 rounded-lg ${i.color}`}></div>

																<h1 className="text-gray-500 txt-sm f-m capitalize">{i.type}</h1>
															</li>
														))}
													</ol>
												</div>
											)}
										</div>

										{/* ----select points */}
										<div className="selector mt-4">
											<InputField label={"Sector Point"} type={"text"} place={"e.g 2.5"} />
										</div>

										{/* --select Sector Conditions--- */}
										<div className="selector mt-4">
											<label className="txt-sm f-b text-gray-600"> Select conditions</label>

											<div role="button" className="selector_btn row-between p-2 border rounded-lg mt-[10px]">
												{!conditions.length ? (
													<p onClick={handleShowConditionList} className="txt-sm p-2 f-m text-gray-500  w-full h-full">
														Select conditions
													</p>
												) : (
													<div
														ref={tabRef}
														onClick={handleRefClic}
														className="w-full h-full flex flex-wrap gap-2 gap-y-1"
													>
														{conditions.map((i, k) => (
															<div
																key={k}
																role="button"
																onClick={() => handleRemoveItem(i)}
																className=" p-2 middle space-x-3 rounded-lg bg-gray-100"
															>
																<h1 className="f-m text-gray-700">
																	{i.betType}
																	{":"}
																	<span className="text-gray-400 txt-sm f-m ml-1">{i.name}</span>
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
													<div className="search border-b py-3 w-full p-4">
														<div
															role="button"
															//   onClick={searchToggle}
															className="search_container relative bg-gray-50 rounded-lg w-full h-10"
														>
															<Image
																src={"/icons/dashboard/search.svg"}
																alt="logo"
																width={20}
																height={20}
																className=" absolute top-1/2 -translate-y-1/2 left-2 txt-sm f-m text-gray-400"
															/>

															<input
																type="text"
																name=""
																id=""
																className="bg-transparent w-full  h-full pl-9 outline-none"
																placeholder="Search teams..."
															/>
														</div>
													</div>

													{/* ---Condition list----- */}
													<ol className="team_options w-full px-4 p-2 space-y-2">
														<p className="txt-xs f-b text-gray-900">Select one or more conditions</p>

														{conditionList.map((i, k) => (
															<li
																key={k}
																role="button"
																className="option middle  w-full  px-4 p-3 space-x-3"
																onClick={() => handleSetCondition(i)}
															>
																<div className="icon">{!isExisting(i) ? <AddIcon /> : <CheckIcon />}</div>

																<h1 className="f-m text-gray-700">
																	{i.betType}
																	{":"}
																	<span className="text-gray-400 txt-sm f-m ml-1">{i.name}</span>
																</h1>
															</li>
														))}
													</ol>
												</div>
											)}
										</div>

										{/* ---save btn */}
										<div className="mt-8">
											<Button text={"Save bet Conditions"} type={"button"} primary full />
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>

			{/* ------process confirmation modal ------- */}
			<ConfirmationModal
				show={show}
				handleClose={processHandler}
				context={"Deposite"}
				isLoading={isLoading}
				toggleLoader={setIsLoading}
				status={status}
				setStatus={setStatus}
			/>
		</>
	) : null;
};

export default AddCondition;
