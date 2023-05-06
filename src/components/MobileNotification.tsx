import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useRef, ChangeEventHandler } from "react";
import Button from "./Button";
import DropDown from "./DropDown";

interface PropTypes {
  toggle: any;
  visibility: boolean;
}

const MobileNotification = ({ toggle, visibility }: PropTypes) => {

  const [showDetails, setShowDetails] = useState(false);

  function handleShowDetails() {
    setShowDetails((p) => !p);
  }

  function iconTypeHandler(type: string): string {
    switch (type) {
      case "add":
        return "/icons/notify/add.svg";

      case "money":
        return "/icons/notify/withdraw.svg";

      case "win":
        return "/icons/notify/won.svg";

      default:
        return "/icons/notify/add.svg";
    }
  }

  const notificationArray = [
    {
      header: "Withdrawal Succesful",
      type: "money",
      body: "Your funds have arrived in your bank account",
    },

    {
      header: "Bet won  🎉🎉🎉 ",
      type: "win",
      body: "Congratulations!!! You won the bet! N5000 has been sent to your wallet.",
    },

    {
      header: "You topped up your wallet",
      type: "add",
      body: "You won the bet! N5000 has been sent to your wallet.",
    },

    {
      header: "Congratulations  🎉🎉🎉 ",
      type: "win",
      body: "Congratulations!!! You won the bet! N5000 has been sent to your wallet.",
    },
    {
      header: "You topped up your wallet",
      type: "add",
      body: "You won the bet! N5000 has been sent to your wallet.",
    },

    {
      header: "Congratulations  🎉🎉🎉 ",
      type: "win",
      body: "Congratulations!!! You won the bet! N5000 has been sent to your wallet.",
    },
  ];



  return (
    visibility ? (
      <div className="betInfo overlay z-[999999999999] fixed top-0 flex items-end left-0  w-full h-full bg-[#0000005c]">
        
        
        
        <div className={`overlay_pane-mobile info_panel relative w-full fadeIn  ${visibility ? 'active' : '' }     bg-white`}>
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


{/* notification  header */}
          <div className="w-full bg-gray-50 h-[88px] middle px-2 rounded-l-xl">
            <div className="row-between w-full ">
              <div className="space-x-4 middle">
                <Image
                  src={"/icons/notify/noti_bell.svg"}
                  alt={""}
                  width={48}
                  height={48}
                />

                <h1 className="notify txt-lg f-b text-gray-700  ">
                  Notification
                </h1>
              </div>

              <p className="txt-xs f-s text-gray-500">Mark all as read</p>
            </div>
          </div>


{/* Notification list */}
          <div className="notification_list  p-4 overflow-y-scroll    custom-scrollbar">
            <div className="w-full space-y-6 ">

              {notificationArray.map((i, k) => (
                <div
                  key={k}
                  className="notification_list-item flex items-start justify-between pb-6 border-b border-gray-200"
                >
                  <div className="space-x-4   flex items-start">
                    <div className="icon_badge  relative">
                      <div className="badge w-3 h-3 bg-[#FF4B00] absolute -top-2 -right-2 rounded-full"></div>
                      <Image
                        src={iconTypeHandler(i.type)}
                        alt={""}
                        width={40}
                        height={40}
                      />
                    </div>

                    <div className="noti_text  space-y-1 ">
                      <h1 className="notify txt-sm f-b text-gray-700  ">
                        {i.header}
                      </h1>

                      <p className="txt-xs f-s text-gray-500 w-[90%]">{i.body}</p>
                  <p className="txt-xs f-m text-gray-400 w-[100px] text-left">3 min ago</p>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ) : null
  );
};

export default MobileNotification;
