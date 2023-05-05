import { AddIcon, MobileAdd, PlusSvg } from "@/assets";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect, useRef, ChangeEventHandler } from "react";
import Button from "./Button";
import { BetSlipDetails } from "@/pages/dashboard/create-bet/bet-details";

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
	},

	{
		name: " bets",
		link: "/dashboard/my-bets",
		icon: "/icons/dashboard/bets.svg",
	},

	{
		add: true,
		name: "",
		link: "/dashboard/create-bet",
		icon: "",
	},

	{
		name: " wallet",
		link: "/dashboard/my-wallet",
		icon: "/icons/dashboard/my-wallet.svg",
	},

	{
		name: "profile",
		link: "/dashboard/settings",
		icon: "/icons/dashboard/cog.svg",
	},
];

const Sidebar = () => {
	const { push, pathname } = useRouter();
	const [showBetList, setShowBetList] = useState(false);

	function linkHandler(link: string) {
		return push(link);
	}

	function handleShowBet() {
		setShowBetList((p) => !p);
	}

	console.log(pathname);
	const showMobileBetSlip =
		pathname === "/dashboard/create-bet/bet-details";

	return (
		<>
			<aside className="sidebar h-full border-r md:flex hidden flex-col justify-between   bg-white w-[240px] p-3 pt-4">
				<ul className="nav_container w-full space-y-4">
					{navItemArray.map((i, k) => (
						<li
							role="button"
							title={i.name}
							onClick={() => linkHandler(i.link)}
							key={k}
							className={`nav_item w-full hover:bg-gray-50 middle p-3 space-x-4 rounded-lg ${
								i.link == pathname &&
								"bg-gray-50"
							}`}
						>
							<Image
								src={i.icon}
								alt="logo"
								width={24}
								height={24}
								className=""
							/>

							<p className="link_name txt-sm f-m text-gray-500 capitalize">
								{i.name}
							</p>
						</li>
					))}
				</ul>

				<div className="w-full">
					<Link href={"/auth"}>
						<div className="middle  justify-between border-t py-4">
							<Image
								src={
									"/icons/dashboard/olivia.svg"
								}
								alt="logo"
								width={40}
								height={40}
								className=""
							/>

							<div className="name_box ">
								<h1 className="name txt-sm text-gray-800 f-s">
									Olivia Rhye
								</h1>
								<p className="sub_name text-xs f-n text-gray-400">
									olivia@untitledui.com
								</p>
							</div>

							<Image
								src={
									"/icons/dashboard/logout.svg"
								}
								alt="logo"
								width={36}
								height={36}
								className=""
							/>
						</div>
					</Link>
				</div>
				{/*  */}
			</aside>
			{/* ---------------mobile */}

			<div className="md:hidden mobile_menu  shadow-bet-card-v absolute bottom-0 left-0 w-full    z-50">
				{showMobileBetSlip && (
					<div className="betslip ">
						<BetSlip
							handleShowBet={handleShowBet}
							showBetList={showBetList}
						/>
					</div>
				)}
				<ul className="nav_container w-full bg-white z-50  flex  h-[84px]">
					{mobileNavItemArray.map((i, k) => (
						<>
							{i.add ? (
								<div className="w-full pt-2">
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
									onClick={() =>
										linkHandler(i.link)
									}
									key={k}
									className={`col-center w-full   hover:bg-gray-50 rounded-lg ${
										i.link ==
											pathname &&
										"bg-gray-50"
									}`}
								>
									<Image
										src={i.icon}
										alt="logo"
										width={24}
										height={24}
										className=""
									/>

									<p className="link_name txt-sm f-m text-gray-500 capitalize">
										{i.name}
									</p>
								</li>
							)}
						</>
					))}
				</ul>
			</div>
		</>
	);
};

// @ts-ignore
function BetSlip({ handleShowBet, showBetList }) {
	return (
		<aside className={`w-full h-auto `}>
			{/* --wrapperr--- */}
			<div
				className={`create_aside     ${
					showBetList ?  "h-[500px]" : "h-[50px]"
				} transition-all relative  border-gray-200 w-full rounded-lg bg-white`}
			>
				{/* header */}
				<div
					role="button"
					onClick={handleShowBet}
					className="h-[46px]   w-full relative header rounded-t-lg middle "
				>
					<div className="middle">
						<h1 className="header_text txt-sm f-b text-gray-50 p-4">
							Betslip
						</h1>

						<p className="rounded bg-gray-400 px-2 p-[2px] text-white txt-xs f-m">
							{8}
						</p>
					</div>
				</div>


{/* betslip ---body */}
				<div
					className={`scroll_bar w-full bg--400 h-[450px]  ${
						showBetList ? "block" : "hidden"
					}  overflow-y-scroll   custom-scrollbar pb-[100px] `}
				>
					<div className={`aside_body p-2 py-6 space-y-3`}>
						{/* ----bets */}
						<BetSlipDetails />
						<BetSlipDetails />
						<BetSlipDetails />
					</div>


					{/* ----price -box */}
					<div
						className="price_box space-y-2 mt-6 bg-white p-2 text-gray-500  absolute bottom-0 left-0 w-full
"
					>
						<div className="row-between w-full">
							<h1 className="p  txt-sm f-m">
								Stake
							</h1>
							<h1 className="txt-sm f-b ">N500</h1>
						</div>

						<div className="row-between w-full">
							<h1 className="p  txt-sm f-m">
								Potential win
							</h1>
							<h1 className="txt-sm f-b ">N5000</h1>
						</div>

						<Button
							text={"Place Bet"}
							type={"button"}
							full
							primary
							// click={
							// 	handlePlaceBet
							// }
						/>
					</div>
					
				</div>
			</div>
		</aside>
	);
}

export default Sidebar;
