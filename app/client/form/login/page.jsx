'use client'
import { useState } from 'react';
import { Redirect } from 'next';
export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
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
      const response = await fetch('http://localhost:3000/client/form/login/api', {
        method: 'GET',
      });
      const data = await response.json();
      const dataArray = Object.keys(data).map(key => ({ key, value: data[key] }));
      const findEmail = dataArray[0].value.find(element => element.email === formData.email);
      const findPassword = dataArray[0].value.find(element => element.password === formData.password);
      console.log(findEmail);
     

      console.log(dataArray[0].value);
      

      if (response.ok && findEmail && findPassword) {
        // <Redirect to="/"/> //desbloquear esto cuando este arreglado la landing page
        alert('Inicio de sesión exitoso');
      } else {
        // Inicio de sesión fallido, muestra un mensaje de error
        setLoginError('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
      }
    } catch (error) {
      // Maneja errores de red o del servidor
      console.error('Error al iniciar sesión:', error);
    }
  };

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Iniciar Sesión</button>
      </form>
      {loginError && <p>{loginError}</p>}
    </div>
  );
}
