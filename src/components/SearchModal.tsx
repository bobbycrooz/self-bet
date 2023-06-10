import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useRef } from "react";
import Image from "next/image";
// import { Range } from "react-range";
import { TwoThumbs, DropDown } from "@components";
import useScreen from "@/hooks/useScreen";

export default function SearchModal({ isSearching, setIsSearching }: { isSearching: boolean; setIsSearching: any }) {
	const [searchMode, setSearchMode] = useState({
		team: true,
		name: false,
		league: false,
		percent: false,
		range: false,
	});

	const { isMobile } = useScreen();

	// function dropDownCardHandler(): import("react").ReactNode | ((bag: PanelRenderPropArg) => import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>) {
	//   throw new Error("Function not implemented.");
	// }

	return (
		<>
			<Transition appear show={isSearching} as={'div'} className={'relative'}>
						
				
				<div className="cancle_btn bg-white br absolute left-1/2 -top-16 -translate-x-1/2">
							<Image
								src={"/icons/dashboard/cancleBtn.svg"}
								alt={""}
								width={48}
								height={48}
								// onClick={toggle}
								role="button"
							/>
				</div>
				

				<Dialog as="div" className="relative z-10" onClose={setIsSearching}>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-black bg-opacity-25" />
					</Transition.Child>

					<div className="fixed inset-0 overflow-y-auto">
						<div className="flex min-h-full items-center justify-center p-4 md:p-6 text-center">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<Dialog.Panel className=" w-full md:w-[700px] relative h-[600px] space-y-4 transform overflow-hidden rounded-2xl bg-white p-4  md:p-6 text-left align-middle shadow-xl transition-all ">
									{/* search component */}
									<div className="search">
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
												className="bg-transparent w-full  h-full pl-9 outline-none"
												placeholder="Search SelfBets..."
											/>
										</div>
									</div>

									{/* filter tab */}
									{isMobile ? (
										<div className="w-full overflow-x-auto ">
											<div className="filters middle space-x-3 w-[900px] ">
												<DropDown
													type={"byTeam"}
													lists={[]}
													title="Team"
													show={searchMode.team}
													toggleShow={setSearchMode}
												/>
												<DropDown
													type={"byLeague"}
													lists={[]}
													title={"League"}
													show={searchMode.league}
													toggleShow={setSearchMode}
												/>
												<DropDown
													type={"byName"}
													lists={[]}
													title={"Creator"}
													show={searchMode.name}
													toggleShow={setSearchMode}
												/>
												<DropDown
													type={"byRange"}
													lists={[]}
													title={"Bet Amount"}
													show={searchMode.range}
													toggleShow={setSearchMode}
												/>
												<DropDown
													type={"byPercent"}
													lists={[]}
													title={"Bet Discount"}
													show={searchMode.percent}
													toggleShow={setSearchMode}
												/>
											</div>
										</div>
									) : (
										<div className="filters middle space-x-2 ">
											<DropDown
												type={"byTeam"}
												lists={[]}
												title="Team"
												show={searchMode.team}
												toggleShow={setSearchMode}
											/>
											<DropDown
												type={"byLeague"}
												lists={[]}
												title={"League"}
												show={searchMode.league}
												toggleShow={setSearchMode}
											/>
											<DropDown
												type={"byName"}
												lists={[]}
												title={"Creator"}
												show={searchMode.name}
												toggleShow={setSearchMode}
											/>
											<DropDown
												type={"byRange"}
												lists={[]}
												title={"Bet Amount"}
												show={searchMode.range}
												toggleShow={setSearchMode}
											/>
											<DropDown
												type={"byPercent"}
												lists={[]}
												title={"Bet Discount"}
												show={searchMode.percent}
												toggleShow={setSearchMode}
											/>
										</div>
									)}

									{/* -------------- */}

									{/* { isMobile && dropDownCardHandler("byName")} */}

									{/* search result */}
									{Array(5)
										.fill(1)
										.map((i, k) => (
											<div key={k} className="w-full   middle h-[75px] hover:bg-gray-50 p-2 md:p-4">
												<Image src={"/images/search_res.png"} alt="thumbnail" width={90} height={48} />

												<div className="texts ml-4 ">
													<h1 className="txt-md f-b text-gray-700">Search results header</h1>
													<h1 className="txt-sm text-gray-500">Search results </h1>
												</div>
											</div>
										))}

									{/* cancle button */}
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	);
}
