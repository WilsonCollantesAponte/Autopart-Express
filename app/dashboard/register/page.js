'use client'
import styles from './styles.module.css';

import { useEffect, useState } from 'react';
export default function Register() {

    const [formData, setFormData] = useState({
        name: '',
        lastname: '',
        email: '',
        password: '',
    })


    const [formError, setFormError] = useState({
        name: '',
        lastname: '',
        email: '',
        password: '',
    })

    const validate = () => {
        let validateErrors = {
            name: '',
            lastname: '',
            email: '',
            password: '',
        }

        if (!formData.name) {
            validateErrors.name = 'El nombre es requerido'
        }

        if (!formData.lastname) {
            validateErrors.lastname = 'El apellido es requerido'
        }

        if (!formData.email && !formData.email.includes(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test)) {
            validateErrors.email = 'El email es requerido o no es valido'
        }

        if (!formData.password || formData.password.length <= 8) {
            validateErrors.password = 'La contraseña es requerida o debe tener mas de 8 caracteres'
        }

        setFormError(validateErrors)
    }
    useEffect(() => {
        validate();
    }
    , [formData])

    const isFormValid = !Object.values(formError).some((error) => error);

    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
        validate();
        }

    const handleSubmit = (e) => {
        e.preventDefault();
        //aca se realiza la logica de envio de datos al servidor
        validate();

        if (isFormValid){
            alert('formulario valido');
        }else{
            alert('formulario invalido');
        }
        console.log(formData);
        }
    


    return(
        <form className={styles.form} onSubmit={handleSubmit}>
        <h1>Registro</h1>
        <br></br>
        <div>
          <label htmlFor="name">Nombre de usuario: </label>
          <input
            type="text"
            id="name" //este id es para el label
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
           <p>{formError.name}</p>
        </div>

        <div>
          <label htmlFor="lastname">Apellido: </label>
          <input
            type="text"
            id="lastname" //este id es para el label
            name="lastname"
            value={formData.lastname}
            onChange={handleInputChange}
          />
          <p>{formError.lastname}</p>
        </div>
  
        <div>
          <label htmlFor="email">Correo electrónico: </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
            <p>{formError.email}</p>
        </div>
  
        <div>
          <label htmlFor="password">Contraseña: </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
            <p>{formError.password}</p>
        </div>
  
        <button type="submit" disabled={!isFormValid} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'>Registrarse</button>
        <br></br>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Registrarse con gmail</button>
      </form>
    )
}

