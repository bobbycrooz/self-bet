import Head from "next/head";
import Image from "next/image";
import { Button, InputField } from "@components";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import { features } from "@utils";
import { useUser } from "@/context/userContext";
import { useSession, signIn, signOut } from "next-auth/react";
import { checkSVG } from "@/assets";
import { UserDetailsTypes } from "@/types";
import useToast from "@/hooks/useToast";
import { validateLogingSchema, validateRegisterSchema } from "@/utils/schema";

export default function Home() {
	const [loginMode, setLoginMode] = useState(!true);
	const [isAuth, setIsAuth] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [isChecked, setIsChecked] = useState(false);
	const { push, query, pathname } = useRouter();
	const [userDetails, setUserDetails] = useState<UserDetailsTypes>({});
	const { state, dispatch, handleAuth } = useUser();
	const { data: session } = useSession();
	const { notify } = useToast();

	let errorList: string[] = [];

	const registerSchema = {
		Email: "bobby@mail.com",
		Username: "",
		Password: "",
	};

	const logingSchema = {
		Email: "",
		Password: "",
	};

	// handlers--------------
	function handleAuthMode() {
		setLoginMode((p) => !p);
		window?.scrollTo({
			top: 0,
			left: 0,
			behavior: "smooth",
		});
	}

	function handleGoogle() {
		// signIn();
		push("/auth/continue");
	}

	function handleForgotPassword() {
		// signOut();
		push("/auth/forgot-password");
	}

	const onSubmit = async (values: any, actiona: any) => {
		setIsLoading(true);

		// validations
		if (!loginMode && !values.Username) {
			return errorList.push("Username is required");
		}

		const res = await handleAuth(values, loginMode);

		if (!loginMode && res) {
			setIsLoading(false);

			setLoginMode(true);
		} else if (res) {
			setIsLoading(false);

			const cachedUrl = localStorage.getItem("CACHED_URL");

			if (cachedUrl) {
				push(JSON.parse(cachedUrl));

				return localStorage.removeItem("CACHED_URL");
			} else {
				push("/dashboard");
			}
		}

		setIsLoading(!true);
	};

	 const { handleChange, errors, touched, handleSubmit, values, handleBlur } = useFormik({
		initialValues: !loginMode ?  registerSchema : logingSchema,
		validationSchema: !loginMode ? validateRegisterSchema :  validateLogingSchema,
		onSubmit,
	});

	console.log(errors);
	

	// useEffects -------------
	useEffect(() => {
		if (query.login) {
			setLoginMode(true);
		}
	}, [pathname, query.login]);

	return (
		<>
			<Head>
				<title>Welcome - Selfbet</title>
				<meta name="description" content="Online sport betting site" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className="auth w-screen h-auto lg:h-[882px] row">
				{/* auth banner */}
				<div
					className={`auth_banner hidden lg:block ${
						loginMode ? "login_banner" : "sign_banner"
					} w-[60%] text-white h-full relative`}
				>
					{/* <Image src={"/images/auth-banner.png"} alt="logo" fill /> */}

					<div className={`auth_banner-content ${loginMode ? "login" : "signIn"} `}>
						<div className="w-[500px] ">
							<div className="logo">
								<Image src={"/icons/Logo.svg"} alt="logo" width={200} height={32} />
							</div>
							<h1 className="header display-md f-eb mt-12">
								{loginMode
									? "Welcome back to your betting platform!"
									: "Take your betting experience to the next level!"}
							</h1>

							<div className="checks mt-6 space-y-3">
								{features.map((i, k) => (
									<div key={k} className="check-item row  space-x-2">
										<Image src={"/icons/check-circle.svg"} alt="logo" width={20} height={20} className="" />
										<h4 className="txt-xl f-s">{i}</h4>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>

				{/* ACTION  */}
				<div className="auth_content  w-full  lg:w-[40%] h-full p-4 md:px-24 lg:px-16">
					<div className="w-full  column md:mt-20 space-y-6 pb-8 md:pb-0">
						{/* logo */}
						<Image src={"/icons/logo-2.svg"} alt="logo" width={150} height={56} />

						{/* text */}
						<div className="auth_content-text">
							<h1 className="display-sm f-eb text-gray-900 space-y-2">{loginMode ? "Welcome back!" : "Sign up"}</h1>
							<p className="text-md text-gray-500">
								{loginMode ? "Log in to continue your betting journey" : "Join now and start placing your bets!"}
							</p>
						</div>

						{/* google */}
						<div
							role="button"
							onClick={handleGoogle}
							title="sign in with your google account"
							className="google w-full row-center p-3 border border-[#E5E7EB] rounded-lg mt-12"
						>
							<Image src={"/icons/google.svg"} alt="logo" width={24} height={24} />
							<h1 className="txt-md text-gray-600 ml-2 f-s">
								{loginMode ? "Continue with Google" : "Sign up with Google"}
							</h1>
						</div>

						{/* line */}
						<div className="divider relative w-full h-4 ">
							<hr className="w-full border-dashed border mt-2 border-gray-200" />
							<h1 className="txt-xs bg-white f-m px-2 absolute left-1/2 top-0  -translate-x-1/2">
								{loginMode ? "or Log In with email" : "or Sign up with email"}
							</h1>
						</div>

						{/* form */}
						<form onSubmit={handleSubmit} className="w-full space-y-6">
							<div className="space-y-4">
								<InputField
									filedName="Email"
									type={"email"}
									label="Email"
									place={"***@gmail.com"}
									change={handleChange}
									// @ts-ignore
									value={values.Email}
									name="Email"
									touched={touched.Email}
									error={errors.Email}
									blur={handleBlur}
								/>

								{!loginMode && (
									<>
									<InputField
										type={"text"}
										label="username"
										required
										filedName="Username"
										place={"Enter a username"}
										change={handleChange}
										// @ts-ignore
										value={values.Username}
										name="Username"
											blur={handleBlur}
											// @ts-ignore
											error={errors.Username}
											// @ts-ignore
										touched={touched.Username}

										/>
										{/* {
											errors.Username && <p className="text-red-500 text-xs">
												{errors.Username}
											</p>
										} */}
									</>
										

								)}

								<InputField
									type={"password"}
									label="Password"
									place={"********"}
									change={handleChange}
									value={values.Password}
									name="Password"
									touched={touched.Password}
									error={errors.Password}
									blur={handleBlur}

								/>

								<div className="terms row-between">
									<div className="middle space-x-2">
										{!loginMode ? (
											<>
												<div role="button" onClick={() => setIsChecked((p) => !p)} className="check_box fadeIn">
													{checkSVG(isChecked)}
												</div>

												<h2 className=" txt-sm f-m  text-gray-700">
													I agree to the <strong className="f-b text-gray-900">Terms & Conditions</strong>
												</h2>
											</>
										) : (
											<>
												<div role="button" onClick={() => setIsChecked((p) => !p)} className="check_box fadeIn">
													{checkSVG(isChecked)}
												</div>

												<h2 className="terms-text txt-sm f-m ">Remember me</h2>
											</>
										)}
									</div>

									{loginMode && (
										<h1
											role="button"
											onClick={handleForgotPassword}
											title="forgot password"
											className="txt-sm f-b text-[#FF4B00]"
										>
											Forgot Password?
										</h1>
									)}
								</div>
							</div>

							<Button
								primary
								isLoading={isLoading}
								auth
								text={loginMode ? "Login" : "Create account"}
								type={"submit"}
								full
								disabled={isLoading}
							/>

							<div className="flex w-full justify-center mt-8">
								{!loginMode ? (
									<h1 className="info  txt-md f-m text-gray-500">
										Already have an account?{" "}
										<strong
											role="button"
											title="Login into your existing account"
											onClick={handleAuthMode}
											className="f-eb text-gray-900"
										>
											Log in here.
										</strong>
									</h1>
								) : (
									<h1 className="info  txt-sm f-m t-g5">
										Don’t have an account?{" "}
										<strong
											role="button"
											title="Create a new account"
											onClick={handleAuthMode}
											className="f-eb text-[#FF4B00]"
										>
											{" "}
											Create account.
										</strong>
									</h1>
								)}
							</div>
						</form>
					</div>
				</div>
			</main>
		</>
	);
}
