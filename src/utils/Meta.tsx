import Head from "next/head";
import React from "react";

interface MetaProps
{
	title: string,
	description: string,

}

const Meta = ({title, description}: MetaProps) => {
	return (
		<Head>
			<title>{ title}</title>
			<meta name="description" content={description} />
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<link rel="icon" href="/Logo.svg" />
		</Head>
	);
};

export default Meta;
