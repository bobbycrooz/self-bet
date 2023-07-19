import Image from "next/image";

import { CarretRightSvg } from "@/assets";
import { DropDown } from "@components";
import { useEffect, useRef, useState } from "react";
import { features } from "process";
import { useBet } from "@/context/betContext";

export default function MatchCard({
	teamData,
}: {
	teamData: {
		TeamA: {
			TeamName: string;
			Logo: string;
		};
		TeamB: {
			TeamName: string;
			Logo: string;
		};
	};
}) {
	return (
		<div
			// key={}
			role="button"
			// onClick={() => handleMatchSelection(i)}
			className={`teams_display_matches ${true && "active"}`}
		>
			{/* Team A */}
			<div className="team_caard team_caard col-center space-y-2">
				<Image
					className="team_logo "
					src={teamData.TeamA.Logo == "TeamALogoUrl" ? "/icons/teams/chealse_logo.svg" : teamData.TeamA.Logo}
					alt="chealse"
					width={48}
					height={48}
				/>
				<h1 className="team_name txt-xs f-s text-gray-600 text-center">{teamData.TeamA.TeamName}</h1>
			</div>

			{/* Date and time */}
			<div className="event_time txt-xs text-center space-y-1 f-m text-gray-400">
				<h1 className="">Sat, 3 Dec</h1>
				<h1 className="bg-gray-50 txt-xs f-s rounded-lg px-4 p-1 text-gray-500">8:30</h1>
			</div>

			{/* Team B */}
			<div className="team_caard col-center  space-y-2">
				<Image
					className="team_logo "
					src={teamData.TeamB.Logo == "TeamBLogoUrl" ? "/icons/teams/lei_logo.svg" : teamData.TeamB.Logo}
					alt="chealse"
					width={48}
					height={48}
				/>
				<h1 className="team_name txt-xs f-s text-gray-600 text-center">{teamData.TeamB.TeamName}</h1>
			</div>

			<Image
				className="selector  absolute right-0 top-0"
				src={"/images/create/selector.svg"}
				alt="chealse"
				width={32}
				height={32}
			/>
		</div>
	);
}
