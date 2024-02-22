import Link from "next/link";
import PersonCardVertical from "@/components/Models/Person/PersonCardVertical";
import * as Person from "@/models/Person";
import { Suspense } from "react";
import ShowPersonClient from "./ShowPersonClient";

async function ShowPerson({ params }: { params: { id: string } }) {
    const person = await Person.getOnlyPerson(params.id);
    return (
        <Suspense fallback={<>Obteniendo Datos ....</>}>
            <div className="flex flex-col items-center gap-4">
                <Link href="/" className="px-4 py-2 bg-green-400 hover:bg-green-500 text-white">&larr; Atras</Link>
                {
                    person ? <PersonCardVertical person={person}></PersonCardVertical> : <ShowPersonClient/>
                }
                
            </div>
        </Suspense>
    )
}

export default ShowPerson