import type { PersonModel } from "@/models/Person";

type Props = {
    person: PersonModel;
}

function PersonCardVertical({ person }: Props) {
  return (    
    <div className="flex flex-col gap-2">
        <img src={person.picture} alt="profile" className="w-[160px] object-cover rounded-tl-2xl rounded-bl-2xl"/>

        <p className="font-semibold uppercase">{ person.title } </p>
        <p className="text-lg text-stone-600">{ person.firstName } { person.lastName }</p>
    </div>
  )
}

export default PersonCardVertical