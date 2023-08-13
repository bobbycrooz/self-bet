import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useRef } from "react";
import Image from "next/image";
// import { Range } from "react-range";
import { TwoThumbs } from "@components";
import { getAllFixturesAPI, searchBetList, searchFixturesAPI } from "@/axios/endpoints/bet.endpoint";
import { useBet } from "@/context/betContext";
import useToast from "@/hooks/useToast";

interface DropDownBtnProps {
	type: "byTeam" | "byName" | "byRange" | "byPercent" | "byLeague" | "custom";
	title: string;
	lists: Array<string>;
	handler?: (value: string) => void;
	show: boolean;
	toggleShow: any;
	// setFixtures?: any;
	setList?: any;
	context: "Fixtures" | "Bets";
}

export default function DropdownBtn({
	title,
	type,
	lists,
	handler,
	show,
	toggleShow,
	setList,
	context,
}: DropDownBtnProps) {
	const [showList, setShowList] = useState(false);
	const cardRef = useRef(null);

	function handleShowList(type: string) {
		switch (type) {
			case "byTeam":
				return toggleShow({
					team: !show,
					name: false,
					league: false,
					percent: false,
					range: false,
				});

			case "byName":
				return toggleShow({
					team: false,
					name: !show,
					league: false,
					percent: false,
					range: false,
				});
			case "byRange":
				return toggleShow({
					team: false,
					name: false,
					league: false,
					percent: false,
					range: !show,
				});

			case "byPercent":
				return toggleShow({
					team: false,
					name: false,
					league: false,
					percent: !show,
					range: false,
				});

			case "byLeague":
				return toggleShow({
					team: false,
					name: false,
					league: !show,
					percent: false,
					range: false,
				});

			default:
				return toggleShow({
					team: false,
					name: false,
					league: false,
					percent: false,
					range: false,
				});
		}
	}

	function dropDownCardHandler(type: string) {
		switch (type) {
			case "byTeam":
				return <SearchByTeamCard handleShowList={handleShowList} setList={setList} context={context} />;

			case "byName":
				return <SearchByNameCard handleShowList={handleShowList} setList={setList} context={context} />;

			case "byRange":
				return <SearchByRangeCard handleShowList={handleShowList} setList={setList} context={context} />;

			case "byPercent":
				return <SearchByPercentCard handleShowList={handleShowList} setList={setList} context={context} />;

			case "byLeague":
				return <SearchByLeagueCard handleShowList={handleShowList} setList={setList} context={context} />;

			case "custom":
				return <CustomSearchCard list={lists} handler={handler} />;

			default:
				return <CustomSearchCard list={lists} handler={handler} />;
		}
	}

	function handleCardClick(e: any) {
		console.log(cardRef?.current);
		console.log(e.target);

		console.log(cardRef?.current == e.target);

		if (cardRef?.current != e.target) {
			handleShowList(type);
		}
	}

	return (
		<div className="dropdown_filter md:relative ">
			<div
				role="button"
				onClick={() => handleShowList(type)}
				className={` p-4 flex px-3 row-between h-[40px] space-x-4 w-full border  border-gray-100 rounded-lg `}
			>
				<h1 className="bet_condition_name txt-sm f-m text-gray-500 ">{title}</h1>
				<Image
					src={"/icons/carret-fade.svg"}
					alt="wallet"
					width={20}
					height={20}
					role="button"
					className={` carret ${show && "active rotate-90"}  transition-transform `}
				/>
			</div>

			{show && (
				<>
					<div
						ref={cardRef}
						className="   absolute dropdown_body space-y-4 column transform w-[328px] shadow-soft z-50"
					>
						{dropDownCardHandler(type)}
						{/* <div className="bg-[#00000048] absolute w-screen h-screen " /> */}
					</div>
					<div onClick={handleCardClick} className="bg-[#00000021] fixed w-screen h-screen left-0 top-0 z-40" />
				</>
			)}
			{/* {show && <div className="z-[99999] bg-white">{dropDownCardHandler(type)}</div>} */}
		</div>
	);
}

function SearchByTeamCard(props: any) {
	const teamsArray = [
		{
			name: "chealse",
			icon: "/icons/teams/chealse_logo-sm.svg",
		},
		{
			name: "Arsenal",
			icon: "/icons/teams/arsenal_logo-sm.svg",
		},
		{
			name: "Leicester City",
			icon: "/icons/teams/lei_logo-sm.svg",
		},
		{
			name: "As roma",
			icon: "/icons/teams/roma_logo-sm.svg",
		},
		{
			name: "Manchester United",
			icon: "/icons/teams/roma_logo-sm.svg",
		},
	];
	const cardRef = useRef(null);
	const [teams, setTeams] = useState(teamsArray);
	const [teamName, setTeamName] = useState("");

	function handleCardClick(e: any) {
		const cardEle = e.target;
		const cardEleRef = cardRef.current;
		return;

		// console.log(cardEle, cardEleRef);

		// if (cardEle !== cardEleRef) {
		// 	props.handleShowList();
		// }
	}

	function handleChange(e: any) {
		setTeamName(e.target.value);
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

	return (
		<div
			ref={cardRef}
			onClick={handleCardClick}
			className="dropdown_body space-y-4 column left-0 top-[140px]  md:top-12  border-gray-100  p-4 grid grid-cols-3 gap-2 border-x border-2 rounded-lg"
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

function SearchByLeagueCard(props: any) {
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

function SearchByNameCard(props: any) {
	const [showFilter, setShowFilter] = useState(false);
	const [searchKey, setSearchKey] = useState("");
	const { BetList, setBetList } = useBet();
	const { notify } = useToast();

	async function handleSubmit(e?: React.FormEvent<HTMLFormElement>) {
		e && e.preventDefault();

		const hasKey = searchKey.length > 3;

		if (!hasKey) {
			return notify("warn", "No search value!");
		}

		// const { error, serverResponse } = await fetchBetListAPI(1);
		const { error, serverResponse } = await searchBetList(1, searchKey, "Creator");

		if (error) {
			notify("warn", "no result");

			props.handleShowList("byName");

			return console.log(error);
		}

		setBetList(serverResponse);

		props.handleShowList("byName");
	}

	return (
		<div className=" space-y-4 column  left-0 top-[140px]  md:top-12  p-4 grid grid-cols-3 gap-2 border-x border-2 ">
			{/* search component */}
			<div className="search">
				<form
					onSubmit={handleSubmit}
					role="button"
					//   onClick={searchToggle}
					className="search_container relative bg-gray-50 rounded-lg w-full h-10 "
				>
					<Image
						src={"/icons/dashboard/search.svg"}
						alt="logo"
						width={20}
						height={20}
						className=" absolute top-1/2 -translate-y-1/2 left-2 txt-sm f-m text-gray-400"
						onClick={() => handleSubmit()}
					/>

					<input
						type="text"
						name=""
						id=""
						className="bg-transparent w-full  h-full pl-9 outline-none"
						placeholder="e.g Peter Mane..."
						value={searchKey}
						onChange={(e) => setSearchKey(e.target.value)}
						onBlur={(e) => setSearchKey(e.target.value)}
					/>
				</form>
			</div>
			{/* 
			<ol className="team_options w-full">
				{nameArray.map((i, k) => (
					<li key={k} role="button" className="option middle space-x-4">
						<Image
							src={i.icon}
							alt="wallet"
							width={40}
							height={40}
							role="button"
							className={` carret transition-transform`}
						/>

						<h1 className="text-gray-700 txt-md f-m capitalize">{i.name}</h1>
					</li>
				))}
			</ol> */}
		</div>
	);
}

function SearchByRangeCard(props: any) {
	const [values, setValues] = useState([25, 705]);

	console.log(props);

	async function handleSearchAmount(value: string) {
		// props.setList([]);

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

		props.handleShowList("byTeam");
	}

	return (
		<div className=" space-y-4 column  left-0 top-[140px]  md:top-12   p-4 grid grid-cols-3 gap-2 border-x border-2">
			<div className="row-between">
				<h1 className="text-gray-900 txt-md f-m">Price (₦GN)</h1>
				<h1 role="button" onClick={() => handleSearchAmount(values[1].toFixed())} className="text-gray-500 txt-sm f-eb">
					Apply
				</h1>
			</div>

			<TwoThumbs rtl={false} values={values} setValues={setValues} />

			<div className="row w-full justify-between  space-x-2">
				<div className="mout w-full rounded-lg p-[10px] px-[14px] bg-gray-100">{values[0].toFixed()}</div>
				<p className="">-</p>
				<div className="mout w-full rounded-lg p-[10px] px-[14px] bg-gray-100">{values[1].toFixed()}</div>
			</div>
		</div>
	);
}

function SearchByPercentCard(props: any) {
	// const percentageArray = ["50% or more", "60% or more", "70% or more", "80% or more"];
	const [teamName, setTeamName] = useState("");

		function handleChange(e: any) {
		setTeamName(e.target.value);
	}

	async function handleSearchPercentage(e: any) {
		// props.setList([]);

		e.preventDefault();

		const value = Number(teamName);

		if (props.context === "Fixtures") {
			const { error, serverResponse } = await searchFixturesAPI(1, "TeamName", value);

			//  @ts-ignore
			if (error) return console.log(error);

			props.setList(serverResponse);
		} else {
			const { error, serverResponse } = await searchBetList(1, value, "Discount");

			//  @ts-ignore
			if (error) return console.log(error);

			props.setList(serverResponse);
		}

		props.handleShowList("byTeam");
	}

	return (
		<div className=" space-y-4 column right-0 top-[140px]  md:top-12  p-4 grid grid-cols-3 gap-2">
			{/* search component */}

			<h1 className="text-gray-700 f-m capitalize">Discount Percentage</h1>

			<form onSubmit={handleSearchPercentage} className="search">
				<div
					role="button"
					//   onClick={searchToggle}
					className="search_container relative bg-gray-50 rounded-lg w-full h-10"
				>
					<div onClick={handleSearchPercentage} role="button" className="imgIcon">
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
						placeholder="Search discount..."
					/>
				</div>
			</form>
		</div>
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
			className=" space-y-4 column left-0 top-[140px]  md:top-12   p-4 grid grid-cols-3 gap-2 "
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
