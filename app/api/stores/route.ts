import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';

export async function POST(req: Request,) {
    const prisma = new PrismaClient();
    try {
        const { userId } = auth()
        const body = await req.json()
        const { name } = body

        if (!userId) {
            return new NextResponse("UnAuthorized", { status: 401 })
        }

        if (!name) {
            return new NextResponse("Name is required", { status: 400 })
        }

        const store = await prisma?.store.create({
            data: {
                name,
                userId
            }
        })

        return NextResponse.json(store)
    }
    catch(error) {
        console.log("[STORE_POST]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}