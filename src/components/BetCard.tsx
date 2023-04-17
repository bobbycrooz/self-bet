import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useRef, ChangeEventHandler } from "react";
import Button from "./Button";
import DropDown from "./DropDown";

interface PropTypes {
  betType: "KOLO" | "POINT" | undefined;
}

const tabMode = {
  MATCHES: "MATCHES",
  BET: "BET",
  CREATOR: "CREATOR",
};

export const betCardType = {
  POINT: "POINT",
  KOLO: "KOLO",
};
// const tabs = ["Matches", "Bet conditions", "Creator’s Bet"];

const tabs = [
  {
    name: "Matches",
    badge: "9",
    tabMode: tabMode.MATCHES,
  },

  {
    name: "Bet conditions",
    badge: "9",
    tabMode: tabMode.BET,
  },

  {
    name: "Creator’s Bet",
    tabMode: tabMode.CREATOR,
  },
];

const BetCard = ({ betType }: PropTypes) => {



  const [showDetails, setShowDetails] = useState<{
    show: boolean;
    mode: string | undefined;
  }>({
    show: false,
    mode: betType,
  });
  const [betTabMode, setBetTabMode] = useState(tabMode.CREATOR);

  function handleShowDetails(cardType?: "KOLO" | "POINT") {
    if (showDetails.show) {
      setShowDetails({
        ...showDetails,
        show: false,
      });
    } else {
      setShowDetails({
        ...showDetails,
        show: true,
        mode: cardType,
      });
    }
  }

  function tabModeHandler() {
    switch (betTabMode) {
      case tabMode.MATCHES:
        return <Matches />;
      case tabMode.BET:
        return <Bets />;
      case tabMode.CREATOR:
        return <Creator />; 
      default:
        break;
    }
  }



  return (
    <>
      <div
        role="button"
        onClick={() => handleShowDetails(betType)}
        className="bet_card shadow-bet-card bg-white border border-gray-200 rounded-lg "
      >
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
              {showDetails.mode == betCardType.KOLO ? (
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
      {showDetails.show && (
        <div className="betInfo overlay z-10 fixed top-0 flex justify-end left-0 strictFadeIn w-full h-full bg-[#0000005c]">
          <div className="info_panel slideInLeft  relative w-[50%] h-screen bg-white">
            {/*  */}
            <div
              role="button"
              onClick={() => handleShowDetails()}
              className="cancle_btn absolute -left-16 top-1/2 -translate-y-1/2"
            >
              <Image
                src={"/icons/dashboard/cancleBtn.svg"}
                alt={""}
                width={48}
                height={48}
              />
            </div>

            {/* --------bet type details---------- */}
            <div className="content relative overflow-y-scroll custom-scrollbar h-screen">
              <div className="h-auto">
                {/*  */}
                <div className="panel_content p-12 space-y-6  w-full">
                  <div className="bet_banner w-full h-[192px] relative">
                    {showDetails.mode === betCardType.KOLO ? (
                      <Image
                        src={"/images/home/kolo_banner.png"}
                        alt={""}
                        fill
                        className="r"
                        // width={300}
                        // height={128}
                      />
                    ) : (
                      <Image
                        src={"/images/home/point_banner.png"}
                        alt={""}
                        fill
                        className="r"
                        // width={300}
                        // height={128}
                      />
                    )}
                  </div>
                  {/* -----------second badge row-------- */}
                  <div className="badge_container row-between ">
                    <div className="col">
                      <div className="row-between ">
                        {showDetails.mode === betCardType.KOLO  ? (
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
                      <Link href={"/dashboard/create-bet/bet-details"}><Button text={"Join bet"} type={"button"} primary /></Link>
                    </div>
                  </div>
                  {/*  --------action tab row*/}
                  <div className="active_tab w-full  h-[30px] mt-8 border-b middle space-x-3">
                    {tabs.map((i, k) => (
                      <div
                        role="button"
                        onClick={() => setBetTabMode(i.tabMode)}
                        className={`tab_item px-3 hover:text-gray-700 hover:border-gray-200 border-b-2 space-x-2 ${
                          betTabMode == i.tabMode
                            ? "text-gray-700 border-gray-700  "
                            : "border-transparent text-gry-500"
                        } h-full middle`}
                        key={k}
                      >
                        <p className={`txt-sm  f-m`}> {i.name}</p>{" "}
                        {i.badge && (
                          <p className="rounded bg-gray-600 px-2 p-[2px] text-white txt-xs f-m">
                            {i.badge}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                  {/* ------be list --------for each tab */}
                  <div className="det_details   grid grid-cols-2 gap-6">
                    {tabModeHandler()}
                  </div>
                  {/*  */}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

function Matches() {
  return (
    <>
      {/* --team  display baner---- */}
      {Array(9)
        .fill(1)
        .map((i, k) => (
          <div
            key={k}
            className="teams_display middle  justify-around border border-gray-200 rounded-lg p-6 "
          >
            <div className="team_caard team_caard col-center space-y-2">
              <Image
                className="team_logo "
                src={"/icons/teams/chealse_logo.svg"}
                alt="chealse"
                width={48}
                height={48}
              />
              <h1 className="team_name txt-xs f-s text-gray-600">Chelsea</h1>
            </div>

            <div className="event_time txt-xs text-center space-y-1 f-m text-gray-400">
              <h1 className="">Sat, 3 Dec</h1>
              <h1 className="bg-gray-50 txt-xs f-s rounded-lg px-4 p-1 text-gray-500">
                8:30
              </h1>
            </div>

            <div className="team_caard col-center  space-y-2">
              <Image
                className="team_logo "
                src={"/icons/teams/lei_logo.svg"}
                alt="chealse"
                width={48}
                height={48}
              />
              <h1 className="team_name txt-xs f-s text-gray-600">
                Leicester C
              </h1>
            </div>
          </div>
        ))}
    </>
  );
}




function Bets() {
  
  return (
    <>
      <div className="teams_display border border-gray-200 rounded-lg px-4 p-5 ">
        <div className="  space-x-4 items-start flex">
          <Image
            className="team_logo "
            src={"/icons/green_ball.svg"}
            alt="chealse"
            width={48}
            height={48}
          />
          <div className="texts">
            <h1 className="team_name txt-sm f-b text-gray-700">
              Home team / Away team / Draw
            </h1>
            <p className="team_name txt-sm  text-gray-600">
              Predict who wins or draws
            </p>
          </div>
        </div>
      </div>

      <div className="teams_display border border-gray-200 rounded-lg px-4 p-5 ">
        <div className="  space-x-4 items-start flex">
          <Image
            className="team_logo "
            src={"/icons/red_ball.svg"}
            alt="chealse"
            width={48}
            height={48}
          />
          <div className="texts">
            <h1 className="team_name txt-sm f-b text-gray-700">
              Home team / Away team / Draw
            </h1>
            <p className="team_name txt-sm  text-gray-600">
              Predict who wins or draws
            </p>
          </div>
        </div>
      </div>

      {/* ---- */}
      <div className="teams_display border border-gray-200 rounded-lg px-4 p-5 ">
        <div className="  space-x-4 items-start flex">
          <Image
            className="team_logo "
            src={"/icons/blue_ball.svg"}
            alt="chealse"
            width={48}
            height={48}
          />
          <div className="texts">
            <h1 className="team_name txt-sm f-b text-gray-700">
              Home team / Away team / Draw
            </h1>
            <p className="team_name txt-sm  text-gray-600">
              Predict who wins or draws
            </p>
          </div>
        </div>
      </div>

      {/* ---- */}
      <div className="teams_display border border-gray-200 rounded-lg px-4 p-5 ">
        <div className="  space-x-4 items-start flex">
          <Image
            className="team_logo "
            src={"/icons/cyan_ball.svg"}
            alt="chealse"
            width={48}
            height={48}
          />
          <div className="texts">
            <h1 className="team_name txt-sm f-b text-gray-700">
              Home team / Away team / Draw
            </h1>
            <p className="team_name txt-sm  text-gray-600">
              Predict who wins or draws
            </p>
          </div>
        </div>
      </div>
    </>
  );
}



function Creator() {
  return (
    <>
      {/* --team  display baner---- */}
      {Array(9)
        .fill(1)
        .map((i, k) => (
          <div
            key={k}
            className="creators_card border-gray-200 rounded-lg shadow-md"
          >
            {/* header */}
            <div className="h-12 w-full relative header middle ">
              <h1 className="header_text txt-sm f-b text-gray-50 p-4">
                Chelsea - Arsenal
              </h1>
            </div>

            <div className=" options w-full">
              {Array(4)
                .fill(10)
                .map((i, k) => (
                  <div key={k} className="middle   px-6  ">
                    <div className=" w-full border-b border-dashed py-4 space-x-4 flex">
                      <Image
                        className="team_logo "
                        src={"/icons/ball.svg"}
                        alt="chealse"
                        width={24}
                        height={32}
                      />
                      <div className="texts w-full">
                        <div className="row-between w-full">
                          <h1 className="team_name txt-sm f-b text-gray-900">
                            GG HT
                          </h1>

                          <h1 className="team_name txt-sm f-b text-gray-900">
                            2.45
                          </h1>
                        </div>
                        <p className="team_name txt-xs f-s  text-gray-300">
                          GG/NG HT/ST
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
    </>
  );
}



export default BetCard;
