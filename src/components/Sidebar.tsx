import { AddIcon, MobileAdd, PlusSvg } from "@/assets";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect, useRef, ChangeEventHandler } from "react";
import Button from "./Button";
import { BetSlipDetails } from "@/pages/dashboard/create-bet/bet-details";
import { useBet } from "@/context/betContext";
import { useUser } from "@/context/userContext";

const navItemArray = [
	{
		name: "home",
		link: "/dashboard",
		icon: "/icons/dashboard/home.svg",
	},

	{
		name: "create bet",
		link: "/dashboard/create-bet",
		icon: "/icons/dashboard/create.svg",
	},

	{
		name: "my bet",
		link: "/dashboard/my-bets",
		icon: "/icons/dashboard/bets.svg",
	},

	{
		name: "saved bet",
		link: "/dashboard/saved-bets",
		icon: "/icons/dashboard/saved.svg",
	},

	{
		name: "my wallet",
		link: "/dashboard/my-wallet",
		icon: "/icons/dashboard/my-wallet.svg",
	},

	{
		name: "settings",
		link: "/dashboard/settings",
		icon: "/icons/dashboard/cog.svg",
	},
];

const mobileNavItemArray = [
	{
		name: "home",
		link: "/dashboard",
		icon: "/icons/dashboard/home.svg",
		iconActive: "/icons/dashboard/homeActive.svg",
	},

	{
		name: " bets",
		link: "/dashboard/my-bets",
		icon: "/icons/dashboard/bets.svg",
		iconActive: "/icons/dashboard/betsActive.svg",
	},

	{
		add: true,
		name: "",
		link: "/dashboard/create-bet",
		icon: "",
		iconActive: "",
	},

	{
		name: " wallet",
		link: "/dashboard/my-wallet",
		icon: "/icons/dashboard/my-wallet.svg",
		iconActive: "/icons/dashboard/walletActive.svg",
	},

	{
		name: "profile",
		link: "/dashboard/profile",
		icon: "/icons/dashboard/cog.svg",
		iconActive: "/icons/dashboard/profileActive.svg",
	},
];

// function ProfileSvg(color:string) {
// 	return (
// 		<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
// <path d="M11 21C16.5228 21 21 16.5228 21 11C21 5.47715 16.5228 1 11 1C5.47715 1 1 5.47715 1 11C1 16.5228 5.47715 21 11 21Z" stroke={color || "#FF4B00"} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
// </svg>

// 	)

// }

// function ProfileSvg(color:string) {
// 	return (
// 		<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
// <path d="M11 21C16.5228 21 21 16.5228 21 11C21 5.47715 16.5228 1 11 1C5.47715 1 1 5.47715 1 11C1 16.5228 5.47715 21 11 21Z" stroke={color || "#FF4B00"} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
// </svg>

// 	)

// }

const Sidebar = () => {
	const { push, pathname } = useRouter();
	const [showBetList, setShowBetList] = useState(false);

	const { isLoading, placing, status, handlePlaceBet, setIsLoading, setStatus } = useBet();
	const {logOut} = useUser()

	function linkHandler(link: string) {
		return push(link);
	}

	function handleShowBet() {
		setShowBetList((p) => !p);
	}

	function handlePlaceBetMobile() {
		handleShowBet();
		handlePlaceBet();
	}

	console.log(pathname);
	const showMobileBetSlip = pathname === "/dashboard/create-bet/bet-details";

	const isCreating = pathname == "/dashboard/create-bet";

	return (
		<>
			<aside className="sidebar   border-r lg:flex hidden flex-col justify-between   bg-white w-[240px] p-3 pt-4">
				<ul className="nav_container w-full space-y-4">
					{navItemArray.map((i, k) => (
						<li
							role="button"
							title={i.name}
							onClick={() => linkHandler(i.link)}
							key={k}
							className={`nav_item w-full hover:bg-gray-50 middle p-3 space-x-4 rounded-lg ${
								i.link == pathname && "bg-gray-50 text-gray-700"
							} txt-sm f-m text-gray-500 capitalize`}
						>
							<Image src={i.icon} alt="logo" width={24} height={24} className="" />

							<p className="link_name ">{i.name}</p>
						</li>
					))}
				</ul>

				<div className="w-full">
						<div role="button" onClick={logOut} className="middle  justify-between border-t py-4">
							<Image src={"/icons/dashboard/olivia.svg"} alt="logo" width={40} height={40} className="" />

							<div className="name_box ">
								<h1 className="name txt-sm text-gray-800 f-s">Olivia Rhye</h1>
								<p className="sub_name text-xs f-n text-gray-400">olivia@untitledui.com</p>
							</div>

							<Image src={"/icons/dashboard/logout.svg"} alt="logo" width={36} height={36} className="" />
						</div>
				</div>
				{/*  */}
			</aside>
		
			{/* ---------------mobile */}
			{!isCreating && (
				<div className="  lg:hidden mobile_menu    shadow-bet-card-v fixed bottom-0 left-0 w-full z-[9]">
					{showMobileBetSlip && (
						<div className="betslip ">
							<BetSlip handleShowBet={handleShowBet} showBetList={showBetList} handlePlaceBet={handlePlaceBetMobile} />
						</div>
					)}
					<ul className="nav_container w-full bg-white   flex  h-[84px]">
						{mobileNavItemArray.map((i, k) => (
							<>
								{i.add ? (
									<div key={k} className="w-full pt-2">
										<Link href={i.link}>
											<div className="mobile_create_btn mx-auto w-14 h-14 bg-sec rounded-full centered">
												<PlusSvg />
											</div>
										</Link>
									</div>
								) : (
									<li
										role="button"
										title={i.name}
										onClick={() => linkHandler(i.link)}
										key={k}
										className={`col-center w-full txt-sm f-m text-gray-500 capitalize   hover:bg-gray-50 rounded-lg ${
											i.link == pathname && "bg-gray-50 text-sec"
										}`}
									>
										<Image
											src={i.link === pathname ? i.iconActive : i.icon}
											alt="logo"
											width={24}
											height={24}
											className=""
										/>

										<p className="link_name ">{i.name}</p>
									</li>
								)}
							</>
						))}
					</ul>
				</div>
			)}
		</>
	);
};

// @ts-ignore
function BetSlip({ handleShowBet, showBetList, handlePlaceBet }) {
	// const {isLoading,
	// 	placing,
	// 	status,
	// 	handlePlaceBet, setIsLoading,
	// 	setStatus} = useBet()
	return (
		<aside className={`w-full h-auto `}>
			{/* --wrapperr--- */}
			<div
				className={`create_aside     ${
					showBetList ? "h-[380px]" : "h-[50px]"
				} transition-all relative  border-gray-200 w-full rounded-lg bg-white`}
			>
				{/* header */}
				<div role="button" onClick={handleShowBet} className="h-[46px]   w-full relative header rounded-t-lg middle ">
					<div className="middle">
						<h1 className="header_text txt-sm f-b text-gray-50 p-4">Betslip</h1>

						<p className="rounded bg-gray-400 px-2 p-[2px] text-white txt-xs f-m">{8}</p>
					</div>
				</div>

				{/* betslip ---body */}
				<div
					className={`scroll_bar   w-full bg--400 h-[250px]   ${
						showBetList ? "block" : "hidden"
					}  overflow-y-scroll   custom-scrollbar pb-[100px] `}
				>
					<div className={`aside_body p-2 py-6 space-y-3`}>
						{/* ----bets---- */}
						<BetSlipDetails data={undefined} />
						<BetSlipDetails data={undefined} />
						<BetSlipDetails data={undefined} />
					</div>

					{/* ----price -box */}
					{true && (
						<div
							className="price_box space-y-2 mt-6 bg-white p-2 text-gray-500  absolute bottom-0 left-0 w-full
"
						>
							<div className="row-between w-full">
								<h1 className="p  txt-sm f-m">Stake</h1>
								<h1 className="txt-sm f-b ">N500</h1>
							</div>

							<div className="row-between w-full">
								<h1 className="p  txt-sm f-m">Potential win</h1>
								<h1 className="txt-sm f-b ">N5000</h1>
							</div>

							<Button text={"Place Bet"} type={"button"} full primary click={handlePlaceBet} />
						</div>
					)}
				</div>
			</div>
		</aside>
	);
}

export default Sidebar;
