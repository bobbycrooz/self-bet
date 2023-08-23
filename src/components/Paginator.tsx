import useToast from "@/hooks/useToast";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { toast } from "react-toastify";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const InfiniteScroll = ({ fetchData, children, list }: any) => {
	const [page, setPage] = useState(2);
	const [isButtonInView, setIsButtonInView] = useState(false);
	const buttonRef = useRef();
	const { notify } = useToast();
	const [isEmpty, setIsEmpty] = useState(false);

	console.log(page);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					setIsButtonInView(true);
					setIsEmpty(false);
				} else {
					setIsButtonInView(false);
				}
			},
			{
				threshold: 0.5,
			}
		);

		//   @ts-ignore
		observer?.observe(buttonRef?.current);

		return () => {
			observer?.disconnect();
		};
	}, [buttonRef]);

	useEffect(() => {
		handleIt();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isButtonInView]);

	async function handleIt() {
		if (isButtonInView) {
			const res = await fetchData(page);

			console.log(res, "this is the res ----");

			if (res) return setPage(page + 1);
		} else {
			return;
		}
	}


	return (
		<>
			{children}
			<div
				style={{ textAlign: "center", display: `${list.length > 0 ? "block" : "none"}` }}
				className=" w-full h-[50px] mt-8"
			>
				{/* @ts-ignore */}
				<div ref={buttonRef}>
					<FetchLoading isEmpty={isEmpty} setIsEmpty={setIsEmpty} />
				</div>
			</div>
		</>
	);
};

export default InfiniteScroll;

function FetchLoading({ isEmpty, setIsEmpty }: any) {
	useEffect(() => {
		setTimeout(() => {
			setIsEmpty(true);
            }, 2000);
            
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isEmpty]);

	return isEmpty ? (
		<div className="grid-center w-full h-full  text-sm">No more item</div>
	) : (
		<SkeletonTheme baseColor="#b1acac5c" highlightColor="#efe5e55c">
			<div className="grid grid-cols-3 h-[auto] gap-8">
				{[1, 1, 1].map((i, k) => (
					<div key={k} className="rounded-xl flex flex-col items-start justify-start p-4 border">
						<Skeleton className="rounded-2xl" width={200} />
						<Skeleton className="rounded-2xl" width={100} />
						<Skeleton className="rounded-2xl" width={100} />
					</div>
				))}
			</div>
		</SkeletonTheme>
	);
}
