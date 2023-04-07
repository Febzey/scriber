"use client";

import React, { createContext, useState, useContext, useEffect } from 'react';
import { SessionProvider } from "next-auth/react"
import { Session } from 'next-auth';
import AlertProvider from '../providers/alertProvider';


const UserContext = createContext<UserContextProps>({
    user: null,
    setUser: () => null,
})

export const useUserContext = () => useContext(UserContext);



export default function Providers({
    children,
    session
}: {
    children: React.ReactNode,
    session: Session
}) {
    const [user, setUser] = useState<UserShown | null>(null);

    useEffect(() => {
        if (!user && session?.user?.name) {
            loadUserData(session?.user?.name).then(userData => {
                setUser(userData);
            });
        }
    }, [session?.user?.name, user]);

    return (
        <>
            <UserContext.Provider value={{ user, setUser }}>
                <SessionProvider>
                    <AlertProvider>
                        {children}
                    </AlertProvider>
                </SessionProvider>
            </UserContext.Provider>
        </>
    )
}


async function loadUserData (user: string | undefined | null): Promise<UserShown | null> {
    if (!user) return null ;
    const res = await fetch(`http://localhost:3000/api/user/get/${user}`, { cache: "no-store" });
    if (!res.ok) return null ;
    const s = await res.json();

    if (!s.success) return null;
    const userData = s.user as UserShown;

    userData.liked_posts = JSON.parse(userData.liked_posts && typeof userData.liked_posts === "string" ? userData.liked_posts : "[]") as string[];
    userData.followers = JSON.parse(userData.followers && typeof userData.followers === "string" ? userData.followers : "[]") as string[];
    userData.following = JSON.parse(userData.following && typeof userData.following === "string" ? userData.following : "[]") as string[];
    userData.links = JSON.parse(userData.links && typeof userData.links === "string" ? userData.links : "[]") as string[];

    return userData;
};