/* IMPORTACIONES DE TIPOS */
import type { PersonModel } from "@/models/Person";

/* PROPS DEL COMPONENTE */
type Props = {
    person: PersonModel;
}

/* TARJETA DE PERSONA EN VERTICAL */
function PersonCardVertical({ person }: Props) {
  return (    
    <div className="flex flex-col gap-2">
        <img src={person.picture} alt="profile" className="w-[160px] object-cover"/>

        <p className="font-semibold uppercase">{ person.title } </p>
        <p className="text-lg text-stone-600">{ person.firstName } { person.lastName }</p>
    </div>
  )
}

export default PersonCardVertical