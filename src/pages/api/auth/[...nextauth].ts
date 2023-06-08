import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google"


// console.log("NEXTAUTH_URL", process.env.NEXTAUTH_URL);

export const authOptions: NextAuthOptions = {
	providers: [
	
            GithubProvider({
                  clientId: 'b02f7d9ec5b0956276af',
                  clientSecret: 'f8c1aae34ca19e15c71219778c348a0819b94e97',
                }),

                GoogleProvider({
                  clientId: process.env.GOOGLE_ID as string,
                  clientSecret: process.env.GOOGLE_SECRET as string,
                }),
	],

	theme: {
		colorScheme: "light",
	},

	debug: true,

      callbacks: {
            async jwt({ token }) {
              token.userRole = "admin"
              return token
            },
          },
    
};

export default NextAuth(authOptions);
