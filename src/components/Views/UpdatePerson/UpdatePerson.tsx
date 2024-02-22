"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useDatabase } from "@/context/DatabaseContext";
import { useMemo } from "react";
import type { PersonModel } from "@/models/Person";

function UpdatePerson() {
    const { id } = useParams();
    const { persons, updatePerson } = useDatabase();
    const person = useMemo(() => persons.find((person) => person.id === id), []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        /* PREVENIR EL EVENTO ORIGINAL DE SUBMIT */
        e.preventDefault();

        /* CREAR LOS OBJETOS DE ACCESO A LOS CAMPOS DEL FORMULARIO */
        const form = new FormData(e.target as HTMLFormElement); // alternative 1 o tambien podiamos haber creado una interface que extenderia htmlFormElement { name:string, country: string } y poder acceder con form.name
        const requestInput = Object.fromEntries(form) as unknown as PersonModel;

        if(!requestInput.firstName || !requestInput.lastName)
            return;    
        alert("actualizando");
        await updatePerson({...person, ...requestInput});
        alert("actualizado");
    }

    return (
        <div className="flex flex-col items-center gap-4">
            <Link href="/" className="px-4 py-2 bg-green-400 hover:bg-green-500 text-white">
                &larr; Atras
            </Link>
            <div className="flex flex-col gap-2">
                <img
                    src={person?.picture}
                    alt="profile"
                    className="w-[160px] object-cover rounded-tl-2xl rounded-bl-2xl"
                />

                <section className="modal-main bg-white p-6">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div>
                            <label>First Name</label>
                            <input
                                type="text"
                                name="firstName"
                                id="firstName"
                                defaultValue={person?.firstName}
                            />
                        </div>
                        <div>
                            <label>Last Name</label>
                            <input type="text" name="lastName" id="lastName" defaultValue={person?.lastName}/>
                        </div>
                        <button type="submit" className="px-4 py-2 bg-blue-400 hover:bg-blue-500 text-white" >
                            Actualizar
                        </button>
                    </form>
                </section>
            </div>
        </div>
    );
}

export default UpdatePerson;
