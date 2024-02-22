/* IMPORTACIÓN DE TIPOS */
import type { PersonModel } from "../types";

/* IMPORTACIÓN DE LIBRERIAS */
import { v4 as uuid } from 'uuid';
import axios, { AxiosRequestConfig } from "axios";

/* CABECERAS GENERALES PARA ELREQUEST CON EL TOKEN BEARER */
const headers: RequestInit = { headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_BEARER}`,        
}} as RequestInit

/* FETCH PARA OBTENER TODAS LAS PERSONAS */
export const getAllPerson = (): Promise<PersonModel[]> => {    
    return fetch(process.env.NEXT_PUBLIC_URL + "/api/person", headers)
    .then((response) => response.json())
    .then((data) => data);
}

/* FETCH PARA OBTENER TODAS LAS PERSONAS */
export const getOnlyPerson = (id: string): Promise<PersonModel> => {       
    return fetch(process.env.NEXT_PUBLIC_URL + `/api/person/${id}`, headers)
    .then((response) => response.json())
    .then((data) => data);
}

/* FETCH PARA CREAR UNA PERSONA EN DUMMY API IO */
export const createPerson = async (person: Partial<PersonModel & {email: string}>) => {
    try{
        const data = await axios.post<PersonModel, PersonModel>(`${process.env.NEXT_PUBLIC_DUMMYAPIIO_HOST}/user/create`, person as Object, {headers:{"app-id": process.env.NEXT_PUBLIC_DUMMYAPIIO_API_KEY}} as AxiosRequestConfig);
        return {...data, picture:`https://randomuser.me/api/portraits/med/women/${Math.floor(Math.random()*100)}.jpg`} as PersonModel;
    }catch(e){
        return {...person, picture:`https://randomuser.me/api/portraits/med/women/${Math.floor(Math.random()*100)}.jpg`, id: uuid() };
    }    
}

/* FETCH PARA ACTUALIZAR UNA PERSONA EN DUMMY API IO */
export const updatePerson = async (person: PersonModel) => {
    try{
        await axios.put<PersonModel, PersonModel>(`${process.env.NEXT_PUBLIC_DUMMYAPIIO_HOST}/user/update`, person as Object, {headers:{"app-id": process.env.NEXT_PUBLIC_DUMMYAPIIO_API_KEY}} as AxiosRequestConfig);
        return {...person, picture:"https://randomuser.me/api/portraits/med/women/99.jpg", id: uuid() };
    }catch(e){
        return {...person, picture:"https://randomuser.me/api/portraits/med/women/99.jpg", id: uuid() };
    }
}

/* FETCH PARA BORRAR UNA PERSONA EN DUMMY API IO */
export const deletePerson = (id: string): Promise<string> => {
    return fetch(process.env.NEXT_PUBLIC_URL + `/api/person/${id}`, {...headers, method: 'DELETE'})
    .then((response) => response.json())
    .then((data) => data.id);
}