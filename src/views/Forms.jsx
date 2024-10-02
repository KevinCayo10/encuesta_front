import React from "react";
import { Toaster } from "react-hot-toast";
import Header from "../components/Header";
import Titulos from "../components/Titulos";
import Formulario from "../components/Formulario";

export default function Forms() {
  return (
    <div className="sm:w-3/4   w-[90%] mx-auto  ">
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
