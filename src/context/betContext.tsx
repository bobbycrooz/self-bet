import { loginAPI, registerAPI } from "@/axios/endpoints/auth.endpoint";
import { createBetAPI, marketListAPI } from "@/axios/endpoints/bet.endpoint";
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

	Conditions: [],

	Discount: { discount: 0, max: 0 },

	Amount: 0,

	Type: "",

	Criteria: {
		TeamA: { name: "Southampton", logo: "https://media.api-sports.io/football/teams/41.png" },
		TeamB: { name: "Nottingham Forest", logo: "https://media-3.api-sports.io/football/teams/65.png" },

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
	const [isLoading, setIsLoading] = useState(true);
	const [placing, isPlacing] = useState(false);
	const [status, setStatus] = useState(statusConst.success);

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

	async function placeBet() {
		const formData = new FormData();

		// @ts-ignore
		formData.append("BetImg", BetImg);
		formData.append("Data", JSON.stringify(Bet));

		try {
			console.log(Bet, "bet");
			console.log(BetImg, "bet img");

			// const response = await axios.post("https://13.246.19.94/Bet/Create", formData, {
			// 	headers: {
			// 		"Content-Type": "multipart/form-data",
			// 		 Authorization: `Bearer ${String(getToken())}`
			// 	},
			// });

			const { error, serverResponse } = await createBetAPI(formData)

			console.log(serverResponse, "response");
		} catch (error) {
			console.log(error, "--error--");
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
			}}
		>
			{children}
		</BetContext.Provider>
	);
};

export default BetProvider;
