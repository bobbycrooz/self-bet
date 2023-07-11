import Cookies from 'js-cookie';


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