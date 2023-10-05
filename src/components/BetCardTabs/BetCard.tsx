import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useRef, ChangeEventHandler } from "react";
import Button from "../Button";
import DropDown from "../DropDown";
import useScreen from "@/hooks/useScreen";
import { BallSvg } from "@/assets";
import { BiShareAlt } from "react-icons/bi";
import { VscSaveAll } from "react-icons/vsc";
import MatchCard from "../MatchCard";
import { useUser } from "@/context/userContext";
import { getUserProfile } from "@/axios/endpoints/auth.endpoint";
import { Bets, Creator, Matches } from ".";
import { MobileModal } from "./MobileModal";
import { DesktopModal } from "./DesktopModal";
import { FiCopy } from "react-icons/fi";

interface PropTypes {
	betType: "KoloBet" | "PointBet" | undefined;
	data: any;
}

const tabMode = {
	MATCHES: "MATCHES",
	BET: "BET",
	CREATOR: "CREATOR",
};

export const betCardType = {
	KOLO: "KoloBet",
	POINT: "PointBet",
};

const tabs = [
	{
		name: "Matches",
		badge: "9",
		tabMode: tabMode.MATCHES,
	},

	{
		name: "Bet conditions",
		badge: "1",
		tabMode: tabMode.BET,
	},

	{
		name: "Creator’s Bet",
		tabMode: tabMode.CREATOR,
	},
];

const BetCard = ({ betType, data }: PropTypes) => {
	const [showDetails, setShowDetails] = useState<{
		show: boolean;
		mode: string | undefined;
	}>({
		show: false,
		mode: betType,
	});
	const [betTabMode, setBetTabMode] = useState(tabMode.MATCHES);

	const { isTablet, isMobile } = useScreen();

	const [showCardOptions, setShowCardOptions] = useState(false);
	const [copy, setCopy] = useState(false);

	const profileRef = useRef<HTMLDivElement>(null);

	const { User } = useUser();

	function userJoined() {
		// check if current usser is among the playerws
		const yes = data?.Players.find((i: any) => i.userId === User._id);

		// console.log(yes);

		if (yes) return true;
		return false;
	}

	function handleCopy() {
		setCopy(!copy);
	}

	const hasJoined = data?.Creator._id === User._id || userJoined();

	function handleShowDetails(cardType?: "KoloBet" | "PointBet") {
		if (showDetails.show) {
			setShowDetails({
				...showDetails,
				show: false,
			});
		} else {
			setShowDetails({
				...showDetails,
				show: true,
				mode: cardType,
			});
		}
	}

	function tabModeHandler() {
		switch (betTabMode) {
			case tabMode.MATCHES:
				return <Matches data={data} />;
			case tabMode.BET:
				return <Bets data={data} />;
			case tabMode.CREATOR:
				return <Creator data={data} />;
			default:
				break;
		}
	}

	function handleClickOutside(e: any) {
		if (showCardOptions && profileRef.current && profileRef.current !== e.target) {
			setShowCardOptions(false);
		}
	}

	const copyToClipboard = () => {
		// Select the input element
		const inputElement = document.getElementById("betLink");

		// Select the input text
		// @ts-ignore
		inputElement?.select();
		// @ts-ignore
		inputElement?.setSelectionRange(0, 99999); // For mobile devices

		// Copy the text to the clipboard
		document.execCommand("copy");
	};

	// async function getName(id: string) {
	// 	// GET PLAYER DETAILS
	// 	const { error, serverResponse } = await getUserProfile(id);

	// 	if (error) console.log(serverResponse);

	// 	return serverResponse.Username.slice(0, 2).toUpperCase();
	// }
	// console.log(data.Players);

	return (
		<>
			<div
				ref={profileRef}
				onClick={handleClickOutside}
				className="bet_card shadow-bet-card bg-white border border-gray-200 rounded-lg hover:translate-y-1 hover:shadow-lg transition-all duration-200 ease-in-out"
			>
				<div role="button" onClick={() => handleShowDetails(betType)} className=" p-3 md:p-6 space-y-4">
					<div
						style={{
							backgroundImage: `url(${"/images/home/bet_image.jpg"})`,
							backgroundSize: "cover",
							backgroundPosition: "center",
							backgroundRepeat: "no-repeat",
						}}
						className="bet_banner w-full h-32  relative flex justify-between items-center p-6 bg-[#0000003d] rounded-md"
					>
						<div className="imgTa">
							<Image
								className="team_logo "
								src={
									data?.Criteria?.TeamA?.Logo == "TeamALogoUrl"
										? "/icons/teams/chealse_logo.svg"
										: data?.Criteria?.TeamA?.Logo || data?.Criteria?.TeamA?.logo
								}
								alt={data?.Criteria?.TeamA?.name || data?.Criteria?.TeamA?.TeamName}
								width={48}
								height={48}
							/>
						</div>

						<div className="imgTa">
							<Image
								className="team_logo "
								src={
									data?.Criteria?.TeamB?.Logo == "TeamALogoUrl"
										? "/icons/teams/chealse_logo.svg"
										: data?.Criteria?.TeamB?.Logo || data?.Criteria?.TeamB?.logo
								}
								alt={data?.Criteria?.TeamB?.name || data?.Criteria?.TeamB?.TeamName}
								width={48}
								height={48}
							/>
						</div>
					</div>

					<div className="badge_container space-y-2">
						<div className="row-between">
							{showDetails.mode == betCardType.KOLO ? (
								<div className="badge uppercase  p-1 px-2 bg-cyan-50 rounded txt-xs f-b text-cyan-600">KOLO bet</div>
							) : (
								<div className="badge uppercase  p-1 px-2 bg-yellow-100 rounded txt-xs f-b text-yellow-600">
									point bet
								</div>
							)}

							<div
								role="button"
								title="options"
								// onClick={() => setShowCardOptions((p) => !p)}
								className="dots relative group"
							>
								<Image src={"/icons/dots.svg"} alt={""} width={24} height={24} className="" />

								<div
									// ref={profileRef}
									className="bet_card-dropdown hidden dropdown_profile z-50 absolute -right-1/2 top-[20px] bg-white  w-48 rounded-lg p-6 space-y-[18px] shadow-light strictFadeIn group-hover:block"
								>
									{hasJoined && (
										<div
											role="button"
											onClick={() => handleShowDetails(betType)}
											className="profile_item middle space-x-4"
											// href={"/dashboard/profile"}
										>
											<VscSaveAll className=" profile_item-icon" />

											<p className="item_name txt-sm f-m text-gray-700 hover:text-sec">View</p>
										</div>
									)}

									<div role="button" onClick={handleCopy} className="profile_logout middle space-x-4">
										<BiShareAlt className="profile_logout-icon" />

										<p className="item_name txt-sm f-m text-gray-700  hover:text-sec">Share</p>
									</div>
								</div>
							</div>
						</div>

						<h1 className="bet_name txt-lg f-eb text-gray-600">{data?.BetName}</h1>
					</div>

					<div className="author row-between">
						<h1 className="name txt-xs f-m text-gray-400">
							By <span className="f-b text-gray-600">{data?.Creator.Username}</span>
						</h1>

						<div className="amounts middle space-x-2">
							{data?.Discount?.discount !== 0 && (
								<div className="">
									<h1 className="off txt-xs f-s text-gray-500">
										{data?.Discount.discount == "" ? "0%" : ` ${data?.Discount.discount}%`} off
									</h1>
									<h1 className="off txt-xs  text-gray-300 ">/₦{data?.Amount}</h1>
								</div>
							)}

							<h1 className="stake text-gray-500 txt-xl f-b">₦{data?.Amount}</h1>
						</div>
					</div>
				</div>

				<footer className="card_footer row-center w-full rounded-b h-20 bg-gray-100 p-6">
					<div className="row-between  w-full">
						<h1 className="name txt-xs f-m text-gray-400">
							<span className="f-b text-gray-700">{data?.Players.length}</span> Players
						</h1>

						{hasJoined ? (
							<h1 className="name txt-md f-m text-gray-400">
								Payout: <span className="f-s text-gray-700">{data?.Players.length * data?.Amount}</span>
							</h1>
						) : (
							<div
								role="button"
								onClick={() => handleShowDetails(betType)}
								className="join capitalize border border-gray-300 rounded-lg px-2 p-1 txt-md f-s text-gray-700"
							>
								<p> Join now</p>
							</div>
						)}
					</div>
				</footer>
			</div>

			{/* bet side bar  */}
			{showDetails.show && (
				<div className="__ ">
					{isMobile || isTablet ? (
						<MobileModal
							showDetails={showDetails}
							handleShowDetails={handleShowDetails}
							betCardType={betCardType}
							hasJoined={hasJoined}
							tabs={tabs}
							setBetTabMode={setBetTabMode}
							betTabMode={betTabMode}
							tabModeHandler={tabModeHandler}
							handleCopy={handleCopy}
							data={data}
						/>
					) : (
						<DesktopModal
							showDetails={showDetails}
							handleShowDetails={handleShowDetails}
							betCardType={betCardType}
							hasJoined={hasJoined}
							tabs={tabs}
							setBetTabMode={setBetTabMode}
							betTabMode={betTabMode}
							tabModeHandler={tabModeHandler}
							data={data}
							handleCopy={handleCopy}
						/>
					)}
				</div>
			)}

			{copy && (
				<div className="modal top-0 left-0 strictFadeIn fixed w-screen h-screen bg-[#0000003e] grid place-content-center z-[99999]">
					<CopyLink copyToClipboard={copyToClipboard} data={data} handleCopy={ handleCopy} />
				</div>
			)}
		</>
	);
};

function CopyLink({ toggle, handleCopy, copyToClipboard, data }: any) {
	return (
		<div className=" bg-white rounded-xl p-4 py-8 sm:py-12 w-[95%]  FadeIn space-y-2 relative sm:w-[400px] mx-auto">
			<div role="button" onClick={() => handleCopy()} className="cancle_btn absolute right-1/2 translate-x-1/2  sm:-right-11  -top-11">
				<Image
					src={"/icons/dashboard/cancleBtn.svg"}
					alt={""}
					width={48}
					height={48}
					//  onClick={toggle}
					role="button"
				/>
			</div>

			<div className="w-full col-center space-y-3 bg-white">
				<Image src={"/icons/share.svg"} alt="logo" width={48} height={48} className="animate-pulse" />

				<div className="w-full space-y-2   text-center">
					<h1 className="title txt-lg f-b text-gray-900">Share bet</h1>

					<p className="subtitle txt-sm f-n text-[##6B7280]">Share with your friends and community</p>
				</div>

				<div className="w-full rounded-lg p-3 col-centered ">
					{/* copy bet link element */}
					<div className="w-full border rounded-lg flex items-center justify-between">
						<input
							type="text"
							name=""
							id="betLink"
							className="bg-transparent w-full  h-full pl-2 outline-none to-gray-400"
							value={`https://selfbet.vercel.app/dashboard/join?id=${data?._id}`}
						/>

						<button onClick={copyToClipboard} className="btn-copy">
							<p className="copy">Copy link</p>
							<FiCopy className="text-[#ff4b00] font-bold " />
						</button>
					</div>
				</div>

				<div className="row  space-x-3 ">
					<Link href={"/dashboard/my-bets"}>
						<Image src={"/icons/share-i.svg"} alt="logo" width={40} height={40}  />
					</Link>

					<Link href={"/dashboard/my-bets"}>
						<Image src={"/icons/share-t.svg"} alt="logo" width={40} height={40}  />
					</Link>

					<Link href={"/dashboard/my-bets"}>
						<Image src={"/icons/share-w.svg"} alt="logo" width={40} height={40}  />
					</Link>
				</div>
			</div>
		</div>
	);
}

export default BetCard;

{
	/* <div className=" bg-white rounded p-4 py-8 FadeIn space-y-2 relative sm:w-[400px]">
	<div role="button" onClick={() => handleCopy()} className="cancle_btn absolute -right-11  -top-11">
		<Image
			src={"/icons/dashboard/cancleBtn.svg"}
			alt={""}
			width={48}
			height={48}
			//  onClick={toggle}
			role="button"
		/>
	</div>

	<h1 className="txt-sm text-gray-600 f-n">Bet link</h1>

	<div className="w-full relative">
		<input
			id="betLink"
			type="text"
			className="rounded border p-2 text-sm text-gray-400 font-medium w-full"
			value={`https://selfbet.vercel.app/dashboard/join?id=${data?._id}`}
		/>

		<button
			onClick={copyToClipboard}
			className="bg-sec text-white copy absolute right-0  top-0 rounded p-2 px-4 capitalize text-sm "
		>
			copy
		</button>
	</div>
</div>; */
}
