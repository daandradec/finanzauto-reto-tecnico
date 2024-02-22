/* IMPORTACIONES DE NEXT */
import { NextResponse, type NextRequest } from "next/server";

/* CABECERAS PARA TODOS LOS REQUEST DE ESTA API */
const headers: RequestInit = { headers: {
    "app-id": process.env.DUMMYAPIIO_API_KEY,    
}} as RequestInit

/* METODO GET DEL API DE PERSONAS */
export async function GET() {    
    const DummyApiRequest = await fetch(`${process.env.DUMMYAPIIO_HOST}/user?limit=50`, headers);   
    const persons = await DummyApiRequest.json();
    return NextResponse.json(persons.data);    
}

/* METODO POST DEL API DE PERSONAS */
export async function POST(request: NextRequest) {
    // @ts-ignore
    const DummyApiRequest = await fetch(`${process.env.DUMMYAPIIO_HOST}/user/create`, {...headers, method:"POST", body: request.body, duplex: "half"});   
    const person = await DummyApiRequest.json();
    return NextResponse.json(person); 
}

/* METODO PUT DEL API DE PERSONAS */
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    const id = params.id ?? request.nextUrl.searchParams.get("id");     
    // @ts-ignore
    const DummyApiRequest = await fetch(`${process.env.DUMMYAPIIO_HOST}/user/${id}`, {...headers, method:"PUT", body: request.body, duplex: "half"});   
    const person = await DummyApiRequest.json();
    return NextResponse.json(person); 
}
