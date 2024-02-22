/* TRADUCCION CONDICIONAL SIMPLE DEL TITULO DE PERSONA EN INGLES A ESPAÑOL */
export function translateTitle(title: string){
    if(title === "mr")
        return "sr"
    else if(["mrs", "ms", "miss"].includes(title))
        return "sra"
    return title;
}