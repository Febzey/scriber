import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

console.log(process.env.google_client_secret)

const options = {
    providers: [
        GoogleProvider({
            clientId: process.env.google_client_id as string,
            clientSecret: process.env.google_client_secret as string,

        }),
    ],
    pages: {
        signIn: "/signin"
    }
    // other NextAuth.js options
}

export default NextAuth(options)