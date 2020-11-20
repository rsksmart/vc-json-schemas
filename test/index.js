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

const emailCredentialSchema = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../schema/EmailCredentialSchema/v1.0/schema.json')))

assert(validateBaseSchema(emailCredentialSchema), 'Not compliant with VC JSON Schemas v1.0')

// Assert Samples are Schema complaint
const validateEmailSchema = ajv.compile(emailCredentialSchema.schema)

const sampleCredentialJWT = fs.readFileSync(path.resolve(__dirname, '../sample/EmailCredentialSchema/v1.0/sample-1')).toString()

verifyJWT(sampleCredentialJWT, { resolver })
  .then(({ payload }) => validateEmailSchema(payload.credentialSubject))
