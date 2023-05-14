import React, { useContext, useState, useEffect, useMemo, createContext, Children, useReducer } from "react";
// import utils from 'utils';

interface propsTypes {
	email: string;
	name: string;
}

const UserContext = createContext<any>({

});

export const useUser = () => {
	return useContext(UserContext);
};

const UserProvider = ({ children }: { children: any }) => {
	const [refresh, setRefresh] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	// const [User, setUser] = useState({
	// email: '',
	// name: ""
	// });

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
	return <UserContext.Provider value={{User, dispatch,  isLoading }}>{children}</UserContext.Provider>;
};

export default UserProvider;
