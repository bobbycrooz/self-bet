// import { LoginUserType, UserTypes } from "@types";
import service from "../index";

type loginDataTypes = {
	email: string;
	password: string;
};

type ResponsTypes = Promise<{
	error: boolean;
	serverResponse: {
		[key: string]: any;
	};
}>;

export function marketListAPI(PageNumber: number): ResponsTypes {
	return service({
		url: `/Market/List?PageNumber=${1}`,
		method: "get",
	});
}

export function getAllFixturesAPI(page: number): ResponsTypes {
	return service({
		url: `/Fixtures/List?PageNumber=${page}`,
		method: "get",
	});
}

export function createBetAPI(data: any): ResponsTypes {
	return service({
		url: "/Bet/Create",
		method: "post",
		data: data,
	});
}


export function joinBetAPI(data: any): ResponsTypes {
	return service({
		url: "/Bet/AddPlayer",
		method: "post",
		data: data,
	});
}

export function searchFixturesAPI(
	PageNumber: number,
	Name: "LeagueName" | "TeamName",
	searchValue: string | number
): ResponsTypes {
	return service({
		url: `/Fixtures/Search?PageNumber=${PageNumber}&${Name}=${searchValue}`,
		method: "get",
	});
}

export function fetchBetListAPI(page: number): ResponsTypes {
	return service({
		url: `/Bet/List?PageNumber=${page}`,
		method: "get",
	});
}


export function searchBetList(
	PageNumber: number,
	searchValue: string | number,
	Name?: "LeagueName" | "TeamName" | "Discount" | "Amount" | "Creator",
): ResponsTypes
{
	
	// process search query
	const urlWithName = `/Bet/Search?PageNumber=${PageNumber}&${Name}=${searchValue}`
	const urlWithOutName = `/Bet/Search?PageNumber=${PageNumber}`

	return service({
		url: Name ? urlWithName : urlWithOutName,
		method: "get",
	});
}