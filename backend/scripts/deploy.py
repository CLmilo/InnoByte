from brownie import accounts, InnoByte, config, network


def deploy_innobyte():
    account = get_account()
    innobyte = InnoByte.deploy({"from": account})
    # mint = innobyte.mint("http...1")
    total_supply = innobyte.totalSupply()
    print(total_supply)


def get_account():
    if network.show_active() == "development":
        return accounts[0]
    else:
        return accounts.add(config["wallets"]["from_key"])


def main():
    deploy_innobyte()
