const assert = require('assert')
const fs = require('fs')
const path = require('path')
const Ajv = require('ajv').default
const { Resolver } = require('did-resolver')
const EthrDIDResolver = require('ethr-did-resolver')
const { verifyJWT } = require('did-jwt')

const ajv = new Ajv()

// Assert Schemas are Base Schema complaint
const vcJSONSchema = require('../base-schema')
const { parse } = require('path')

const validateBaseSchema = ajv.compile(vcJSONSchema)

const emailCredentialSchema = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../schema/EmailCredentialSchema/v1.0/schema.json')))

assert(validateBaseSchema(emailCredentialSchema), 'Not compliant with VC JSON Schemas v1.0')

// Assert Samples are Schema complaint
const validateEmailSchema = ajv.compile(emailCredentialSchema.schema)

const sampleCredentialJWT = fs.readFileSync(path.resolve(__dirname, '../sample/EmailCredentialSchema/v1.0/sample-1')).toString()

const ethrDIDResolver = EthrDIDResolver.getResolver({
  networks: [
    { name: 'rsk', rpcUrl: 'https://did.rsk.co:4444' }
  ]
})

let resolver = new Resolver(ethrDIDResolver)

verifyJWT(sampleCredentialJWT, { resolver } )
  .then(({ payload }) => validateEmailSchema(payload.credentialSubject))
