import { loginAPI, registerAPI } from "@/axios/endpoints/auth.endpoint";
import { createBetAPI, fetchBetListAPI, marketListAPI } from "@/axios/endpoints/bet.endpoint";
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
		case "REMOVE_BET_LEAGUES":
			return { ...state, Leagues: [] };

		case "BET_TEAMS":
			return { ...state, Teams: payload.teams };

		case "BET_FIXTURE_ID":
			return { ...state, Criteria: { ...state.Criteria, FixtureId: payload.FixtureId } };

		case "PICK_CONDITION":
			return {
				...state,
				Conditions: [...state.Conditions, payload.condition],
			};

		case "REMOVE_CONDITION":
			return {
				...state,
				Conditions: payload.condition,
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
			case "REMOVE_BET_CONDITIONS":
			return {
				...state,
				Criteria: {
					...state.Criteria,
					Conditions: [],
				},
			};

		case "BET_CONDITIONS_EDIT":
			return {
				...state,
				Criteria: {
					...state.Criteria,
					Conditions: payload.conditions,
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
	const [BetList, setBetList] = useState([]);

	const [BetImg, setBetImg] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [placing, isPlacing] = useState(false);
	const [status, setStatus] = useState(statusConst.success);
	const { notify } = useToast();

	// handlers------------------
	function handlePlaceBet() {
		isPlacing((p) => !p);
		setIsLoading(true);
		placeBet();

		setTimeout(() => {
			setIsLoading(false);
			setStatus(statusConst.success);
		}, 5000);
	}

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

	async function fetchAllActiveBets() {
		try {
			const { error, serverResponse } = await fetchBetListAPI(1);
			if (!error) {
				setBetList(serverResponse as any);
			} else {
				console.log(serverResponse, "fetching all bets");
			}
		} catch (error) {
			console.log(error, "from search endpoint");
		}
	}

	async function placeBet() {

		  

		if (Bet.Type.length === 0 )
		{
			return notify("error", "You need to select a bet type")
}


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

			console.log(response);
			

			if (response.status == 200) {
				// reset all states
				dispatchBet({ type: "BET_TYPE", payload: { type: "" } });
				dispatchBet({
					type: "REMOVE_BET_LEAGUES",
					payload: undefined
				});
				dispatchBet({ type: "BET_TEAMS", payload: { teams: [] } });
				dispatchBet({ type: "BET_FIXTURE_ID", payload: { FixtureId: null } });
				dispatchBet({ type: "PICK_CONDITION", payload: { condition: "" } });
				dispatchBet({ type: "BET_DETAILS", payload: { amount: 0, discount: 0, betName: "" } });
				dispatchBet({ type: "REMOVE_BET_CONDITIONS", payload: { conditions: [] } });
				dispatchBet({
					type: "BET_MATCH",
					payload: { TeamA: { TeamName: "", Logo: "" }, TeamB: { TeamName: "", Logo: "" } },
				});
				dispatchBet({ type: "BET_MATCH_DATE", payload: { MatchDate: "" } });

				setStatus(statusConst.success);

				fetchAllActiveBets()

				return notify("success", "Bet Placed Successfully");
			}

			setStatus(statusConst.failed);
			return notify("error", "Bet Placed Failed");
		} catch (error: any) {
			notify("error", error.message);
			setStatus(statusConst.failed);

			console.log('the error also came from here ');
			
		}
	}

	// --------USEEFFECTS
	useEffect(() => {
		if (BetList.length === 0) {
			fetchAllActiveBets();
		}
		fetchAlllMarkets()

		console.log("userContext mounted!!");
	}, []);
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
				BetImg,
				BetList,
				setBetList
			}}
		>
			{children}
		</BetContext.Provider>
	);
};

export default BetProvider;
