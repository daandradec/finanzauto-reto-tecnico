"use client";
import { useParams } from "next/navigation";
import { useDatabase } from "@/context/DatabaseContext";
import { useMemo } from "react";
import PersonCardVertical from "@/components/Models/Person/PersonCardVertical";

function ShowPersonClient() {
    const { id } = useParams();
    const { persons } = useDatabase();
    const person = useMemo(() => persons.find((person) => person.id === id), []);    
    return (
        <>
            {
                person ? <PersonCardVertical person={person}></PersonCardVertical> : null
            }
        </>
    
    )
}

export default ShowPersonClient;
