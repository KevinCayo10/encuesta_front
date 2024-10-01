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
      <p className="text-lg mb-8">
        Gracias por enviar la información. Nos pondremos en contacto contigo
        pronto.
      </p>
      <Link to="/" className="text-indigo-600 underline">
        Volver al inicio
      </Link>
    </div>
  );
};

export default SuccessPage;
