import Image from "next/image";
import { ChangeEvent, FormEvent, useState } from "react";

interface PropTypes {
	place?: string;
	setCurrentList?: any;
	onChangeHandler?: any;
	listToSearch?: String[];
	// value: string | number;
	handleSearch?: any;
}

export const SearchComponent = ({
	place,
	onChangeHandler,
	setCurrentList,
	listToSearch,
	// value,
	handleSearch,
}: PropTypes) => {
	const [searchKey, setSearchkey] = useState("");

	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		// handleSearch();
	}

	function handlechange(e: ChangeEvent<HTMLInputElement>) {
		setSearchkey(e.target.value);
		onChangeHandler(e);
	}
	return (
		<form onSubmit={handleSubmit} className="search border-b py-3 w-full p-4">
			<div
				role="button"
				//   onClick={searchToggle}
				className="search_container relative bg-gray-50 rounded-lg w-full h-10"
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
					onChange={handlechange}
					className="bg-transparent w-full  h-full pl-9 outline-none"
					value={searchKey}
					placeholder={place || "Search..."}
				/>
			</div>
		</form>
	);
};
