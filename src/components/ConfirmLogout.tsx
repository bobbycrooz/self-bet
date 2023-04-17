import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useRef, ChangeEventHandler } from "react";
import Button from "./Button";

interface ModalProps {
  show?: boolean;
  handleClose: any;
 
  isLoading: boolean;
  toggleLoader: any;

}

const statusConst = {
  success: "SUCCESS",
  failed: "FAILED",
};

// @ts-ignore
const Process = ({
  show,
  handleClose,
  isLoading,
  toggleLoader,
}: ModalProps) => {
  const cardRef = useRef(null);
  // const [status, setStatus] = useState(statusConst.failed);

  function disableScrollOnModal() {}

  function handleOutsideClick() {}

  function handler() {
    toggleLoader(false);
  }

  return show ? (
    <div className="modal_overlay fixed top-0 left-0 w-full h-full bg-[#00000083] grid-center z-50">
      <div
        ref={cardRef}
        className="modal_card relative p-12 px-8 bg-white rounded-lg shadow-soft w-[400px] min-h-[244px]"
      >
        <Prompt  handleClose={handleClose}  />
      </div>
    </div>
  ) : null;
};

// function Loading(props: any) {
//   return (
//     <div className="col-center">
//       <Image
//         src={"/icons/loader.svg"}
//         alt="logo"
//         width={48}
//         height={48}
//         className="animate-spin"
//       />

//       <div className="w-full space-y-2 mt-8 text-center">
//         <h1 className="title txt-lg f-b capitalize text-gray-900">
//           {props.context} processing...
//         </h1>

//         <p className="subtitle txt-sm f-n text-[##6B7280]">
//           Please wait while we reset your password. This may take a few moments.
//         </p>
//       </div>
//     </div>
//   );
// }

function Prompt({
  handleClose,
}: {
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

      <div className="w-full col-center space-y-6">
        <Image
          src={"/icons/dashboard/logout-red.svg"}
          alt="logo"
          width={48}
          height={48}
          className="animate-pulse"
        />

        <div className="w-full space-y-2   text-center">
          <h1 className="title txt-lg f-b text-gray-900">Log Out ?</h1>

          <p className="subtitle txt-sm f-n text-[##6B7280]">
            Are you sure you want to log out? If you proceed, you will be logged
            out of your account
          </p>
        </div>

        <div className="button_group space-x-3">
          <Button text={"Cancel"} type={"button"} ghost />

          <Link href={"/auth"}>

          <Button text={"Logout"} type={"button"}  />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Process;
