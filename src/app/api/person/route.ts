import { NextResponse, type NextRequest } from "next/server";

const headers: RequestInit = { headers: {
    "app-id": process.env.DUMMYAPIIO_API_KEY,    
}} as RequestInit

export async function GET() {    
    const DummyApiRequest = await fetch(`${process.env.DUMMYAPIIO_HOST}/user`, headers);   
    const persons = await DummyApiRequest.json();
    return NextResponse.json(persons.data);    
}

export async function POST(request: NextRequest) {
    // @ts-ignore
    const DummyApiRequest = await fetch(`${process.env.DUMMYAPIIO_HOST}/user/create`, {...headers, method:"POST", body: request.body, duplex: "half"});   
    const person = await DummyApiRequest.json();
    return NextResponse.json(person); 
}

export async function PUT() {
    return NextResponse.json({ message: "Hello - PUT" });
}
