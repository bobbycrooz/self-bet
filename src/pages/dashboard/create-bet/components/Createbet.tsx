import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import { AddCondition, BetCard, Button, DropDown, InputField, Toggle, Notification } from "@components";
import { ReactElement, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import DashboardLayout from "@/layouts";
import { CarretRightSvg, MoreSvg, SvgElement, UploadSvg } from "@/assets";





export default function CreateBet({ stepHandler }: { stepHandler: any })
{
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

