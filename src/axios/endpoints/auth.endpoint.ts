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

export function registerAPI(data: any): ResponsTypes {
	// console.log('look i got here');
	return service({
		url: "/Auth/Register",
		method: "post",
		data: data,
	});
}

export function loginAPI(data: any): ResponsTypes {
	// console.log('look i got here');
	return service({
		url: "/Auth/Login",
		method: "post",
		data: data,
	});
}


export function resetMailAPI(data: any): ResponsTypes {
	// console.log('look i got here');
	return service({
		url: "/Auth/ForgotPassword",
		method: "post",
		data: data,
	});
}


export function changePasswordAPI(data: any): ResponsTypes {
	// console.log('look i got here');
	return service({
		url: `/Auth/ChangePassword?token=${data.token}`,
		method: "post",
		data: {
			Password: data.password,
		},
	});
}

export function getUserProfile(): ResponsTypes {
	return service({
		url: `/Auth/GetUser`,
		method: "post",
	});
}


// export function creatUser(data: UserTypes) {
// 	// console.log('look i got here');
// 	return service({
// 		url: "/v1/auth/register",
// 		method: "post",
// 		data: data,
// 	});
// }

// export function updateUser(data: UserTypes) {
// 	// console.log('look i got here');
// 	return service({
// 		url: "/v1/auth/update-user",
// 		method: "post",
// 		data: data,
// 	});
// }

// // -----
// export function getAllPurchases() {
//   return service({
//     url: `admin/allP2PTransactions`,
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
