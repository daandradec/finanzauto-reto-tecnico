/* IMPORTACION DEL MODELO PERSONA */
import type { PersonModel } from "@/models/Person";

/* IMPORTACION DE LIBRERIAS */
import { translateTitle } from "@/lib/translateTittle";

/* IMPORTACIONES DE NEXT */
import Link from "next/link";

/* PROPS DEL COMPONENTE */
type Props = {
    person: PersonModel;
    deletePerson: (id: string) => Promise<void>;
};

/* TARJETA DE PERSONA EN HORIZONTAL */
function PersonCard({ person, deletePerson }: Props) {
    /* FUNCIÓN PARA EL MANEJO DEL EVENTO DE ELIMINAR */
    const handleDelete = (_e: React.MouseEvent) => {
        if(confirm("Seguro que desea borrar"))
            deletePerson(person.id);
    }
    
    return (
        <div className="flex border rounded-2xl border-[#EAEAEA] bg-[#f9f9f9] hover:bg-[#f6f6f6] hover:cursor-pointer">
            <img
                src={person.picture}
                alt="profile"
                className="h-[92px] object-cover rounded-tl-2xl rounded-bl-2xl"
            />
            <div className="grow flex items-center px-6 gap-4">
                <div className="mr-auto">
                    <p className="font-semibold uppercase">
                        {translateTitle(person.title)}{" "}
                    </p>
                    <p className="text-lg text-stone-600">
                        {person.firstName} {person.lastName}
                    </p>
                </div>
                <Link
                    href={`/person/${person.id}`}
                    className="px-2 bg-violet-400 hover:bg-violet-500 text-white"
                >
                    Ver
                </Link>
                <Link
                    href={`/person/update/${person.id}`}
                    className="px-2 lg:px-4 lg:py-2 bg-blue-400 hover:bg-blue-500 text-white"
                >
                    Actualizar
                </Link>
                <button
                    onClick={handleDelete}
                    className="px-2 lg:px-4 lg:py-2 bg-red-400 hover:bg-red-500 text-white"
                >
                    Borrar
                </button>
            </div>
        </div>
    );
}

export default PersonCard;
