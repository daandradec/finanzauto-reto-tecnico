"use client";

/* IMPORTACIONES DE REACT */
import { PropsWithChildren, createContext, useMemo, useState, useContext, useEffect } from "react";

/* IMPORTACION DE TIPOS */
import type { PersonModel } from "@/models/Person";

/* IMPORTACION DEL MODELO DE PERSONA */
import * as Person from "@/models/Person";



/* TIPADO DE LOS VALORES DEL CONTEXT API */
type ContextValues = {
    persons: PersonModel[],
    setPersons: React.Dispatch<React.SetStateAction<PersonModel[]>>;
    deletePerson: (id: string) => Promise<void>;
    createPerson: (person: Partial<PersonModel & {email: string}>) => Promise<void>
    updatePerson: (person: PersonModel) => Promise<void>
}

/* CREACIÓN DE UN CONTEXT */
export const DatabaseContext = createContext<ContextValues>({persons:[], setPersons: () => {}, deletePerson: async () => {}, createPerson: async () => {}, updatePerson: async () => {}})


/* COMPONENTE PROVIDER DEL CONTEXT */
export default function DatabaseProvider({children}: PropsWithChildren){
    /* LISTADO DE PERSONAS */
    const [persons, setPersons] = useState<Array<PersonModel>>([]);

    /* PROCEDIMIENTO PARA CREAR PERSONA EN LOCAL Y REMOTO */
    const createPerson = async (person: Partial<PersonModel & {email: string}>): Promise<void> => {
        const newPerson = await Person.createPerson(person);        
        setPersons(persons => [newPerson as unknown as PersonModel, ...persons])
    }

    /* PROCEDIMIENTO PARA BORRAR PERSONA EN LOCAL Y REMOTO */
    const deletePerson = async (id: string): Promise<void> => {
        return Person.deletePerson(id).
        then((id: string) => {
            setPersons(persons => persons.filter(person => person.id !== id))
        })
    }

    /* PROCEDIMIENTO PARA ACTUALIZAR PERSONA EN LOCAL Y REMOTO */
    const updatePerson = async (personUpdated: PersonModel): Promise<void> => {
        await Person.updatePerson(personUpdated);
        setPersons(persons => persons.map(person => {
            if(person.id === personUpdated.id)
                return personUpdated;
            else
                return person;
        }))
    }

    /* TRAERSE TODOS LOS USUARIOS UNCIAMENTE EN EL 1ER RENDER DE LA APLICACIÓN */
    useEffect(() => {
        Person.getAllPerson()
        .then(persons => {
            console.log(persons)
            setPersons(persons);
        });
    }, [])

    /* OPTIMIZACIÓN ANTIRE-RENDERIZADOS */
    const value = useMemo(() => ({persons, setPersons, deletePerson, createPerson, updatePerson}), [persons, setPersons, deletePerson, createPerson, updatePerson]);
    
    return (
        <DatabaseContext.Provider value={value}>
            {children}
        </DatabaseContext.Provider>
    )
}


/* HOOK PARA CONSUMIR ESTE CONTEXT */
export function useDatabase(){
    return useContext<ContextValues>(DatabaseContext);
}

