import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useRef, ChangeEventHandler } from "react";
import Button from "./Button";
import DropDown from "./DropDown";

interface PropTypes {
  toggle: any;
  showNoti: boolean;
}

const Notification = ({ toggle, showNoti }: PropTypes) => {

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
    showNoti ? (
      <div className="betInfo overlay z-10 fixed top-0 flex justify-end left-0 strictFadeIn w-full h-full bg-[#0000005c]">
        <div className="info_panel  relative w-[40%] h-screen bg-white rounded-l-lg">
          <div
           
            className="cancle_btn absolute -left-16 top-1/2 -translate-y-1/2"
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

          <div className="w-full bg-gray-50 h-[88px] middle px-8 rounded-l-xl">
            <div className="row-between w-full ">
              <div className="space-x-4 middle">
                <Image
                  src={"/icons/notify/noti_bell.svg"}
                  alt={""}
                  width={48}
                  height={48}
                />

                <h1 className="notify txt-xl f-b text-gray-700  ">
                  Notification
                </h1>
              </div>

              <p className="txt-sm f-s text-gray-500">Mark all as read</p>
            </div>
          </div>

          <div className="notification_list p-11 overflow-y-scroll  ">
            <div className="w-full space-y-6 ">
              {notificationArray.map((i, k) => (
                <div
                  key={k}
                  className="notification_list-item flex items-start justify-between pb-6 border-b border-gray-200"
                >
                  <div className="space-x-6  flex items-start">
                    <div className="icon_badge relative">
                      <div className="badge w-3 h-3 bg-[#FF4B00] absolute -top-2 -left-2 rounded-full"></div>
                      <Image
                        src={iconTypeHandler(i.type)}
                        alt={""}
                        width={48}
                        height={48}
                      />
                    </div>

                    <div className="noti_text space-y-3">
                      <h1 className="notify txt-xl f-b text-gray-700  ">
                        {i.header}
                      </h1>

                      <p className="txt-sm f-s text-gray-500">{i.body}</p>
                    </div>
                  </div>

                  <p className="txt-xs f-m text-gray-400 w-[100px] text-right">3 min ago</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ) : null
  );
};

export default Notification;
