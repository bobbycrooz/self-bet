import { loginAPI, registerAPI } from "@/axios/endpoints/auth.endpoint";
import { UserDetailsTypes } from "@/types";
import { saveToken } from "@/utils";
import { promises } from "dns";
import React, { useContext, useState, useEffect, useMemo, createContext, Children, useReducer } from "react";
// import utils from 'utils';

interface propsTypes {
	email: string;
	name: string;
}

const UserContext = createContext<any>({});

export const useUser = () => {
	return useContext(UserContext);
};

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

// -------------------------------------------------------

const UserProvider = ({ children }: { children: any }) => {
	const [refresh, setRefresh] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [User, dispatch] = useReducer(userReducer, initialState);

	// handlers------------------
	function findAndInitUser() {
		const rootUser = localStorage.getItem("user");
		if (!rootUser) return;

		const parsedUser = JSON.parse(rootUser);

		console.log("found user in storage and set it to context", parsedUser);

		return dispatch({ type: "STORE_USER", payload: parsedUser });
	}

	async function handleAuth(values: UserDetailsTypes, loginMode: boolean): Promise<boolean> {
		try {
			if (loginMode)
			{
				
				const datauu = {
					Email: values.Email,
					Password: values.Password
				}
				const { error, serverResponse } = await loginAPI(datauu);

				console.log(serverResponse.token, "this user is logging in");

				if (!error) {
					const saveToCookie = saveToken(serverResponse.token);

					console.log(saveToCookie, "this token has been saved to cookie");

					dispatch({ type: "STORE_USER", payload: values });
					return true;
				}
				return false

			} else {
				console.log(values, "this user is registering");

				const { error, serverResponse } = await registerAPI(values);


				if (error)
				{
					console.log(serverResponse, "this is the error from the server");
					
					return false
				}
					
				

				

				return true;
			}
		} catch (error) {
			console.log(error);
			return false;
		}
	}

	// --------USEEFFECTS

	useEffect(() => {
		findAndInitUser();
	}, []);

	// --------USEEFFECTS

	//providing the authcontext data to the consumer component
	return <UserContext.Provider value={{ User, dispatch, isLoading, handleAuth }}>{children}</UserContext.Provider>;
};

export default UserProvider;
