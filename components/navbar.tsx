'use client'
import { UserButton } from "@clerk/nextjs"
import { MainNav } from "./main-nav"
import StoreSwitcher from "./store-switcher"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import prismadb from "@/lib/prismadb"

const Navbar = async () => {
    const { userId } = auth()

    if (!userId) {
        redirect('/sign-in')
    }

    const stores = await prismadb.store.findMany({
        where: {
            userId
        }
    })

    return(
        <div className="border-b">
            <div className="flex">
                <StoreSwitcher items={stores}/>
                <MainNav />
                <div className="ml-auto flex">
                    <UserButton showName afterSignOutUrl="/sign-in" />
                </div>
            </div>
        </div>
    )
}

export default Navbar