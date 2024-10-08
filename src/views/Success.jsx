// SuccessPage.jsx
import React from "react";
import { Link } from "react-router-dom";
import success from "../assets/submit-successfully.png";

const SuccessPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen mx-4 text-center">
      <img
        src={success} // Cambia esto por la ruta de tu imagen
        alt="Envío exitoso"
        className="w-1/3 mb-6"
      />
      <h1 className="text-3xl font-bold mb-4">¡Datos enviados exitosamente!</h1>
      <p className="text-lg mb-8">Gracias por enviar la información.</p>
      <Link to="/" className="text-indigo-600 underline">
        Volver al inicio
      </Link>

      <footer className="text-gray-80 py-4">
        <div className="container mx-auto text-center">
          <p className="text-sm">
            &copy; 2024 Kevin Cayo. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default SuccessPage;
