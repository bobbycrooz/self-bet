import useToast from "@/hooks/useToast";
import { FetchLoading } from "@/pages/dashboard/create-bet/components/Matches";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { toast } from "react-toastify";

const InfiniteScroll = ({ fetchData, children,  }: any) => {
	const [page, setPage] = useState(2);
	const [isButtonInView, setIsButtonInView] = useState(false);
	const buttonRef = useRef();
	const { notify } = useToast();

	console.log(page);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					setIsButtonInView(true)
				} else {
					setIsButtonInView(false)
				}
			},
			{
				threshold: 0.5,
			}
		);

		//   @ts-ignore
		observer.observe(buttonRef?.current);

		return () => {
			observer.disconnect();
		};
	}, [buttonRef]);

	useEffect(() => {
            handleIt()
            
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isButtonInView]);

      async function handleIt() {
            	if (isButtonInView) {
                  const res = await fetchData(page);

                  console.log(res, "this is the res ----");
                  
                  
                  if(res) return setPage(page + 1)
		} else {
			return;
		}
      }

	return (
		<>
			{children}
			<div style={{ textAlign: "center" }} className=" w-full h-[50px] mt-8">
				{/* @ts-ignore */}
                        <div ref={buttonRef}>
                              
					<FetchLoading />
                        
                        </div>
			</div>
		</>
	);
};

export default InfiniteScroll;
