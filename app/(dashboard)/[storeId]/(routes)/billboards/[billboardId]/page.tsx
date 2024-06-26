import { BillboardForm } from "@/components/billboard/billboard-form"
import prismadb from "@/lib/prismadb"

const BillboardPage = async ({ params }: { params: { billboardId: String }}) => {
    const billboard = await prismadb.billboard.findUnique({
        where: {
            id: params.billboardId.toString()
        }
    })

    return(
        <div className="flex-col">
            <div className="flex-1">
                <BillboardForm initialData={billboard}/>
            </div>
        </div>
    )
}

export default BillboardPage