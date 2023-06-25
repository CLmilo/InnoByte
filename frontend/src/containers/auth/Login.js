import React, { useState, useEffect } from 'react';
import 'firebase/auth';
import Layout from "../../hocs/Layout"
import {useAuth} from '../../context/authContext'
import { useNavigate } from 'react-router-dom';


export function Login(){
  const [ userLogin, setUserLogin ] = useState({
    email: '',
    password:''
  });
  const {login, logout} = useAuth()
  const [error, setError] = useState();

  const handleChange = ({target: {name, value}}) => {
    setUserLogin({...userLogin, [name]: value})
  }

  const navigate = useNavigate();

  useEffect(() => {
    // Código que se ejecutará una sola vez al cargar la página
    console.log('La página se ha cargado.');
    async function startLogout() {
      await logout();
    }
    startLogout();
    
  }, []);

  const handleSubmit = async (e) => {
    console.log("enviando datos para login")
    e.preventDefault()
    try{
        await login(userLogin.email, userLogin.password);
        navigate('/')

      }
      catch (error){
        setError(error.message)
    }
  }
  
  return (
    <Layout>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tuk-cdn.s3.amazonaws.com/can-uploader/footer_5_marketing_svg1.svg"
            alt="InnoByte"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Inicia Sesión
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Correo
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Contraseña
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <button
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Iniciar Sesión
              </button>
            </div>
          <p className="mt-10 text-center text-sm text-gray-500">
            ¿No tienes una cuenta?{' '}
            <a href="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Regístrate
            </a>
          </p>
        </div>
      </div>
      </form>
  </Layout> 
  )
}
