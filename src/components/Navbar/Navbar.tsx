import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useRef, ChangeEventHandler } from "react";
import Button from "../Button";
import SearchModal from "../SearchModal";
import Notification from "../Notification";
import ConfirmLogout from "../ConfirmLogout";
import { BellSvg, SearchSvg } from "@/assets";
import Nav from ".";
import useWindowSize from "@/hooks/useScreen";
import { useUser } from "@/context/userContext";
import { useSession, signIn, signOut } from "next-auth/react";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { HiOutlineUserCircle } from "react-icons/hi";
import HomeSearch from "../HomeSearch";
import { useRouter } from "next/router";
import { hasToken } from "@/utils";
import { useBet } from "@/context/betContext";

interface InputProps {
	icon?: string;
	disabled?: boolean;
	text: string;
	full?: boolean;
	isLoading?: boolean;
	primary?: boolean;
	type: "button" | "submit" | "reset" | undefined;
	click?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

console.log(hasToken(), "the ");

const Navbar = () => {
	const [showProfile, setShowProfile] = useState(false);
	const [isSearching, setIsSearching] = useState(false);
	const [notification, toggleNoti] = useState(false);
	const [showMobileNotification, setMobileNotification] = useState(false);
	const [confirmLogout, toggleConfirmLogout] = useState(false);
	const profileRef = useRef<HTMLDivElement>(null);
	const { isMobile } = useWindowSize();
	const { User, logOut } = useUser();
	const { data: session } = useSession();
	const { push } = useRouter();
	const { BetList, fetchAllActiveBets } = useBet();


	function handleShowProfile() {
		setShowProfile((p) => !p);
	}

	function handleShowNotification() {
		toggleNoti((p) => !p);
		// signIn()layout
	}

	function searchToggle() {
		if (isSearching) {
			return;
		}
		setIsSearching((p) => !p);
		push(`/dashboard?search=${true}`);
	}

	function closeSearch() {
		setIsSearching((p) => !p);
		if (isSearching)
		{
			//trigger  fetch --
			fetchAllActiveBets()
			return push(`/dashboard`);
		}
		push(`/dashboard?search=${true}`);
	}

	function handleLogout() {
		setShowProfile(!showProfile);
		toggleConfirmLogout((p) => !p);
	}

	function handleProfileClick(e: any) {
		if (showProfile && !profileRef.current?.contains(e.target)) {
			// console.log("the profile is active so i am closing it");

			setShowProfile(false);
		}
	}

	useEffect(() => {
		document.addEventListener("click", handleProfileClick, true);

		return () => {
			document.removeEventListener("click", handleProfileClick, true);
		};
	});

	return (
		<nav className=" w-full  fixed lg:static top-0 z-10  md:h-16 h-[76px] bg-white flex items-center justify-between px-6 p-2 border-b">
			{/* logo */}
			<Link href={"/dashboard"}>
				<div className="menu_logo middle space-x-4 hidden ">
					<Image src={"/icons/logo-2.svg"} alt="logo" width={120} height={26} className="block md:hidden" />

					<Image src={"/icons/logo-2.svg"} alt="logo" width={140} height={46} className="hidden md:block" />
				</div>
			</Link>

			{!hasToken() && (
				<div className=" relative w-[700px]">
					<HomeSearch searchToggle={searchToggle} isSearching={isSearching} closeSearch={closeSearch} />
				</div>
			)}

			{/* not logged in user  */}
			{!hasToken() ? (
				<div className="auth_container space-x-4 md:middle hidden md:flex m-2">
					<Link href={"/auth"}>
						<Button text={"sign up"} primary type={"button"} />
					</Link>

					<Link href={"/auth"}>
						<Button text={"login"} type={"button"} />
					</Link>
				</div>
			) : (
				!isMobile && (
					<div className="logedIn md:flex items-center space-x-6 hidden  w-[80%] justify-end relative">
						{/* search component  */}

						<HomeSearch searchToggle={searchToggle} isSearching={isSearching} closeSearch={closeSearch} />

						{/* User details */}
						<div className="min-w-[350px]  justify-end  flex items-center space-x-6 order-1">
							{/* Bell */}
							<Image
								src={"/icons/dashboard/bell.svg"}
								alt="logo"
								width={40}
								height={40}
								className=""
								role="button"
								// onClick={handleShowNotification}
							/>

							{/*Wallet  */}
							<Link
								className="border  middle rounded-lg p space-x-3 pr-3 border-gray-200"
								href={"/dashboard/my-wallet"}
							>
								<Image src={"/icons/dashboard/wallet.svg"} alt="wallet" width={40} height={40} className="" />

								<h1 className="balance text-gray-700 txt-sm f-b">
									{User?.Balance ? `${User.Balance.toLocaleString()} NGN` : "0 NGN"}{" "}
								</h1>
							</Link>

							{/* Profile */}
							<div className="profile h-8 middle space-x-2 relative">
								<div className="w-8 h-8 bg-gray-100 rounded-full grid-center">
									<h1 className=" txt-xs  f-eb  text-gray-400">
										{User?.Username ? User?.Username.slice(0, 2).toUpperCase() : ""}
									</h1>
								</div>

								<Image
									src={"/icons/dashboard/down.svg"}
									alt="wallet"
									width={16}
									height={16}
									role="button"
									onClick={handleShowProfile}
									className={`transform ${showProfile ? "rotate-180" : "rotate-0"} transition-all duration-300`}
								/>

								{showProfile && (
									<div
										ref={profileRef}
										className="dropdown_profile z-50 absolute right-0 top-10 bg-white  w-48 rounded-lg p-6 space-y-[18px] shadow-light strictFadeIn"
									>
										<Link
											role="button"
											onClick={() => setShowProfile(false)}
											className="profile_item middle space-x-4"
											href={"/dashboard/profile"}
										>
											<HiOutlineUserCircle className=" profile_item-icon" />

											<p className="item_name txt-sm f-m text-gray-700 hover:text-sec">Profile</p>
										</Link>

										<div role="button" onClick={handleLogout} className="profile_logout middle space-x-4">
											<RiLogoutCircleRLine className="profile_logout-icon" />

											<p className="item_name txt-sm f-m text-gray-700  hover:text-sec">Log out</p>
										</div>
									</div>
								)}
							</div>
						</div>
					</div>
				)
			)}

			{isMobile && (
				<div className="search space-x-2 middle">
					<div role="button" onClick={searchToggle} className="notification">
						<SearchSvg />
					</div>

					<div role="button" onClick={handleShowNotification} className="notification">
						<BellSvg />
					</div>
				</div>
			)}

			<ConfirmLogout handleClose={handleLogout} isLoading={false} toggleLoader={undefined} show={confirmLogout} />
			{/* <SearchModal isSearching={isSearching} setIsSearching={searchToggle} /> */}
			<Notification toggle={handleShowNotification} showNoti={notification} />
			{/* <MobileNotification toggle={handleMobileNotification} visibility={showMobileNotification} /> */}
		</nav>
	);
};

export default Navbar;
