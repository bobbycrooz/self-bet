import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useRef, ChangeEventHandler } from "react";
import Button from "./Button";

interface ModalProps {
  show?: boolean;
  handleClose: any;
  context: "withdrawal" | "Deposite";
  isLoading: boolean;
  toggleLoader: any;
  status: string;
  setStatus: any;
}

const statusConst = {
  success: "SUCCESS",
  failed: "FAILED",
};

// @ts-ignore
const PlaceBetLoader = ({
  show,
  handleClose,
  context,
  isLoading,
  toggleLoader,
  status,
  setStatus,
}: ModalProps) => {
  const cardRef = useRef(null);
  // const [status, setStatus] = useState(statusConst.failed);

  function disableScrollOnModal() {}

  function handleOutsideClick() {}

  function handler() {
    toggleLoader(false);
    setStatus(statusConst.failed);
  }

  return show ? (
    <div className="modal_overlay fixed top-0 left-0 w-full h-full bg-[#00000083] grid-center">
      <div
        ref={cardRef}
        className="modal_card relative p-12 px-8 bg-white rounded-lg shadow-soft w-[400px] min-h-[244px]"
      >
        <div className="modal_card-content w-full h-auto fadeIn">
          {isLoading ? (
            <Loading context={context} />
          ) : (
            <Prompt
              status={status}
              context={context}
              handleClose={handleClose}
            />
          )}
        </div>
      </div>
    </div>
  ) : null;
};

function Loading(props: any) {
  return (
    <div className="col-center">
      <Image
        src={"/icons/loader.svg"}
        alt="logo"
        width={48}
        height={48}
        className="animate-spin"
      />

      <div className="w-full space-y-2 mt-8 text-center">
        <h1 className="title txt-lg f-b capitalize text-gray-900">
          Creating your bet...
        </h1>

        <p className="subtitle txt-sm f-n text-[##6B7280]">
          This will only take a few seconds
        </p>
      </div>
    </div>
  );
}

function Prompt({
  status,
  handleClose,
  context,
}: {
  context: string;
  status: string;
  handleClose: any;
}) {
  return (
    <div className="col-center ">
      <div className="cancle_btn absolute -right-10 -top-10">
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
          <Image
            src={"/icons/success.svg"}
            alt="logo"
            width={48}
            height={48}
            className="animate-pulse"
          />

          <div className="w-full space-y-2   text-center">
            <h1 className="title txt-lg f-b text-gray-900">
              Bet created successfully
            </h1>

            <p className="subtitle txt-sm f-n text-[##6B7280]">
              Your bet has been successfully created and your bet has been
              placed
            </p>
          </div>

          <div className="w-full rounded-lg p-3 centered bg-[#FEF8F3]">
            <p className="text-sec txt-md f-b ">Share bet with friends</p>
          </div>

          <div className="row  space-x-3">
            <h1 className="vew">View your bets</h1>

            {/* ---carret--- */}
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
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
        <div className="w-full col-center space-y-6 ">
          <Image
            src={"/icons/error.svg"}
            alt="logo"
            width={48}
            height={48}
            className="animate-pulse"
          />

          <div className="w-full space-y-2   text-center">
            <h1 className="title txt-lg f-b text-gray-900">
            Bet creation failed
            </h1>

            <p className="subtitle txt-sm f-n text-[##6B7280]">
            We couldn’t create your bet due to insufficient funds in your wallet
            </p>
          </div>

          <div className="button_group space-x-3">
            <Button text={"Cancel"} type={"button"} ghost click={handleClose} />
            <Button text={"Deposite now"} type={"button"} primary />
          </div>
        </div>
      )}
    </div>
  );
}

export default PlaceBetLoader;
