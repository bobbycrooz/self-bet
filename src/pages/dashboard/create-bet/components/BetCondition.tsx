import Image from "next/image";

import { MoreSvg } from "@/assets";
import { useBet } from "@/context/betContext";
// import { NextPageWithLayout } from "../_app";

export default function BetCondition({ handleAddCondition, isAdding }: { handleAddCondition: any; isAdding: boolean }) {
	const conditions = [
		{
			Sector: "H_TEAM/A_TEAM/DRAW",

			Codes: ["1", "2", "3"],
		},

		{
			Sector: "H_TEAM/A_TEAM/DRAW",

			Codes: ["1", "2", "3"],
		},
	];

	const { Bet, dispatchBet, fetchAlllMarkets, MarketList } = useBet();

	// console.log(Bet.Criteria.Conditions, "bet conditions");

	function handleDeletConditions(BetDetails: any)
	{
		console.log(BetDetails)
	}

	return (
		<>
			<div className="md:flex justify-between">
				<div className="details">
					<h1 className="display-xs f-b text-gray-900">Bet conditions</h1>

					<p className=" txt-xs t-g6 mt-2 md:subtitle">Customize your bets with custom conditiions</p>
				</div>

				{/* ----search----- */}
				<div
					role="button"
					// onClick={searchToggle}
					className="search_container relative mt-3 md:mt-0 bg-gray-50 rounded-lg md:w-[424px] h-12"
				>
					<Image
						src={"/icons/dashboard/search.svg"}
						alt="logo"
						width={20}
						height={20}
						className=" absolute top-1/2 -translate-y-1/2 left-2 txt-sm f-m text-gray-400"
					/>

					<input
						type="text"
						name=""
						id=""
						className="bg-transparent w-full  h-full pl-9 outline-none"
						placeholder="Search bet conditions"
					/>
				</div>
			</div>

			{/* ----------- */}

			{/* ------------------ */}

			<div className="w-full   h-[450px] overflow-y-scroll pb-[84px] custom-scrollbar">
				<div className="condition w-full h-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
					{/* --------- */}

					{/* @ts-ignore */}
					{Bet.Criteria.Conditions.map((i, k) => (
						<div key={k} className="teams_display  border border-gray-200 rounded-lg px-4 p-5 hover:shadow-bet-card">
							<div className="  space-x-4 items-start flex ">
								<Image className="team_logo " src={"/icons/red_ball.svg"} alt="chealse" width={48} height={48} />
								<div className="texts ">
									<h1 className="team_name txt-md  f-m text-gray-500 text-left">{i?.Sector}</h1>
								</div>
							</div>
							<div className="w-full flex justify-end relative threeDot">
								<button className="">
									<MoreSvg />
								</button>

								<div className="edit_card bg-white rounded shadow  absolute -right-6 top-5">
									<p onClick={() => handleDeletConditions(i)} role="button" className="edit text-xs py-2 border-b hover:bg-gray-200 w-full px-4 cursor-pointer">
										Edit
									</p>
									<p role="button" onClick={() => handleDeletConditions(i)}  className="edit text-xs  py-2 hover:bg-gray-200 w-full px-4 cursor-pointer">
										Delete
									</p>

								</div>
							</div>
						</div>
					))}

					{/* --------- */}
					<div
						role="button"
						onClick={handleAddCondition}
						className="centered shadow-bet-card  border border-gray-200 rounded-lg px-4 p-5 hover:shadow-bet-card"
					>
						<div className="space-x-4 middle">
							<Image className="team_logo " src={"/images/create/add.svg"} alt="chealse" width={24} height={24} />

							<p className="team_name txt-sm f-m  text-gray-600">Add bet condition</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
