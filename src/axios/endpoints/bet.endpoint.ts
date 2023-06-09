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

// // -----
// export function getAllPurchases() {
//   return service({
//     url: `admin/allP2PTransactions`,
//     method: 'get'
//   });
// }

// export function getPurchasePage(number: number) {
//   console.log('i got here');

//   return service({
//     url: `admin/allP2PTransactions?page=${number}`,
//     method: 'get'
//   });
// }

// // -----

// export function getAllWithdrawals() {
//   return service({
//     url: `admin/allWithdrawals`,
//     method: 'get'
//   });
// }

// // export function getAllUser() {
// //   return service({
// //     url: `admin/allUsers`,
// //     method: 'get'
// //   });
// // }

// export function getTotalUsers() {
//   return service({
//     url: `admin/user/count`,
//     method: 'get'
//   });
// }

// // export function getTransfers() {
// //   return service({
// //     url: `admin/allTransferTransactions?page=1`,
// //     method: 'get'
// //   });
// // }

// // export function searchByName(name) {
// //   console.log(name);
// //   return service({
// //     url: `/name/${name.toLowerCase()}`,
// //     method: 'get'
// //   });
// // }
// // continent / { region };
