import Image from "next/image";

import { CarretRightSvg } from "@/assets";
import { DropDown } from "@components";
import { use, useEffect, useRef, useState } from "react";
import { features } from "process";
import { useBet } from "@/context/betContext";
import ResultModal from "./ResultModa";
import { formatMatchDate } from "@/utils";
import { useUser } from "@/context/userContext";

export default function ResultCard({ result }: any) {
	const [show, setShow] = useState(false);
	const [currentPlayerResult, setCurrentPlayer] = useState<{
		payout: number;
		state: "Won" | "Lost" | "Tie" ;
		userId: string;
	}>();
	const { User} = useUser()

	function handleShow() {
		setShow((p) => !p);
	}



	const date = formatMatchDate(result.Created);

	function getCurrentPlay()
	{
		

		const user = result.Players.find((player: any) => player.userId === User?._id)

		setCurrentPlayer(user);
	}	


	useEffect(() =>
	{
		getCurrentPlay();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	

	console.log(currentPlayerResult, "this is the current player result");
	
	
	return (
		<>
			<div
				style={{
					backgroundImage: `url(/images/home/card_pattern.svg)`,
				}}
				role="button"
				onClick={handleShow}
				className="result_card bg-top"
			>
				<div className="result_card_header ">
					<div className="box flex space-x-3 items-start">
						<div className="ball">
							<BallSVG />
						</div>

						<div className="result_card_header_info">
							<h1 className="name">{result.BetId?.BetName}</h1>

							<p className="date">{date[0]}-{date[1]}</p>
						</div>
					</div>

					<Label status={currentPlayerResult?.state} />
				</div>

				<div className="stake items-center relative  flex justify-between w-full h-[60px] px-4">
					<div className="relative  w-[119px] h-[30px]">
						<svg
							className="absolute"
							xmlns="http://www.w3.org/2000/svg"
							width="119"
							height="28"
							viewBox="0 0 119 28"
							fill="none"
						>
							<path d="M0 0H110.528L119 14L110.528 28H0V0Z" fill="white" />
						</svg>

						<h1 className="absolute  flex st w-full text-center justify-center">
							Stake: <span>N {result.BetId.Amount }</span>
						</h1>
					</div>

					<h1 className="pay ">
						Payout <span>N {currentPlayerResult?.payout}</span>
					</h1>
				</div>
			</div>

			<ResultModal show={show} handleShow={handleShow} data={result} {...currentPlayerResult} />
		</>
	);
}

function BallSVG() {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
			<path
				d="M10.0001 1.66797C5.40008 1.66797 1.66675 5.4013 1.66675 10.0013C1.66675 14.6013 5.40008 18.3346 10.0001 18.3346C14.6001 18.3346 18.3334 14.6013 18.3334 10.0013C18.3334 5.4013 14.6001 1.66797 10.0001 1.66797ZM10.8334 4.41797L11.9584 3.6263C13.4751 4.09297 14.7667 5.09297 15.6084 6.40963L15.2834 7.5263L14.1584 7.90963L10.8334 5.58463V4.41797ZM8.04175 3.6263L9.16675 4.41797V5.58463L5.84175 7.90963L4.71675 7.5263L4.39175 6.40963C5.23341 5.1013 6.52508 4.1013 8.04175 3.6263ZM5.90008 14.2596L4.95008 14.343C3.94175 13.1763 3.33341 11.6596 3.33341 10.0013C3.33341 9.9013 3.34175 9.80963 3.35008 9.70963L4.18341 9.1013L5.33341 9.5013L6.55008 13.118L5.90008 14.2596ZM12.0834 16.3263C11.4251 16.543 10.7251 16.668 10.0001 16.668C9.27508 16.668 8.57508 16.543 7.91675 16.3263L7.34175 15.0846L7.87508 14.168H12.1334L12.6667 15.093L12.0834 16.3263ZM11.8917 12.5013H8.10841L6.98341 9.1513L10.0001 7.03463L13.0251 9.1513L11.8917 12.5013ZM15.0501 14.343L14.1001 14.2596L13.4417 13.118L14.6584 9.5013L15.8167 9.10963L16.6501 9.71797C16.6584 9.80963 16.6667 9.9013 16.6667 10.0013C16.6667 11.6596 16.0584 13.1763 15.0501 14.343Z"
				fill="#007AFE"
			/>
		</svg>
	);
}

export function Label({ status }: { status: "Won" | "Lost" | "Tie" | undefined }) {
	if (status == "Won") {
		return (
			<div className="won capitalize">
				<p>Won</p>
			</div>
		);
	}

	if (status == "Lost") {
		return (
			<div className="lost capitalize">
				<p>lost</p>
			</div>
		);
	}

	return (
		<div className="ongoing capitalize">
			<p>Tie</p>
		</div>
	);
}
