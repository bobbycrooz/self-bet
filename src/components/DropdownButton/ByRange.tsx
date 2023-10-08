import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useRef } from "react";
import Image from "next/image";
// import { Range } from "react-range";
import { TwoThumbs } from "@components";
import { getAllFixturesAPI, searchBetList, searchFixturesAPI } from "@/axios/endpoints/bet.endpoint";
import { useBet } from "@/context/betContext";
import useToast from "@/hooks/useToast";
import Debounce from "@/hooks/useDebounce";


export default function SearchByRangeCard(props: any) {
	const [values, setValues] = useState([25, 705]);
		const [teamName, setTeamName] = useState("");

		function handleChange(e: any) {
		setTeamName(e.target.value);
	}

	console.log(props);

	async function handleSearchAmount(e: any) {
		// props.setList([]);

		e.preventDefault();

		const value = Number(teamName);

		if (props.context === "Fixtures") {
			const { error, serverResponse } = await searchFixturesAPI(1, "TeamName", value);

			//  @ts-ignore
			if (error) return console.log(error);

			props.setList(serverResponse);
		} else {
			const { error, serverResponse } = await searchBetList(1, value, "Amount");

			//  @ts-ignore
			if (error) return console.log(error);

			props.setList(serverResponse);
		}

		props.handleShowList("byRange");
	}

	return (
		<div className=" space-y-4 column  left-0 top-[140px]  md:top-12   p-4 grid grid-cols-3 gap-2 border-x border-2">
		<form onSubmit={handleSearchAmount} className="search">
				<div
					role="button"
					//   onClick={searchToggle}
					className="search_container relative bg-gray-50 rounded-lg w-full h-10"
				>
					<div onClick={handleSearchAmount} role="button" className="imgIcon">
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
						placeholder="Search amount..."
					/>
				</div>
			</form>
		</div>
	);
}