'use client'
import Link from 'next/link';
import styles from './styles.module.css';
import {useState} from 'react'
import { gapi } from 'gapi-script';
import { GoogleLogin } from 'react-google-login';
import { useEffect } from 'react';

export default function Login(){
    const [formData, setFormData] = useState({ email: '', password: '' });

    const apiClient = "173444235507-cfg95v9p9u0lb0vbdnb7i583f15i8na1.apps.googleusercontent.com"

    useEffect(() => {
        gapi.load('client:auth2', () => {
          gapi.client.init({
            clientId: apiClient,
            scope: 'email',
          });
        });
    }, [])

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const onSuccess = (res) => {
        console.log(res)
    }

    const onFailure = () => {
        console.log("algo salio mal")
        
    }

    const handleSubmit = (e) => {
      e.preventDefault();
  
      // Aquí puedes realizar la lógica de autenticación, como enviar los datos al servidor o verificar en la base de datos.
   
    };
  
    return (
      <div className={styles.form}>
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit} >
          <div>
            <label htmlFor="email">E-mail:</label>
            <input
              type="text"
              name="email"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <button type="submit">Iniciar Sesión</button>
            <GoogleLogin
                apiClient={apiClient}
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_policy'}
                />
          </div>
        </form>
      </div>
    );
  }
