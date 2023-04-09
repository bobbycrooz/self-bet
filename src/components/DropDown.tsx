import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useRef, ChangeEventHandler } from "react";
import Button from "./Button";

interface PropTypes {
  conditionType: "sw" | "dc";
}

const tabs = ["Bet Details", "Creator’s Bet"];

const DropDown = ({ conditionType }: PropTypes) => {
  const [isOpen, setIsOpen] = useState(false);

  function handleBtn() {
    setIsOpen((p) => !p);
  }

  if (conditionType === "dc") {
    return (
      <div className="dropdown">
        <div
          role="button"
          onClick={handleBtn}
          className={`dropdown_btn px-6 p-4 row-between border  border-gray-100 rounded-t-lg`}
        >
          <h1 className="bet_condition_name txt-sm f-b gray-700">
            Double Chance
          </h1>
          <Image
            src={"/icons/dashboard/down.svg"}
            alt="wallet"
            width={20}
            height={20}
            role="button"
            className={` carret ${isOpen && "active"} transition-transform`}
          />
        </div>

        {isOpen && (
          <div className="dropdown_body transform w-full border-gray-100  p-4 grid grid-cols-3 gap-2 border-x border-b rounded-b">
            <BetBtn text={"1x"} />
            <BetBtn text={"1/2"} />
            <BetBtn text={"2x"} />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="dropdown">
      <div
        role="button"
        onClick={handleBtn}
        className={`dropdown_btn px-6 p-4 row-between border  border-gray-100 rounded-t-lg`}
      >
        <h1 className="bet_condition_name txt-sm f-b gray-700">1/2</h1>
        <Image
          src={"/icons/dashboard/down.svg"}
          alt="wallet"
          width={20}
          height={20}
          role="button"
          className={` carret ${isOpen && "active"} transition-transform`}
        />
      </div>

      {isOpen && (
        <div className="dropdown_body transform w-full border-gray-100  p-4 grid grid-cols-3 gap-2 border-x border-b rounded-b">
          <BetBtn text={"home"} />
          <BetBtn text={"draw"} />
          <BetBtn text={"away"} />
        </div>
      )}
    </div>
  );
};

function BetBtn({
  text,
  setValue,
  active,
}: {
  active?: boolean;
  text: string;
  setValue?: any;
}) {
  return (
    <button
      onClick={() => setValue(String(text))}
      className={`betBtn hover:bg-gray-700 transition-colors ${active && "bg-gray-700 text-white"} hover:text-white rounded-lg bg-gray-50 p-2 px-8 capitalize txt-sm f-m gray-700`}
    >
      {text || "home"}
    </button>
  );
}

export default DropDown;
