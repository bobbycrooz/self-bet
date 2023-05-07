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
import useScreen from "@/hooks/useScreen";

interface PropTypes {
  toggle: any;
  showNoti: boolean;
}

const statusConst = {
  success: "SUCCESS",
  failed: "FAILED",
};

const Withdraw = ({ toggle, showNoti }: PropTypes) => {
  const [show, toggleShow] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState(statusConst.failed);
  const {width , isMobile} = useScreen()

  function processHandler() {
    toggleShow((p) => !p);
  }

  function formHandler(e: any) {
    e.preventDefault();
    toggleShow((p) => !p);
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    setStatus(statusConst.success)

    }, 5000);
  }

  const bankArray = ["Zenith", "Kuda bank", "First Bank"];

  return showNoti ? (
  <div className="wrapper">
    {
      isMobile ? (  <div className="betInfo overlay z-[999999999999] fixed top-0 flex items-end left-0  w-full h-full bg-[#0000005c]">
      {/* ----Notification Card---------  */}
      <div className={`overlay_pane-mobile-withdraw  info_panel relative w-full fadeIn-w   ${showNoti ? 'active' : '' }  bg-white`}>
        {/* -------cancle button-------- */}
          <div
           
            className="cancle_btn absolute left-1/2 -top-16 -translate-x-1/2"
          >
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

            <h1 className="t-header mt-4">Withdraw</h1>

            <p className="t-subtitle mt-2">
              Please provide your bank details below
            </p>
          </div>

          {/* -------bank details */}

          <form
            action=""
            onSubmit={formHandler}
            className=" w-full space-y-6 mt-6"
          >
            <div className="bank_list">
              <h1 className="header">Bank</h1>

              <DropdownBtn type={"custom"} title={"bank"} lists={bankArray} show={false} toggleShow={undefined} />
            </div>

            <InputField
              type={"text"}
              label="Account Number"
              place={"2118718321"}
            />

            <InputField type={"text"} label="Amount" place={"5000"} />

            <Toggle text="Save account" />

            <Button
              text={"Proceed"}
              type={"submit"}
              full
              // disabled={isLoading}
              // click={handleResetPasword}
              primary
            />
          </form>
        </div>
      </div>

      
      <ConfirmationModal
        show={show}
        handleClose={processHandler}
        context={"withdrawal"}
        isLoading={isLoading}
        toggleLoader={setIsLoading}
        status={status}
        setStatus={setStatus}
      />
    </div>) : (  <div className="betInfo overlay z-10 fixed top-0 flex justify-end left-0 strictFadeIn w-full h-full bg-[#0000005c]">
      {/* ----Notification Card---------  */}
      <div className="info_panel slideInLeft  relative w-[35%] h-screen bg-white rounded-l-lg">
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

            <h1 className="t-header mt-4">Withdraw</h1>

            <p className="t-subtitle mt-2">
              Please provide your bank details below
            </p>
          </div>

          {/* -------bank details */}

          <form
            action=""
            onSubmit={formHandler}
            className=" w-full space-y-6 mt-6"
          >
            <div className="bank_list">
              <h1 className="header">Bank</h1>

              <DropdownBtn type={"custom"} title={"bank"} lists={bankArray} show={false} toggleShow={undefined} />
            </div>

            <InputField
              type={"text"}
              label="Account Number"
              place={"2118718321"}
            />

            <InputField type={"text"} label="Amount" place={"5000"} />

            <Toggle text="Save account" />

            <Button
              text={"Proceed"}
              type={"submit"}
              full
              // disabled={isLoading}
              // click={handleResetPasword}
              primary
            />
          </form>
        </div>
      </div>
      <ConfirmationModal
        show={show}
        handleClose={processHandler}
        context={"withdrawal"}
        isLoading={isLoading}
        toggleLoader={setIsLoading}
        status={status}
        setStatus={setStatus}
      />
    </div>)
    }
  </div>
  ) : null;
};

export default Withdraw;
