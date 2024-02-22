import { NextResponse, type NextRequest } from "next/server";

const headers: RequestInit = { headers: {
    "app-id": process.env.DUMMYAPIIO_API_KEY,    
}} as RequestInit

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {        
    const id = params.id ?? request.nextUrl.searchParams.get("id");      
    const DummyApiRequest = await fetch(`${process.env.DUMMYAPIIO_HOST}/user/${id}`, headers);   
    const person = await DummyApiRequest.json();    
    return NextResponse.json(person);
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {        
    const id = params.id ?? request.nextUrl.searchParams.get("id");      
    await fetch(`${process.env.DUMMYAPIIO_HOST}/user/${id}`, {...headers, method:"DELETE"});       
    return NextResponse.json({id});
}