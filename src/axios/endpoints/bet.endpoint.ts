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

export function searchFixturesAPI(
	PageNumber: number,
	Name: "LeagueName" | "TeamName",
	searchValue: string
): ResponsTypes {
	return service({
		url: `/Fixtures/Search?PageNumber=${PageNumber}&${Name}=${searchValue}`,
		method: "get",
	});
}
