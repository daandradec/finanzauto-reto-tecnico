import { NextResponse, type NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    if(pathname.startsWith('/api/')){            
        if(req.headers.get("Authorization") !== `Bearer ${process.env.BEARER}`)
            return NextResponse.json({ message: "Denied"});          
    }

    return NextResponse.next();
      
    
}
