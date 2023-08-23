import { loginAPI, registerAPI } from "@/axios/endpoints/auth.endpoint";
import {
	createBetAPI,
	fetchBetListAPI,
	marketListAPI,
	resultAPI,
	transactiontAPI,
} from "@/axios/endpoints/bet.endpoint";
import useToast from "@/hooks/useToast";
import { UserDetailsTypes } from "@/types";
import { getToken, saveToken } from "@/utils";
import axios from "axios";
import { promises } from "dns";
import React, { useContext, useState, useEffect, useMemo, createContext, Children, useReducer } from "react";
import { useUser } from "./userContext";
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
	const [TransactiontList, setTransactionList] = useState([]);
	const [BetList, setBetList] = useState([]);
	const [BetResults, setBetResults] = useState([]);
	const { User } = useUser();
	const [BetImg, setBetImg] = useState(null);
	const [noImg, setNoImg] = useState(true);
	const [isLoading, setIsLoading] = useState(false);
	const [placing, isPlacing] = useState(false);

	const [currentPage, setCP] = useState(1);

	const [createdBetDetails, setCBD] = useState({
		status: "created",
		reason: "succesfully",
		betId: "",
	});
	const [BetDetailsData, setBetDetailsData] = useState({
		BetName: "",
		Amount: "",
		Discount: "",
		// NumberOfPeople: 0,
	});

	// console.log(BetDetailsData);

	const [status, setStatus] = useState(statusConst.success);
	const { notify } = useToast();

	// handlers------------------
	function handlePlaceBet() {
		isPlacing((p) => !p);
		setIsLoading(true);
		placeBet();

		// setTimeout(() => {
		// 	setIsLoading(false);
		// 	setStatus(statusConst.success);
		// }, 5000);
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
				// console.log(serverResponse[0], "fetching all bets");
				
			} else {
				// console.log(serverResponse, "fetching all bets");
			}
		} catch (error) {}
	}

	async function fetchMoreActiveBets(page: number) {
		try {
		
			// @ts-ignore
			const { error, serverResponse } = await fetchBetListAPI(page);

			if (error) return console.log(error);

			if (serverResponse.length === 0) {
				
				return false;
			} else {
				// @ts-ignore
				setBetList([...BetList, ...serverResponse]);

				return true;
			}
		} catch (error) {}
	}

	async function fetchAllResults() {
		try {
			const { error, serverResponse } = await resultAPI(1);

			if (!error) {

				// filter results
				const userResult = serverResponse.filter((i: any) => i.Players[0]?.userId == User._id) as any;

				// console.log(userResult, "this is the response after making the request ---");

				setBetResults(userResult as any);
				// setBetResults(serverResponse as any);
			} else {
				// console.log(serverResponse, "fetching all bets");
			}
		} catch (error) {
			// console.log(error, "from result  endpoint");
		}
	}

	async function placeBet() {
		if (Bet.Type.length === 0) {
			return notify("error", "You need to select a bet type");
		}

		const formData = new FormData();

		// @ts-ignore
		formData.append("BetImg", noImg ? BetImg : BetImg[0]);
		// formData.append("Type", "KoloBet");
		formData.append("Type", Bet.Type);
		formData.append("Teams", Bet.Teams);
		formData.append("Leagues", Bet.Leagues);
		formData.append("Amount", Bet.Amount);
		formData.append("Discount", JSON.stringify(Bet.Discount));
		formData.append("Criteria", JSON.stringify(Bet.Criteria));
		formData.append("Conditions", JSON.stringify(Bet.Conditions));
		formData.append("BetName", Bet.BetName);

		try {
			const response = await axios.post("https://13.244.65.147/Bet/Create", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
					Authorization: `Bearer ${String(getToken())}`,
					"x-auth-token": `${String(getToken())}`,
				},
			});

			// console.log(response, "this is the response after making the request ---");

			if (response.status == 200) {
				// reset all states
				dispatchBet({ type: "BET_TYPE", payload: { type: "" } });
				dispatchBet({
					type: "REMOVE_BET_LEAGUES",
					payload: undefined,
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

				setIsLoading(!true);

				setCBD({
					...createdBetDetails,
					// status: "created"
					betId: response.data._id,
				});

				fetchAllActiveBets();

				// isPlacing((p) => !p);

				return notify("success", "Bet Placed Successfully");
			} else {
				setStatus(statusConst.failed);

				setIsLoading(!true);

				setCBD({
					...createdBetDetails,
					status: "falied",
					// betId: response.data._id,
					// reason: response?.message
				});

				// console.log(response);
				// @ts-ignore
			}

			return notify("error", "Bet Placed Failed");
		} catch (error: any) {
			setStatus(statusConst.failed);

			setIsLoading(!true);

			notify("error", error.response.data);

			// console.log(error.response.data, "this error came from not---");

			isPlacing(false);

			isPlacing(false);

			setCBD({
				...createdBetDetails,
				status: "falied",
				// betId: response.data._id,
				// reason: response?.message
			});
		}
	}

	async function fetchAllTransaction() {
		try {
			if (TransactiontList.length == 0) {
				const { error, serverResponse } = await transactiontAPI(1);
				if (!error) {
					setTransactionList(serverResponse as any);
				} else {
					// console.log(serverResponse, "serverResponse");
				}
			}
		} catch (error) {}
	}

	// --------USEEFFECTS
	useEffect(() => {
		if (BetList.length === 0) {
			fetchAllActiveBets();
		}

		fetchAlllMarkets();

		if (TransactiontList.length === 0) {
			fetchAllTransaction();
		}

		// console.log("fetching all active bet!");

		// eslint-disable-next-line react-hooks/exhaustive-deps
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
				isPlacing,
				status,
				handlePlaceBet,
				setIsLoading,
				setStatus,
				setBetImg,
				BetImg,
				BetList,
				setBetList,
				setBetResults,
				BetResults,
				fetchAllResults,
				noImg,
				setNoImg,
				fetchAllTransaction,
				TransactiontList,
				setTransactionList,
				createdBetDetails,
				BetDetailsData,
				setBetDetailsData,
				fetchAllActiveBets,
				currentPage,
				setCP,
				fetchMoreActiveBets,
			}}
		>
			{children}
		</BetContext.Provider>
	);
};

export default BetProvider;
