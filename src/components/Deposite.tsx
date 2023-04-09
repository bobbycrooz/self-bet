import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useRef, ChangeEventHandler } from "react";
import Button from "./Button";
import DropDown from "./DropDown";
import InputField from "./InputField";
import DropdownBtn from "./DropBtn";
import Toggle from "./Toggle";
import DynamicModal from "./DynamicModal";
import ConfirmationModal from "./ConfirmationModal";

interface PropTypes {
  toggle: any;
  showNoti: boolean;
}

const statusConst = {
  success: "SUCCESS",
  failed: "FAILED",
};

const Deposite = ({ toggle, showNoti }: PropTypes) => {
  const [show, toggleShow] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState(statusConst.failed);

  function processHandler() {
    toggleShow((p) => !p);
  }

  function formHandler(e: any) {
    e.preventDefault();
    toggleShow((p) => !p);
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setStatus(statusConst.success);
    }, 5000);
  }

  const bankArray = ["Zenith", "Kuda bank", "First Bank"];

  return showNoti ? (
    <div className="betInfo overlay z-10 fixed top-0 flex justify-end left-0 strictFadeIn w-full h-full bg-[#0000005c]">
      {/* ----Notification Card---------  */}
      <div className="info_panel  relative w-[35%] h-screen bg-white rounded-l-lg">
        {/* -------cancle button-------- */}
        <div className="cancle_btn absolute -left-16 top-1/2 -translate-y-1/2">
          <Image
            src={"/icons/dashboard/cancleBtn.svg"}
            alt={""}
            width={48}
            height={48}
            onClick={toggle}
            role="button"
          />
        </div>

        {/* -----------content----------- */}

        <div className="  w-full p-8">
          {/* -----info----- */}
          <div className="w-full column">
            <Image
              src={"/icons/notify/withdraw.svg"}
              alt="logo"
              width={48}
              height={48}
              className=""
            />

            <h1 className="t-header mt-4">Deposite funds</h1>

            <p className="t-subtitle mt-2 w-[430px]">
              Quickly add funds to your wallet. Fill in the details and deposit
              with ease.
            </p>
          </div>

          {/* -------bank details */}

          <form
            action=""
            onSubmit={formHandler}
            className=" w-full space-y-6 mt-6"
          >
            <InputField type={"text"} label="Amount" place={"Enter amount"} />

            <InputField
              type={"text"}
              label="Card Number"
              place={"1234   7412   3412   3456"}
            />

            <InputField
              type={"text"}
              label="Expiry date"
              place={""}
            />

            <InputField
              type={"text"}
              label="Card Holder name"
              place={"e.g Lazy bones"}
            />

            <Button
              text={"Deposit"}
              type={"submit"}
              full
              // disabled={isLoading}
              // click={handleResetPasword}
              primary
            />
          </form>
        </div>
      </div>

      {/* ------process confirmation modal ------- */}
      <ConfirmationModal
        show={show}
        handleClose={processHandler}
        context={"Deposite"}
        isLoading={isLoading}
        toggleLoader={setIsLoading}
        status={status}
        setStatus={setStatus}
      />
    </div>
  ) : null;
};

export default Deposite;
