"use client";

/* IMPORTACION DE COMPONENTES */
import PersonCard from "@/components/Models/Person/PersonCard";
import Modal from "@/components/UI/Modal/Modal";
import { Pagination } from "react-pagination-ts";

/* IMPORTACION DE HOOKS */
import { useDatabase } from "@/context/DatabaseContext";

/* IMPORTACIONES DE REACT */
import { useState, useMemo } from "react";

/* IMPORTACION DE TIPOS */
import { PersonModel } from "@/models/Person";

function Home() {
    /* INICIALIZACIÓN DE VARIABLES */
    const [page, setPage] = useState(() => {return typeof window !== 'undefined' ? Number(localStorage.getItem("page")) || 1 : 1});
    const [search, setSearch] = useState("");
    const [modalOpen, showModal] = useState<boolean>(false);
    const {persons, deletePerson, createPerson} = useDatabase();

    const personsFiltered = useMemo(() => {
        if(search.length){            
            return [...persons].map((person: PersonModel) => ({...person, fullName: person.firstName + person.lastName})).filter((person: PersonModel & {fullName: string}) => person.fullName.toLowerCase().includes(search.toLocaleLowerCase().trim()));
        }
        return persons;

    }, [persons, search]);

    return ( 
        <>
            {/* VENTANA MODAL */}
            <Modal modalOpen={modalOpen} showModal={showModal} createPerson={createPerson}/>
            
            {/* BOTON DE CREAR PERSONA */}
            <div className="flex flex-row-reverse mb-4 items-center gap-4">                
                <button onClick={() => showModal(true)} className="px-4 py-2 bg-green-400 hover:bg-green-500 text-white">Crear</button>
                <form> <input type="text" name="search" id="search" onChange={(e) => {setSearch(e.target.value)}}/></form>
            </div>
            
            {/* SECCIÓN DE GRILLA DE PERSONAS */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {
                    persons && personsFiltered.length ? personsFiltered.slice((page-1)*6, (page-1)*6+6).map(person => <PersonCard key={person.id} person={person} deletePerson={deletePerson}/>) : null
                }
            </div>
            <Pagination
                currentPage={page}
                defaultPage={1}
                onPageChange={(_, newPage: number) => {setPage(newPage);localStorage.setItem("page", newPage.toString());}}
                totalPage={persons.length}                
            />            
        </>
    )
}

export default Home;
