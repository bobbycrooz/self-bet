import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useRef } from "react";
import Image from "next/image";
// import { Range } from "react-range";
import { TwoThumbs } from "@components";
import { getAllFixturesAPI, searchBetList, searchFixturesAPI } from "@/axios/endpoints/bet.endpoint";
import { useBet } from "@/context/betContext";
import useToast from "@/hooks/useToast";
import Debounce from "@/hooks/useDebounce";
import SearchByTeamCard from "./ByTeam";
import SearchByNameCard from "./ByName";
import SearchByRangeCard from "./ByRange";
import SearchByPercentCard from "./ByPercent";
import SearchByLeagueCard from "./ByLeague";

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
						className="fixed left-1/2 -translate-x-1/2  sm:absolute dropdown_body space-y-4 column transform w-[328px] shadow-soft z-[999] bg"
					>
						{dropDownCardHandler(type)}
						{/* <div className="bg-[#00000048] absolute w-screen h-screen " /> */}
					</div>
					<div onClick={handleCardClick} className="bg-[#00000021] fixed w-screen h-screen left-0 top-0 z-[999]" />
				</>
			)}
			{/* {show && <div className="z-[99999] bg-white">{dropDownCardHandler(type)}</div>} */}
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
