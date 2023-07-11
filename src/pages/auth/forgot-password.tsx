import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import { Button, InputField, DynamicModal } from "@components";
import { ChangeEvent, Dispatch, SetStateAction, use, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { changePasswordAPI, resetMailAPI } from "@/axios/endpoints/auth.endpoint";
import useToast from "@/hooks/useToast";

const inter = Inter({ subsets: ["latin"] });
const stepNames = {
	SENDEMAIL: "SENDEMAIL",
	SENTSUCCESS: "SENTSUCCESS",
	NEWPASSWORD: "NEWPASSWORD",
	RESETSUCCESS: "RESETSUCCESS",
};

export default function ForgotPassword() {
	const [currentStep, setCurrentStep] = useState(stepNames.SENDEMAIL);
	const [isLoading, setIsLoading] = useState(false);
	const [token, setToken] = useState("");

	const { query } = useRouter();

	function handleFlow() {
		switch (currentStep) {
			case stepNames.SENDEMAIL:
				return <SendReset setCurrentStep={setCurrentStep} toggleLoader={setIsLoading} isLoading={isLoading} />;

			case stepNames.SENTSUCCESS:
				return <EmailSent setCurrentStep={setCurrentStep} />;

			case stepNames.NEWPASSWORD:
				return (
					<NewPassword
						token={token}
						setCurrentStep={setCurrentStep}
						toggleLoader={setIsLoading}
						isLoading={isLoading}
					/>
				);

			case stepNames.RESETSUCCESS:
				return <ResetSuccess />;

			default:
				return <SendReset setCurrentStep={setCurrentStep} toggleLoader={setIsLoading} isLoading={isLoading} />;
		}
	}

	// function stepHandler(params: string) {}
	// get stastus from query string

	useEffect(() => {
		const { token } = query;

		// @ts-ignore
		if (token?.length > 10) {
			setToken(token as string);
			setCurrentStep(stepNames.NEWPASSWORD);
		}
	});

	return (
		<>
			<Head>
				<title>Selfbet forgot password</title>
				<meta name="description" content="Reset your password" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className="auth_google w-screen min-h-screen pt-20 md:pb-48">
				<div className="auth_google-card w-[100%]  md:w-[590px] h-auto  mx-auto">{handleFlow()}</div>
				{isLoading && <DynamicModal />}
			</main>
		</>
	);
}

function EmailSent({ setCurrentStep }: { setCurrentStep: Dispatch<SetStateAction<string>> }) {
	// eslint-disable-next-line react-hooks/exhaustive-deps
	function handleRedirect() {
		setTimeout(() => {
			setCurrentStep(stepNames.NEWPASSWORD);
		}, 3000);
	}

	useEffect(() => {
		handleRedirect();
	}, [handleRedirect]);

	return (
		<div className="w-full column items-center">
			<Image src={"/icons/logo-2.svg"} alt="logo" width={150} height={56} />

			<Image src={"/icons/mail.svg"} alt="logo" width={64} height={64} className="mt-[38px]" />

			<h1 className="w-full mt-8  text-center display-sm f-eb text-gray-900">Check your email</h1>

			<p className="text-md text-gray-500 mt-3 text-center">
				A password reset link has been sent to
				<br />
				<strong>emmanuelogbonna@gmail.com</strong>
			</p>

			<div className="google w-full space-x-2 row-center p-3 border border-[#E5E7EB] rounded-lg mt-8">
				<Image src={"/icons/mail-googel.svg"} alt="logo" width={24} height={24} />
				<h1 className="txt-md text-gray-600 ml-2 f-s">Open Gmail</h1>
				<Image src={"/icons/send.svg"} alt="logo" width={24} height={24} />
			</div>

			<div role="button" title="back to login" onClick={() => history.back()} className="back middle mt-8 space-x-2">
				<Image src={"/icons/arrow-left.svg"} alt="logo" width={18} height={16} />
				<h1 className="text-sec txt-xs f-s">Back to login</h1>
			</div>
		</div>
	);
}

function SendReset({
	setCurrentStep,
	isLoading,
	toggleLoader,
}: {
	setCurrentStep: Dispatch<SetStateAction<string>>;
	isLoading: boolean;
	toggleLoader: Dispatch<SetStateAction<boolean>>;
	})
{
	
	const { notify } = useToast();
	async function handleSendLink(e: { preventDefault: () => void }) {
		e.preventDefault();

		console.log(email, "email");

		if (!validateEmail()) return;

		// send email

		const { error, serverResponse } = await resetMailAPI({
			Email: email,
		});

		if (error)
		{
			// @ts-ignore
			notify("error", serverResponse );
			
		} else {
			toggleLoader(true);

			// console.log(serverResponse, "email has been sent succesfully");
			// @ts-ignore
			notify("success", serverResponse );


			setTimeout(() => {
				toggleLoader(false);

				setCurrentStep(stepNames.SENTSUCCESS);
			}, 3000);
		}
	}

	// colect email
	const [email, setEmail] = useState("");

	// email validation
	const [emailError, setEmailError] = useState("");
	console.log(emailError);

	function validateEmail() {
		if (email === "") {
			setEmailError("Email is required");
			return false;
		}

		if (!email.includes("@")) {
			setEmailError("Email is invalid");

			return false;
		}

		setEmailError("");
		return true;
	}

	function handleEmailInput(e: ChangeEvent<HTMLInputElement>, name: string) {
		e.preventDefault();
		setEmail(e.target.value);
		validateEmail();
	}

	return (
		<div className="w-full column items-center">
			<Image src={"/icons/logo-2.svg"} alt="logo" width={150} height={56} />

			<Image src={"/icons/key.svg"} alt="logo" width={64} height={64} className="mt-[38px]" />

			<h1 className="w-full mt-8  text-center display-xs md:display-sm f-eb text-gray-900">Forgot password</h1>

			<p className="text-md text-gray-500 mt-3">No worries, we’ll send you reset instructions.</p>

			<form onSubmit={handleSendLink} className="w-full mt-8 space-y-6">
				<div className="space-y-4">
					<InputField type={"email"} label="Email" place={"***@gmail.com"} value={email} change={handleEmailInput} />
				</div>

				<Button text={"Reseet Password"} type={"submit"} full disabled={isLoading} primary click={handleSendLink} />
			</form>

			<div role="button" title="back to login" onClick={() => history.back()} className="back middle mt-8 space-x-2">
				<Image src={"/icons/arrow-left.svg"} alt="logo" width={18} height={16} />
				<h1 className="text-sec txt-xs f-s">Back to login</h1>
			</div>
		</div>
	);
}

// change passwrd component
function NewPassword({
	setCurrentStep,
	isLoading,
	toggleLoader,
	token,
}: {
	setCurrentStep: Dispatch<SetStateAction<string>>;
	isLoading: boolean;
	toggleLoader: Dispatch<SetStateAction<boolean>>;
	token: string;
}) {
	// colect email
	const [password, setPassword] = useState("");
	const { notify } = useToast();
	const [isBtnLoading, setIsLoading] = useState(false);

	const [confirmPassword, confirmPasswordSetPassword] = useState("");
	
	const router = useRouter();

	// email validation
	const [passwordError, setPasswordError] = useState("");
	console.log(passwordError);

	async function handleSubmitNewPassword(e: { preventDefault: () => void }) {
		e.preventDefault();
		setIsLoading(true);


		if (!validatePassword())
		{
			setIsLoading(false);	
			return notify("error", "Password does not match!" );
		}

		// send email

		// 	toggleLoader(true);
		// setTimeout(() => {
		// 	toggleLoader(false);

		// 	setCurrentStep(stepNames.RESETSUCCESS);
		// }, 3000);

		const { error, serverResponse } = await changePasswordAPI({
			password,
			token,
		});

		if (error)
		{
			setIsLoading(false);	

			 // @ts-ignore
			notify("error", serverResponse);
			
		} else {
			toggleLoader(true);
			
			// @ts-ignore
			notify("success", "Password successfully changed!" );

			setTimeout(() => {
				toggleLoader(false);

				setCurrentStep(stepNames.SENTSUCCESS);

				router.push('/auth')
			}, 3000);
		}
	}

	function validatePassword() {
		if (password !== confirmPassword) {
			setPasswordError("password does not matchd");
			return false;
		}

		setPasswordError("");
		return true;
	}

	function handlePassInput(e: ChangeEvent<HTMLInputElement>, name: string) {
		console.log(name);

		e.preventDefault();

		if (name === "password") {
			setPassword(e.target.value);
		} else {
			confirmPasswordSetPassword(e.target.value);
		}

		// validateEmail();
	}

	return (
		<div className="w-full column items-center">
			<Image src={"/icons/logo-2.svg"} alt="logo" width={150} height={56} />

			<Image src={"/icons/key.svg"} alt="logo" width={64} height={64} className="mt-[38px]" />

			<h1 className="w-full mt-8  text-center display-xs md:display-sm f-eb text-gray-900">Set new password</h1>

			<p className="text-md text-gray-500 mt-3 text-center w-full md:w-[80%]">
				You should choose a new password that you have not used before.
			</p>

			<form onSubmit={handleSubmitNewPassword} className="w-full space-y-6">
				<InputField
					filedName="password"
					type={"password"}
					label="Password"
					place={"********"}
					value={password}
					change={handlePassInput}
				/>

				<InputField
					filedName="comfirm password"
					type={"password"}
					label="Confirm Password"
					place={"********"}
					value={confirmPassword}
					change={handlePassInput}
				/>

				<Button
					text={"Set New Password"}
					type={"submit"}
					full
					isLoading={isLoading}
					disabled={isLoading}
					click={handleSubmitNewPassword}
					primary
				/>
			</form>

			<div role="button" title="back to login" onClick={() => history.back()} className="back middle mt-8 space-x-2">
				<Image src={"/icons/arrow-left.svg"} alt="logo" width={18} height={16} />
				<h1 className="text-sec txt-xs f-s">Back to login</h1>
			</div>
		</div>
	);
}

function ResetSuccess() {
	const { push } = useRouter();

	function handleLogin() {
		push({
			pathname: "/auth",
			query: { login: true },
		});
	}

	return (
		<div className="w-full column space-y-8 items-center ">
			<Image src={"/icons/logo-2.svg"} alt="logo" width={150} height={56} />

			<Image src={"/icons/check.svg"} alt="logo" width={48} height={48} className="hidden md:block" />

			<Image src={"/icons/check.svg"} alt="logo" width={64} height={64} className="flex md:hidden" />

			<div className="w-full space-y-2  text-center">
				<h1 className="title display-xs md:display-sm f-eb text-gray-900">Password Reset Successful</h1>

				<p className="subtitle txt-md md:txt-sm f-n text-gray-500">
					Your password has been reset. You may now log in with your new password.
				</p>
			</div>

			<Button text={"Login"} type={"submit"} full click={handleLogin} primary />
		</div>
	);
}
