import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useRef } from "react";
import Image from "next/image";
// import { Range } from "react-range";
import { TwoThumbs } from "@components";
import { getAllFixturesAPI, searchBetList, searchFixturesAPI } from "@/axios/endpoints/bet.endpoint";
import { useBet } from "@/context/betContext";
import useToast from "@/hooks/useToast";
import Debounce from "@/hooks/useDebounce";


export default function SearchByNameCard(props: any) {
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