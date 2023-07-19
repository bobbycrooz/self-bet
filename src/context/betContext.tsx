import { loginAPI, registerAPI } from "@/axios/endpoints/auth.endpoint";
import { createBetAPI, marketListAPI } from "@/axios/endpoints/bet.endpoint";
import useToast from "@/hooks/useToast";
import { UserDetailsTypes } from "@/types";
import { getToken, saveToken } from "@/utils";
import axios from "axios";
import { promises } from "dns";
import React, { useContext, useState, useEffect, useMemo, createContext, Children, useReducer } from "react";
// import utils from 'utils';

interface propsTypes {
	email: string;
	name: string;
}

const BetContext = createContext<any>({});

export const useBet = () => {
	return useContext(BetContext);
};

const initialState = {
	Leagues: [],

	Teams: [],

	BetName: "",

	Conditions: [],

	Discount: { discount: 0, max: 0 },

	Amount: 0,

	Type: "",

	Criteria: {
		TeamA: { TeamName: "", Logo: "" },
		TeamB: { TeamName: "", Logo: "" },

		Conditions: [],

		FixtureId: null,

		MatchDate: "", //check match data ,  vlaidate useres waller`s balance image validity {size}
	},
};

const betReducer = (state: any, action: { type: string; payload: any }) => {
	const { type, payload } = action;

	switch (type) {
		case "BET_TYPE":
			return { ...state, Type: payload.type };
		case "BET_LEAGUES":
			return { ...state, Leagues: [...state.Leagues, payload.league] };

		case "BET_TEAMS":
			return { ...state, Teams: payload.teams };

		case "BET_FIXTURE_ID":
			return { ...state, Criteria: { ...state.Criteria, FixtureId: payload.FixtureId } };

		case "PICK_CONDITION":
			return {
				...state,
				Conditions: [...state.Conditions, payload.condition],
			};
		case "BET_DETAILS":
			return {
				...state,
				Amount: payload.amount,
				Discount: payload.discount,
				BetName: payload.betName,
			};
		case "BET_CONDITIONS":
			return {
				...state,
				Criteria: {
					...state.Criteria,
					Conditions: [...state.Criteria.Conditions, payload.conditions],
				},
			};
		case "BET_MATCH":
			return {
				...state,
				Criteria: {
					...state.Criteria,
					...payload,
				},
			};

		case "BET_MATCH_DATE":
			return {
				...state,
				Criteria: {
					...state.Criteria,
					MatchDate: payload.MatchDate,
				},
			};

		default:
			return state;
	}
};

const statusConst = {
	success: "SUCCESS",
	failed: "FAILED",
};

// -------------------------------------------------------

const BetProvider = ({ children }: { children: any }) => {
	const [Bet, dispatchBet] = useReducer(betReducer, initialState);
	const [MarketList, setMarketList] = useState([]);

	const [BetImg, setBetImg] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [placing, isPlacing] = useState(false);
	const [status, setStatus] = useState(statusConst.success);
	const { notify } = useToast();

	function handlePlaceBet() {
		isPlacing((p) => !p);
		setIsLoading(true);
		placeBet();

		setTimeout(() => {
			setIsLoading(false);
			setStatus(statusConst.success);
		}, 5000);
	}

	// handlers------------------
	// console.log(Bet, "bet");

	async function fetchAlllMarkets() {
		try {
			if (MarketList.length == 0) {
				const { error, serverResponse } = await marketListAPI(1);
				if (!error) {
					setMarketList(serverResponse as any);
				} else {
					// console.log(serverResponse, "serverResponse");
				}
			}
		} catch (error) {}
	}


	// async function searchAllMarketList() {
	// 	try {
	// 		// const searchResult =await searchAPI(value)
	// 	} catch (error)
	// 	{
	// 		console.log(error, 'from search endpoint');	
	// 	}
	// }




	async function placeBet() {
		const formData = new FormData();

		// @ts-ignore
		formData.append("BetImg", BetImg[0]);
		formData.append("Type", Bet.Type);
		formData.append("Teams", Bet.Teams);
		formData.append("Leagues", Bet.Leagues);
		formData.append("Amount", Bet.Amount);
		formData.append("Discount", JSON.stringify(Bet.Discount));
		formData.append("Criteria", JSON.stringify(Bet.Criteria));
		formData.append("Conditions", JSON.stringify(Bet.Conditions));
		formData.append("BetName", Bet.BetName);

		try {
			const response = await axios.post("https://13.246.19.94/Bet/Create", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
					Authorization: `Bearer ${String(getToken())}`,
					"x-auth-token": `${String(getToken())}`,
				},
			});

			// const { error, serverResponse } = await createBetAPI(formData)

			console.log(response, "response");

			if (response.status == 200)
			{
				setStatus(statusConst.success);
				return notify('success', 'Bet Placed Successfully')
			}

			// if (!error) {
			// 	setStatus(statusConst.success);
			// } else {
			// 	setStatus(statusConst.failed);
			// }

			
		} catch (error) {
			notify('error', 'Bet Placed Failed')
		}
	}

	// --------USEEFFECTS

	useEffect(() => {}, []);

	// --------USEEFFECTS

	//providing the authcontext data to the consumer component
	return (
		<BetContext.Provider
			value={{
				Bet,
				placeBet,
				dispatchBet,
				fetchAlllMarkets,
				MarketList,
				isLoading,
				placing,
				status,
				handlePlaceBet,
				setIsLoading,
				setStatus,
				setBetImg,
				BetImg
			}}
		>
			{children}
		</BetContext.Provider>
	);
};

export default BetProvider;
