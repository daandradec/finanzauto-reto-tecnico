/* IMPORTACIONES DE NEXT */
import Link from "next/link";

/* IMPORTACIONES DE COMPONENTES */
import ShowPersonClient from "./ShowPersonClient";

async function ShowPerson() {    
    return (
        <div className="flex flex-col items-center gap-4">
            <Link href="/" className="px-4 py-2 bg-green-400 hover:bg-green-500 text-white">&larr; Atras</Link>
            <ShowPersonClient/>
        </div>
    )
}

export default ShowPerson