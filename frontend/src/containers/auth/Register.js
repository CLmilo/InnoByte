import React, { useState, useEffect} from 'react';
import 'firebase/auth';
import Layout from "../../hocs/Layout"
import { useAuth } from '../../context/authContext'
import { useNavigate } from 'react-router-dom';



export function Register(){
  let [ userRegister, setUser ] = useState({
    id_ethereum: '',
    token_ethereum: '',
    nombre: '',
    apellido: '',
    email: '',
    password:'',
    password2: '',
    facultad: 'FIIS',
  });
  
  const {signup, signupadd, logout} = useAuth();

  const navigate = useNavigate();
  const [error, setError] = useState();

  const handleChange = ({target: {name, value}}) => {
    setUser({...userRegister, [name]: value})
  }
  
  useEffect(() => {
    // Código que se ejecutará una sola vez al cargar la página
    console.log('La página se ha cargado.');
    async function startLogout() {
      await logout();
    }
    startLogout();
    
  }, []);

  function showDropDownMenuOne_form_layout_wizard3(el) {
    el.target.parentElement.children[1].classList.toggle("hidden");
  }
  function swaptextone_form_layout_wizard3(el) {
    const targetText = el.target.innerText;
    document.getElementById(
      "drop-down-content-setter-one_form_layout_wizard3"
    ).innerText = targetText;
    document
      .getElementById("drop-down-div-one_form_layout_wizard3")
      .classList.toggle("hidden");
      setUser({...userRegister, ["facultad"]: el.target.innerText})
  }

  let user2 = null

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(userRegister.password === userRegister.password2 && userRegister.nombre !== '' && userRegister.id_ethereum !== '' && userRegister.token_ethereum !== ''){
        try{
            user2 = await signup(userRegister.email, userRegister.password)
            signupadd(user2.user.uid, userRegister.id_ethereum, userRegister.nombre, userRegister.apellido, userRegister.facultad, userRegister.token_ethereum)
            navigate('/')
        }  
        catch (error){
            setError(error.message)
        }
    }
    else{
        alert ('No son iguales las contraseñas')
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
            Regístrate
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Nombres
              </label>
              <div className="mt-2">
                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Apellidos
              </label>
              <div className="mt-2">
                <input
                  id="apellido"
                  name="apellido"
                  type="text"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                ID Ethereum
              </label>
              <div className="mt-2">
                <input
                  id="id_ethereum"
                  name="id_ethereum"
                  type="text"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Private Key
              </label>
              <div className="mt-2">
                <input
                  id="privatekey"
                  name="token_ethereum"
                  type="password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={handleChange}
                />
              </div>
            </div>
            {/*inicio dropdown select*/}
            <div>
              <label className="block text-sm mt-2 font-medium leading-6 text-gray-900">
                Facultad
              </label>
              <div className="relative top-1">
                <div className="relative w-full mt-1 border border-gray-300 rounded outline-none dropdown-one">
                  <button
                    onClick={showDropDownMenuOne_form_layout_wizard3}
                    className="relative flex items-center justify-between w-full px-5 py-3"
                  >
                    <span
                      className="pr-4 text-sm font-medium text-gray-600"
                      id="drop-down-content-setter-one_form_layout_wizard3"
                    >
                      FIIS
                    </span>
                    <svg
                      id="rotate1"
                      className="absolute z-10 cursor-pointer right-5"
                      width={10}
                      height={6}
                      viewBox="0 0 10 6"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0.5 0.75L5 5.25L9.5 0.75"
                        stroke="#4B5563"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  <div
                    className="absolute right-0 z-20 hidden w-full px-1 py-2 bg-white border-t border-gray-200 rounded shadow top-12"
                    id="drop-down-div-one_form_layout_wizard3"
                  >
                    <a className="hover">
                      <p
                        className="p-3 text-sm leading-none text-gray-600 cursor-pointer hover:bg-indigo-100 hover:font-medium hover:text-indigo-700 hover:rounded"
                        onClick={swaptextone_form_layout_wizard3}
                      >
                        FIIS
                      </p>

                      <p
                        className="p-3 text-sm leading-none text-gray-600 cursor-pointer hover:bg-indigo-100 hover:font-medium hover:text-indigo-700 hover:rounded"
                        onClick={swaptextone_form_layout_wizard3}
                      >
                        FIEE
                      </p>
                    </a>
                    <a >
                      <p
                        className="p-3 text-sm leading-none text-gray-600 cursor-pointer hover:bg-indigo-100 hover:font-medium hover:text-indigo-700 hover:rounded"
                        onClick={swaptextone_form_layout_wizard3}
                      >
                        FC
                      </p>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            {/*fin dropdown select*/}
            <div>
              <label htmlFor="email" className="block text-sm mt-2 font-medium leading-6 text-gray-900">
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
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Repetir Contraseña
                </label>
                
              </div>
              <div className="mt-2">
                <input
                  id="password2"
                  name="password2"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="mt-8">
              <button
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Registrar
              </button>
            </div>

            <p className="mt-10 text-center text-sm text-gray-500">
            ¿Ya tienes una cuenta?{' '}
            <a href="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Inicia Sesión
            </a>
          </p>
        </div>
      </div>
      </form>
  </Layout> 
  )
}
