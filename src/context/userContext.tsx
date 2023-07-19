import { loginAPI, registerAPI } from "@/axios/endpoints/auth.endpoint";
import { UserDetailsTypes } from "@/types";
import { removeToken, saveToken } from "@/utils";
import { promises } from "dns";
import React, { useContext, useState, useEffect, useMemo, createContext, Children, useReducer } from "react";
import useToast from "@/hooks/useToast";
import { useRouter } from "next/router";

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

const userReducer = (state: any, action: { type: string; payload?: any }) => {
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
	const { notify } = useToast();
	const { push } = useRouter();

	// handlers------------------
	function findAndInitUser() {
		const rootUser = localStorage.getItem("user");
		if (!rootUser) return;

		const parsedUser = JSON.parse(rootUser);

		// console.log("found user in storage and set it to context", parsedUser);

		return dispatch({ type: "STORE_USER", payload: parsedUser });
	}

	function logOut() {
	
		localStorage.removeItem("user");

		removeToken()

		 dispatch({ type: "REMOVE_USER" });

		
		 notify("success", "Logged out successfully!");


		return push('/auth')
	}

	async function handleAuth(values: UserDetailsTypes, loginMode: boolean): Promise<boolean> {
		try {
			if (loginMode) {
				const datauu = {
					Email: values.Email,
					Password: values.Password,
				};
				const { error, serverResponse } = await loginAPI(datauu);


				if (!error) {
					const saveToCookie = saveToken(serverResponse.token);

					dispatch({ type: "STORE_USER", payload: serverResponse });

					notify("success", "Login successful!");

					return true;
				}

				// @ts-ignore
				notify("error", serverResponse);

				return false;
			} else {
				const { error, serverResponse } = await registerAPI(values);

				if (error) {
					// @ts-ignore
					notify("error", serverResponse);
					return false;
				}

				notify("success", "Account created successful!");

				return true;
			}
		} catch (error) {
			// console.log(error);
			notify("error", "Something went wrong!!");

			return false;
		}
	}

	// --------USEEFFECTS

	useEffect(() => {
		findAndInitUser();
	}, []);

	// --------USEEFFECTS

	//providing the authcontext data to the consumer component
	return <UserContext.Provider value={{ User, dispatch, isLoading, handleAuth, logOut }}>{children}</UserContext.Provider>;
};

export default UserProvider;
