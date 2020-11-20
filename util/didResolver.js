
const { Resolver } = require('did-resolver')
const EthrDIDResolver = require('ethr-did-resolver')

const ethrDIDResolver = EthrDIDResolver.getResolver({
  networks: [
    { name: 'rsk', rpcUrl: 'https://did.rsk.co:4444' }
  ]
})

module.exports = new Resolver(ethrDIDResolver)
