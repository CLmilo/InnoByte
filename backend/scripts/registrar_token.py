import os
from brownie import accounts, InnoByte, config, network
import hashlib
import json
from datetime import datetime
import shutil
import sys

ruta_imagenes_subidas = "../archivos/"
ruta_nfts_subidas = "../imagenes_nft/"
args = sys.argv


def generar_hash_archivo(imagen_porsubir):
    ruta = imagen_porsubir
    sha256 = hashlib.sha256()
    with open(ruta, "rb") as file:
        # Lee el archivo en bloques de 4096 bytes para mayor eficiencia
        for bloque in iter(lambda: file.read(4096), b""):
            sha256.update(bloque)
    return sha256.hexdigest()


def generar_json(hash256, nombre_patente, cuenta_creador, nombre, dni, extension, facultad):
    datos = {
        "hash256": hash256,
        "nombre_patente": nombre_patente[0:100],
        "creador": str(cuenta_creador),
        "nombre": nombre[0:100],
        "DNI": dni[0:10],
        "fecha": str(datetime.now()),
        "tipo_archivo": extension,
        "facultad": facultad
    }
    json_datos = json.dumps(datos, indent=4, ensure_ascii=False)
    return json_datos


def read_contract():
    account = get_account()
    innobyte_contract_actual = InnoByte[-1]
    total_minados = innobyte_contract_actual.totalSupply()
    print(total_minados)
    print(account)
    print(innobyte_contract_actual.name())


def crear_token(account, json_data):
    json_data_loaded = json.loads(json_data)
    id_hash = json_data_loaded["hash256"]
    nfts = os.listdir(ruta_nfts_subidas)
    nfts_nombres = [archivo.split(".")[0] for archivo in nfts]
    if not (id_hash in nfts_nombres):
        innobyte_contract_actual = InnoByte[-1]
        innobyte_contract_actual.mint(json_data, {'from': account})
        return True
    else:
        return False


def get_account():
    if network.show_active() == "development":
        return accounts[0]
    else:
        return accounts.add(config["wallets"]["from_key"])


def subir_nft_archivo(imagen_porsubir, hash):
    extension = imagen_porsubir.split(".")[-1]
    ruta_destino = ruta_nfts_subidas + hash + "." + extension
    shutil.move(imagen_porsubir, ruta_destino)


def registrar_token(imagen_porsubir, nombre_patente, nombre, dni, facultad):
    account = get_account()
    hash = generar_hash_archivo(imagen_porsubir)
    extension = imagen_porsubir.split(".")[-1]
    contenido_json = generar_json(
        hash, nombre_patente, account, nombre, dni, extension, facultad)
    resultado = crear_token(account, contenido_json)
    if resultado:
        subir_nft_archivo(imagen_porsubir, hash)
        print("Registro exitoso")
    else:
        print("Hubo un problema")


imagen_porsubir = '../archivos/cuboraro.jpg'


def main():
    registrar_token(imagen_porsubir, "Cubo Extraño",
                    "JOSEPH MOTTOCCANCHE", "77050107", "FIIS")
