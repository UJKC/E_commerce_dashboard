import { SettingsForm } from "@/components/settings-form"
import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

interface SettingsPageProps {
    params: {
        storeId: string
    }
}

const SettingPage: React.FC<SettingsPageProps> = async ({ params }) => {
    const { userId } = auth()

    if (!userId) {
        redirect('/sign-in')
    }

    const store = await prismadb.store.findFirst({
        where: {
            id: params.storeId,
            userId
        }
    })

    if (!store) {
        redirect('/')
    }

    return(
        <div className="flex">
            <div className="flex-1">
                <SettingsForm intialdata={store}/>
            </div>
        </div>
    )
}

export default SettingPage