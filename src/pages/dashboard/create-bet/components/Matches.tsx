import Image from "next/image";

import { CarretRightSvg } from "@/assets";
import { DropDown } from "@components";
import { useState } from "react";


export default function SelectMatch()
{
	const [searchMode, setSearchMode] = useState({
		team: false,
		name: false,
		league: false,
		percent: false,
		range: false,
	});

	const nav = ["All aleague", "Premier League", "la liga", "Seria A", "bundes liga"];

	return (
		<div className="  ">
			<div className="details space-y-4 mb-2">
				{/* header -destop view */}
				<h1 className="hidden md:flex md:display-xs f-b text-gray-900">Select Match</h1>

				{/* header --mbile view */}
				<div className="flex md:hidden row-between">
					<h1 className="md:display-xs f-b text-gray-900">Select Match</h1>

					<h1 className="txt-xs f-b text-gray-900">
						1 <span className="t-g5">bet selected</span>
					</h1>
				</div>

				<p className="mt-2 txt-xs md:text-[16px] t-g5">Please select your desired match below</p>
			</div>

			{/* ----------- */}
			<div className="filter_tab w-full row-between  space-y-4 ">
				<DropDown type={"byTeam"} lists={[]} title={"All matches"} show={searchMode.team} toggleShow={setSearchMode} />

				{/* current bet selection tab --desktop */}
				<div className="hidden lg:flex md:middle space-x-3 nav  txt-sm text-gray-500">
					{nav.map((i, k) => (
						<div
							key={k}
							className={`nav_item ${
								k == 0 ? "bg-gray-50 f-b" : "f-m"
							}   p-[10px] px-3 hover:bg-gray-50  f-m hover:f-b  rounded-lg hover:text-gray-700`}
						>
							<p className="txt-sm text-gray-500">{i}</p>
						</div>
					))}
				</div>

				<div className="filter_btn middle space-x-4 p-[10px] px-3 rounded-lg border border-gray-100">
					<Image src={"/images/create/filter.svg"} alt={""} width={16} height={16} />

					<p className="txt-sm f-m text-gray-500">Filter</p>
				</div>
			</div>

			{/* current selection tab ----phone */}
			<div className="lg:hidden  border-b  relative   ">
				<div className=" overflow-x-scroll custom-scrollbar vert h-[50px]">
					<div className="scroll_track  mt-2 w-[600px] space-x-2 middle">
						{nav.map((i, k) => (
							<div
								key={k}
								className={`nav_item ${
									k == 0 ? "bg-gray-50 f-b" : "f-m"
								}   p-[10px] px-3 hover:bg-gray-50  f-m hover:f-b  rounded-lg hover:text-gray-700`}
							>
								<p className="txt-sm text-gray-500">{i}</p>
							</div>
						))}
					</div>
				</div>

				{/* right arrow button for more  --mobile */}
				<div className="carret absolute h-full w-[40px] bg-white centered top-0 right-0">
					<CarretRightSvg />
				</div>
			</div>

			{/* ------------------ */}

			<div className="w-full  h-[450px] overflow-y-scroll custom-scrollbar pb-[0]  md:pb-[84px]">
				<div className="matched w-full h-auto grid lg:grid-cols-3 md:grid-cols-2 gap-6 md:pt-4 ">
					{/* --team  display baner---- */}
					{Array(16)
						.fill(1)
						.map((i, k) => (
							<div
								key={k}
								className="teams_display_matches middle hover:border-gray-500 shadow-bet-card hover:shadow-none relative justify-around border border-gray-200 rounded-lg p-6 "
							>
								<div className="team_caard team_caard col-center space-y-2">
									<Image
										className="team_logo "
										src={"/icons/teams/chealse_logo.svg"}
										alt="chealse"
										width={48}
										height={48}
									/>
									<h1 className="team_name txt-xs f-s text-gray-600">Chelsea</h1>
								</div>

								<div className="event_time txt-xs text-center space-y-1 f-m text-gray-400">
									<h1 className="">Sat, 3 Dec</h1>
									<h1 className="bg-gray-50 txt-xs f-s rounded-lg px-4 p-1 text-gray-500">8:30</h1>
								</div>

								<div className="team_caard col-center  space-y-2">
									<Image
										className="team_logo "
										src={"/icons/teams/lei_logo.svg"}
										alt="chealse"
										width={48}
										height={48}
									/>
									<h1 className="team_name txt-xs f-s text-gray-600">Leicester C</h1>
								</div>

								<Image
									className="selector  absolute right-0 top-0"
									src={"/images/create/selector.svg"}
									alt="chealse"
									width={32}
									height={32}
								/>
							</div>
						))}
				</div>
			</div>
		</div>
	);
}