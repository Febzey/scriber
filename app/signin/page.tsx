import { getProviders } from "next-auth/react"
import LoginForm from "./components/LoginForm";

async function getServerProps() {
    return getProviders();
}

export default async function Page() {
    const providers = await getServerProps();

    console.log(providers);

    return (
        <div className="w-full h-screen flex items-center justify-center">
            <div className="w-1/3 h-[60vh] border-dashed rounded border-neutral-800 border-2 p-11 gap-10 flex flex-col">
                <h1 className="mx-auto bg-clip-text text-transparent bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 font-bakbak text-5xl">Sign in</h1>

                <LoginForm providers={providers}/>

            </div>
        </div>
    )
}