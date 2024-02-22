import Link from "next/link";
import * as Person from "@/models/Person";
import ShowPersonClient from "./ShowPersonClient";

async function ShowPerson({ params }: { params: { id: string } }) {
    const person = await Person.getOnlyPerson(params.id);
    return (
        <div className="flex flex-col items-center gap-4">
            <Link href="/" className="px-4 py-2 bg-green-400 hover:bg-green-500 text-white">&larr; Atras</Link>
            <ShowPersonClient/>
        </div>
    )
}

export default ShowPerson