"use client";
import { signIn, useSession } from "next-auth/react";
import { useState } from "react";
// import { Redirect } from 'next';

export default function Login() {
  const { data: session } = useSession();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loginError, setLoginError] = useState(null);

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
        `/client/form/login/api?email=${formData.email}&password=${formData.password}`,
        {
          method: "GET",
        }
      );

      const responsejson = await response.json();
      // console.log(responsejson);

      if (responsejson.userFound.length > 0) {
        // saveDataToLocalStorage();
        localStorage.email = responsejson.userFound[0].email;
        localStorage.name = responsejson.userFound[0].name;
        // localStorage.setItem("email", responsejson.userFound[0].email);
        // localStorage.setItem("name", responsejson.userFound[0].name);
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
    <div className="max-w-md mx-auto p-4 space-y-4">
      <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 space-y-1">
        <div className="">
          <label>Email:</label>
          <input
            className="w-full border-2 bg-white border-black-100 rounded-xl p-2 bg-transparent"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            className="w-full border-2 bg-white border-black-100 rounded-xl p-2 bg-transparent"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>

        <div className="mt-4 gap-y-4">
          <button
            type="submit"
            className="w-full bg-blue-Nav hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            style={{ marginTop: "1rem" }}
          >
            Iniciar Sesión
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              signIn(undefined, { callbackUrl: "/" });
            }}
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
          >
            Google
          </button>
        </div>
      </form>
      {loginError && <p>{loginError}</p>}
    </div>
  );
}
