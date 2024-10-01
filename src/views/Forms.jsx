import React from "react";
import { Toaster } from "react-hot-toast";
import Header from "../components/Header";
import Titulos from "../components/Titulos";
import Formulario from "../components/formulario";

export default function Forms() {
  return (
    <div className="mx-4">
      <Toaster />
      <section>
        <Header />
      </section>
      <section>
        <Titulos />
      </section>
      <section className="">
        <Formulario />
      </section>
    </div>
  );
}
