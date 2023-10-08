import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useRef } from "react";
import Image from "next/image";
// import { Range } from "react-range";
import { TwoThumbs } from "@components";
import { getAllFixturesAPI, searchBetList, searchFixturesAPI } from "@/axios/endpoints/bet.endpoint";
import { useBet } from "@/context/betContext";
import useToast from "@/hooks/useToast";
import Debounce from "@/hooks/useDebounce";


export default function SearchByTeamCard(props: any)
{

	const cardRef = useRef(null);
	const [teamName, setTeamName] = useState("");

	function handleCardClick(e: any) {
	
		return;


	}

	function handleChange(e: any) {
		setTeamName(e.target.value);

		Debounce(debounceHandler, 500)()

	}

	async function handleSearchTeam(e: any) {
		e.preventDefault();

		props.setList([]);

		if (props.context === "Fixtures") {
			const { error, serverResponse } = await searchFixturesAPI(1, "TeamName", teamName);

			//  @ts-ignore
			if (error) return console.log(error);

			props.setList(serverResponse);
		} else {
			const { error, serverResponse } = await searchBetList(1, teamName, "TeamName");

			//  @ts-ignore
			if (error) return console.log(error);

			props.setList(serverResponse);
		}

		props.handleShowList("byTeam");
	}


	// ---debouce handler for match search by team name
		async function debounceHandler() {

		// props.setList([]);

		if (props.context === "Fixtures") {
			const { error, serverResponse } = await searchFixturesAPI(1, "TeamName", teamName);

			//  @ts-ignore
			if (error) return console.log(error);

			props.setList(serverResponse);
		} else {
			const { error, serverResponse } = await searchBetList(1, teamName, "TeamName");

			//  @ts-ignore
			if (error) return console.log(error);

			props.setList(serverResponse);
		}

	}

	return (
		<div
			ref={cardRef}
			onClick={handleCardClick}
			className="dropdown_body w-full   space-y-4 column md:left-0 top-[140px]  md:top-12  border-gray-100  p-4 grid grid-cols-3 gap-2 border-x border-2 rounded-lg"
		>
			{/* search component */}
			<form onSubmit={handleSearchTeam} className="search">
				<div
					role="button"
					//   onClick={searchToggle}
					className="search_container relative bg-gray-50 rounded-lg w-full h-10"
				>
					<div onClick={handleSearchTeam} role="button" className="imgIcon">
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
						placeholder="Search teams..."
					/>
				</div>
			</form>

			{/* List scroll wrapper */}
			{/* <div className="scroll_wrapper overflow-y-scroll w-full h-[200px] z-[9999999] custom-scrollbar">
				<ol className="team_options w-full bg-white   h-full">
					{teams.map((i, k) => (
						<li
							key={k}
							role="button"
							onClick={() => handleSearchTeam(i.name)}
							className="option middle space-x-4  hover:bg-gray-200"
						>
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
				</ol>
			</div> */}
		</div>
	);
}