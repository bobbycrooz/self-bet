import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useRef, ChangeEventHandler } from "react";
import Button from "./Button";
import DropDown from "./DropDown";

interface PropTypes {
  betType: string;
}

const tabs = ["Bet Details", "Creator’s Bet"];
const BetCard = ({ betType }: PropTypes) => {
  const [showDetails, setShowDetails] = useState(false);

  function handleShowDetails() {
    setShowDetails((p) => !p);
  }
  return (
    <>
      <div role="button" onClick={handleShowDetails} className="bet_card shadow-bet-card bg-white border border-gray-200 rounded-lg ">
        <div className="p-6 space-y-4">
          <div className="bet_banner w-full h-32 relative">
            <Image
              src={"/images/home/bet_banner-1.png"}
              alt={""}
              fill
              // width={300}
              // height={128}
            />
          </div>

          <div className="badge_container space-y-2 tex">
            <div className="row-between">
              {betType === "kolo" ? (
                <div className="badge uppercase p-2 w-[76px] bg-cyan-50 rounded txt-xs f-b text-cyan-600">
                  KOLO bet
                </div>
              ) : (
                <div className="badge uppercase p-2 w-[80px] bg-yellow-100 rounded txt-xs f-b text-yellow-600">
                  point bet
                </div>
              )}

              <Image
                src={"/icons/dots.svg"}
                alt={""}
                width={24}
                height={24}
                className="dots"
              />
            </div>

            <h1 className="bet_name txt-lg f-eb text-gray-600">
              Battle of best banterers
            </h1>
          </div>

          <div className="author row-between">
            <h1 className="name txt-xs f-m text-gray-400">
              By <span className="f-b text-gray-600">Peter Zokoro</span>
            </h1>

            <div className="amounts middle space-x-2">
              <div className="">
                <h1 className="off txt-xs f-s text-gray-500">10% off</h1>
                <h1 className="off txt-xs  text-gray-300 ">/₦5000</h1>
              </div>

              <h1 className="stake text-gray-500 txt-xl f-b">₦4500</h1>
            </div>
          </div>
        </div>

        <footer className="card_footer row-center w-full rounded-b h-20 bg-gray-100 p-6">
          <div className="row-between  w-full">
            <h1 className="name txt-xs f-m text-gray-400">
              <span className="f-b text-gray-700">18</span> Players
            </h1>

            {!true ? (
              <h1 className="name txt-md f-m text-gray-400">
                Payout: <span className="f-s text-gray-700">N500</span>
              </h1>
            ) : (
              <div
                role="button"
                className="join capitalize border border-gray-300 rounded-lg px-2 p-1 txt-md f-s text-gray-700"
              >
                <p> Join now</p>
              </div>
            )}
          </div>
        </footer>
      </div>

      {/* bet side bar  */}
      {showDetails && (
        <div className="betInfo overlay z-10 fixed top-0 flex justify-end left-0 strictFadeIn w-full h-full bg-[#0000005c]">
          <div className="info_panel  relative w-[50%] h-screen bg-white">
            {/*  */}
            <div
              role="button"
              onClick={handleShowDetails}
              className="cancle_btn absolute -left-16 top-1/2 -translate-y-1/2"
            >
              <Image
                src={"/icons/dashboard/cancleBtn.svg"}
                alt={""}
                width={48}
                height={48}
              />
            </div>

            <div className="content relative overflow-y-scroll  h-screen">
              <div className="h-auto">
                {/*  */}
                <div className="panel_content p-12 space-y-6  w-full">
                  <div className="bet_banner w-full h-[192px] relative">
                    <Image
                      src={"/images/home/kolo_banner.png"}
                      alt={""}
                      fill
                      className="r"
                      // width={300}
                      // height={128}
                    />
                  </div>
                  {/*  */}
                  <div className="badge_container row-between ">
                    <div className="col">
                      <div className="row-between ">
                        {betType === "kolo" ? (
                          <div className="badge uppercase p-2 w-[76px] bg-cyan-50 rounded txt-xs f-b text-cyan-600">
                            KOLO bet
                          </div>
                        ) : (
                          <div className="badge uppercase p-2 w-[80px] bg-yellow-100 rounded txt-xs f-b text-yellow-600">
                            point bet
                          </div>
                        )}
                      </div>

                      <h1 className="bet_name txt-lg f-eb text-gray-600">
                        Battle of best banterers
                      </h1>

                      <Image
                        src={"/images/home/users.png"}
                        alt={""}
                        className="mt-4"
                        width={144}
                        height={24}
                      />
                    </div>

                    <div className="col">
                      <h1 className="amount text-gray-400 txt-xs f-b">
                        bet amount
                      </h1>
                      <h1 className="txt-md f-b text-gray-700 mt-2 mb-4">
                        N5000
                      </h1>
                      <Button text={"Join bet"} type={"button"} primary />
                    </div>
                  </div>
                  {/*  */}
                  <div className="active_tab w-full  h-[30px] mt-8 border-b middle space-x-3">
                    {tabs.map((i, k) => (
                      <div
                        className={`tab_item px-3 hover:text-gray-700 hover:border-gray-700 border-b-2  ${
                          k == 0
                            ? "text-gray-700 border-gray-700  "
                            : "border-transparent text-gry-500"
                        } h-full middle`}
                        key={k}
                      >
                        <p className={`txt-sm  f-m`}> {i}</p>
                      </div>
                    ))}
                  </div>
                  {/*  */}
                  <div className="det_details space-y-6">
                    <div className="teams_display middle justify-around border border-gray-100 rounded-lg p-6 shadow-light">
                      <div className="team_caard team_caard col-center space-y-2">
                        <Image
                          className="team_logo "
                          src={"/icons/teams/chealse_logo.svg"}
                          alt="chealse"
                          width={48}
                          height={48}
                        />
                        <h1 className="team_name txt-sm f-b text-gray-600">
                          Chelsea
                        </h1>
                      </div>

                      <div className="event_time txt-xs text-center space-y-1 f-m text-gray-400">
                        <h1 className="">8:30</h1>
                        <h1 className="">Sat, 3 Dec</h1>
                      </div>

                      <div className="team_caard col-center  space-y-2">
                        <Image
                          className="team_logo "
                          src={"/icons/teams/lei_logo.svg"}
                          alt="chealse"
                          width={48}
                          height={48}
                        />
                        <h1 className="team_name txt-sm f-b text-gray-600">
                          Leicester C
                        </h1>
                      </div>
                    </div>
                  </div>
                  {/*  */}
                  <div className="w-full bet_conditions gap-2 grid grid-cols-2">
                    <DropDown conditionType={"sw"} />
                    <DropDown conditionType={"sw"} />
                    <DropDown conditionType={"sw"} />
                    <DropDown conditionType={"dc"} />
                    <DropDown conditionType={"sw"} />
                    <DropDown conditionType={"dc"} />
                  </div>

                  <div className="w-full bet_conditions gap-2 grid grid-cols-2">
                    <DropDown conditionType={"sw"} />
                    <DropDown conditionType={"sw"} />
                    <DropDown conditionType={"sw"} />
                    <DropDown conditionType={"dc"} />
                    <DropDown conditionType={"sw"} />
                    <DropDown conditionType={"dc"} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BetCard;
