
const { Resolver } = require('did-resolver')
const EthrDIDResolver = require('ethr-did-resolver')
const { createJWT, verifyJWT, SimpleSigner } = require('did-jwt')

const ethrDIDResolver = EthrDIDResolver.getResolver({
  networks: [
    { name: 'rsk', rpcUrl: 'https://did.rsk.co:4444' }
  ]
})

let resolver = new Resolver(ethrDIDResolver)

const signer = SimpleSigner('9b2431dc63881855a47a9ab500a9f0e1a1f3620d4dfb5267c8c9db94178280ea')

const trace = x => { console.log(x); return x}
createJWT(
  {
    "@context": [
      "https://www.w3.org/2018/credentials/v1",
      "https://www.w3.org/2018/credentials/examples/v1" // set your schema
    ],
    "type": ["VerifiableCredential", "Email"],
    "credentialSchema": {
      "id": "did:ethr:rsk:0x8a32da624dd9fad8bf4f32d9456f374b60d9ad28;id=1eb2af6b-0dee-6090-cb55-0ed093f9b026;version=1.0", // schema id
      "type": "JsonSchemaValidator2018"
    },
    "credentialSubject": {
      "id": "did:ethr:rsk:0x8a32da624dd9fad8bf4f32d9456f374b60d9ad28",
      "emailAddress": "ilan@iovlabs.org"
    },
    "exp": 1921208875
  },
  {
    alg: 'ES256K',
    issuer: 'did:ethr:rsk:0x8a32da624dd9fad8bf4f32d9456f374b60d9ad28', // set your did
    signer
  }).then(trace)
    .then(jwt => verifyJWT(jwt, { resolver } ))
    .then(trace)