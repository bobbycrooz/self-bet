import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useRef, ChangeEventHandler } from "react";
import Button from "./Button";
import useScreen from "@/hooks/useScreen";
import { useRouter } from "next/router";
import { FiCopy } from "react-icons/fi";
import { useBet } from "@/context/betContext";

interface ModalProps {
	show?: boolean;
	handleClose?: any;
	context: "withdrawal" | "Deposite";
	isLoading: boolean;
	toggleLoader: any;
	status: string;
	setStatus: any;
	reason?: any
}

const statusConst = {
	success: "SUCCESS",
	failed: "FAILED",
};

const copyToClipboard = () => {
		// Select the input element
		const inputElement = document.getElementById("betLink");

		// Select the input text
		// @ts-ignore
		inputElement?.select();
		// @ts-ignore
		inputElement?.setSelectionRange(0, 99999); // For mobile devices

		// Copy the text to the clipboard
		document.execCommand("copy");
	};

// @ts-ignore
const PlaceBetLoader = ({ show, handleClose, context, isLoading, toggleLoader, status, setStatus, reason }: ModalProps) => {
	const cardRef = useRef(null);
	// const [status, setStatus] = useState(statusConst.failed);

	function disableScrollOnModal() {}

	function handleOutsideClick() {}

	function handler() {
		toggleLoader(false);
		setStatus(statusConst.failed);
	}

	return show ? (
		<div className="modal_overlay p-4 fixed top-0 left-0 w-full h-full bg-[#00000083] grid-center z-[111111]">
			<div
				ref={cardRef}
				className="modal_card relative p-6 md:p-12 md:px-8 bg-white rounded-lg shadow-soft md:w-[400px] min-h-[244px]"
			>
				<div className="modal_card-content w-full h-auto fadeIn">
					{isLoading ? (
						<Loading context={context} />
					) : (
						<Prompt status={status} reason={reason} handleClose={handleClose} />
					)}
				</div>
			</div>
		</div>
	) : null;
};

function Loading(props: any) {
	return (
		<div className="col-center">
			<Image src={"/icons/loader.svg"} alt="logo" width={48} height={48} className="animate-spin" />

			<div className="w-full space-y-2 mt-8 text-center">
				<h1 className="title txt-lg f-b capitalize text-gray-900">Creating your bet...</h1>

				<p className="subtitle txt-sm f-n text-[##6B7280]">This will only take a few seconds</p>
			</div>
		</div>
	);
}

function Prompt({ status, handleClose, reason }: { reason?: any; status: string; handleClose: any }) {
	const { isMobile } = useScreen();
	const { push } = useRouter();

		const {isPlacing, clearBetHistory} = useBet()

	

	useEffect(() => {
		if (status === statusConst.success) {
			setTimeout(() =>
			{
				isPlacing(false)
				
				push("/dashboard/my-bets?status=created");

				// return clearBetHistory()
			}, 5000);
		}
	},[push, status]);

	return (
		<div className="col-center">
			<div className="cancle_btn absolute  md:-right-10 -top-11">
				<Image
					src={"/icons/dashboard/cancleBtn.svg"}
					alt={""}
					width={48}
					height={48}
					onClick={handleClose}
					role="button"
				/>
			</div>

			{status === statusConst.success ? (
				<div className="w-full col-center space-y-6">
					<Image src={"/icons/success.svg"} alt="logo" width={48} height={48} className="animate-pulse" />

					<div className="w-full space-y-2   text-center">
						<h1 className="title txt-lg f-b text-gray-900">Bet created successfully</h1>

						<p className="subtitle txt-sm f-n text-[##6B7280]">
							Your bet has been successfully created and your bet has been placed
						</p>

						<p className="text-xs italic">redrecting in 5 seconds...</p>
					</div>

					<div className="w-full rounded-lg p-3 col-centered bg-[#FEF8F3]">
						<p className="text-sec txt-md f-b ">Share bet with friends</p>

						{/* copy bet link element */}
						<div className="w-full border rounded-lg flex items-center justify-between">
							<input
								type="text"
								name=""
								id="betLink"
								className="bg-transparent w-full  h-full pl-2 outline-none to-gray-400"
								value={`https://selfbet.vercel.app/dashboard/join?id=${reason?.betId}`}

							/>

							<button
								
								onClick={copyToClipboard}
								className="copy tg-5 txt-sm p-3 py-2">
								<FiCopy className="text-gray-500" />
							</button>
						</div>
					</div>

					<div className="row  space-x-3">
						<Link href={"/dashboard/my-bets"}>
							<h1 className="vew">View your bets</h1>
						</Link>

						{/* ---carret--- */}
						<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M5.93945 13.2797L10.2861 8.93306C10.7995 8.41973 10.7995 7.57973 10.2861 7.06639L5.93945 2.71973"
								stroke="#4B5563"
								stroke-width="1.5"
								stroke-miterlimit="10"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
					</div>
				</div>
			) : (
				<div className="md:w-full col-center space-y-6 ">
					<Image src={"/icons/error.svg"} alt="logo" width={48} height={48} className="animate-pulse" />

					<div className="w-full space-y-2   text-center">
						<h1 className="title txt-lg f-b text-gray-900">Bet creation failed</h1>

						<p className="subtitle txt-sm f-n text-[##6B7280]">
							We couldn’t create your bet due to insufficient funds in your wallet
						</p>
					</div>

					<div className="md:flex w-full  justify-around space-y-3 md:space-y-0 md:space-x-3">
						<Button text={"Cancel"} full={isMobile} type={"button"} ghost click={handleClose} />
						<Button
							click={() => push("/dashboard/my-wallet")}
							text={"Deposite now"}
							full={isMobile}
							type={"button"}
							primary
						/>
					</div>
				</div>
			)}
		</div>
	);
}

export default PlaceBetLoader;
