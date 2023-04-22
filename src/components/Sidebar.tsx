import { AddIcon, MobileAdd, PlusSvg } from "@/assets";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect, useRef, ChangeEventHandler } from "react";

const navItemArray = [
  {
    name: "home",
    link: "/dashboard",
    icon: "/icons/dashboard/home.svg",
  },

  {
    name: "create bet",
    link: "/dashboard/create-bet",
    icon: "/icons/dashboard/create.svg",
  },

  {
    name: "my bet",
    link: "/dashboard/my-bets",
    icon: "/icons/dashboard/bets.svg",
  },

  {
    name: "saved bet",
    link: "/dashboard/saved-bets",
    icon: "/icons/dashboard/saved.svg",
  },

  {
    name: "my wallet",
    link: "/dashboard/my-wallet",
    icon: "/icons/dashboard/my-wallet.svg",
  },

  {
    name: "settings",
    link: "/dashboard/settings",
    icon: "/icons/dashboard/cog.svg",
  },
];

const mobileNavItemArray = [
  {
    name: "home",
    link: "/dashboard",
    icon: "/icons/dashboard/home.svg",
  },

  {
    name: " bets",
    link: "/dashboard/my-bets",
    icon: "/icons/dashboard/bets.svg",
  },

  {
    add: true,
    name: "",
    link: "/dashboard/create-bet",
    icon: "",
  },

  {
    name: " wallet",
    link: "/dashboard/my-wallet",
    icon: "/icons/dashboard/my-wallet.svg",
  },

  {
    name: "profile",
    link: "/dashboard/settings",
    icon: "/icons/dashboard/cog.svg",
  },
];

const Sidebar = () => {
  const { push, pathname } = useRouter();

  function linkHandler(link: string) {
    return push(link);
  }

  console.log(pathname);

  return (
    <>
      <aside className="sidebar h-full border-r md:flex hidden flex-col justify-between   bg-white w-[240px] p-3 pt-4">
        <ul className="nav_container w-full space-y-4">
          {navItemArray.map((i, k) => (
            <li
              role="button"
              title={i.name}
              onClick={() => linkHandler(i.link)}
              key={k}
              className={`nav_item w-full hover:bg-gray-50 middle p-3 space-x-4 rounded-lg ${
                i.link == pathname && "bg-gray-50"
              }`}
            >
              <Image
                src={i.icon}
                alt="logo"
                width={24}
                height={24}
                className=""
              />

              <p className="link_name txt-sm f-m text-gray-500 capitalize">
                {i.name}
              </p>
            </li>
          ))}
        </ul>

        <div className="w-full">
          <Link href={"/auth"}>
            <div className="middle  justify-between border-t py-4">
              <Image
                src={"/icons/dashboard/olivia.svg"}
                alt="logo"
                width={40}
                height={40}
                className=""
              />

              <div className="name_box ">
                <h1 className="name txt-sm text-gray-800 f-s">Olivia Rhye</h1>
                <p className="sub_name text-xs f-n text-gray-400">
                  olivia@untitledui.com
                </p>
              </div>

              <Image
                src={"/icons/dashboard/logout.svg"}
                alt="logo"
                width={36}
                height={36}
                className=""
              />
            </div>
          </Link>
        </div>
        {/*  */}
      </aside>
      {/* ---------------mobile */}

      <div className="mobile_menu shadow-bet-card-v absolute bottom-0 left-0 w-full h-[84px] z-50">
        <ul className="nav_container w-full bg-white   flex  h-full">
          {mobileNavItemArray.map((i, k) => (
            <>
              {i.add ? (
                <div className="w-full pt-2">
                  <Link href={i.link}>
                  <div className="mobile_create_btn mx-auto w-14 h-14 bg-sec rounded-full centered">
                    <PlusSvg />
                  </div>
                  </Link>
                </div>
              ) : (
                <li
                  role="button"
                  title={i.name}
                  onClick={() => linkHandler(i.link)}
                  key={k}
                  className={`col-center w-full   hover:bg-gray-50 rounded-lg ${
                    i.link == pathname && "bg-gray-50"
                  }`}
                >
                  <Image
                    src={i.icon}
                    alt="logo"
                    width={24}
                    height={24}
                    className=""
                  />

                  <p className="link_name txt-sm f-m text-gray-500 capitalize">
                    {i.name}
                  </p>
                </li>
              )}
            </>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
