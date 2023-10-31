"use client";
import { useState } from "react";
// import { Redirect } from 'next';

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loginError, setLoginError] = useState(null);

  const saveDataToLocalStorage = () => {
    localStorage.setItem("formData", JSON.stringify(formData));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3000/client/form/login/api?email=${formData.email}&password=${formData.password}`,
        {
          method: "GET",
        }
      );

      const responsejson = await response.json();
      console.log(responsejson);
        
      if (responsejson.userFound.length > 0) {
        saveDataToLocalStorage();
        // <Redirect to="/"/> //desbloquear esto cuando este arreglado la landing page
        location.replace("/");
        alert("Inicio de sesión exitoso");
      } else {
        // Inicio de sesión fallido, muestra un mensaje de error
        setLoginError(
          "Credenciales incorrectas. Por favor, inténtalo de nuevo."
        );
      }
    } catch (error) {
      // Maneja errores de red o del servidor
      console.error("Error al iniciar sesión:", error);
    }
  };

  return (
    <div className="flex  w-full h-screen flex-col">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center bg-gray px-10 py-20  "
      >
        <div className="">
          <label>Email:</label>
          <input
            className="w-full border-2 bg-white border-black-100 rounded-xl p-4 bg-transparent"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            className="w-full border-2 bg-white border-black-100 rounded-xl p-4 bg-transparent"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        <div className="mt-8 gap-y-4">
          <button
            type="submit"
            className="button"
          >
            Iniciar Sesión
          </button>
        </div>
      </form>
      {loginError && <p>{loginError}</p>}
    </div>
  );
}
