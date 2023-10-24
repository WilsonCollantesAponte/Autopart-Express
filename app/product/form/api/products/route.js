import DataBaseInteraction from "@/prisma";
import { NextResponse } from "next/server";


export async function GET(){
    try {
        const products = await DataBaseInteraction.Product.findMany()
        return NextResponse.json({products})
    } catch (error) {
        return NextResponse.json({message: error.message}, {status: 500,});   
    }
}