'use client'
import styles from './styles.module.css';
import {signIn, useSession} from 'next-auth/react'
import { useEffect, useState } from 'react';


export default function Register() {


    const {data: session} = useSession();
    console.log(session);

    //-Falta hacer que el session haga el post al back end, y vamos a utilizar como Passsword el EMAIL --//


    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        email: '',
        password: '',
    })

    



    const saveDataToLocalStorage = () =>{
        localStorage.setItem('formData', JSON.stringify(formData));
    }

    const [formError, setFormError] = useState({
        name: '',
        surname: '',
        email: '',
        password: '',
    })

    const validate = () => {
        let validateErrors = {
            name: '',
            surname: '',
            email: '',
            password: '',
        }

        if (!formData.name) {
            validateErrors.name = 'El nombre es requerido'
        }

        if (!formData.surname) {
            validateErrors.surname = 'El apellido es requerido'
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const responde = await fetch('http://localhost:3000/client/form/signIn/api', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name,
            surname: formData.surname,
            email: formData.email,
            password: formData.password,
          }),
        });
        validate();

        if (isFormValid && responde.ok){
            saveDataToLocalStorage();
            
            alert('formulario valido');
        }else{
            alert('formulario invalido');
        }
        

        
        }


        //------------------------- cosas para registro por google---------------------------/




        //------------------------------------- hasta aca-----------------------------------/
    


    return(
        <form className={styles.form}>
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
          <label htmlFor="surname">Apellido: </label>
          <input
            type="text"
            id="surname" //este id es para el label
            name="surname"
            value={formData.surname}
            onChange={handleInputChange}
          />
          <p>{formError.surname}</p>
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
  
        <button  onSubmit={handleSubmit} type="submit" disabled={!isFormValid} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'>Registrarse</button>
        <br></br>
        <button onClick={async()=>await signIn(undefined, { callbackUrl: '/home' })} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'>Google</button>

      </form>
    )
}

