import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import { Button, InputField, Navbar, Sidebar } from "@components";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { getToken } from "@/utils";
import { useBet } from "@/context/betContext";
import { useUser } from "@/context/userContext";
import useToast from "@/hooks/useToast";

export default function DashboardLayout({ children }: { children: any }) {
	const mainStyle = {
		width: "100vw",
		height: "100vh",
		// overFlowY: "hidden"
	};

	const { pathname } = useRouter();
	const { Bet } = useBet();
	const { logOut } = useUser();
	const {notify} = useToast()

	// useEffect(() => {
	// 	console.log(getToken());
	// 	if (!getToken()) {
	// 		logOut();
	// 		notify("error", "Session expired")
	// 	}
	// }, []);

	return (
		<main className="dashboard_layout-wrapper">
			<Navbar />

			<div className="flex dashboard_layout-body lg:mt-0 ">
				<Sidebar />
				<main className="main_page overflow-y-scroll custom-scrollbar ">{children}</main>
			</div>
		</main>
	);
}
