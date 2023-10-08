import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useRef } from "react";
import Image from "next/image";
// import { Range } from "react-range";
import { TwoThumbs } from "@components";
import { getAllFixturesAPI, searchBetList, searchFixturesAPI } from "@/axios/endpoints/bet.endpoint";
import { useBet } from "@/context/betContext";
import useToast from "@/hooks/useToast";
import Debounce from "@/hooks/useDebounce";


export default function SearchByLeagueCard(props: any) {
	const teamsArray = [
		{
			name: "Premier League",
			icon: "/icons/teams/chealse_logo-sm.svg",
		},
		{
			name: "Bundesliga",
			icon: "/icons/teams/arsenal_logo-sm.svg",
		},
		{
			name: "Serie A",
			icon: "/icons/teams/lei_logo-sm.svg",
		},
		{
			name: "La Liga",
			icon: "/icons/teams/roma_logo-sm.svg",
		},
	];
	const [teamName, setTeamName] = useState("");

		function handleChange(e: any) {
		setTeamName(e.target.value);
	}

	async function handleSearchLeague(e: any)
	{
		e.preventDefault();
		
		props.setList([]);

		if (props.context === "Fixtures") {
			const { error, serverResponse } = await searchFixturesAPI(1, "TeamName", teamName);

			//  @ts-ignore
			if (error) return console.log(error);

			props.setList(serverResponse);
		} else {
			const { error, serverResponse } = await searchBetList(1, teamName, "LeagueName");

			//  @ts-ignore
			if (error) return console.log(error);

			props.setList(serverResponse);
		}

		props.handleShowList("byTeam");
	}

	return (
		<div className="dropdown_body space-y-4 column left-0 top-[140px]  md:top-12   p-4 grid grid-cols-3 gap-2 border-x border-2 ">
			{/* search component */}
			<form onSubmit={handleSearchLeague} className="search">
				<div
					role="button"
					//   onClick={searchToggle}
					className="search_container relative bg-gray-50 rounded-lg w-full h-10"
				>
					<div onClick={handleSearchLeague} role="button" className="imgIcon">
						<Image
							src={"/icons/dashboard/search.svg"}
							alt="logo"
							width={20}
							height={20}
							className=" absolute top-1/2 -translate-y-1/2 left-2 txt-sm f-m text-gray-400"
						/>
					</div>

					<input
						type="text"
						name=""
						id=""
						onChange={(e) => handleChange(e)}
						onBlur={(e) => handleChange(e)}
						className="bg-transparent w-full  h-full pl-9 outline-none"
						placeholder="Search league..."
					/>
				</div>
			</form>

			{/* <ol className="team_options w-full">
				{teamsArray.map((i, k) => (
					<li key={k} role="button" className="option middle space-x-4" onClick={() => handleSearchLeague(i.name)}>
						<Image
							src={i.icon}
							alt="wallet"
							width={40}
							height={40}
							role="button"
							className={` carret transition-transform`}
						/>

						<h1 className="text-gray-700 f-m capitalize">{i.name}</h1>
					</li>
				))}
			</ol> */}
		</div>
	);
}