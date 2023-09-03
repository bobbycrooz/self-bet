import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import { BetCard, Button, Deposite, InputField, Withdraw } from "@components";
import { ReactElement, useEffect, useState } from "react";
import { useRouter } from "next/router";
import DashboardLayout from "@/layouts";
import { changeUserNameAPI } from "@/axios/endpoints/auth.endpoint";
import { useUser } from "@/context/userContext";
import { toast } from "react-toastify";

function Home() {
	const [isLoading, setIsLoading] = useState(false);
	const [name, setName] = useState('');
	const { fetchProfileDetails } = useUser()
	const {User} = useUser()
	


	// handlers--------------

	function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
		setName(e.target.value);
	}

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setIsLoading(true);
		setName('');

		
		const { error, serverResponse } = await changeUserNameAPI(name);
		
		if (error) {
			console.log(error);
			toast.error("Username change failed!")
			setIsLoading(false);
			return;
		}

		if (serverResponse)
		{
			setIsLoading(false);
			const fetchUser = fetchProfileDetails(serverResponse._id)
			if (fetchUser)
			{
			toast.success("Username changed successfully!")
			return;	
			}
			
		}
	}

	// useEffects -------------
	// useEffect(() => {
	//   if (query.login) {
	//     setLoginMode(true);
	//   }
	// }, [pathname, query.login]);

	return (
		<>
			<Head>
				<title>my Settings</title>
				<meta
					name="description"
					content="welcome to selfbet home"
				/>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className="dashboard_home bg-white w-full h-auto md:pb-16 ">
				{/* ----header---- */}
				<div className="bg-gray-50 w-full h-[112px] middle p-4 md:p-12 relative">
					<div className="space-x-4 middle ">
						<Image
							src={"/icons/dashboard/settings.svg"}
							alt={""}
							width={48}
							height={48}
						/>

						<h1 className="notify display-xs f-b text-gray-700  ">
							Settings
						</h1>
					</div>
				</div>

				{/*-------- body------ */}
				<div className="md:pl-12 mt-[39px] w-full md:w-[462px] ">
					<div className="profile_setting p-6  rounded-xl space-y-8 ">
						{/* ----avatar----- */}
					{false && <div className="middle space-x-3">
							<Image
								src={
									"/icons/dashboard/olivia.svg"
								}
								alt={""}
								width={48}
								height={48}
							/>

							<div className="txt-sm f-s t-g9 bg-gray-100 rounded-lg md:px-3 p-[10px] px-4 md:p-1">
								Update new Avatar
							</div>
							
						</div>}

						{/* ----form----- */}
						<form
							onSubmit={handleSubmit}
							className="w-full space-y-6"
						>
							<div className="space-y-4">
								<InputField
									type={"text"}
									label="username"
									required
value={name}
									change={handleNameChange}
									place={User.Username}
								/>
								{/* <InputField
									type={"email"}
									label="Email"
									place={"***@gmail.com"}
								/> */}
							</div>

							<Button
								text={"Save changes"}
								type={"submit"}
								disabled={name.length < 3}
								isLoading={isLoading}
                auth
							/>
						</form>
					</div>
				</div>
			</main>
		</>
	);
}
Home.getLayout = function getLayout(page: ReactElement) {
	return <DashboardLayout>{page}</DashboardLayout>;
};

export default Home;
