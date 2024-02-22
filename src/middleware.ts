/* IMPORTACIONES DE NEXT */
import { NextResponse, type NextRequest } from "next/server";

/* MIDDLEWARE GLOBAL PARA TODOS LOS ENDPOINTS O RUTAS HTTP */
export function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    /* VALIDAR AUTORIZACIÓN BERARER SOLO EN LOS ENDPOINTS DE API DE NEXT */
    if(pathname.startsWith('/api/')){            
        if(req.headers.get("Authorization") !== `Bearer ${process.env.BEARER}`)
            return NextResponse.json({ message: "Denied"});          
    }

    /* DEJAR SEGUIR EL REQUEST */
    return NextResponse.next();  
}
