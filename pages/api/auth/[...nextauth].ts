import NextAuth, { AuthOptions, NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import { TypeORMLegacyAdapter } from "@next-auth/typeorm-legacy-adapter"
import { dbOptions } from "../../../utils/database/typeorm";

const options: NextAuthOptions = {
    adapter: TypeORMLegacyAdapter(dbOptions),

    providers: [
        GoogleProvider({
            clientId: process.env.google_client_id as string,
            clientSecret: process.env.google_client_secret as string,
        }),
        EmailProvider({
            server: {
                host: process.env.email_host,
                port: process.env.email_port,
                auth: {
                    user: process.env.email_user,
                    pass: process.env.email_password
                }
            },
            from: "noreply@scriber.app"
        })
    ],
    pages: {
        signIn: "/auth/signin",
        verifyRequest: "/auth/signin/verify",
        signOut: "/auth/signout",
    },

    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            user.id 

            console.log(user, " user after signing in.");
            return true;
            // if (user.name) {
            //     return true;
            // } else {
            //     return false

            //    // const adapterManager = await getManager();

            // }

        },
     }

    // other NextAuth.js options
}

export default NextAuth(options)