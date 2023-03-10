import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const options = {
    providers: [
        GoogleProvider({
            clientId: process.env.google_client_id as string,
            clientSecret: process.env.google_client_secret as string,
        }),
    ],
    // other NextAuth.js options
}

export default NextAuth(options)