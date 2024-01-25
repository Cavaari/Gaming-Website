import { NextResponse } from "next/server"




export async function GET(req, res) {
    return NextResponse.json({
       obj : "get"
    })    
}

export async function POST(req, res) {
    return NextResponse.json({
       obj : "post"
    })    
}