import React, { useContext, useState, useEffect, useMemo, createContext, Children, useReducer } from "react";
// import utils from 'utils';

interface propsTypes {
	email: string;
	name: string;
}

const BetContext = createContext<any>({

});

export const useBet = () => {
	return useContext(BetContext);
};
const statusConst = {
	success: "SUCCESS",
	failed: "FAILED",
};
const BetProvider = ({ children }: { children: any }) => {
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

	const initialState = {
		email: "",
		name: "",
	};

	const userReducer = (state: any, action: { type: string; payload: any }) => {
		switch (action.type) {
			case "STORE_USER":
				return { ...state, ...action.payload };
			case "REMOVE_USER":
				return { ...state, email: "", name: "" };

			default:
				return state;
		}
	};

	const [User, dispatch] = useReducer(userReducer, initialState);


	// --------USEEFFECTS

	// --------USEEFFECTS

	//providing the authcontext data to the consumer component
	return <BetContext.Provider value={{isLoading,
		placing,
		status,
		setIsLoading,
setStatus,
		handlePlaceBet }}>{children}</BetContext.Provider>;
};

export default BetProvider;
