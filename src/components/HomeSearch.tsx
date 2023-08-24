import Image from "next/image";
import { DropDown } from ".";
import { ChangeEvent, useEffect, useState } from "react";
import { fetchBetListAPI, searchBetList, searchFixturesAPI } from "@/axios/endpoints/bet.endpoint";
import { useBet } from "@/context/betContext";
import useToast from "@/hooks/useToast";
import Debounce from "@/hooks/useDebounce";

export default function HomeSearch({ searchToggle, isSearching, closeSearch }: any) {
	const [showFilter, setShowFilter] = useState(false);
	const [searchKey, setSearchKey] = useState("");
	const { BetList, setBetList } = useBet();
	const { notify } = useToast();

	const [searchMode, setSearchMode] = useState({
		team: false,
		name: false,
		league: false,
		percent: false,
		range: false,
	});

	// handlers

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		const hasKey = searchKey.length > 3;

		if (!hasKey) {
			return notify("warn", "No search value!");
		}

		// const { error, serverResponse } = await fetchBetListAPI(1);
		const { error, serverResponse } = await searchBetList(1, searchKey, "TeamName");

		if (error) {
			notify("warn", "no result");
			console.log(error);
		}
		console.log(serverResponse, "here is the reponse");

		setBetList(serverResponse);
	}

	async function debounceHandler() {

	

		// const { error, serverResponse } = await fetchBetListAPI(1);
		const { error, serverResponse } = await searchBetList(1, searchKey, "TeamName");

		if (error) {
			notify("warn", "no result");
			console.log(error);
		}

		setBetList(serverResponse);
	}


	function processCahnge(e: ChangeEvent<HTMLInputElement>)
	{
		
		setSearchKey(e.target.value)

		Debounce(debounceHandler, 500)()
		
	}

	useEffect(() => {
		!isSearching && setShowFilter(false);
	}, [isSearching]);

	return (
		<div className={`w-[600px] home_search  flex items-center justify-between ${isSearching && "active"}`}>
			<form
				role="button"
				onClick={searchToggle}
				onSubmit={handleSubmit}
				className="search_container relative bg-gray-50 rounded-lg w-[224px] h-10"
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
					value={searchKey}
					onChange={processCahnge}
					onBlur={processCahnge}
					className="bg-transparent w-full  h-full pl-9 outline-none"
					placeholder="Search team name..."
				/>
			</form>
			{isSearching && <div onClick={closeSearch} className="h-8 w-[70%] cursor-pointer"></div>}

			{/* filter */}
			<div role="button" onClick={() => setShowFilter(!showFilter)} className="home_search-filter ">
				<span>
					<FilterSVG />
				</span>
			</div>

			{/* Dropdowns */}

			{showFilter && (
				<div className="absolute  w-full  bg-white left-0 top-11 filter_dropdown">
					<DropDown
						type={"byTeam"}
						lists={[]}
						title="Team"
						show={searchMode.team}
						toggleShow={setSearchMode}
						setList={setBetList}
						context={"Bets"}
					/>

					<DropDown type={"byLeague"} setList={setBetList} lists={[]} title={"League"} show={searchMode.league} toggleShow={setSearchMode} context={"Bets"} />

					<DropDown type={"byName"} lists={[]} title={"Creator"} show={searchMode.name} toggleShow={setSearchMode} context={"Bets"} />

					<DropDown
						type={"byRange"}
						lists={[]}
						title={"Bet Amount"}
						show={searchMode.range}
						setList={setBetList}

						toggleShow={setSearchMode} context={"Bets"}					/>

					<DropDown
						type={"byPercent"}
						lists={[]}
						title={"Bet Discount"}
						setList={setBetList}

						show={searchMode.percent}
						toggleShow={setSearchMode} context={"Bets"}					/>
				</div>
			)}
		</div>
	);
}

export function FilterSVG() {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
			<path
				d="M7.3336 12.0004C7.1447 12.0004 6.98647 11.9364 6.85891 11.8084C6.7309 11.6808 6.6669 11.5226 6.6669 11.3337C6.6669 11.1448 6.7309 10.9866 6.85891 10.859C6.98647 10.731 7.1447 10.667 7.3336 10.667H8.667C8.8559 10.667 9.01435 10.731 9.14236 10.859C9.26992 10.9866 9.3337 11.1448 9.3337 11.3337C9.3337 11.5226 9.26992 11.6808 9.14236 11.8084C9.01435 11.9364 8.8559 12.0004 8.667 12.0004H7.3336ZM2.6667 5.3334C2.4778 5.3334 2.31957 5.26962 2.19201 5.14206C2.064 5.01405 2 4.8556 2 4.6667C2 4.4778 2.064 4.31935 2.19201 4.19134C2.31957 4.06378 2.4778 4 2.6667 4H13.3339C13.5228 4 13.681 4.06378 13.8086 4.19134C13.9366 4.31935 14.0006 4.4778 14.0006 4.6667C14.0006 4.8556 13.9366 5.01405 13.8086 5.14206C13.681 5.26962 13.5228 5.3334 13.3339 5.3334H2.6667ZM4.6668 8.6669C4.4779 8.6669 4.31945 8.6029 4.19144 8.47489C4.06388 8.34733 4.0001 8.1891 4.0001 8.0002C4.0001 7.8113 4.06388 7.65285 4.19144 7.52484C4.31945 7.39728 4.4779 7.3335 4.6668 7.3335H11.3338C11.5227 7.3335 11.6809 7.39728 11.8085 7.52484C11.9365 7.65285 12.0005 7.8113 12.0005 8.0002C12.0005 8.1891 11.9365 8.34733 11.8085 8.47489C11.6809 8.6029 11.5227 8.6669 11.3338 8.6669H4.6668Z"
				fill="#4B5563"
			/>
		</svg>
	);
}
