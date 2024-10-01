import React, { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Formulario() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState({});
  const [otherSubcategories, setOtherSubcategories] = useState({});
  const navigate = useNavigate(); // useNavigate debe estar en el cuerpo del componente

  const categoriasSubcategorias = {
    "Dispositivos moviles": ["Celulares", "Tablets", "Smartwatches", "Otras"],
    "Computadoras y laptops": ["Laptops", "Computadoras"],
    "Accesorios tecnológicos": [
      "Audífonos",
      "Teclados",
      "Mouses",
      "Disco duros",
      "Otras",
    ],
    "Dispositivos de entretenimiento": [
      "Consolas de videojuegos",
      "Sistemas de sonido",
      "Televisores",
      "Proyectores",
      "Otras",
    ],
    Electrodomésticos: [
      "Refrigeradores",
      "Lavadoras",
      "Cocinas",
      "Licuadoras",
      "Otras",
    ],
  };
  const marcasPorCategoria = {
    "Dispositivos moviles": ["Samsung", "Apple", "Xiomi", "Honor", "Otras"],
    "Computadoras y laptops": [
      "Dell",
      "HP",
      "Apple",
      "Lenovo",
      "Asus",
      "Otras",
    ],
    "Accesorios tecnológicos": [
      "Logitech",
      "Razer",
      "Kingston",
      "Adata",
      "Otras",
    ],
    "Dispositivos de entretenimiento": [
      "Sony",
      "Microsoft",
      "Nintendo",
      "Otras",
    ],
    Electrodomésticos: [
      "LG",
      "Indurama",
      "Whirlpool",
      "Mabe",
      "Electrolux",
      "Otras",
    ], // Comillas recomendadas
  };
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    console.log("DATA : ", data);
    const dataToSend = {
      ...data,
      subcategoria: selectedSubcategories,
      otrasSubcategorias: otherSubcategories,
    };

    // Iniciar la carga
    setIsLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_SERVICE_ID}/api/encuesta`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Indicar que el formato es JSON
          },
          body: JSON.stringify(dataToSend), // Convertir los datos a JSON
        }
      );

      if (!response.ok) {
        throw new Error("Error al enviar los datos");
      }

      const result = await response.json(); // Opcionalmente, manejar la respuesta de la API

      // Mostrar el toast de éxito
      toast.success("Datos enviados correctamente", {
        autoClose: 10000, // Duración en milisegundos (5000ms = 5 segundos)
      }); // Reiniciar el formulario
      reset();

      navigate("/success"); // Aquí redirigimos a la nueva vista
    } catch (error) {
      console.error("Error:", error);
      toast.error("Hubo un error al enviar los datos");
    } finally {
      // Detener la carga
      setIsLoading(false);
    }
  };

  const handleCategoryChange = (event) => {
    const { value, checked } = event.target;
    setSelectedCategories((prev) =>
      checked ? [...prev, value] : prev.filter((cat) => cat !== value)
    );

    // Limpiar subcategorías seleccionadas si la categoría es desmarcada
    if (!checked) {
      setSelectedSubcategories((prev) => ({
        ...prev,
        [value]: [], // Resetear subcategorías al desmarcar
      }));
      setOtherSubcategories((prev) => ({
        ...prev,
        [value]: undefined, // Resetear otras subcategorías al desmarcar
      }));
    }
  };

  const handleSubcategoryChange = (category, subcategory) => {
    console.log("Antes de actualizar:", selectedSubcategories); // Imprime el estado actual

    setSelectedSubcategories((prevState) => ({
      ...prevState,
      [category]: subcategory, // Almacena solo la subcategoría seleccionada
    }));

    console.log("Después de actualizar:", {
      ...selectedSubcategories,
      [category]: subcategory,
    }); // Verifica el estado después de la actualización

    // Limpiar "Otras" si se selecciona una subcategoría diferente
    if (subcategory !== "Otras") {
      setOtherSubcategories((prevState) => {
        const newState = { ...prevState };
        delete newState[category]; // Limpiar "Otras" si no es la opción seleccionada
        return newState;
      });
    }
  };

  return (
    <div>
      {/* Spinner que se muestra cuando isLoading es true */}
      {isLoading && (
        <div className="fixed inset-0 bg-gray-100 bg-opacity-75 flex items-center justify-center z-50">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
          <h2 className="text-center text-gray-600 text-xl font-semibold">
            Enviando datos...
          </h2>
        </div>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-full mx-auto mt-8 p-1 bg-white rounded-lg shadow-md text-left"
      >
        {/* Pregunta 0 */}
        <div className="mb-6">
          <h2 className="text-base font-medium mb-4">Ingrese su edad</h2>
          <input
            type="number" // Cambiamos el tipo a number para aceptar solo números
            {...register("edad", { required: true, min: 0 })} // Registra el campo con validaciones
            className="h-10 w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500" // Estilo del campo
            placeholder="Ingrese su edad" // Placeholder para guiar al usuario
          />
          {/* Mostrar error si no se ingresa la edad */}
          {errors.edad && (
            <span className="text-red-600">Este campo es obligatorio.</span>
          )}
        </div>

        {/* Pregunta 1 */}
        <div className="mb-6">
          <h2 className="text-base font-medium mb-4">
            1. ¿Con qué frecuencia Usted realiza compras de productos
            tecnológicos?
          </h2>
          <div className="space-y-3">
            {[
              "Nunca",
              "Raramente",
              "Ocasionalmente",
              "Frecuente",
              "Siempre",
            ].map((option) => (
              <div key={option} className="flex items-center space-x-3">
                <input
                  type="radio"
                  value={option}
                  id={option}
                  {...register("frecuenciaCompra", { required: true })}
                  className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                />
                <label htmlFor={option} className="text-gray-700">
                  {option}
                </label>
              </div>
            ))}
          </div>
          {/* Mostrar error si no se ingresa la edad */}
          {errors.frecuenciaCompra && (
            <span className="text-red-600">Este campo es obligatorio.</span>
          )}
        </div>

        {/* Pregunta 2 */}
        <div className="mb-6">
          <h2 className="text-base font-medium mb-4">
            2. ¿Cuánto tiempo Usted le dedica semanalmente a buscar o comprar un
            producto tecnológico?
          </h2>
          <div className="space-y-3">
            {[
              "Menos de 30 minutos",
              "Entre 30 minutos y 1 hora",
              "Más de 1 hora",
            ].map((option) => (
              <div key={option} className="flex items-center space-x-3">
                <input
                  type="radio"
                  value={option}
                  id={option}
                  {...register("tiempoBusqueda", { required: true })}
                  className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                />
                <label htmlFor={option} className="text-gray-700">
                  {option}
                </label>
              </div>
            ))}
          </div>
          {/* Mostrar error si no se ingresa la edad */}
          {errors.tiempoBusqueda && (
            <span className="text-red-600">Este campo es obligatorio.</span>
          )}
        </div>

        {/* Pregunta 3 (Opciones Múltiples) */}
        <div className="mb-6">
          <h2 className="text-base font-medium mb-4">
            3. ¿Cuáles son las características más importante que Usted
            considera antes de comprar algún producto tecnológico?
          </h2>
          <div className="space-y-3">
            {[
              "Marca",
              "Reseñas y calificaciones",
              "Precio",
              "Características técnicas",
              "Promociones o descuentos",
            ].map((option) => (
              <div key={option} className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  value={option}
                  id={option}
                  {...register("factoresImportantes", { required: true })}
                  className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                />
                <label htmlFor={option} className="text-gray-700">
                  {option}
                </label>
              </div>
            ))}
          </div>
          {/* Mostrar error si no se ingresa la edad */}
          {errors.factoresImportantes && (
            <span className="text-red-600">Este campo es obligatorio.</span>
          )}
        </div>

        {/* Pregunta 4 */}
        <div className="mb-6">
          <h2 className="text-base font-medium ">
            4. ¿Qué tan importante es para Usted conocer la disponibilidad del
            producto tecnológico antes de realizar la compra?
          </h2>
          <p className="text-sm mb-4">
            Cantidad de productos disponibles en stock para comprar.
          </p>
          <div className="space-y-3">
            {[
              "No es importante",
              "Poco importante",
              "Neutro",
              "Importante",
              "Muy importante",
            ].map((option) => (
              <div key={option} className="flex items-center space-x-3">
                <input
                  type="radio"
                  value={option}
                  id={option}
                  {...register("disponibilidad", { required: true })}
                  className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                />
                <label htmlFor={option} className="text-gray-700">
                  {option}
                </label>
              </div>
            ))}
          </div>
          {/* Mostrar error si no se ingresa la edad */}
          {errors.disponibilidad && (
            <span className="text-red-600">Este campo es obligatorio.</span>
          )}
        </div>

        {/* Pregunta 5 */}
        <div className="mb-6">
          <h2 className="text-base font-medium ">
            5. ¿Qué tan importante es para Usted visualizar el producto
            tecnológico antes de realizar la compra?
          </h2>
          <p className="text-sm mb-4">Visualizar el producto en imagen </p>
          <div className="space-y-3">
            {[
              "No es importante",
              "Poco importante",
              "Neutro",
              "Importante",
              "Muy importante",
            ].map((option, index) => (
              <div key={option} className="flex items-center space-x-3">
                <input
                  type="radio"
                  value={option}
                  id={`visualizar-${index}`} // Añadiendo un índice para hacerlo único
                  {...register("visualizar", { required: true })}
                  className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                />
                <label
                  htmlFor={`visualizar-${index}`}
                  className="text-gray-700"
                >
                  {option}
                </label>
              </div>
            ))}
          </div>
          {/* Mostrar error si no se ingresa la edad */}
          {errors.visualizar && (
            <span className="text-red-600">Este campo es obligatorio.</span>
          )}
        </div>

        {/* Pregunta 6 (Opciones Múltiples) */}
        <div className="mb-6">
          <h2 className="text-base font-medium mb-4">
            6. ¿Cuáles son las categorías de productos tecnológicos que Usted
            considera más relevantes al recibir recomendaciones?
          </h2>
          <div className="space-y-3">
            {[
              "Dispositivos moviles",
              "Computadoras y laptops",
              "Accesorios tecnológicos",
              "Dispositivos de entretenimiento",
              "Electrodomésticos",
            ].map((option) => (
              <div key={option} className="flex flex-col space-y-2">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    value={option}
                    id={option}
                    {...register("categoriasProductos", {
                      validate: (value) =>
                        selectedCategories.length > 0 ||
                        "Debe seleccionar al menos una categoría",
                    })}
                    onChange={handleCategoryChange}
                    className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                  />
                  <label htmlFor={option} className="text-gray-700">
                    {option}
                  </label>
                </div>

                {/* Subcategorías dinámicas */}
                {selectedCategories.includes(option) && (
                  <div className="ml-6">
                    <h3 className="text-md font-semibold mb-2">
                      ¿Cuál es la subcategoria de {option} que considera más
                      relevante al recibir recomendaciones?
                    </h3>
                    <div className="space-y-3">
                      {categoriasSubcategorias[option].map((subcategory) => (
                        <div
                          key={subcategory}
                          className="flex items-center space-x-3"
                        >
                          <input
                            type="radio"
                            {...register(`subcategoria.${option}`, {
                              required: `Debe seleccionar una subcategoría`,
                            })}
                            value={subcategory}
                            id={`${option}-${subcategory}`}
                            name={`${option}-subcategoria`}
                            onChange={() =>
                              handleSubcategoryChange(option, subcategory)
                            }
                            className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                          />
                          <label
                            htmlFor={`${option}-${subcategory}`}
                            className="text-gray-700"
                          >
                            {subcategory}
                          </label>

                          {/* Mostrar campo de texto si se selecciona "Otras" */}
                          {subcategory === "Otras" &&
                            selectedSubcategories[option]?.includes(
                              "Otras"
                            ) && (
                              <input
                                type="text"
                                {...register(`otrasSubcategorias.${option}`, {
                                  required: "Debe especificar una subcategoría",
                                })}
                                placeholder="Especificar subcategoría"
                                className="ml-4 p-2 border rounded-md"
                              />
                            )}
                        </div>
                      ))}
                    </div>

                    {/* Mostrar mensaje de error de subcategoría en rojo */}
                    {errors?.subcategoria?.[option] && (
                      <span className="text-red-500">
                        {"Debe seleccionar una subcategoria"}
                      </span>
                    )}

                    {/* Marcas dinámicas */}
                    {(selectedSubcategories[option] ||
                      otherSubcategories[option]) && (
                      <div className="ml-6 mt-4">
                        <h3 className="text-md font-semibold ">
                          ¿Cuál es la marca de{" "}
                          {selectedSubcategories[option] ||
                            otherSubcategories[option]}{" "}
                          que considera más relevante al recibir
                          recomendaciones?
                        </h3>
                        <p className="text-sm mb-2">
                          Indicar la marca respecto a la anterior pregunta.
                        </p>
                        <div className="space-y-3">
                          {marcasPorCategoria[option].map((brand) => (
                            <div
                              key={brand}
                              className="flex items-center space-x-3"
                            >
                              <input
                                type="radio"
                                value={brand}
                                id={`${option}-${brand}`}
                                name={`${option}-marca`}
                                {...register(`marca.${option}`, {
                                  required: `Debe seleccionar una marca`,
                                })}
                                className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                              />
                              <label
                                htmlFor={`${option}-${brand}`}
                                className="text-gray-700"
                              >
                                {brand}
                              </label>

                              {/* Mostrar campo de texto si se selecciona "Otras" */}
                              {brand === "Otras" &&
                                watch(`marca.${option}`) === "Otras" && (
                                  <input
                                    type="text"
                                    {...register(`otrasMarcas.${option}`, {
                                      required: "Debe especificar una marca",
                                    })}
                                    placeholder="Especificar marca"
                                    className="ml-4 p-2 border rounded-md"
                                  />
                                )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Mostrar mensaje de error de marca en rojo */}
                    {errors?.marca?.[option] && (
                      <span className="text-red-500">
                        {"Debe seleccionar una marca"}
                      </span>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
          {/* Mostrar mensaje de error general si no se selecciona ninguna categoría */}
          {errors.categoriasProductos && (
            <span className="text-red-500">
              {errors.categoriasProductos.message}
            </span>
          )}
        </div>

        {/* Pregunta  7 */}
        <div className="mb-6">
          <h2 className="text-base font-medium ">
            7. ¿Qué tan importante es para Usted comparar productos tecnológicos
            de diferentes tiendas para tomar una decisión de compra?
          </h2>
          <p className="text-sm mb-4">
            Comparar productos le permite evaluar opciones para tomar una
            decisión más informada.
          </p>

          <div className="space-y-3">
            {[
              "No es importante",
              "Poco importante",
              "Neutro",
              "Importante",
              "Muy importante",
            ].map((option, index) => (
              <div key={option} className="flex items-center space-x-3">
                <input
                  type="radio"
                  value={option}
                  id={`comparar-${index}`}
                  {...register("comparar", { required: true })}
                  className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                />
                <label htmlFor={`comparar-${index}`} className="text-gray-700">
                  {option}
                </label>
              </div>
            ))}
          </div>
          {errors.comparar && (
            <span className="text-red-600">Este campo es obligatorio.</span>
          )}
        </div>

        {/* Pregunta  8 */}
        <div className="mb-6">
          <h2 className="text-base font-medium ">
            8. ¿Qué tan importante es para Usted filtrar los productos
            tecnológicos para tomar una decisión de compra?
          </h2>
          <p className="text-sm mb-4">
            Filtrar productos le ayuda a reducir opciones y enfocarse en los que
            mejor se ajustan a sus preferencias.
          </p>

          <div className="space-y-3">
            {[
              "No es importante",
              "Poco importante",
              "Neutro",
              "Importante",
              "Muy importante",
            ].map((option, index) => (
              <div key={option} className="flex items-center space-x-3">
                <input
                  type="radio"
                  value={option}
                  id={`filtrar-${index}`}
                  {...register("filtrar", { required: true })}
                  className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                />
                <label htmlFor={`filtrar-${index}`} className="text-gray-700">
                  {option}
                </label>
              </div>
            ))}
          </div>
          {errors.filtrar && (
            <span className="text-red-600">Este campo es obligatorio.</span>
          )}
        </div>

        {/* Pregunta  9 */}
        <div className="mb-6">
          <h2 className="text-base font-medium mb-4">
            9. ¿Qué tan probable es que Usted siga una recomendación al momento
            de comprar equipos tecnológicos?
          </h2>
          <div className="space-y-3">
            {[
              "No es probable",
              "Poco probable",
              "Neutro",
              "Probable",
              "Muy probable",
            ].map((option, index) => (
              <div key={option} className="flex items-center space-x-3">
                <input
                  type="radio"
                  value={option}
                  id={`probable-${index}`}
                  {...register("probable", { required: true })}
                  className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                />
                <label htmlFor={`probable-${index}`} className="text-gray-700">
                  {option}
                </label>
              </div>
            ))}
          </div>
          {errors.probable && (
            <span className="text-red-600">Este campo es obligatorio.</span>
          )}
        </div>

        {/* Pregunta 10 */}
        <div className="mb-6">
          <h2 className="text-base font-medium mb-4">
            10. ¿Qué tan útil es para Usted las recomendaciones de productos
            tecnológicos que se basan en características y detalles similares de
            otros productos que le interesan?
          </h2>
          <div className="space-y-3">
            {["No es útil", "Poco útil", "Neutro", "Util", "Muy útil"].map(
              (option, index) => (
                <div key={option} className="flex items-center space-x-3">
                  <input
                    type="radio"
                    value={option}
                    id={`util-${index}`}
                    {...register("util", { required: true })}
                    className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                  />
                  <label htmlFor={`util-${index}`} className="text-gray-700">
                    {option}
                  </label>
                </div>
              )
            )}
          </div>
          {errors.util && (
            <span className="text-red-600">Este campo es obligatorio.</span>
          )}
        </div>

        {/* Pregunta 11 */}
        <div className="mb-6">
          <h2 className="text-base font-medium mb-4">
            11. ¿Cómo cree que las recomendaciones personalizadas podrían
            ayudarle a Usted en su proceso de compra?
          </h2>
          <div className="space-y-3">
            {[
              "Permitiría comparar diferentes opciones del equipo tecnológico",
              "Permitiría identificar el producto tecnológico que mejor se adapte a sus necesidades",
              "Permitiría tomar una decisión de compra más rápida y segura.",
            ].map((option, index) => (
              <div key={option} className="flex items-center space-x-3">
                <input
                  type="radio"
                  value={option}
                  id={`recomendacion-${index}`}
                  {...register("recomendacion", { required: true })}
                  className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                />
                <label
                  htmlFor={`recomendacion-${index}`}
                  className="text-gray-700"
                >
                  {option}
                </label>
              </div>
            ))}
          </div>
          {errors.recomendacion && (
            <span className="text-red-600">Este campo es obligatorio.</span>
          )}
        </div>

        {/* Botón de Enviar */}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow hover:bg-indigo-700 transition duration-200"
        >
          Enviar Respuestas
        </button>
      </form>
    </div>
  );
}

export default Formulario;
