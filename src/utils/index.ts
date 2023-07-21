import Cookies from 'js-cookie';
import moment from "moment";


export  const features = [
      "Take your in-person bets online.",
      "Create custom bets",
      "Earn rewards for your passion",
      "Secure and seamless transactions",
];
    


export function saveToken(token: string) {
	Cookies.set("token", token);
	console.log("token set");

	return true;
}

export function getToken() {
	let token = Cookies.get('token');
	if (token) {
		return token;
	} else {
		return false;
	}
}

export function hasToken() {
	let token = Cookies.get('token');
	if (token) {
		return true;
	} else {
		return false;
	}
}


export function removeToken()
{
	let token = Cookies.get("token");

	if (token)
	{
		Cookies.remove("token");
		return true;
	}

	return;
}

export function formatMatchDate(date: string) {
	const isoDateString = date;

	// Use Moment.js to create a Moment.js object from the date string
	const dateObject = moment(isoDateString);

	// Get the month (January is 0, December is 11)
	const month = dateObject.format("MMMM");

	// Get the day of the month
	const day = dateObject.format("DD");

	// Get the time (formatted as 24-hour time)
	const time = dateObject.format("HH:mm");

	let dateR = `${month}, ${day}`;
	
	return [dateR, time]


}