from brownie import InnoByte, config, accounts
import json


def listar_token():
    innobyte_contract_actual = InnoByte[-1]
    totalSupply = innobyte_contract_actual.totalSupply()
    json_data = {}
    for i in range(totalSupply):
        json_data[i] = json.loads(innobyte_contract_actual.InnoByteNFTS(i))

    return json_data


def get_account(private_key):
    return accounts.add(private_key)


def listar_cuenta(token):
    account = get_account(token)
    innobyte_contract_actual = InnoByte[-1]
    totalAccount = innobyte_contract_actual.balanceOf(account)
    json_data = {}
    for i in range(totalAccount):
        json_data[i] = json.loads(innobyte_contract_actual.InnoByteNFTSs
                                  (innobyte_contract_actual.tokenOfOwnerByIndex(account, i)))
    return json_data


def main():
    # print(listar_token())
    listar_cuenta(
        "d3eb40b0bbc9c1c9a76e9a615aa6767bb3d3c9f4dc1cfaa75e622969b2a64603")
