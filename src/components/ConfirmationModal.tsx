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
const Process = ({
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
    setStatus(statusConst.success);
  }

  return show ? (
    <div className="modal_overlay fixed top-0 left-0 w-full h-full bg-[#00000083] grid-center">
      <div
        ref={cardRef}
        className="modal_card relative p-12 px-8 bg-white rounded-lg shadow-soft w-[400px] min-h-[244px]"
      >
        <div className="modal_card-content w-full h-auto ">
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
          {props.context} processing...
        </h1>

        <p className="subtitle txt-sm f-n text-[##6B7280]">
          Please wait while we reset your password. This may take a few moments.
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
              {context} Successful
            </h1>

            <p className="subtitle txt-sm f-n text-[##6B7280]">
              Your funds are on the way
            </p>
          </div>

          <Button text={"Continue"} type={"button"} primary full />
        </div>
      ) : (
        <div className="w-full col-center space-y-6">
          <Image
            src={"/icons/error.svg"}
            alt="logo"
            width={48}
            height={48}
            className="animate-pulse"
          />

          <div className="w-full space-y-2   text-center">
            <h1 className="title txt-lg f-b text-gray-900">
              Withdrawal Failed
            </h1>

            <p className="subtitle txt-sm f-n text-[##6B7280]">
              We apologize for the inconvenience. Please try again
            </p>
          </div>

          <div className="button_group space-x-3">
            <Button text={"Cancel"} type={"button"} ghost />
            <Button text={"Try again"} type={"button"} primary />
          </div>
        </div>
      )}
    </div>
  );
}

export default Process;
