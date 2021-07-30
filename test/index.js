const assert = require('assert')
const fs = require('fs')
const path = require('path')
const Ajv = require('ajv').default
const { verifyJWT } = require('did-jwt')
const resolver = require('../util/didResolver')

const ajv = new Ajv()

// Assert Schemas are Base Schema complaint
const vcJSONSchema = require('../base-schema')

const validateBaseSchema = ajv.compile(vcJSONSchema)

const fixture = {
  'Email': {
    schema: '../schema/EmailCredentialSchema/v1.0/schema.json',
    sample: '../sample/EmailCredentialSchema/v1.0/sample-1'
  },
  'Phone': {
    schema: '../schema/PhoneCredentialSchema/v1.0/schema.json',
    sample: '../sample/PhoneCredentialSchema/v1.0/sample-1'
  }
}

const test = async () => {
  for (let schemaName of Object.keys(fixture)) {
    const { schema, sample } = fixture[schemaName]

    const emailCredentialSchema = JSON.parse(fs.readFileSync(path.resolve(__dirname, schema)))
    assert(validateBaseSchema(emailCredentialSchema), `${schemaName} Credential Schema not compliant with VC JSON Schemas v1.0`)

    const validateSchema = ajv.compile(emailCredentialSchema.schema)
    const sampleCredentialJWT = fs.readFileSync(path.resolve(__dirname, sample)).toString()
    await verifyJWT(sampleCredentialJWT, { resolver })
      .then(({ payload }) => validateSchema(payload.credentialSubject))
  }
}

test().then(() => {
  console.log('Success!')
  process.exit(0)
}).catch(e => {
  console.log('Failed with error', e)
  process.exit(1)
})
