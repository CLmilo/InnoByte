from brownie import accounts, InnoByte


def test_deploy():
    account = accounts[0]
    innobyte = InnoByte.deploy({"from": account})
    starting_value = innobyte.totalSupply()
    expected = 0

    assert starting_value == expected


def test_minando():
    account = accounts[0]
    innobyte = InnoByte.deploy({"from": account})
    innobyte.mint("http...1", {"from": account})
    expected = 1

    assert expected == innobyte.totalSupply()
