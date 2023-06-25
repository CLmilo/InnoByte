import asyncio
import time
from brownie import accounts, InnoByte, config, network
import os
from flask import Flask, request, send_from_directory
import subprocess
from datetime import datetime
import json
import hashlib
import shutil
import fitz
import pyrebase
from PIL import Image

x = datetime.now()

# Initializing flask app
app = Flask(__name__)

# Route for seeing a data


@app.route('/upload', methods=['POST'])
def upload_file():
    archivo = request.files['archivo']
    # Obtener la ubicación absoluta donde deseas guardar el archivo
    ubicacion_archivo = ruta_nfts_raw + '\\' + archivo.filename
    print(ubicacion_archivo)
    archivo.save(ubicacion_archivo)
    # Realizar acciones adicionales con el archivo guardado
    return 'Archivo guardado exitosamente'


@app.route('/data', methods=['POST'])
def create_token():
    nombre_archivo = request.form.get('nombre_archivo')
    ruta_archivo = ruta_nfts_raw + "\\" + nombre_archivo
    nombre_patente = request.form.get('nombre_patente')
    nombre_autor = request.form.get('nombre_autor')
    facultad = request.form.get('facultad')
    descripcion = request.form.get('descripcion')
    private_key = request.form.get('private_key')
    print(private_key, ruta_archivo, ruta_archivo, nombre_patente,
          nombre_autor, facultad, descripcion)
    registrar_token(private_key, nombre_archivo, ruta_archivo, nombre_patente,
                    nombre_autor, facultad, descripcion)

    return 'Datos Recibidos'


@app.route('/data', methods=['GET'])
def get_total():
    if request.method == 'GET':
        if (request.args.get('get') == "totalContratos"):
            resultado = listar_token()
            return resultado


@app.route('/imagenes', methods=['GET'])
def get_imagen():
    # archivos = os.listdir(ruta_nfts_subidas)
    if request.method == 'GET':
        print(request.args.get('id'))
        url = obtener_archivo_firebase(request.args.get('id'))
        print(url)
        return url


@app.route('/dataAccount', methods=['GET'])
def get_total_account():
    if request.method == 'GET':
        resultado = listar_cuenta(request.args.get('token'))
        return resultado


# Funciones de Brownie
ruta_nfts_subidas = r'E:\proyectos\NFT\app_web_NFT\ANE_PROJECT_NFT\brownie-innobyte\imagenes_nft'
ruta_nfts_raw = r'E:\proyectos\NFT\app_web_NFT\ANE_PROJECT_NFT\brownie-innobyte\archivos'

config = {
    "apiKey": "AIzaSyDoukhjs7RwgLLrmFt6H9dLB2ZATk9HTq8",
    "authDomain": "innobyte-anne.firebaseapp.com",
    "projectId": "innobyte-anne",
    "storageBucket": "innobyte-anne.appspot.com",
    "messagingSenderId": "201978606670",
    "appId": "1:201978606670:web:94907c881fc4266cd7ff1f",
    "measurementId": "G-RLJ10N6FK5",
    "databaseURL": ""
}

firebase = pyrebase.initialize_app(config)


def obtener_archivo_firebase(hash):
    storage = firebase.storage()
    url = storage.child(hash).get_url(None)
    return url


def listar_token():
    innobyte_contract_actual = InnoByte[-1]
    totalSupply = innobyte_contract_actual.totalSupply()
    json_data = {}
    for i in range(totalSupply):
        json_data[i] = json.loads(innobyte_contract_actual.InnoByteNFTS(i))

    return json_data


def listar_cuenta(token):
    account = get_account(token)
    innobyte_contract_actual = InnoByte[-1]
    totalAccount = innobyte_contract_actual.balanceOf(account)
    json_data = {}
    for i in range(totalAccount):
        json_data[i] = json.loads(innobyte_contract_actual.InnoByteNFTS
                                  (innobyte_contract_actual.tokenOfOwnerByIndex(account, i)))
    return json_data


def generar_hash_archivo(imagen_porsubir):
    ruta = imagen_porsubir
    sha256 = hashlib.sha256()
    with open(ruta, "rb") as file:
        # Lee el archivo en bloques de 4096 bytes para mayor eficiencia
        for bloque in iter(lambda: file.read(4096), b""):
            sha256.update(bloque)
    return sha256.hexdigest()


def generar_json(hash256, nombre_patente, cuenta_creador, nombre, extension, facultad, descripcion):
    datos = {
        "hash256": hash256,
        "nombre_patente": nombre_patente[0:100],
        "creador": str(cuenta_creador),
        "nombre": nombre[0:100],
        "fecha": str(datetime.now()),
        "tipo_archivo": extension,
        "facultad": facultad,
        "descripcion": descripcion[0:100]
    }
    json_datos = json.dumps(datos, indent=4, ensure_ascii=False)
    return json_datos


def crear_token(account, json_data):
    json_data_loaded = json.loads(json_data)
    id_hash = json_data_loaded["hash256"]
    nfts = os.listdir(ruta_nfts_subidas)
    nfts_nombres = [archivo.split(".")[0] for archivo in nfts]
    print("la lista de nfts_nombres es: ", nfts_nombres)
    print(id_hash)
    if not (id_hash in nfts_nombres):
        try:
            innobyte_contract_actual = InnoByte[-1]
            innobyte_contract_actual.mint(json_data, {'from': account})
            return True
        except Exception as e:
            print("sucedió un error con:")
            print(json_data)
            print(e)

    else:
        return False


def get_account(private_key):
    return accounts.add(private_key)


def image_convert_to_square(ruta):
    image = Image.open(ruta)
    width, height = image.size

    size = min(width, height)

    square_image = Image.new('RGB', (size, size), (255, 255, 255))

    square_image.paste(image, (0, 0))
    square_image.save(ruta)


def pdf_to_image(ruta_archivo, nombre_archivo):
    mat = fitz.Matrix(1.0, 1.0)
    doc = fitz.open(ruta_archivo)
    pix = doc[0].get_pixmap(matrix=mat)
    pix.save(ruta_nfts_raw+"\\"+nombre_archivo+".jpg")

    image_convert_to_square(ruta_nfts_raw+"\\"+nombre_archivo+".jpg")


def subir_nft_archivo(nombre_archivo, imagen_porsubir, hash):
    nombre_archivo = nombre_archivo.split(".")[0]
    pdf_to_image(imagen_porsubir, nombre_archivo)
    ruta_destino = ruta_nfts_subidas + "\\" + hash + ".jpg"
    ruta_origen = ruta_nfts_raw + "\\" + nombre_archivo + ".jpg"
    print("la ruta destino es:", ruta_destino,
          "la ruta por subir es:", ruta_origen)
    shutil.move(ruta_origen, ruta_destino)
    time.sleep(2)
    subir_archivo_firebase(ruta_destino, hash)


def subir_archivo_firebase(ruta_destino, hash):
    storage = firebase.storage()
    storage.child(hash).put(
        ruta_destino)


def registrar_token(token_cuenta, nombre_archivo, imagen_porsubir, nombre_patente, nombre, facultad, descripcion):
    account = get_account(token_cuenta)
    hash = generar_hash_archivo(imagen_porsubir)
    print(hash)
    extension = imagen_porsubir.split(".")[-1]
    contenido_json = generar_json(
        hash, nombre_patente, account, nombre, extension, facultad, descripcion)
    resultado = crear_token(account, contenido_json)
    if resultado:
        print("Estoy llgeando aquí")
        print(nombre_archivo, imagen_porsubir, hash)
        subir_nft_archivo(nombre_archivo, imagen_porsubir, hash)
        print("Registro exitoso")
    else:
        print("Hubo un problema")

# Running app


def main():
    app.run(debug=True)
