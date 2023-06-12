
import {     InputField, Toggle,  } from "@components";
import { SvgElement, UploadSvg } from "@/assets";
// import { NextPageWithLayout } from "../_app";





export default function BetDetails()
{
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
