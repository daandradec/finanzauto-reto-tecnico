/* TRADUCCION CONDICIONAL SIMPLE DEL TITULO DE PERSONA EN INGLES A ESPAÑOL */
export function translateTitle(title: string){
    if(title === "mr")
        return "sr"
    else if(["mrs", "ms"].includes(title))
        return "sra"
    else if(["miss","mss"].includes(title))
        return "srta"
    return title;
}