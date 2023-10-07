import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { useEffect, type ReactElement, type ReactNode } from "react";
import type { NextPage } from "next";
import { Inter } from "next/font/google";
import UserProvider from "@/context/userContext";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";
import BetProvider from "@/context/betContext";
import { Toaster } from "react-hot-toast";
// import "react-hot-toast/dist/ReactToastify.css";
import { useRouter } from "next/router";
import { hasToken } from "@/utils";
import useToast from "@/hooks/useToast";

const inter = Inter({ subsets: ["latin"] });

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
	getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
	// Use the layout defined at the page level, if available
	// const getLayout = Component.getLayout ?? ((page) => page);
	const getLayout = Component.getLayout || ((page) => page);
	const { push, query, pathname } = useRouter();
	const {notify} = useToast()
	const protectedRoutes = ["/dashboard/settings", "/dashboard/create-bet", "/dashboard/create-bet/bet-details", "/dashboard/my-bets", "/dashboard/my-wallet", "/dashboard/profile",];

	// Guarding routes
	useEffect(() => {
		//     push('/dashboard')
		if (!hasToken() && protectedRoutes.includes(pathname))
		{
			notify('info', 'You need to Sign in first')

			push("/auth");
		}
		
	});

	return (
		<>
			<Head>
				<title>selfbet</title>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="fav.svg" />
			</Head>
			<main className={inter.className}>
				<SessionProvider session={pageProps.session}>
					<UserProvider>
						<BetProvider>{getLayout(<Component {...pageProps} />)}</BetProvider>
						<Toaster />
					</UserProvider>
				</SessionProvider>
			</main>
		</>
	);
}
