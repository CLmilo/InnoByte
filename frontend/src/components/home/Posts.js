import { useState, useEffect} from "react";

function Posts() {
    // const ruta_imagenes = "http://localhost:5000/imagenes?id="

    const [data, setData] = useState(null);
    
    useEffect(() => {
      fetch('/data?get=totalContratos')
        .then((response) => response.json())
        .then((jsonData) => {
          setData(jsonData);
        })
        .catch((error) => {
          console.error('Error al obtener los datos:', error);
        });
    }, []);
    
    let dataArray = data !== null ? Object.values(data) : [];

    return (
        <>
          <div className="relative bg-gray-50 pt-16 pb-20 px-4 sm:px-6 lg:pt-10 lg:pb-28 lg:px-8">
      <div className="absolute inset-0">
        <div className="bg-white h-1/3 sm:h-2/3" />
      </div>
      <div className="relative max-w-fit mx-auto">
        <div className="text-center">
          <h2 className="text-3xl tracking-tight font-bold text-gray-900 sm:text-4xl">NFTS Públicos</h2>
          
        </div>
        <div className="mt-12 max-w-fit mx-auto grid gap-5  2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
          {dataArray && dataArray.map((item) => (
            <div className="flex flex-col rounded-lg shadow-lg overflow-hidden">
              <div className="flex-shrink-0">
                <img className="h-120 w-full object-cover" src={"https://firebasestorage.googleapis.com/v0/b/innobyte-anne.appspot.com/o/"+item.hash256+"?alt=media"} alt="" />
              </div>
              <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                <div className="flex-1">
                  <div className="block mt-2">
                    <p className="text-xl font-semibold text-gray-900">{item.nombre_patente}</p>
                    {/*Descripción*/}
                    {item.descripcion === '' ? (<p className="mt-3 text-base text-gray-500">Sin Descripción</p>) : (<p className="mt-3 text-base text-gray-500">{item.descripcion}</p>) }

                    <p className="mt-3 text-l font-semibold text-gray-900">Autor: {item.nombre}</p>
                    <p className="mt-3 text-l font-semibold text-gray-500 ">ID Autor: {item.creador.slice(0,18)}...</p>
                    <p className="mt-3 text-l font-semibold text-gray-500 ">Hash: {item.hash256.slice(0,23)}...</p>
                  </div>
                  <a
                    href={item.dni}
                    className="inline-flex float-right mt-4 items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Download
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
        </>
    );
}

export default Posts