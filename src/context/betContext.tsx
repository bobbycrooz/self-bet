import { loginAPI, registerAPI } from "@/axios/endpoints/auth.endpoint";
import { marketListAPI } from "@/axios/endpoints/bet.endpoint";
import { UserDetailsTypes } from "@/types";
import { saveToken } from "@/utils";
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

		FixtureId: 868135,

		MatchDate: "2023-01-26T11:28:00.000+00:00", //check match data ,  vlaidate useres waller`s balance image validity {size}
	},
};

// const initialState = {

// 	Type: "KoloBet",

// 	Leagues: ["Premier League"],

// 	Teams: ["Southampton", "Nottingham Forest"],

// 	Discount: { discount: 0, max: 0 },

// 	Amount: 100,

// 	Conditions: [{ Sector: "H_TEAM/A_TEAM/DRAW", Codes: "1" }],

// 	Criteria: {
// 		TeamA: { name: "Southampton", logo: "https://media.api-sports.io/football/teams/41.png" },
// 		TeamB: { name: "Nottingham Forest", logo: "https://media-3.api-sports.io/football/teams/65.png" },

// 		Conditions: [
// 			{
// 				Sector: "H_TEAM/A_TEAM/DRAW",

// 				Codes: ["1", "2", "3"],
// 			},

// 			{
// 				Sector: "H_TEAM/A_TEAM/DRAW",

// 				Codes: ["1", "2", "3"],
// 			},
// 		],

// 		FixtureId: 868135,

// 		MatchDate: "2023-01-26T11:28:00.000+00:00", //check match data ,  vlaidate useres waller`s balance image validity {size}
// 	},
// };

const betReducer = (state: any, action: { type: string; payload: any }) => {
	const { type, payload } = action;

	switch (type) {
		case "BET_TYPE":
			return { ...state, Type: payload.type };
		case "BET_LEAGUE":
			return { ...state, Leagues: payload.leagues };
		case "BET_TEAMS":
			return { ...state, Teams: payload.teams };
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
				NumberOfPeople: payload.numberOfPeople,
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

		default:
			return state;
	}
};

const statusConst = {
	success: "SUCCESS",
	failed: "FAILED",
};

// -------------------------------------------------------


const BetProvider = ({ children }: { children: any }) =>
{
	
	const [Bet, dispatchBet] = useReducer(betReducer, initialState);
	const [MarketList, setMarketList] = useState([]);



	const [refresh, setRefresh] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [placing, isPlacing] = useState(false);
	const [status, setStatus] = useState(statusConst.success);
	
	

	function handlePlaceBet() {
		isPlacing((p) => !p);
		setIsLoading(true);

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
					console.log(serverResponse, "serverResponse");
				}
			}
		} catch (error) {}
	}

	// --------USEEFFECTS

	useEffect(() => {}, []);

	// --------USEEFFECTS

	//providing the authcontext data to the consumer component
	return (
		<BetContext.Provider value={{ Bet, dispatchBet, fetchAlllMarkets, MarketList ,isLoading, placing, status, handlePlaceBet, setIsLoading, setStatus}}>{children}</BetContext.Provider>
	);
};

export default BetProvider;
