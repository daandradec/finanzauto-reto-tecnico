"use client";
/* IMPORTACIONES DE NEXT */
import Link from "next/link";
import { useParams } from "next/navigation";

/* IMPORTACION DE HOOKS */
import { useDatabase } from "@/context/DatabaseContext";
import { useMemo } from "react";

/* IMPORTACION DE TIPOS */
import type { PersonModel } from "@/models/Person";

function UpdatePerson() {
    /* INICIALIZACIÓN DE VARIABLES */
    const { id } = useParams();
    const { persons, updatePerson } = useDatabase();
    const person = useMemo(() => persons.find((person) => person.id === id), []);


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        /* PREVENIR EL EVENTO ORIGINAL DE SUBMIT */
        e.preventDefault();

        /* CREAR LOS OBJETOS DE ACCESO A LOS CAMPOS DEL FORMULARIO */
        const form = new FormData(e.target as HTMLFormElement);
        const requestInput = Object.fromEntries(form) as unknown as PersonModel;

        /* SI NO TIENEN INFORMACIÓN NO ACEPTE */
        if(!requestInput.firstName || !requestInput.lastName)
            return;    

        /* ACTUALIZAR LA PERSONA */
        alert("actualizando");
        await updatePerson({...person, ...requestInput});
        alert("actualizado");
    }

    return (
        <div className="flex flex-col items-center gap-4">
            {/* BOTON DE IR PARA ATRAS */}
            <Link href="/" className="px-4 py-2 bg-green-400 hover:bg-green-500 text-white">
                &larr; Atras
            </Link>

            {/* PERSONA EDITABLE POR FORMULARIO */}
            <div className="flex flex-col gap-2">
                <img
                    src={person?.picture}
                    alt="profile"
                    className="w-[160px] object-cover mx-auto"
                />

                <section className="bg-white p-6">
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
