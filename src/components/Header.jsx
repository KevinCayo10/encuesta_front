import React from "react";
import banner from "../assets/banner_fisei.png";

export default function Header() {
  const formatearFecha = () => {
    const fechaActual = new Date();
    const dia = String(fechaActual.getDate()).padStart(2, "0"); // Día con dos dígitos
    const mes = String(fechaActual.getMonth() + 1).padStart(2, "0"); // Mes con dos dígitos
    const año = fechaActual.getFullYear(); // Año con cuatro dígitos

    return `${dia}/${mes}/${año}`;
  };

  console.log(formatearFecha()); // Ejemplo de salida: 27/09/2024

  return (
    <div>
      <nav className="bg-white border-gray-200 ">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <div className="flex flex-col sm:flex-row items-center justify-center w-full border-b border-b-gray-300 sm:justify-between">
            <img src={banner} className="h-20" alt="Flowbite Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap ">
              {formatearFecha()}
            </span>
          </div>
        </div>
      </nav>
    </div>
  );
}
