import NextAuth, { AuthOptions, NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
// import { TypeORMLegacyAdapter } from "@next-auth/typeorm-legacy-adapter"

import { sequelize } from "../../../utils/database/sequelize/conn";
import SequelizeAdapter, { models } from "@next-auth/sequelize-adapter";
import { UserModel } from "../../../utils/database/sequelize/models/userModel";
sequelize.sync()

export const options: NextAuthOptions = {
    adapter: SequelizeAdapter(sequelize, {
        models: {
            User: sequelize.define("user", {
                ...UserModel,
            }),
        }
    }),
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
    }
    // other NextAuth.js options
}

export default NextAuth(options)