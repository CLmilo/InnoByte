const {assert} = require('chai')

const InnoByte = artifacts.require('./InnoByte')

require('chai')
.use(require('chai-as-promised'))
.should()

contract('InnoByte', (accounts) => {
    let contract

    before( async () =>  {
        contract = await InnoByte.deployed()
    })

    //1. Probar despliegue

    describe('deployment', async () =>{
        //a. despliegue correcto
        it('deploys successfuly', async() =>{
            const address = contract.address;
            assert.notEqual(address, '')
            assert.notEqual(address, null)
            assert.notEqual(address, undefined)
            assert.notEqual(address, 0x0)
        })

        //b. acceso a variables
        it('has a name', async() =>{
            const name = await contract.name()
            assert.equal(name, 'InnoByte')
        })
        it('has a symbol', async() =>{
            const symbol = await contract.symbol()
            assert.equal(symbol, 'MOTT')
        })
    })
    describe('minting', async() =>{
        it('creates a new token', async() =>{
            const result = await contract.mint('https...1')
            const totalSupply = await contract.totalSupply()

            // todo bien?
            assert.equal(totalSupply,1)
            const event = result.logs[0].args
            assert.equal(event.from, '0x0000000000000000000000000000000000000000', 'from the contract')
            assert.equal(event.to, accounts[0], 'to is msg.sender')

            // Algo salio mal
            await contract.mint('https...1').should.be.rejected
        })
    })
    //3. probar indices
    describe('indexing', async()=>{
        it('lists innobytes', async()=>{
            //mintear 3 nuevos tokens
            await contract.mint('https...2')
            await contract.mint('https...3')
            await contract.mint('https...4')
            const totalSupply = await contract.totalSupply()

            // Loop a travez de la lista de tokens y agregar
            let result = []
            let InnoByte
            for( i = 1; i <= totalSupply; i++){
                InnoByte = await contract.InnoByteNFTS(i - 1)
                result.push(InnoByte)
            }
        })
    })
})