import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import {
  AddCondition,
  BetCard,
  Button,
  DropDown,
  InputField,
  Toggle,
  Notification,
} from "@components";
import { ReactElement, useEffect, useState } from "react";
import { useRouter } from "next/router";
import DashboardLayout from "@/layouts";
import { MoreSvg } from "@/assets";
// import { NextPageWithLayout } from "../_app";

function Home() {
  const [loginMode, setLoginMode] = useState(true);
  const [step, setStep] = useState(1);
  const { push, query, pathname } = useRouter();
  const [isAdding, setIsAdding] = useState<boolean>(false);

  function handleAddCondition() {
    setIsAdding((p) => !p);
  }

  // handlers--------------
  function handleAuthMode() {
    setLoginMode((p) => !p);
    window?.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }

  function next() {
    if (step === 4) {
      return push("/dashboard/create-bet/bet-details");
    }

    if (step > 1) setStep(step + 1);
  }

  function prev() {
    if (step > 1) setStep(step - 1);
  }

  function stepHandler(to: number) {
    setStep(to);
  }

  function handleBetCreationStep(step: number) {
    switch (step) {
      case 1:
        return <CreateBet stepHandler={stepHandler} />;

      case 2:
        return <SelectMatch />;

      case 3:
        return (
          <BetCondition
            isAdding={isAdding}
            handleAddCondition={handleAddCondition}
          />
        );

      case 4:
        return <BetDetails />;

      default:
        return <CreateBet stepHandler={stepHandler} />;
    }
  }

  function handleProgressBar(step: number) {
    switch (step) {
      case 2:
        return 25 + "%";

      case 3:
        return 50 + "%";

      case 4:
        return 75 + "%";

      case 5:
        return 100 + "%";

      default:
        return "0";
    }
  }
  console.log(handleProgressBar(step), "the progress bar");

  // useEffects -------------
  useEffect(() => {
    if (query.login) {
      setLoginMode(true);
    }
  }, [pathname, query.login]);

  return (
    <>
      <Head>
        <title>Create bet</title>
        <meta name="description" content="welcome to selfbet home" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="dashboard_create bg-white w-full h-auto p-8 space-y-6">
        <h1 className="t-header1 w-full text-left pb-[13px] border-b">
          Create new bet
        </h1>

        <div className="bet_type-select dashboard_create-inner relative inner_shadow space-y-8 p-8  rounded-lg">
          {handleBetCreationStep(step)}

          {step >= 2 && (
            <div className=" absolute bottom-0 left-0 w-full">
              <div className="bar w-full h-1 bg-gray-50 transition-all">
                <div
                  style={{ width: `${handleProgressBar(step)}` }}
                  className={`progress bg-gray-500 h-full transition-all`}
                ></div>
              </div>

              <div className="progress_bar row-between w-full px-8 p-4 bg-gray-50 h-[84px] inner_shadow border-t-0  ">
                <div
                  role="button"
                  onClick={prev}
                  className="back capitalize middle space-x-3 px-4 p-3 "
                >
                  <Image
                    className=""
                    src={"/images/create/arrow-left.svg"}
                    alt="arrow"
                    width={16}
                    height={16}
                  />
                  <p className="t-header1">back</p>
                </div>

                <div className="match_count capitalize t-headerb7">
                  Match Selected
                </div>

                <Button
                  text={step !== 4 ? "Proceed" : "Proceed to placing bet"}
                  type={"button"}
                  primary
                  click={next}
                />
              </div>
            </div>
          )}
        </div>
      </main>
      {/* ---Add new bet condition */}
      <AddCondition toggle={handleAddCondition} showNoti={isAdding} />
    </>
  );
}
Home.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

function CreateBet({ stepHandler }: { stepHandler: any }) {
  const fetures = [
    "Create custom bets on a “single” match ",
    "Unlimited number of participants",
    "Winner takes all regardless of number of participants",
  ];

  const point = [
    "Create custom bets on “multiple” matches ",
    "Unlimited number of participants",
    "The person(s) with highest points wins",
  ];

  return (
    <>
      <div className="details">
        <h1 className="display-xs f-b text-gray-900">Select Bet Type</h1>

        <p className="subtitle">Please select your desired bet below</p>
      </div>

      {/* card--types */}
      <div className="bet_types grid grid-cols-2 gap-8">
        {/* ----kolo banner */}
        <div className=" w-full h-[520px] relative rounded-lg ">
          <Image
            src={"/images/create/kolo_banner.png"}
            alt={""}
            fill
            className="rounded-lg"
          />
          {/* ---bet overlay */}
          <div className="absolute w-full h-full linear_g-bet top-0 left-0 p-12 flex items-end pb-24 rounded-lg">
            <div className="content w-full space-y-4">
              <div className="row-between">
                <h1 className="display-md f-b text-gray-50 capitalize">
                  Kolo Bet
                </h1>
                <Image
                  src={"/images/create/arrow.svg"}
                  alt={""}
                  width={48}
                  height={48}
                  role="button"
                  onClick={() => stepHandler(2)}
                />
              </div>

              <hr className="border-gray-400" />

              <div className="checks  space-y-1">
                {fetures.map((i, k) => (
                  <div key={k} className="check-item row  space-x-2">
                    <Image
                      src={"/icons/check-circle.svg"}
                      alt="logo"
                      width={16}
                      height={16}
                      className=""
                    />
                    <h4 className="txt-md f-m text-gray-400">{i}</h4>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* -----Ponit banner------ */}
        <div className=" w-full rounded-lg h-[520px] relative ">
          <Image
            src={"/images/create/point_banner.png"}
            alt={""}
            fill
            className=" rounded-lg"
          />
          <div className="absolute w-full h-full linear_g-bet top-0 left-0 p-12 rounded-lg flex items-end pb-24">
            <div className="content w-full space-y-4">
              <div className="row-between">
                <h1 className="display-md f-b text-gray-50 capitalize">
                  Point Bet
                </h1>
                <Image
                  src={"/images/create/arrow.svg"}
                  alt={""}
                  width={48}
                  height={48}
                  className=" rounded-lg"
                  onClick={() => stepHandler(2)}
                  role="button"
                />
              </div>

              <hr className="border-gray-400" />

              <div className="checks  space-y-1">
                {point.map((i, k) => (
                  <div key={k} className="check-item row  space-x-2">
                    <Image
                      src={"/icons/check-circle.svg"}
                      alt="logo"
                      width={16}
                      height={16}
                      className=""
                    />
                    <h4 className="txt-md f-m text-gray-400">{i}</h4>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function SelectMatch() {
  const [searchMode, setSearchMode] = useState({
    team: false,
    name: false,
    league: false,
    percent: false,
    range: false,
  });

  const fetures = [
    "Create custom bets on a “single” match ",
    "Unlimited number of participants",
    "Winner takes all regardless of number of participants",
  ];

  const nav = [
    "All aleague",
    "Premier League",
    "la liga",
    "Seria A",
    "bundes liga",
  ];

  return (
    <>
      <div className="details">
        <h1 className="display-xs f-b text-gray-900">Select Match</h1>

        <p className="subtitle">Please select your desired match below</p>
      </div>

      {/* ----------- */}
      <div className="filter_tab w-full row-between">
        <DropDown
          type={"byTeam"}
          lists={[]}
          title={"All matches"}
          show={searchMode.team}
          toggleShow={setSearchMode}
        />

        <div className="nav middle txt-sm text-gray-500">
          {nav.map((i, k) => (
            <div
              key={k}
              className="nav_item p-[10px] px-3 hover:bg-gray-50  f-m hover:f-b  rounded-lg hover:text-gray-700"
            >
              {i}
            </div>
          ))}
        </div>

        <div className="filter_btn middle space-x-4 p-[10px] px-3 rounded-lg border border-gray-100">
          <Image
            src={"/images/create/filter.svg"}
            alt={""}
            width={16}
            height={16}
          />

          <p className="txt-sm f-m text-gray-500">Filter</p>
        </div>
      </div>

      {/* ------------------ */}

      <div className="w-full  h-[450px] overflow-y-scroll custom-scrollbar pb-[84px]">
        <div className="matched w-full h-auto grid grid-cols-3 gap-6">
          {/* --team  display baner---- */}
          {Array(16)
            .fill(1)
            .map((i, k) => (
              <div
                key={k}
                className="teams_display_matches middle hover:border-gray-500 shadow-bet-card hover:shadow-none relative justify-around border border-gray-200 rounded-lg p-6 "
              >
                <div className="team_caard team_caard col-center space-y-2">
                  <Image
                    className="team_logo "
                    src={"/icons/teams/chealse_logo.svg"}
                    alt="chealse"
                    width={48}
                    height={48}
                  />
                  <h1 className="team_name txt-xs f-s text-gray-600">
                    Chelsea
                  </h1>
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

                <Image
                  className="selector  absolute right-0 top-0"
                  src={"/images/create/selector.svg"}
                  alt="chealse"
                  width={32}
                  height={32}
                />
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

function BetCondition({
  handleAddCondition,
  isAdding,
}: {
  handleAddCondition: any;
  isAdding: boolean;
}) {
  return (
    <>
      <div className="row-between">
        <div className="details">
          <h1 className="display-xs f-b text-gray-900">Select Match</h1>

          <p className="subtitle">Please select your desired match below</p>
        </div>

        {/* ----search----- */}
        <div
          role="button"
          // onClick={searchToggle}
          className="search_container relative bg-gray-50 rounded-lg w-[424px] h-12"
        >
          <Image
            src={"/icons/dashboard/search.svg"}
            alt="logo"
            width={20}
            height={20}
            className=" absolute top-1/2 -translate-y-1/2 left-2 txt-sm f-m text-gray-400"
          />

          <input
            type="text"
            name=""
            id=""
            className="bg-transparent w-full  h-full pl-9 outline-none"
            placeholder="Search bet conditions"
          />
        </div>
      </div>

      {/* ----------- */}

      {/* ------------------ */}

      <div className="w-full  h-[450px] overflow-y-scroll pb-[84px] custom-scrollbar">
        <div className="condition w-full h-auto grid grid-cols-3 gap-6">
          {/* --------- */}
          <div className="teams_display border border-gray-200 rounded-lg px-4 p-5 hover:shadow-bet-card">
            <div className="  space-x-4 items-start flex">
              <Image
                className="team_logo "
                src={"/icons/green_ball.svg"}
                alt="chealse"
                width={48}
                height={48}
              />
              <div className="texts ">
                <h1 className="team_name txt-md f-m text-gray-500">
                  Home team / Away team / Draw
                </h1>
              </div>

              <MoreSvg />
            </div>
          </div>

          <div className="teams_display border border-gray-200 rounded-lg px-4 p-5 hover:shadow-bet-card">
            <div className="  space-x-4 items-start flex">
              <Image
                className="team_logo "
                src={"/icons/red_ball.svg"}
                alt="chealse"
                width={48}
                height={48}
              />
              <div className="texts ">
                <h1 className="team_name txt-md f-m text-gray-500">
                  Home team / Away team / Draw
                </h1>
              </div>

              <MoreSvg />
            </div>
          </div>

          {/* ---- */}
          <div className="teams_display border border-gray-200 rounded-lg px-4 p-5 hover:shadow-bet-card ">
            <div className="  space-x-4 items-start flex">
              <Image
                className="team_logo "
                src={"/icons/blue_ball.svg"}
                alt="chealse"
                width={48}
                height={48}
              />
                <div className="texts ">
                <h1 className="team_name txt-md f-m text-gray-500">
                  Home team / Away team / Draw
                </h1>
              </div>

              <MoreSvg />
            </div>
          </div>

          {/* ---- */}
          <div className="teams_display border border-gray-200 rounded-lg px-4 p-5 hover:shadow-bet-card">
            <div className="  space-x-4 items-start flex">
              <Image
                className="team_logo "
                src={"/icons/cyan_ball.svg"}
                alt="chealse"
                width={48}
                height={48}
              />
              <div className="texts ">
                <h1 className="team_name txt-md f-m text-gray-500">
                  Home team / Away team / Draw
                </h1>
              </div>

              <MoreSvg />
            </div>
          </div>
          {/* --------- */}
          <div
            role="button"
            onClick={handleAddCondition}
            className="centered  border border-gray-200 rounded-lg px-4 p-5 hover:shadow-bet-card"
          >
            <div className="space-x-4 middle">
              <Image
                className="team_logo "
                src={"/images/create/add.svg"}
                alt="chealse"
                width={24}
                height={24}
              />

              <p className="team_name txt-sm f-m  text-gray-600">
                Add bet condition
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function BetDetails() {
  return (
    <>
      <div className="w-full  h-[600px] overflow-y-scroll custom-scrollbar pb-12">
        <h1 className="t-header w-full text-left ">Bet details</h1>

        {/* ------row one */}
        <div className="details_row flex items-start space-x-[160px] mt-6">
          <h1 className="txt-md f-s text-gray-600  text-left ">
            Specify bet details
          </h1>

          <div className="details_column space-y-6">
            <div className="space-y-1">
              <InputField
                label={"Betname"}
                type={"text"}
                value={"SelfBet3342"}
              />
              <p className="txt-sm text-gray-400">
                You can change this if you want
              </p>
            </div>
            {/* ------ */}
            <div className="space-y-1">
              <InputField label={"Bet Amount"} type={"text"} value={"N5000"} />

              <div className="middle space-x-2">
                <SvgElement />
                <p className="txt-sm text-gray-400">
                  Every participant will stake this amount
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ---------row two */}
        <div className="details_row flex items-start space-x-[160px] mt-12">
          <h1 className="txt-md f-s text-gray-600  text-left ">
            Bet image (Optional)
          </h1>

          <div className="details_column">
            <div className="space-y-1">
              <h1 className="text-gray-600 txt-sm f-b ">
                Upload and attach files
              </h1>
              <p className="txt-sm text-gray-400 mt-1">
                Add a personal touch. Upload a custom banner to represent your
                bet.
              </p>
            </div>

            {/*  */}
            <div className="border border-gray-200 text-gray-400 col-center  px-6 p-4 rounded-lg mt-4">
              <UploadSvg />

              <h1 className="txt-sm w-full text-center mt-3">
                <span className="text-sec f-s">Click to upload </span> or drag
                and drop
              </h1>
              <h1 className="txt-sm w-full text-center">
                PNG, JPG or GIF (max. 800x400px)
              </h1>
            </div>
          </div>
        </div>

        <hr className="border-gray-200 w-full my-8" />
        {/* ------row three */}
        <div className="details_row flex items-start space-x-[160px] ">
          <h1 className="txt-md f-s text-gray-600  text-left ">Discount</h1>

          <div className="details_column">
            <div className="space-y-1">
              <div className="row-between">
                <h1 className="text-gray-600 txt-sm f-b ">Enable Discount</h1>

                {/* toggle */}
                <Toggle />
              </div>
              <p className="txt-sm text-gray-400 mt-1 w-[80%]">
                Add a discount to your bet participants by paying their balance
                upfront
              </p>
            </div>

            {/*  */}

            <div className="space-y-1 mt-4">
              <InputField
                label={"How many percent "}
                type={"text"}
                place={"e.g 10%"}
              />

              <div className="middle space-x-2">
                <SvgElement />
                <p className="txt-sm text-gray-400">
                  Every participant will stake this amount
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function SvgElement() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 5.16699V8.66699"
        stroke="#9CA3AF"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M14.0528 5.7197V10.2797C14.0528 11.0263 13.6528 11.7197 13.0061 12.0997L9.04614 14.3864C8.39948 14.7597 7.59946 14.7597 6.94613 14.3864L2.98612 12.0997C2.33946 11.7264 1.93945 11.033 1.93945 10.2797V5.7197C1.93945 4.97303 2.33946 4.27967 2.98612 3.89967L6.94613 1.61301C7.59279 1.23967 8.39281 1.23967 9.04614 1.61301L13.0061 3.89967C13.6528 4.27967 14.0528 4.96636 14.0528 5.7197Z"
        stroke="#9CA3AF"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M8 10.7998V10.8665"
        stroke="#9CA3AF"
        stroke-width="1.33333"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

function UploadSvg() {
  return (
    <svg
      width="46"
      height="46"
      viewBox="0 0 46 46"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="3" y="3" width="40" height="40" rx="20" fill="#F2F4F7" />
      <g clip-path="url(#clip0_2910_48179)">
        <path
          d="M26.3326 26.3332L22.9992 22.9999M22.9992 22.9999L19.6659 26.3332M22.9992 22.9999V30.4999M29.9909 28.3249C30.8037 27.8818 31.4458 27.1806 31.8158 26.3321C32.1858 25.4835 32.2627 24.5359 32.0344 23.6388C31.8061 22.7417 31.2855 21.9462 30.5548 21.3778C29.8241 20.8094 28.925 20.5005 27.9992 20.4999H26.9492C26.697 19.5243 26.2269 18.6185 25.5742 17.8507C24.9215 17.0829 24.1033 16.4731 23.181 16.0671C22.2587 15.661 21.2564 15.4694 20.2493 15.5065C19.2423 15.5436 18.2568 15.8085 17.3669 16.2813C16.477 16.7541 15.7058 17.4225 15.1114 18.2362C14.517 19.05 14.1148 19.9879 13.9351 20.9794C13.7553 21.9709 13.8027 22.9903 14.0736 23.961C14.3445 24.9316 14.8319 25.8281 15.4992 26.5832"
          stroke="#475467"
          stroke-width="1.66667"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
      <rect
        x="3"
        y="3"
        width="40"
        height="40"
        rx="20"
        stroke="#F9FAFB"
        stroke-width="6"
      />
      <defs>
        <clipPath id="clip0_2910_48179">
          <rect
            width="20"
            height="20"
            fill="white"
            transform="translate(13 13)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}

export default Home;
