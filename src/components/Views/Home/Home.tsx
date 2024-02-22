"use client";
//import * as Person from "@/models/Person";
import PersonCard from "@/components/Models/Person/PersonCard";
import Modal from "@/components/UI/Modal/Modal";
//import type { PersonModel } from "@/models/Person";
import { useDatabase } from "@/context/DatabaseContext";
import { useState } from "react";

function Home() {
    const [modalOpen, showModal] = useState<boolean>(false);
    const {persons, deletePerson, createPerson} = useDatabase();

    return ( 
        <>
            <Modal modalOpen={modalOpen} showModal={showModal} createPerson={createPerson}/>
            
            <div className="flex flex-row-reverse mb-4">
                <button onClick={() => showModal(true)} className="px-4 py-2 bg-green-400 hover:bg-green-500 text-white">Crear</button>
            </div>
            

            <div className="grid grid-cols-2 gap-8">
                {
                    persons && persons.length ? persons.map(person => <PersonCard key={person.id} person={person} deletePerson={deletePerson}/>) : null
                }
            </div>
        </>
    )
}

export default Home;
