import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'

export const authOptions = {
      providers: [
            GithubProvider({
                  clientId: 'something',
                  clientSecret: "somthing"
            }),
      
      ]
} 

export default NextAuth(authOptions)