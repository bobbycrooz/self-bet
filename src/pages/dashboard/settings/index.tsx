import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import { BetCard, Button, ConfirmLogout, Deposite, InputField, Withdraw } from "@components";
import { ReactElement, useEffect, useState } from "react";
import { useRouter } from "next/router";
import DashboardLayout from "@/layouts";
import { changeUserNameAPI } from "@/axios/endpoints/auth.endpoint";
import { useUser } from "@/context/userContext";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import DropzoneComponent from "@/components/DropZone";
import { RiLogoutCircleRLine } from "react-icons/ri";

function Home() {
	const [isLoading, setIsLoading] = useState(false);
	const [name, setName] = useState("");
	const { fetchProfileDetails } = useUser();
	const { User } = useUser();
	const [currentImageData, setCurrentImg] = useState<string>();
	const [showProfile, setShowProfile] = useState(false);
	const [confirmLogout, toggleConfirmLogout] = useState(false);
	const [avatarSrc, setAvatarSrc] = useState<string>();

	const dataValues = {
		Username: "",
		Firstname: "",
		Email: "",
		Lastname: "",
	};

	async function onSubmit(values: any, actiona: any) {
		setIsLoading(true);
		setName("");

		const { error, serverResponse } = await changeUserNameAPI(name);

		if (error) {
			console.log(error);
			toast.error("Username change failed!");
			setIsLoading(false);
			return;
		}

		if (serverResponse) {
			setIsLoading(false);
			const fetchUser = fetchProfileDetails(serverResponse._id);
			if (fetchUser) {
				toast.success("Username changed successfully!");
				return;
			}
		}
	}
	const { handleChange, errors, touched, handleSubmit, values, handleBlur } = useFormik({
		initialValues: dataValues,
		onSubmit,
	});

	function handleLogout() {
		setShowProfile(!showProfile);
		toggleConfirmLogout((p) => !p);
	}

	// handlers--------------

	// function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
	// 	setName(e.target.value);
	// }

	// useEffects -------------
	// useEffect(() => {
	//   if (query.login) {
	//     setLoginMode(true);
	//   }
	// }, [pathname, query.login]);
	{
		/* <Image src={"/icons/dashboard/settings.svg"} alt={""} width={48} height={48} /> */
	}

	{
		/* <h1 className="notify display-xs f-b text-gray-700  ">Settings</h1> */
	}

	return (
		<>
			<Head>
				<title>My Settings</title>
				<meta name="description" content="welcome to selfbet home" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className="dashboard_home bg-white w-full h-auto md:pb-16 ">
				{/* ----header---- */}
				<div className="bg-gray-50 w-full h-[112px] middle p-4 md:p-12 relative  settings_bg">
					<div className="space-x-4 middle  absolute ring-4 ring-gray-200 w-40 h-40 bg-gray-50 left-8 -bottom-20 rounded-full"></div>
				</div>

				<div className="details  w-full flex pl-[40px] h-[60px] mt-6 pr-8">
					<div className="w-[200px]"></div>
					<div className="w-full flex justify-between items-center">
						<div className="name_box">
							<h1 className="name txt-md t-g9 f-eb">{User?.Username ? User?.Username : "--_--"}</h1>
							<p className="sub_name text-sm f-n t-g6">{User?.Email ? User?.Email : "--_--"}</p>
						</div>

						<Button text={"View Profile"} primary type={undefined} />
					</div>
				</div>

				{/*-------- body------ */}
				<div className="md:p-8 mt-[39px] w-full  border-t">
					{/* ROW ONE */}
					<div className="flex justify-between space-x-8">
						<div className="w-[300px]">
							<div className="name_box">
								<h1 className="name txt-md t-g9 f-eb">{"Personal info"}</h1>
								<p className="sub_name text-xs t-g5">{"Update your photo and personal details."}</p>
							</div>
						</div>

						<div className="w-full flex  flex-col items-start border rounded-xl shadow h-auto">
							{/* BODY */}
							<div className="content w-full p-6">
								{/* FORM GRID */}
								<div className="w-full grid grid-cols-2 gap-6">
									<InputField
										filedName="Username"
										type={"text"}
										label="Username"
										place={"***@gmail.com"}
										change={handleChange}
										// @ts-ignore
										value={values.Username}
										name="Username"
										touched={touched.Username}
										error={errors.Username}
										blur={handleBlur}
									/>
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
									<InputField
										filedName="Firstname"
										type={"text"}
										label="Firstname"
										place={"***@gmail.com"}
										change={handleChange}
										// @ts-ignore
										value={values.Firstname}
										name="Firstname"
										touched={touched.Firstname}
										error={errors.Firstname}
										blur={handleBlur}
									/>
									<InputField
										filedName="Lastname"
										type={"text"}
										label="Last name"
										place={""}
										change={handleChange}
										// @ts-ignore
										value={values.Lastname}
										name="Lastname"
										touched={touched.Lastname}
										error={errors.Lastname}
										blur={handleBlur}
									/>
								</div>

								{/* AVATAR  SECTION */}

								<div className=" w-full mt-6">
									<div className="name_box">
										<h1 className="name text-xs t-g6 f-eb">{"Avatar"}</h1>
										<p className="sub_name text-xs text-gray-400">{"Change or delete your profile picture."}</p>
									</div>

									{/* PICTURE ROLE */}
									<div className="w-full flex items-start space-x-3 mt-4">
										<div className="avatar rounded-full bg-gray-300">
											<Image src={avatarSrc as string} alt={"avatar"} className="rounded-full" height={64} width={64} />
										</div>

										{/* dropzone */}
										<div className=" w-full ">
											<DropzoneComponent seCurrentFile={setCurrentImg} setDataurl={setAvatarSrc} isAvatar={true} />
										</div>
									</div>
								</div>
							</div>
							{/* FOOTER */}
							<div className="action border-t rounded-b-xl flex items-center justify-end w-full">
								<div className="button_group flex space-x-4 px-6 p-4">
									<Button text={"Cancel"} type={undefined} ghost />
									<Button text={"Save changes"} type={undefined} primary disabled={true} />
								</div>
							</div>
						</div>
					</div>

					{/* ROW TWO */}
					<div className="flex justify-between space-x-8 mt-8 ">
						<div className="w-[300px]">
							<div className="name_box">
								<h1 className="name txt-md t-g9 f-eb">{"Password"}</h1>
								<p className="sub_name text-xs t-g5">{"Change your password"}</p>
							</div>
						</div>

						<div className="w-full flex shadow flex-col items-start border rounded-xl h-auto">
							{/* BODY */}
							<div className="content w-full p-6">
								{/* FORM GRID */}
								<div className="w-full grid grid-cols-2 gap-6">
									<InputField
										filedName="Username"
										type={"text"}
										label="Username"
										place={"***@gmail.com"}
										change={handleChange}
										// @ts-ignore
										value={values.Username}
										name="Username"
										touched={touched.Username}
										error={errors.Username}
										blur={handleBlur}
									/>
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
								</div>
							</div>
							{/* FOOTER */}
							<div className="action border-t rounded-b-xl  flex items-center justify-end w-full">
								<div className="button_group flex space-x-4 px-6 p-4">
									<Button text={"Cancel"} type={undefined} ghost />
									<Button text={"Save changes"} type={undefined} primary disabled={true} />
								</div>
							</div>
						</div>
					</div>

					{/* ROW THREE */}
					<div className="flex justify-between space-x-8 mt-8 ">
						<div className="w-[300px]">
							<div className="name_box">
								<h1 className="name txt-md t-g9 f-eb">{"Others"}</h1>
							</div>
						</div>

						<div className="w-full flex shadow flex-col items-start border rounded-xl h-auto p-6">
							{/* BODY */}
							<div role="button" onClick={handleLogout} className="profile_logout middle space-x-4">
								<RiLogoutCircleRLine className="text-gray-500 " />

								<p className="item_name  f-b text-gray-500  hover:text-sec">LOG OUT</p>
							</div>
						</div>
					</div>
				</div>
			</main>

			<ConfirmLogout handleClose={handleLogout} isLoading={false} toggleLoader={undefined} show={confirmLogout} />
		</>
	);

	// <div className="profile_setting p-6  rounded-xl space-y-8 ">
	// 					{/* ----avatar----- */}
	// 					{false && (
	// 						<div className="middle space-x-3">
	// 							<Image src={"/icons/dashboard/olivia.svg"} alt={""} width={48} height={48} />

	// 							<div className="txt-sm f-s t-g9 bg-gray-100 rounded-lg md:px-3 p-[10px] px-4 md:p-1">
	// 								Update new Avatar
	// 							</div>
	// 						</div>
	// 					)}

	// 					{/* ----form----- */}
	// 					<form onSubmit={handleSubmit} className="w-full space-y-6">
	// 						<div className="space-y-4">
	// 							<InputField
	// 								type={"text"}
	// 								label="username"
	// 								required
	// 								value={name}
	// 								change={handleNameChange}
	// 								place={User.Username}
	// 							/>
	// 							{/* <InputField
	// 								type={"email"}
	// 								label="Email"
	// 								place={"***@gmail.com"}
	// 							/> */}
	// 						</div>

	// 						<Button text={"Save changes"} type={"submit"} disabled={name.length < 3} isLoading={isLoading} auth />
	// 					</form>
	// 				</div>
}
Home.getLayout = function getLayout(page: ReactElement) {
	return <DashboardLayout>{page}</DashboardLayout>;
};

export default Home;
