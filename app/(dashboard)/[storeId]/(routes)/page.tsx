import prismadb from "@/lib/prismadb";

interface DashboardPageProps {
    params: {storeId: String}
}

const DashboardPage: React.FC<DashboardPageProps> = async ({ params }) => {
    const store = await prismadb.store.findFirst({
        where: {
            id: params.storeId.toString()
        }
    })
    return(
        <div>
            Active Store: {store?.name}
        </div>
    )
}

export default DashboardPage;