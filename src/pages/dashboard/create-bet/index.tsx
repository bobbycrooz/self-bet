import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import { AddCondition, BetCard, Button, DropDown, InputField, Toggle, Notification } from "@components";
import { ReactElement, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import DashboardLayout from "@/layouts";
import { CarretRightSvg, MoreSvg, SvgElement, UploadSvg } from "@/assets";
// import { NextPageWithLayout } from "../_app";

function Home() {
	const [loginMode, setLoginMode] = useState(true);
	const [step, setStep] = useState(1);
	const { push, query, pathname } = useRouter();
	const [isAdding, setIsAdding] = useState<boolean>(false);
	const progressRef = useRef(null);

	function handleAddCondition() {
		setIsAdding((p) => !p);
	}

	// handlers--------------
	function handleAuthMode() {
		setLoginMode((p) => !p);
		window?.scrollTo({
			top: 0,
			left: 0,
			behavior: "smooth",
		});
	}

	function next() {
		if (step === 4) {
			return push("/dashboard/create-bet/bet-details");
		}

		if (step > 1) setStep(step + 1);
	}

	function prev() {
		if (step > 1) setStep(step - 1);
	}

	function stepHandler(to: number) {
		setStep(to);
	}

	function handleBetCreationStep(step: number) {
		switch (step) {
			case 1:
				return <CreateBet stepHandler={stepHandler} />;

			case 2:
				return <SelectMatch />;

			case 3:
				return <BetCondition isAdding={isAdding} handleAddCondition={handleAddCondition} />;

			case 4:
				return <BetDetails />;

			default:
				return <CreateBet stepHandler={stepHandler} />;
		}
	}

	function handleProgressBar(step: number) {
		switch (step) {
			case 2:
				return 25 + "%";

			case 3:
				return 50 + "%";

			case 4:
				return 75 + "%";

			case 5:
				return 100 + "%";

			default:
				return "0";
		}
	}
	// console.log(handleProgressBar(step), "the progress bar");

	// useEffects -------------
	useEffect(() => {
		if (query.login) {
			setLoginMode(true);
		}
	}, [pathname, query.login]);

	// to focus on the progress bar
	useEffect(() => {
		if (progressRef.current) {
			// @ts-ignore
			progressRef.current.scrollIntoView({
				behavior: "smooth",
				block: "end",
				inline: "nearest",
			});
		}
	}, [step]);

	
	const topRef = useRef(null);
	useEffect(() => {
		if (topRef.current) {
			// @ts-ignore
			topRef.current.scrollIntoView({
				behavior: "smooth",
				block: "start",
				inline: "nearest",
			});
		}
	}, [pathname]);

	return (
		<>
			<Head>
				<title>Create bet</title>
				<meta name="description" content="welcome to selfbet home" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>


			<div ref={topRef} className="h-[76px] md:h-0  w-full "></div>
			<main className="dashboard_create bg-white  w-full h-auto pb-[]   p-4 md:p-8 space-y-6">
				<h1 className="txt-xl f-b t-g7  md:t-header1 w-full text-left pb-[0px] border-b">Create new bet</h1>

				<div className="bet_type-select dashboard_create-inner   relative inner_shadow space-y-4   md:space-y-8 p-4 md:p-8  rounded-lg">
					{handleBetCreationStep(step)}
					{/* progress handler */}
					{step >= 2 && (
						<div ref={progressRef} className=" absolute bottom-0 left-0 w-full">
							<div className="bar w-full h-1 bg-gray-50 transition-all">
								<div
									style={{
										width: `${handleProgressBar(step)}`,
									}}
									className={`progress bg-gray-500 h-full transition-all`}
								></div>
							</div>

							<div className="progress_bar row-between w-full md:px-8 p-4 bg-gray-50 h-[84px] inner_shadow border-t-0  ">
								<div role="button" onClick={prev} className="back capitalize middle space-x-3 px-4 p-3 ">
									<Image className="" src={"/images/create/arrow-left.svg"} alt="arrow" width={16} height={16} />
									<p className="t-header1">back</p>
								</div>

								{step === 2 && <div className="hidden md:flex match_count capitalize t-headerb7">Match Selected</div>}

								<Button text={step !== 4 ? "Proceed" : "Proceed to placing bet"} type={"button"} primary click={next} />
							</div>
						</div>
					)}
				</div>
			</main>
			{/* ---Add new bet condition */}
			<AddCondition toggle={handleAddCondition} showNoti={isAdding} />
		</>
	);
}
Home.getLayout = function getLayout(page: ReactElement) {
	return <DashboardLayout>{page}</DashboardLayout>;
};

function CreateBet({ stepHandler }: { stepHandler: any }) {
	const fetures = [
		"Create custom bets on a “single” match ",
		"Unlimited number of participants",
		"Winner takes all regardless of number of participants",
	];

	const point = [
		"Create custom bets on “multiple” matches ",
		"Unlimited number of participants",
		"The person(s) with highest points wins",
	];

	function ReturnJSX(text: string) {
		return <strong className="txt-xs md:text-[16px] text-white">{text}</strong>;
	}

	return (
		<>
			<div className="details hidden md:block ">
				<h1 className="md:display-xs txt-xl f-b text-gray-900">Select Bet Type</h1>

				<p className="subtitle mt-2">Please select your desired bet below</p>
			</div>

			{/* card--types */}
			<div className="bet_types grid lg:grid-cols-2 gap-4 md:gap-8 ">
				{/* ----kolo banner */}
				<div className=" w-full h-[311px] md:h-[520px] relative rounded-lg ">
					<Image src={"/images/create/kolo_banner.png"} alt={""} fill className="rounded-lg" />
					{/* ---bet overlay */}
					<div className="absolute w-full h-full linear_g-bet top-0 left-0 p-6 md:p-12 flex items-end md:pb-24 rounded-lg">
						<div className="content w-full space-y-4 ">
							<div className="row-between">
								<h1 className="display-xs md:display-md f-eb md:f-b text-gray-50 capitalize">Kolo Bet</h1>

								{/* arrow icone ----desktop */}
								<Image
									src={"/images/create/arrow.svg"}
									alt={""}
									width={48}
									height={48}
									role="button"
									onClick={() => stepHandler(2)}
									className="hidden md:block"
								/>

								{/* arrow icon ----phone */}
								<Image
									src={"/images/create/arrow.svg"}
									alt={""}
									width={32}
									height={32}
									role="button"
									onClick={() => stepHandler(2)}
									className=" md:hidden"
								/>
							</div>

							<hr className="border-gray-400" />

							<div className="checks space-y-2 md:space-y-3">
								{fetures.map((i, k) => (
									<div key={k} className="check-item row  space-x-2">
										<Image src={"/icons/check-circle.svg"} alt="logo" width={16} height={16} className="" />
										<h4 className="txt-xs md: f-b md:text-[16px] md:font-medium text-gray-400">
											{k == 0 ? <>Create custom bets on a “{ReturnJSX("Single")} ” match</> : i}
										</h4>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
				{/* -----Ponit banner------ */}
				<div className=" w-full rounded-lg h-[291px] md:h-[520px] relative ">
					<Image src={"/images/create/point_banner.png"} alt={""} fill className=" rounded-lg" />
					<div className="absolute w-full h-full linear_g-bet top-0 left-0 p-6 md:p-12 flex items-end md:pb-24 rounded-lg">
						<div className="content w-full space-y-4">
							<div className="row-between">
								<h1 className="display-xs md:display-md f-eb md:f-b text-gray-50 capitalize">Point Bet</h1>
								{/* arrow icone ----desktop */}
								<Image
									src={"/images/create/arrow.svg"}
									alt={""}
									width={48}
									height={48}
									role="button"
									onClick={() => stepHandler(2)}
									className="hidden md:block"
								/>

								{/* arrow icon ----phone */}
								<Image
									src={"/images/create/arrow.svg"}
									alt={""}
									width={32}
									height={32}
									role="button"
									onClick={() => stepHandler(2)}
									className=" md:hidden"
								/>
							</div>

							<hr className="border-gray-400" />

							<div className="checks space-y-2 md:space-y-3">
								{point.map((i, k) => (
									<div key={k} className="check-item row  space-x-2">
										<Image src={"/icons/check-circle.svg"} alt="logo" width={16} height={16} className="" />
										<h4 className="txt-xs md: f-b md:text-[16px] md:font-medium text-gray-400">
											{k == 0 ? <>Create custom bets on a “{ReturnJSX("Multiple")} ” match</> : i}
										</h4>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>

			</div>
		</>
	);
}

function SelectMatch() {
	const [searchMode, setSearchMode] = useState({
		team: false,
		name: false,
		league: false,
		percent: false,
		range: false,
	});

	const nav = ["All aleague", "Premier League", "la liga", "Seria A", "bundes liga"];

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
			<div className="filter_tab w-full row-between  space-y-4 ">
				<DropDown type={"byTeam"} lists={[]} title={"All matches"} show={searchMode.team} toggleShow={setSearchMode} />

				{/* current bet selection tab --desktop */}
				<div className="hidden lg:flex md:middle space-x-3 nav  txt-sm text-gray-500">
					{nav.map((i, k) => (
						<div
							key={k}
							className={`nav_item ${
								k == 0 ? "bg-gray-50 f-b" : "f-m"
							}   p-[10px] px-3 hover:bg-gray-50  f-m hover:f-b  rounded-lg hover:text-gray-700`}
						>
							<p className="txt-sm text-gray-500">{i}</p>
						</div>
					))}
				</div>

				<div className="filter_btn middle space-x-4 p-[10px] px-3 rounded-lg border border-gray-100">
					<Image src={"/images/create/filter.svg"} alt={""} width={16} height={16} />

					<p className="txt-sm f-m text-gray-500">Filter</p>
				</div>
			</div>

			{/* current selection tab ----phone */}
			<div className="lg:hidden  border-b  relative   ">
				<div className=" overflow-x-scroll custom-scrollbar vert h-[50px]">
					<div className="scroll_track  mt-2 w-[600px] space-x-2 middle">
						{nav.map((i, k) => (
							<div
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

			<div className="w-full  h-[400px] overflow-y-scroll custom-scrollbar pb-[84px] md:pb-[84px]">
				<div className="matched w-full h-auto grid lg:grid-cols-3 md:grid-cols-2 gap-6 md:pt-4">
					{/* --team  display baner---- */}
					{Array(16)
						.fill(1)
						.map((i, k) => (
							<div
								key={k}
								className="teams_display_matches middle hover:border-gray-500 shadow-bet-card hover:shadow-none relative justify-around border border-gray-200 rounded-lg p-6 "
							>
								<div className="team_caard team_caard col-center space-y-2">
									<Image
										className="team_logo "
										src={"/icons/teams/chealse_logo.svg"}
										alt="chealse"
										width={48}
										height={48}
									/>
									<h1 className="team_name txt-xs f-s text-gray-600">Chelsea</h1>
								</div>

								<div className="event_time txt-xs text-center space-y-1 f-m text-gray-400">
									<h1 className="">Sat, 3 Dec</h1>
									<h1 className="bg-gray-50 txt-xs f-s rounded-lg px-4 p-1 text-gray-500">8:30</h1>
								</div>

								<div className="team_caard col-center  space-y-2">
									<Image
										className="team_logo "
										src={"/icons/teams/lei_logo.svg"}
										alt="chealse"
										width={48}
										height={48}
									/>
									<h1 className="team_name txt-xs f-s text-gray-600">Leicester C</h1>
								</div>

								<Image
									className="selector  absolute right-0 top-0"
									src={"/images/create/selector.svg"}
									alt="chealse"
									width={32}
									height={32}
								/>
							</div>
						))}
				</div>
			</div>
		</div>
	);
}

function BetCondition({ handleAddCondition, isAdding }: { handleAddCondition: any; isAdding: boolean }) {
	return (
		<>
			<div className="md:flex justify-between">
				<div className="details">
					<h1 className="display-xs f-b text-gray-900">Bet conditions</h1>

					<p className=" txt-xs t-g6 mt-2 md:subtitle">Customize your bets with custom conditiions</p>
				</div>

				{/* ----search----- */}
				<div
					role="button"
					// onClick={searchToggle}
					className="search_container relative mt-3 md:mt-0 bg-gray-50 rounded-lg md:w-[424px] h-12"
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
						placeholder="Search bet conditions"
					/>
				</div>
			</div>

			{/* ----------- */}

			{/* ------------------ */}

			<div className="w-full   h-[450px] overflow-y-scroll pb-[84px] custom-scrollbar">
				<div className="condition w-full h-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
					{/* --------- */}
					<div className="teams_display border border-gray-200 rounded-lg px-4 p-5 hover:shadow-bet-card">
						<div className="  space-x-4 items-start flex">
							<Image className="team_logo " src={"/icons/green_ball.svg"} alt="chealse" width={48} height={48} />
							<div className="texts ">
								<h1 className="team_name txt-md f-m text-gray-500">Home team / Away team / Draw</h1>
							</div>

							<MoreSvg />
						</div>
					</div>

					<div className="teams_display border border-gray-200 rounded-lg px-4 p-5 hover:shadow-bet-card">
						<div className="  space-x-4 items-start flex">
							<Image className="team_logo " src={"/icons/red_ball.svg"} alt="chealse" width={48} height={48} />
							<div className="texts ">
								<h1 className="team_name txt-md f-m text-gray-500">Home team / Away team / Draw</h1>
							</div>

							<MoreSvg />
						</div>
					</div>

					{/* ---- */}
					<div className="teams_display border border-gray-200 rounded-lg px-4 p-5 hover:shadow-bet-card ">
						<div className="  space-x-4 items-start flex">
							<Image className="team_logo " src={"/icons/blue_ball.svg"} alt="chealse" width={48} height={48} />
							<div className="texts ">
								<h1 className="team_name txt-md f-m text-gray-500">Home team / Away team / Draw</h1>
							</div>

							<MoreSvg />
						</div>
					</div>

					{/* ---- */}
					<div className="teams_display border border-gray-200 rounded-lg px-4 p-5 hover:shadow-bet-card">
						<div className="  space-x-4 items-start flex">
							<Image className="team_logo " src={"/icons/cyan_ball.svg"} alt="chealse" width={48} height={48} />
							<div className="texts ">
								<h1 className="team_name txt-md f-m text-gray-500">Home team / Away team / Draw</h1>
							</div>

							<MoreSvg />
						</div>
					</div>
					{/* --------- */}
					<div
						role="button"
						onClick={handleAddCondition}
						className="centered shadow-bet-card  border border-gray-200 rounded-lg px-4 p-5 hover:shadow-bet-card"
					>
						<div className="space-x-4 middle">
							<Image className="team_logo " src={"/images/create/add.svg"} alt="chealse" width={24} height={24} />

							<p className="team_name txt-sm f-m  text-gray-600">Add bet condition</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

function BetDetails() {
	return (
		<>
			<div className="w-full  h-[600px] overflow-y-scroll custom-scrollbar pb-12">
				<h1 className="txt-xl f-b md:t-header w-full text-left ">Bet details</h1>

				{/* ------row one */}
				<div className="details_row flex flex-col md:flex-row md:items-start md:space-x-[160px] mt-6">
					<h1 className="txt-md f-s text-gray-600  text-left ">Specify bet details</h1>

					<div className="details_column space-y-6 mt-6 md:mt-0">
						<div className="space-y-1">
							<InputField label={"Bet name"} type={"text"} value={"SelfBet3342"} />
							<p className="txt-sm text-gray-400">You can change this if you want</p>
						</div>
						{/* ------ */}
						<div className="space-y-1">
							<InputField label={"Bet Amount"} type={"text"} value={"N5000"} />

							<div className="middle space-x-2">
								<SvgElement />
								<p className="txt-sm text-gray-400">Every participant will stake this amount</p>
							</div>
						</div>
					</div>
				</div>

				{/* ---------row two */}
				<div className="details_row flex flex-col md:flex-row md:items-start md:space-x-[160px] mt-12">
					<h1 className="txt-md f-s text-gray-600  text-left ">Bet image (Optional)</h1>

					<div className="details_column mt-4 md:mt-0">
						<div className="space-y-2 md:space-y-1">
							<h1 className="text-gray-600 txt-sm f-b ">Upload and attach files</h1>
							<p className="txt-sm text-gray-400  md:mt-1">
								Add a personal touch. Upload a custom banner to represent your bet.
							</p>
						</div>

						{/*  */}
						<div className="border border-gray-200 text-gray-400 col-center  px-6 p-4 rounded-lg mt-4">
							<UploadSvg />

							<h1 className="txt-sm w-full text-center mt-3">
								<span className="text-sec f-s">Click to upload </span> or drag and drop
							</h1>
							<h1 className="txt-sm w-full text-center">PNG, JPG or GIF (max. 800x400px)</h1>
						</div>
					</div>
				</div>

				<hr className="border-gray-200 w-full my-8" />

				{/* ------row three */}
				<div className="details_row flex flex-col md:flex-row md:items-start md:space-x-[160px] ">
					<h1 className="txt-md f-s text-gray-600  text-left ">Discount</h1>

					<div className="details_column mt-6 md:mt-0">
						<div className="space-y-2 md:space-y-1">
							<div className="row-between">
								<h1 className="text-gray-600 txt-sm f-b ">Enable Discount</h1>

								{/* toggle */}
								<Toggle />
							</div>
							<p className="txt-sm text-gray-400 mt-1 w-[80%]">
								Add a discount to your bet participants by paying their balance upfront
							</p>
						</div>

						{/*  */}

						<div className="space-y-1 mt-4">
							<InputField label={"How many percent "} type={"text"} place={"e.g 10%"} />
						</div>

						<div className="h-6"></div>

						{/*  */}
						<div className="space-y-2 mt-2">
							<h1 className="text-gray-600 txt-sm f-b ">Number of people</h1>

							<div className="number_row flex gap-2  h-[48px]">
								<div className="add rounded-lg bg-gray-100 p-4">
									<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path
											d="M4 8H12"
											stroke="#374151"
											stroke-width="1.5"
											stroke-linecap="round"
											stroke-linejoin="round"
										/>
									</svg>
								</div>

								{/*  */}
								<div className="input">
									<input  style={{height: '48px'}} type="text" name="num" value={3} id="" className="border rounded-lg border-gray-200 p-4 text-gray-300 text-center w-24" />
								</div>

								{/* \ */}
								<div className="add rounded-lg bg-gray-100 p-4">
									<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path
											d="M4 8H12"
											stroke="#374151"
											stroke-width="1.5"
											stroke-linecap="round"
											stroke-linejoin="round"
										/>
										<path
											d="M8 12V4"
											stroke="#374151"
											stroke-width="1.5"
											stroke-linecap="round"
											stroke-linejoin="round"
										/>
									</svg>
								</div>
							</div>
						</div>
						{/*  */}
						<div className="h-12"></div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Home;
