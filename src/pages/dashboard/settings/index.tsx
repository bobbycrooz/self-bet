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
import Meta from "@/utils/Meta";
import Link from "next/link";

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

	return (
		<>
			<Meta title={"Settings"} description={""} />

			<main className="dashboard_home bg-white w-full h-auto pt-16 sm:pt-0 md:pb-16 ">
				{/* ----header---- */}
				<div className="bg-gray-50 w-full h-[112px] middle p-4 md:p-12 relative  settings_bg mt-3">
					<div className=" absolute ring-4 ring-gray-200 w-24 h-24  sm:w-40 sm:h-40 bg-gray-50 sm:left-8 -bottom-12 sm:-bottom-20 rounded-full text-[40px] centered text-gray-300 font-bold capitalize">
						{User?.Username ? User?.Username.slice(0, 2).toUpperCase() : ""}
					</div>
				</div>

				{/* NAME */}
				<div className="details  w-full flex p-4  sm:pl-[40px] sm:h-[60px] mt-16 sm:mt-6 pr-8  ">
					<div className="sm:w-[200px]"></div>
					<div className="w-full flex sm:justify-between sm:items-center flex-col  sm:flex-row space-y-6  sm:space-y-0">
						<div className="name_box">
							<h1 className="name text-[24px] sm:txt-md t-g9 f-eb">{User?.Username ? User?.Username : "--_--"}</h1>
							<p className="sub_name text-sm f-n t-g6">{User?.Email ? User?.Email : "--_--"}</p>
						</div>

						<Link href="/dashboard/profile">
							<Button text={"View Profile"} primary type={undefined} />
						</Link>
					</div>
				</div>

				{/*-------- body------ */}
				<div className="md:p-8 mt-[39px] w-full  border-t p-4">
					{/* ROW ONE */}
					<div className="flex flex-col sm:flex-row sm:justify-between sm:space-x-8 space-y-8 sm:space-y-0">
						{/* COL ONE */}
						<div className="sm:w-[300px]">
							<div className="name_box">
								<h1 className="name txt-md t-g9 f-eb">{"Personal info"}</h1>
								<p className="sub_name text-xs t-g5">{"Update your photo and personal details."}</p>
							</div>
						</div>

						{/* COL TWO */}
						<div className="w-full flex  flex-col sm:items-start border rounded-xl shadow h-auto">
							{/* BODY */}
							<div className="content w-full sm:p-6">
								{/* FORM GRID */}
								<div className="w-full grid sm:grid-cols-2 gap-6 py-6 sm:py-0 p-4">
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

								{
									// <div className="w-full mt-6 p-4 sm:p-0">
									// 	<div className="name_box">
									// 		<h1 className="name text-xs t-g6 f-eb">{"Avatar"}</h1>
									// 		<p className="sub_name text-xs text-gray-400">{"Change or delete your profile picture."}</p>
									// 	</div>

									// 	{/* PICTURE ROLE */}
									// 	<div className="w-full flex flex-col sm:flex-row items-center  sm:items-start space-y-3 sm:space-y-0  sm:space-x-3 mt-4">
									// 		<div className="avatar rounded-full bg-gray-300">
									// 			<Image
									// 				src={avatarSrc as string}
									// 				alt={"avatar"}
									// 				className="rounded-full"
									// 				height={64}
									// 				width={64}
									// 			/>
									// 		</div>

									// 		{/* dropzone */}
									// 		<div className=" w-full ">
									// 			<DropzoneComponent seCurrentFile={setCurrentImg} setDataurl={setAvatarSrc} isAvatar={true} />
									// 		</div>
									// 	</div>
									// </div>
								}
							</div>
							{/* FOOTER */}
							<div className="action border-t rounded-b-xl flex items-center sm:justify-end w-full">
								<div className="button_group  space-x-4 px-6 p-4 hidden sm:flex">
									<Button text={"Cancel"} type={undefined} ghost />
									<Button text={"Save changes"} type={undefined} primary disabled={true} />
								</div>

								{/* mobile - buton */}
								<div className="button_group grid-cols-3  w-full gap-4   grid px-6 p-4  sm:hidden">
									<Button text={"Cancel"} type={undefined} ghost />
									<div className="col-span-2">
										<Button full text={"Save changes"} type={undefined} primary disabled={true} />
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* ROW TWO */}
					<div className="flex flex-col sm:flex-row md:justify-between space-y-8 sm:space-x-8 mt-8 ">
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
								<div className="w-full grid md:grid-cols-2 gap-6">
									<InputField
										filedName="Username"
										type={"password"}
										label="Current Password"
										place={"****"}
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
										type={"password"}
										label="New Password"
										place={"****"}
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
								<div className="button_group  space-x-4 px-6 p-4 hidden sm:flex">
									<Button text={"Cancel"} type={undefined} ghost />
									<Button text={"Save changes"} type={undefined} primary disabled={true} />
								</div>

								<div className="button_group grid-cols-3  w-full gap-4   grid px-6 p-4  sm:hidden">
									<Button text={"Cancel"} type={undefined} ghost />
									<div className="col-span-2">
										<Button full text={"Save changes"} type={undefined} primary disabled={true} />
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* ROW THREE */}
					<div className="flex sm:flex-row flex-col justify-between space-y-8 sm:space-y-0 sm:space-x-8 mt-8 ">
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

					<div className="space h-20 sm:hidden"></div>
				</div>
			</main>

			<ConfirmLogout handleClose={handleLogout} isLoading={false} toggleLoader={undefined} show={confirmLogout} />
		</>
	);
}
Home.getLayout = function getLayout(page: ReactElement) {
	return <DashboardLayout>{page}</DashboardLayout>;
};

export default Home;
