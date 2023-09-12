import Image from "next/image";

import { CarretRightSvg } from "@/assets";
import { DropDown } from "@components";
import { useCallback, useEffect, useRef, useState } from "react";
import { features } from "process";
import { useBet } from "@/context/betContext";
import { getAllFixturesAPI, searchFixturesAPI } from "@/axios/endpoints/bet.endpoint";
import moment from "moment";
import { formatMatchDate } from "@/utils";
import InfiniteScroll from "@/components/Paginator";
import useToast from "@/hooks/useToast";

const nav = ["All aleague", "Premier League", "la liga", "Seria A", "bundes liga"];

export default function SelectMatch() {
	const [searchMode, setSearchMode] = useState({
		team: false,
		name: false,
		league: false,
		percent: false,
		range: false,
	});
	const { Bet, dispatchBet, currentPage, setCP } = useBet();
	const [fixtures, setFixtures] = useState([]);
	const [showFilderList, setShowFilderList] = useState(false);
	const [currentTab, setCurrentTab] = useState("All aleague");	

	const { notify } = useToast();

	// handlers ------------------
	const handleMatchSelection = (i: any) => {
		// get team names and update teams
		const teamA = i.TeamA.TeamName;
		const teamB = i.TeamB.TeamName;

		const Teams = [teamA, teamB];

		dispatchBet({ type: "BET_MATCH", payload: i });

		dispatchBet({
			type: "BET_TEAMS",
			payload: {
				teams: Teams,
			},
		});

		// get fixture id and update criteria
		const fixtureId = i.FixtureId;
		// console.log(fixtureId, "fixture id");

		dispatchBet({
			type: "BET_FIXTURE_ID",
			payload: {
				FixtureId: fixtureId,
			},
		});

		// get leagues and update
		const league = i.LeagueName;
		// console.log(league, "league");

		dispatchBet({
			type: "BET_LEAGUES",
			payload: {
				league: league,
			},
		});

		// get matchDate and update criteria
		const matchDate = i.MatchDate;

		// console.log(matchDate, "match date");

		dispatchBet({
			type: "BET_MATCH_DATE",
			payload: {
				MatchDate: matchDate,
			},
		});
	};

	async function fetchAlllFixturs(page: number) {
		if (fixtures.length > 0) return console.log("fixtures already fetched");

		// fetch all fixtures from api

		// @ts-ignore
		const { error, serverResponse } = await getAllFixturesAPI(page);

		if (error) return console.log(error);

		// console.log(serverResponse);

		// @ts-ignore
		setFixtures(serverResponse);
	}

	async function fetchMoreFixturs(page: number) {

		// @ts-ignore
		const { error, serverResponse } = await getAllFixturesAPI(page);

		if (error) return console.log(error);

		if (serverResponse.length === 0) {
			return false;
		} else {
			// @ts-ignore
			setFixtures([...fixtures, ...serverResponse]);

			return true;
		}
	}

	// const fetchMoreFixturs = useCallback(async (page: number) => {
	// 	// notify("info", `fetching by page ${page}`);

	// }, [pageNumber]);

	function checkIfMatchIsSelected(matchFixId: number) {
		if (Bet.Criteria.FixtureId === matchFixId) return true;

		return false;
	}

	async function searchByName(pageNumber: number, category: "TeamName" | "LeagueName", searchValue: string) {
		console.log("searching by name", searchValue, category);

		// @ts-ignore
		const { error, serverResponse } = await searchFixturesAPI(pageNumber, category, searchValue);

		setFixtures([]);

		if (error) return console.log(error);

		// console.log(serverResponse);

		// @ts-ignore
		setFixtures(serverResponse);
	}

	function handleFilterToggle() {
		setShowFilderList((p) => !p);
	}

	async function handleSearchTeam(name: any) {
		const { error, serverResponse } = await searchFixturesAPI(1, "TeamName", name);

		setFixtures([]);

		//  @ts-ignore
		if (error) return console.log(error);

		setFixtures(serverResponse as any);

		// @ts-ignore
	}

	// useEffects ------------------
	useEffect(() => {
		fetchAlllFixturs(1);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

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
			<div className="filter_tab w-full row-between  space-y-4 relative">
				<DropDown
					type={"byTeam"}
					lists={[]}
					title={"All matches"}
					show={searchMode.team}
					setList={setFixtures}
					toggleShow={setSearchMode}
					context={"Fixtures"}
				/>
				{/* <CustomSearchCard list={[]} handler={undefined}/> */}

				{/* current bet selection tab --desktop */}
				<div className="hidden lg:flex md:middle space-x-3 nav  txt-sm text-gray-500 ">
					{nav.map((i, k) => (
						<div
							role="button"
							onClick={() =>
							{
								searchByName(1, "LeagueName", i)
								setCurrentTab(i)
							}}
							key={k}
							className={`nav_item ${
								i == currentTab ? "bg-gray-50 f-b" : "f-m"
							}   p-[10px] px-3 hover:bg-gray-50  f-m hover:f-b  rounded-lg hover:text-gray-700`}
						>
							<p className="txt-sm text-gray-500">{i}</p>
						</div>
					))}
				</div>

				{/* filter */}
				<div
					role="button"
					title="filter"
					onClick={handleFilterToggle}
					className="filter_btn middle space-x-4 p-[10px] px-3 rounded-lg border border-gray-100"
				>
					<Image src={"/images/create/filter.svg"} alt={""} width={16} height={16} />

					<p className="txt-sm f-m text-gray-500">Filter</p>
				</div>

				{/* --- Filter dropdown --- */}
				<div
					className={`filer_pane absolute ${
						showFilderList && "active"
					} w-full top-[40px] left-0 bg-white shadow-light p-2 py-4 flex z-50 `}
				>
					<div className="filte_catergory_wrapper grid grid-cols-3 gap-3 w-full mt-2">
						<div className="filter_item w-full  bg-white">
							<h1 className="txt-sm f-m text-gray-500 f-b txt-md mb-2">Date</h1>

							<SearchComponent icon={<CalenderSVG />} handler={handleSearchTeam} type="TeamName" place="select date" />
						</div>

						<div className="filter_item w-full  bg-white">
							<h1 className="txt-sm f-m text-gray-500 f-b txt-md mb-2">Team</h1>

							<SearchComponent icon={<SearchSVG />} handler={searchByName} type="TeamName" place="search teams" />
						</div>

						<div className="filter_item w-full  bg-white">
							<h1 className="txt-sm f-m text-gray-500 f-b txt-md mb-2">League</h1>

							<SearchComponent icon={<SearchSVG />} handler={searchByName} type="LeagueName" place="search league" />
						</div>
					</div>
				</div>
			</div>

			{/* current selection tab ----phone */}
			<div className="lg:hidden  border-b  relative   ">
				<div className=" overflow-x-scroll custom-scrollbar vert h-[50px]">
					<div className="scroll_track  mt-2 w-[600px] space-x-2 middle">
						{nav.map((i, k) => (
							<div
								role="button"
								onClick={() => searchByName(1, "LeagueName", i)}
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

			<div className="w-full  h-[450px] overflow-y-scroll custom-scrollbar pb-[0]  md:pb-[24px]">
				<div className={`pushDown ${showFilderList && "active"}`} />

				{fixtures.length > 0 ? (
					<>
						<InfiniteScroll fetchData={fetchMoreFixturs} list={fixtures}>
							<div className="matched w-full h-auto grid lg:grid-cols-3 md:grid-cols-2 gap-6 md:pt-4 ">
								{/* --team  display baner---- */}
								{fixtures.map((i: any, k) => {
									const [time, dateR] = formatMatchDate(i.MatchDate);

									return (
										<div
											key={k}
											role="button"
											onClick={() => handleMatchSelection(i)}
											className={`teams_display_matches ${checkIfMatchIsSelected(i?.FixtureId) && "active"}`}
										>
											{/* Team A */}
											<div className="team_caard team_caard col-center space-y-2">
												<Image
													className="team_logo "
													src={i.TeamA.Logo == "TeamALogoUrl" ? "/icons/teams/chealse_logo.svg" : i.TeamA.Logo}
													alt="chealse"
													width={48}
													height={48}
												/>
												<h1 className="team_name txt-xs f-s text-gray-600 text-center">{i.TeamA.TeamName}</h1>
											</div>

											{/* Date and time */}
											<div className="event_time txt-xs text-center space-y-1 f-m text-gray-400">
												<h1 className="">{time}</h1>
												<h1 className="bg-gray-50 txt-xs f-s rounded-lg px-4 p-1 text-gray-500">{dateR} </h1>
											</div>

											{/* Team B */}
											<div className="team_caard col-center  space-y-2">
												<Image
													className="team_logo "
													src={i.TeamB.Logo == "TeamBLogoUrl" ? "/icons/teams/lei_logo.svg" : i.TeamB.Logo}
													alt="chealse"
													width={48}
													height={48}
												/>
												<h1 className="team_name txt-xs f-s text-gray-600 text-center">{i.TeamB.TeamName}</h1>
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
								})}
							</div>
						</InfiniteScroll>
					</>
				) : (
					<FetchLoading />
				)}
			</div>
		</div>
	);
}

export function FetchLoading() {
	const [isEmpty, setIsEmpty] = useState(false);

	useEffect(() => {
		setTimeout(() => {
			setIsEmpty(true);
		}, 2000);
	}, []);

	return isEmpty ? (
		<div className="grid-center w-full h-full  text-sm">No match found in this catergory</div>
	) : (
		<div className="grid-center w-full h-full italic text-sm">loading...</div>
	);
}

function CustomSearchCard({ list, handler }: { list: Array<string>; handler: any }) {
	const cardRef = useRef(null);

	function handleCardClick(e: any) {
		const cardEle = e.target;
		const cardEleRef = cardRef.current;

		// console.log(cardEle, cardEleRef);

		if (cardEle !== cardEleRef) {
			handler();
		}
	}

	return (
		<div
			ref={cardRef}
			onClick={handleCardClick}
			className="absolute dropdown_body z-50 space-y-4 column transform w-[328px] shadow-soft left-0 top-[140px]  md:top-12 border-gray-100  p-4 grid grid-cols-3 gap-2 border-x border-2 rounded-lg"
		>
			{/* -----custom search list ---- */}
			<ol className="team_options w-full">
				{list.map((i, k) => (
					<li key={k} role="button" onClick={() => handler(i)} className="option middle space-x-4">
						<h1 className="text-gray-700 f-m capitalize">{i}</h1>
					</li>
				))}
			</ol>
		</div>
	);
}

function SearchComponent({
	handler,
	icon,
	place,
	type,
}: {
	handler?: any;
	icon: any;
	place: string;
	type: "TeamName" | "LeagueName";
}) {
	const [searchValue, setSearchValue] = useState("");

	function handleChange(e: any) {
		setSearchValue(e.target.value);
	}

	function handleSearch(e: any) {
		e.preventDefault();

		handler(1, type, searchValue);

		setSearchValue("");
	}

	return (
		<form onSubmit={handleSearch} className="search">
			<div
				role="button"
				//   onClick={searchToggle}
				className="search_container relative bg-gray-50 rounded-lg w-full h-10"
			>
				<div className="absolute top-1/2 -translate-y-1/2 left-2 txt-sm f-m text-gray-400">{icon}</div>

				<input
					type="text"
					name=""
					id=""
					onChange={handleChange}
					onBlur={handleChange}
					className="bg-transparent w-full  h-full pl-9 outline-none"
					placeholder={place}
				/>
			</div>
		</form>
	);
}

function SearchSVG() {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
			<path
				d="M9.58268 17.4998C13.9549 17.4998 17.4993 13.9554 17.4993 9.58317C17.4993 5.21092 13.9549 1.6665 9.58268 1.6665C5.21043 1.6665 1.66602 5.21092 1.66602 9.58317C1.66602 13.9554 5.21043 17.4998 9.58268 17.4998Z"
				stroke="#9CA3AF"
				stroke-width="1.25"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
			<path
				d="M18.3327 18.3332L16.666 16.6665"
				stroke="#9CA3AF"
				stroke-width="1.25"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	);
}

function CalenderSVG() {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
			<path
				d="M6.66602 1.6665V4.1665"
				stroke="#9CA3AF"
				stroke-width="1.25"
				stroke-miterlimit="10"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
			<path
				d="M13.334 1.6665V4.1665"
				stroke="#9CA3AF"
				stroke-width="1.25"
				stroke-miterlimit="10"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
			<path
				d="M2.91602 7.57471H17.0827"
				stroke="#6B7280"
				stroke-width="1.25"
				stroke-miterlimit="10"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
			<path
				d="M17.5 7.08317V14.1665C17.5 16.6665 16.25 18.3332 13.3333 18.3332H6.66667C3.75 18.3332 2.5 16.6665 2.5 14.1665V7.08317C2.5 4.58317 3.75 2.9165 6.66667 2.9165H13.3333C16.25 2.9165 17.5 4.58317 17.5 7.08317Z"
				stroke="#6B7280"
				stroke-width="1.25"
				stroke-miterlimit="10"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
			<path
				d="M13.0781 11.4167H13.0856"
				stroke="#6B7280"
				stroke-width="1.66667"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
			<path
				d="M13.0781 13.9167H13.0856"
				stroke="#6B7280"
				stroke-width="1.66667"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
			<path
				d="M9.99607 11.4167H10.0036"
				stroke="#6B7280"
				stroke-width="1.66667"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
			<path
				d="M9.99607 13.9167H10.0036"
				stroke="#6B7280"
				stroke-width="1.66667"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
			<path
				d="M6.91209 11.4167H6.91957"
				stroke="#6B7280"
				stroke-width="1.66667"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
			<path
				d="M6.91209 13.9167H6.91957"
				stroke="#6B7280"
				stroke-width="1.66667"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	);
}

// function Paginator() {
// 	return (
// 		<div ref={lastItemRef} className="w-full br h-[70px] mt-8 grid place-content-center">
// 			<FetchLoading />
// 		</div>
// 	);
// }
