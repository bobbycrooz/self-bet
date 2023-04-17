import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useRef } from "react";
import Image from "next/image";
// import { Range } from "react-range";
import { TwoThumbs } from "@components";

interface DropDownBtnProps {
  type: "byTeam" | "byName" | "byRange" | "byPercent" | "byLeague" | "custom";
  title: string;
  lists: Array<string>;
  handler?: (value: string) => void;
  show: boolean,
  toggleShow: any
}

export default function DropdownBtn({
  title,
  type,
  lists,
  handler,
  show,
  toggleShow
}: DropDownBtnProps) {
  const [showList, setShowList] = useState(false);

  function handleShowList(type: string) {

    switch (type) {
      case 'byTeam':
        return  toggleShow({
          team: !show,
          name: false,
          league:false,
          percent: false,
          range: false
        });

        case 'byName':
          return  toggleShow({
            team: false,
            name: !show,
            league:false,
            percent: false,
            range: false
          });
          case 'byRange':
            return  toggleShow({
              team: false,
              name: false,
              league:false,
              percent: false,
              range: !show
            });

            case 'byPercent':
              return  toggleShow({
                team: false,
                name: false,
                league:false,
                percent: !show,
                range: false
              });

              case 'byLeague':
                return  toggleShow({
                  team: false,
                  name: false,
                  league:!show,
                  percent: false,
                  range: false
                });

              

              
        
        
    
      default:
       
          return  toggleShow({
            team: false,
            name: false,
            league:false,
            percent: false,
            range: false
          });
    }
   
  }

  function dropDownCardHandler(type: string) {
    switch (type) {
      case "byTeam":
        return <SearchByTeamCard handleShowList={handleShowList} />;

      case "byName":
        return <SearchByNameCard />;

      case "byRange":
        return <SearchByRangeCard />;

      case "byPercent":
        return <SearchByPercentCard />;

      case "byLeague":
        return <SearchByLeagueCard />;

      case "custom":
        return <CustomSearchCard list={lists} handler={handler} />;

      default:
        return <CustomSearchCard list={lists} handler={handler} />;
    }
  }



  return (
    <div className="dropdown_filter relative">
      <div
        role="button"
        onClick={() => handleShowList(type)}
        className={` px-4 p-[10px] row-between border space-x-4  border-gray-100 rounded-lg`}
      >
        <h1 className="bet_condition_name txt-sm f-m text-gray-500">{title}</h1>
        <Image
          src={"/icons/carret-fade.svg"}
          alt="wallet"
          width={20}
          height={20}
          role="button"
          className={` carret ${showList && "active"} transition-transform`}
        />
      </div>

      {show && <div className=" bg-white">{dropDownCardHandler(type)}</div>}
    </div>
  );
}

function SearchByTeamCard(props: any) {
  const cardRef = useRef(null);
  const teamsArray = [
    {
      name: "chealse",
      icon: "/icons/teams/chealse_logo-sm.svg",
    },
    {
      name: "Arsenal",
      icon: "/icons/teams/arsenal_logo-sm.svg",
    },
    {
      name: "Leicester City",
      icon: "/icons/teams/lei_logo-sm.svg",
    },
    {
      name: "As roma",
      icon: "/icons/teams/roma_logo-sm.svg",
    },
  ];

  function handleCardClick(e: any) {
    const cardEle = e.target;
    const cardEleRef = cardRef.current;

    console.log(cardEle, cardEleRef);

    if (cardEle !== cardEleRef) {
      props.handleShowList();
    }
  }

  return (
    <div
      ref={cardRef}
      onClick={handleCardClick}
      className="absolute  dropdown_body bg-white  space-y-4 column transform w-[328px] shadow-soft left-0 top-12 border-gray-100  p-4 grid grid-cols-3 gap-2 border-x border-2 rounded-lg"
    >
      {/* search component */}
      <div className="search">
        <div
          role="button"
          //   onClick={searchToggle}
          className="search_container relative bg-gray-50 rounded-lg w-full h-10"
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
            placeholder="Search teams..."
          />
        </div>
      </div>

      <ol className="team_options w-full bg-white z-[9999999]">
        {teamsArray.map((i, k) => (
          <li key={k} role="button" className="option middle space-x-4">
            <Image
              src={i.icon}
              alt="wallet"
              width={40}
              height={40}
              role="button"
              className={` carret transition-transform`}
            />

            <h1 className="text-gray-700 f-m capitalize">{i.name}</h1>
          </li>
        ))}
      </ol>
    </div>
  );
}

function SearchByLeagueCard() {
  const teamsArray = [
    {
      name: "Premier League",
      icon: "/icons/teams/chealse_logo-sm.svg",
    },
    {
      name: "Bundesliga",
      icon: "/icons/teams/arsenal_logo-sm.svg",
    },
    {
      name: "Serie A",
      icon: "/icons/teams/lei_logo-sm.svg",
    },
    {
      name: "La Liga",
      icon: "/icons/teams/roma_logo-sm.svg",
    },
  ];

  return (
    <div className="absolute dropdown_body space-y-4 column transform w-[328px] shadow-soft left-0 top-12 border-gray-100  p-4 grid grid-cols-3 gap-2 border-x border-2 rounded-lg">
      {/* search component */}
      <div className="search">
        <div
          role="button"
          //   onClick={searchToggle}
          className="search_container relative bg-gray-50 rounded-lg w-full h-10"
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
            placeholder="Search Leagues.."
          />
        </div>
      </div>

      <ol className="team_options w-full">
        {teamsArray.map((i, k) => (
          <li key={k} role="button" className="option middle space-x-4">
            <Image
              src={i.icon}
              alt="wallet"
              width={40}
              height={40}
              role="button"
              className={` carret transition-transform`}
            />

            <h1 className="text-gray-700 f-m capitalize">{i.name}</h1>
          </li>
        ))}
      </ol>
    </div>
  );
}

function SearchByNameCard() {
  const nameArray = [
    {
      name: "Wade Warren",
      icon: "/icons/teams/name_users.svg",
    },
    {
      name: "Floyd Miles",
      icon: "/icons/teams/name_users.svg",
    },
    {
      name: "Kristin Watson",
      icon: "/icons/teams/name_users.svg",
    },
    {
      name: "Eleanor Pena",
      icon: "/icons/teams/name_users.svg",
    },
  ];

  return (
    <div className="absolute dropdown_body space-y-4 column transform w-[328px] shadow-soft left-0 top-12 border-gray-100  p-4 grid grid-cols-3 gap-2 border-x border-2 rounded-lg">
      {/* search component */}
      <div className="search">
        <div
          role="button"
          //   onClick={searchToggle}
          className="search_container relative bg-gray-50 rounded-lg w-full h-10"
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
            placeholder="e.g Peter Mane..."
          />
        </div>
      </div>

      <ol className="team_options w-full">
        {nameArray.map((i, k) => (
          <li key={k} role="button" className="option middle space-x-4">
            <Image
              src={i.icon}
              alt="wallet"
              width={40}
              height={40}
              role="button"
              className={` carret transition-transform`}
            />

            <h1 className="text-gray-700 txt-md f-m capitalize">{i.name}</h1>
          </li>
        ))}
      </ol>
    </div>
  );
}

function SearchByRangeCard() {
  const [values, setValues] = useState([25, 75]);

  return (
    <div className="absolute dropdown_body space-y-4 column transform w-[328px] shadow-soft left-0 top-12 border-gray-100  p-4 grid grid-cols-3 gap-2 border-x border-2 rounded-lg">
      <div className="row-between">
        <h1 className="text-gray-900 txt-md f-m">Price (₦)</h1>
        <h1 className="text-gray-500 txt-sm f-eb">Apply</h1>
      </div>

      <TwoThumbs rtl={false} values={values} setValues={setValues} />

      <div className="row w-full justify-between  space-x-2">
        <div className="mout w-full rounded-lg p-[10px] px-[14px] bg-gray-100">
          {values[0].toFixed()}
        </div>
        <p className="">-</p>
        <div className="mout w-full rounded-lg p-[10px] px-[14px] bg-gray-100">
          {values[1].toFixed()}
        </div>
      </div>
    </div>
  );
}

function SearchByPercentCard() {
  const percentageArray = [
    "50% or more",
    "60% or more",
    "70% or more",
    "80% or more",
  ];

  return (
    <div className="absolute dropdown_body space-y-4 column transform w-[328px] shadow-soft right-0 top-12 border-gray-100  p-4 grid grid-cols-3 gap-2 border-x border-2 rounded-lg">
      {/* search component */}

      <h1 className="text-gray-700 f-m capitalize">Discount Percentage</h1>

      <ol className="team_options w-full space-y-3 bg-white">
        {percentageArray.map((i, k) => (
          <li key={k} role="button" className="option middle space-x-4">
            <div className="rounded-full w-5 h-5 border border-gray-300"></div>

            <h1 className="text-gray-700 f-m capitalize">{i}</h1>
          </li>
        ))}
      </ol>
    </div>
  );
}

function CustomSearchCard({
  list,
  handler,
}: {
  list: Array<string>;
  handler: any;
}) {
  const cardRef = useRef(null);

  function handleCardClick(e: any) {
    const cardEle = e.target;
    const cardEleRef = cardRef.current;

    console.log(cardEle, cardEleRef);

    if (cardEle !== cardEleRef) {
      handler();
    }
  }

  return (
    <div
      ref={cardRef}
      onClick={handleCardClick}
      className="absolute dropdown_body z-50 space-y-4 column transform w-[328px] shadow-soft left-0 top-12 border-gray-100  p-4 grid grid-cols-3 gap-2 border-x border-2 rounded-lg"
    >
      {/* -----custom search list ---- */}
      <ol className="team_options w-full">
        {list.map((i, k) => (
          <li
            key={k}
            role="button"
            onClick={() => handler(i)}
            className="option middle space-x-4"
          >
            <h1 className="text-gray-700 f-m capitalize">{i}</h1>
          </li>
        ))}
      </ol>
    </div>
  );
}
