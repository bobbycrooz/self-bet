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
import DesktopView from "./desktop_view";
import MobileView from "./mobile_view";

interface PropTypes {
	toggle: any;
	showNoti: boolean;
	currentSector: any;
	setCurrentSector: any;
	conditions: any;
	setConditions: any;
	isEditing: boolean;
}

export interface ConditionTypes {
	betType: string;
	name: string;
	id: number;
}

const statusConst = {
	success: "SUCCESS",
	failed: "FAILED",
};

const AddCondition = ({
	toggle,
	showNoti,
	currentSector,
	conditions,
	setConditions,
	setCurrentSector,
	isEditing,
}: PropTypes) => {
	const [show, toggleShow] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [showSectors, setShowSectors] = useState(false);
	const [codes, setCodes] = useState([]);
	const [codeToD, setCodeToD] = useState([]);
	// const [currentSector, setCurrentSector] = useState({
	// 	Sector: "",
	// 	Codes: [],
	// });
	const [showConditionList, setShowConditionList] = useState(false);
	const [status, setStatus] = useState(statusConst.failed);
	const { isMobile, isTablet } = useScreen();
	const { Bet, dispatchBet, fetchAlllMarkets, MarketList } = useBet();
	const { notify } = useToast();

	const [sectorLists, setSectors] = useState([]);
	const [sectorToDisplay, setSectorTD] = useState([]);

	function searchSectorHandler(e: ChangeEvent<HTMLInputElement>) {
		const resultList = sectorLists.filter((i: string) => i.toLowerCase().includes(e.target.value));

		if (resultList.length) {
			setSectorTD(resultList);
		}
	}

	function searchConditionHandler(e: ChangeEvent<HTMLInputElement>) {
		const resultList = codes.filter(
			(i: { value: string; desc: string }) =>
				i.value.toLowerCase().includes(e.target.value) || i.desc.toLowerCase().includes(e.target.value)
		);

		if (resultList.length) {
			setCodeToD(resultList);
		}
	}

	function processHandler() {
		toggleShow((p) => !p);
	}

	function handleSector(e: any) {
		getAllSectores();
		setShowSectors((p) => !p);
	}

	function handleShowConditionList() {
		setShowConditionList((p) => !p);
	}

	function handleGetSectorCodes(sector: string) {
		const codes = MarketList.find((i: { Sector: string }) => i.Sector === sector);
		setCodes(codes.Codes);
		setCodeToD(codes.Codes);
	}

	function handlePickSector(sector: string) {
		setCurrentSector({
			...currentSector,
			Sector: sector,
		});

		handleGetSectorCodes(sector);
		setShowSectors((p) => !p);
	}

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

	function getAllSectores() {
		const sectors: any[] | React.SetStateAction<undefined> = [];

		if (MarketList) {
			MarketList.map((i: { Sector: any }) => sectors.push(i.Sector));
		}

		// console.log(sectors);

		setSectors(sectors as any);
		setSectorTD(sectors as any);
	}

	function handleSetCondition(condition: ConditionTypes) {
		let updatedArray = [...conditions];

		// console.log(updatedArray.length > 0, "thsi is the initaial array");

		// find existing condition
		if (updatedArray.length > 0) {
			// @ts-ignore
			let existing = updatedArray.filter((i: any, a) => i.value === condition.value);

			if (existing.length > 0) {
				// remove it
				// @ts-ignore
				const updatedArray = conditions?.filter((i: any, a) => i.value !== condition.value);

				setConditions(updatedArray);
				setCurrentSector({
					...currentSector,
					Codes: updatedArray as any,
				});
			} else {
				// console.log("there was nothing and i added it to the array");

				updatedArray.push(condition);

				setConditions(updatedArray);
				setCurrentSector({
					...currentSector,
					Codes: updatedArray as any,
				});
			}
		} else {
			// console.log("there was nothing and i added it to the array");

			updatedArray.push(condition);

			setConditions(updatedArray);
		}
	}

	function handleSelectAllConditions() {
		let updatedArray = [...conditions];

		// find existing condition

		// filter codes that are not in the conditions array and add them to the conditions array
		const filteredCodes = codes.filter((i: any) => !updatedArray.includes(i));

		if (filteredCodes.length === 0) {
			setConditions([]);
			setCurrentSector({
				...currentSector,
				Codes: [],
			});
		} else {
			updatedArray.push(...filteredCodes);

			setConditions(updatedArray);

			setCurrentSector({
				...currentSector,
				Codes: updatedArray as any,
			});
		}
	}

	// console.log(conditions.length, "this is the conditions array", codes.length);

	function handleSetAll() {
		let updatedArray = [...conditions];

		conditionList.map((i: any) => {
			let existing = updatedArray.filter((i: any) => i.value === i.value);
			if (existing.length > 0) {
				return;
			} else {
				updatedArray.push(i);

				setConditions(updatedArray);
			}
		});
	}

	function handleRemoveItem(condition: any) {
		let currentArray = [...conditions];

		// find existing condition
		let existing = currentArray.filter((i: any, a) => i.value === condition.value);

		if (existing.length > 0) {
			const updatedArray = currentArray?.filter((i: any, a) => i.value !== condition.value);

			setConditions(updatedArray);
			setCurrentSector({
				...currentSector,
				Codes: updatedArray as any,
			});
		} else {
			// console.log("this item does not exist in the array");
		}
	}

	function isExisting(condition: any) {
		let currentArray = [...conditions];

		// find existing condition
		let existing = currentArray.filter((i: any) => i.value === condition.value);

		if (existing.length > 0) {
			return true;
		} else {
			return false;
		}
	}

	function saveBetConditions() {
		const processCodes = currentSector.Codes.map((i: any) => i.value);

		const betConditions = {
			...currentSector,
			Codes: processCodes,
		};

		let hasSelectedCondition = betConditions.Codes.length > 1;

		// console.log(hasSelectedCondition);

		// validat
		if (!hasSelectedCondition) {
			return notify("warn", "More than  one condition is require per sector");
		}

		// check if user has selected that sector
		const selectedConditon = Bet.Criteria.Conditions.filter((i: any) => i.Sector == currentSector.Sector);

		if (selectedConditon.length > 0) {
			const newConditons = Bet.Criteria.Conditions.filter((i: any) => i.Sector !== currentSector.Sector);

			console.log(newConditons, "this sector has been selected!!");

			newConditons.push(betConditions);

			dispatchBet({ type: "BET_CONDITIONS_EDIT", payload: { conditions: newConditons } });

			notify("success", "This sector has been edited succesfully!");

			setCurrentSector({
				Sector: "",
				Codes: [],
			});
			setConditions([]);

			setCodeToD([]);

			return toggle();
		}

		dispatchBet({ type: "BET_CONDITIONS", payload: { conditions: betConditions } });
		notify("success", "Bet conditions saved successfully!");
		setCurrentSector({
			Sector: "",
			Codes: [],
		});
		setConditions([]);
		setCodeToD([]);

		toggle();
	}

	function discardConditions() {
		setCurrentSector({
			Sector: "",
			Codes: [],
		});
		setConditions([]);

		setCodeToD([]);

		return toggle();
	}

	useEffect(() => {
		fetchAlllMarkets();
	}, [fetchAlllMarkets]);

	useEffect(() => {
		if (currentSector.Sector && isEditing) {
			setConditions(currentSector.Codes);
			handleGetSectorCodes(currentSector.Sector);
		}
		// setConditions([]);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentSector.Codes, currentSector.Sector, isEditing, setConditions]);

	return showNoti ? (
		<>
			<div className="wrapper">
				{/* ----------------phone----------------- */}
				{isMobile || isTablet ? (
					<MobileView
						toggle={toggle}
						handleSector={handleSector}
						currentSector={currentSector}
						showSectors={showSectors}
						searchSectorHandler={searchSectorHandler}
						handlePickSector={handlePickSector}
						sectorToDisplay={sectorToDisplay}
						conditions={conditions}
						handleShowConditionList={handleShowConditionList}
						// handleRefClic={	handleRefClic}
						handleRemoveItem={handleRemoveItem}
						showConditionList={showConditionList}
						searchConditionHandler={searchConditionHandler}
						handleSelectAllConditions={handleSelectAllConditions}
						codes={codes}
						codeToD={codeToD}
						handleSetCondition={handleSetCondition}
						isExisting={isExisting}
						saveBetConditions={saveBetConditions}
						discardConditions={discardConditions}
					/>
				) : (
					// ------------------desktop-----------------
					<DesktopView
						toggle={toggle}
						handleSector={handleSector}
						currentSector={currentSector}
						showSectors={showSectors}
						searchSectorHandler={searchSectorHandler}
						handlePickSector={handlePickSector}
						sectorToDisplay={sectorToDisplay}
						conditions={conditions}
						handleShowConditionList={handleShowConditionList}
						// handleRefClic={	handleRefClic}
						handleRemoveItem={handleRemoveItem}
						showConditionList={showConditionList}
						searchConditionHandler={searchConditionHandler}
						handleSelectAllConditions={handleSelectAllConditions}
						codes={codes}
						codeToD={codeToD}
						handleSetCondition={handleSetCondition}
						isExisting={isExisting}
						saveBetConditions={saveBetConditions}
						discardConditions={discardConditions}
					/>
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
