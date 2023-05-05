import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useRef, ChangeEventHandler } from "react";

interface ModalProps {
  cardContent?: JSX.Element;
}

// @ts-ignore
const DynamicModal = ({ cardContent }: ModalProps) => {
  const cardRef = useRef(null);

  function disableScrollOnModal() {}

  function handleOutsideClick() {}

  return (
    <div className="modal_overlay fixed top-0 left-0 w-full h-full bg-[#00000083] grid-center">
      <div
        ref={cardRef}
        className="modal_card p-12 px-8 bg-white rounded-lg shadow-soft mx-auto w-[90%] md:w-[400px] min-h-[244px]"
      >
        <div className="modal_card-content w-full h-auto ">
          {cardContent || DefaultModalContent()}
        </div>
      </div>
    </div>
  );
};

function DefaultModalContent() {
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
        <h1 className="title txt-lg f-b text-gray-900">Resetting Password...</h1>

        <p className="subtitle txt-sm f-n text-[##6B7280]">
          Please wait while we reset your password. This may take a few moments.
        </p>
      </div>
    </div>
  );
}

export default DynamicModal;
