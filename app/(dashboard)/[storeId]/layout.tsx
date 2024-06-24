import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Dashboardlayout({ children, params } : { children: React.ReactNode, params: { storeId: String }}) {
    const { userId } = auth()

    if (!userId) {
        redirect('/sign-in')
    }

    const store = await prismadb.store.findFirst({
        where: {
            id: params.storeId.toString(),
            userId
        }
    })

    if (!store) {
        redirect('/')
    }

    return(
        <>
            <div>
                This will be navbar
            </div>
            {children}
        </>
    )
}