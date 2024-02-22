import ShowPerson from "@/components/Views/ShowPerson/ShowPerson";

async function page({ params }: { params: { id: string } }) {
    return <ShowPerson params={params}/>
}

export default page;
