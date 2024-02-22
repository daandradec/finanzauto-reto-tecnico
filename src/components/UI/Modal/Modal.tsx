import React from "react";
import type { PersonModel } from "@/models/Person";

type Props = {
    modalOpen: boolean;
    showModal: React.Dispatch<React.SetStateAction<boolean>>;
    createPerson: (person: Partial<PersonModel & {email: string}>) => Promise<void>
};

function Modal({ modalOpen, showModal, createPerson }: Props) {
    /* DEFINICIÓN DE VARIABLES CALCULADAS: css class de display */
    const showHideClassName = modalOpen
        ? "modal block"
        : "modal hidden";

    /* FUNCION PARA EL MANEJO DEL SUBMIT DEL FORMULARIO  */
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        /* PREVENIR EL EVENTO ORIGINAL DE SUBMIT */
        e.preventDefault();

        /* CREAR LOS OBJETOS DE ACCESO A LOS CAMPOS DEL FORMULARIO */
        const form = new FormData(e.target as HTMLFormElement); // alternative 1 o tambien podiamos haber creado una interface que extenderia htmlFormElement { name:string, country: string } y poder acceder con form.name
        const requestInput = Object.fromEntries(form) as Partial<PersonModel & {email: string}>;
        
        if(!requestInput.firstName || !requestInput.lastName || !requestInput.email)
            return;

        createPerson(requestInput).then(() => {
            showModal(false);
        });

        (e.target as HTMLFormElement).reset();
    };

    return (
        <div className={showHideClassName}>
            <section className="modal-main bg-white p-6">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label>First Name</label>
                        <input type="text" name="firstName" id="firstName" />
                    </div>
                    <div>
                        <label>Last Name</label>
                        <input type="text" name="lastName" id="lastName" />
                    </div>
                    <div>
                        <label>Email</label>
                        <input type="email" name="email" id="email" />
                    </div>
                    <button type="submit" className="px-4 py-2 bg-blue-400 hover:bg-blue-500 text-white">Crear</button>
                </form>
                <button onClick={() => {showModal(false)}} className="px-4 py-1 my-4 w-full bg-red-400 hover:bg-red-500 text-white">Cerrar</button>
            </section>
        </div>
    );
}

export default Modal;
