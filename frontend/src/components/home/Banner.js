import { useNavigate } from 'react-router-dom';

function Banner(){

    const navigate = useNavigate();

    const handleCrearNFT = () =>{
        navigate('/Create')
    }

    return(
        <div className="bg-white">
            <div className="grid md:grid-cols-2">
                <div className="max-w-7xl my-auto mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
                    <div className="text-center">
                    <p className="mt-1 text-4xl font-medium text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
                    ¡Descubre una forma de proteger tus creaciones!
                    </p>
                    <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
                    Usando NFT para asegurarlos para siempre.
                    </p>
                    <button
                        type="button"
                        className="mt-8 mx-2 inline-flex items-center px-12 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Encontrar
                    </button>
                    <button
                        type="button"
                        className="mt-8 mx-2 inline-flex items-center px-12 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={handleCrearNFT}
                    >
                        Crear
                    </button>
                    </div>
                    
                </div>
                <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
                    <img src="./logo_uni.png" alt="" className="h-full w-full"/>
                </div>

            </div>
            
        </div>
    )
}

export default Banner