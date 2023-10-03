import { getToken, hasToken } from "@/utils";
import axios, { AxiosRequestConfig } from "axios";
import Router from "next/router";
// import utils from "@utils";

function fmtResponse(responseData: any, error: boolean) {
	let { statusText, status, data } = responseData;


	if (error) {
		return {
			status,
			serverResponse: data,
			statusText,
			error: true,
		};
	} else {
		return {
			status,
			serverResponse: data,
			statusText,
			error: false,
		};
	}
}

const service = axios.create({
	baseURL: "https://52.91.25.228",
	// process.env.NEXT_PUBLIC_NODE_ENV === "development" ? `http://localhost:3000` : process.env.NEXT_PUBLIC_BASE_LINK,
	// headers: {
	// 	"x-auth-token": `${String(getToken())}`,
	// 	// "Content-Type": "multipart/form-data",
	// },
});

// request interceptor
service.interceptors.request.use(


      // @ts-ignore
	async (config: AxiosRequestConfig) => {
		if (config.headers === undefined) {
			config.headers = {};
		}

		if (hasToken() && getToken() !== false) {
			// config.headers.Authorization = `Bearer ${token}`;
			config.headers.Authorization = `Bearer ${String(getToken())}`;
			config.headers["x-auth-token"] = `${String(getToken())}`;
		}

		return config;
	},

	(error) => {
		return Promise.reject(error);
	}
);

// Add a response interceptor
service.interceptors.response.use(
	// @ts-ignore
	function (response) {
		const { data } = response;

		// console.log(response, 'this is the response from the interceptor');
		

		return fmtResponse(response, false);
	},

	function (error)
	{
		console.log(error, 'this is the error from the interceptor----2');
		
		const { response } = error;
		// console.log(response, 'this error is comming from response interceptor');

		// check if error is an axios error
		// if (error?.name && error.name === 'AxiosError') {
		if (error && !error?.response?.data) {
			return {
				error: true,
				serverResponse: error.message,
			};
		} else  {
			const {
				response: { data },
			} = error;

			return {
				error: true,
				serverResponse: data,
			};
		}

		// return fmtResponse(response, true);
	}
);

export default service;
