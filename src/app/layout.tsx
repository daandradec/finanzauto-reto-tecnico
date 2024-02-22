/* IMPORTACION DE COMPONENTES */
import Navbar from "@/components/Layouts/Navbar/Navbar";
import DatabaseProvider from "@/context/DatabaseContext";

/* IMPORTACIÓN DE TIPOS DE TYPESCRIPT */
import type { Metadata } from "next";

/* IMPORTACIÓN DE FUENTES */
import { Inter } from "next/font/google";

/* IMPORTACIÓN DE HOJAS DE ESTILO */
import "@/styles/globals.css";

/* IMPORTACIÓN DE FUENTES */
const inter = Inter({ subsets: ["latin"] });

/* CONFIGURACIÓN DE LAS TAGS DEL HEAD DEL HTML */
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

/* DEFINICIÓN DE TIPOS */
type Props = { children: Readonly<React.ReactNode> }

/* LAYOUT DE LA APLICACIÓN */
export default function RootLayout({children}: Props) {
  return (
    <html lang="en">
        <body className={inter.className}>
            <Navbar/>
            <DatabaseProvider>
                <main className="container py-8 px-4 min-h-screen">
                    {children}
                </main>
            </DatabaseProvider>
        </body>
    </html>
  );
}
