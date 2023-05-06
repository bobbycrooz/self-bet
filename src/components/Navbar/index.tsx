// All navbar components
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useRef, ChangeEventHandler, Component } from "react";
import Button from "../Button";
import SearchModal from "../SearchModal";
import Notification from "../Notification";
import ConfirmLogout from "../ConfirmLogout";
import { BellSvg, SearchSvg } from "@/assets";

interface NavTypes {  
  logo: () => JSX.Element;
}


const Navbar: NavTypes = {logo}


function logo() {





  return (
   <Link href={'/'}>
    <div className="menu_logo middle space-x-4 hidden">
      <Image
        src={"/icons/logo-2.svg"}
        alt="logo"
        width={120}
        height={26}
        className="block md:hidden"
      />

      <Image
        src={"/icons/logo-2.svg"}
        alt="logo"
        width={140}
        height={46}
        className="hidden md:block"
      />
    </div>
   </Link>
  );
}
  


Navbar.logo = logo

export default Navbar