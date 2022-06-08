const assert = require('assert')
const Ajv = require('ajv').default
const { verifyJWT } = require('did-jwt')
const resolver = require('../util/didResolver')
const addFormats = require('ajv-formats')

const ajv = new Ajv()
addFormats(ajv)

// Assert Schemas are Base Schema complaint
const vcJSONSchema = require('../base-schema')

const validateBaseSchema = ajv.compile(vcJSONSchema)

const fixture = {
  'Email': {
    schema: require("../schema/EmailCredentialSchema/v1.0/schema.json"),
    sample: require("../sample/EmailCredentialSchema/v1.0/sample-1.json")
  },
  'Phone': {
    schema: require('../schema/PhoneCredentialSchema/v1.0/schema.json'),
    sample: require('../sample/PhoneCredentialSchema/v1.0/sample-1.json')
  },
  'Profile': {
    schema: require('../schema/ProfileCredentialSchema/v1.0/schema.json')
  }
}

const test = async () => {
  for (let schemaName of Object.keys(fixture)) {
    console.log('Testing', schemaName)
    const { schema, sample } = fixture[schemaName]
    console.log("schema: ", schema);
    const credentialSchema = schema; //JSON.parse(fs.readFileSync(path.resolve(__dirname, schema)))
    assert(validateBaseSchema(credentialSchema), `${schemaName} Credential Schema not compliant with VC JSON Schemas v1.0`)

    const validateSchema = ajv.compile(credentialSchema.schema)
    if (sample) {
      const sampleCredentialJWT = sample.sample.toString(); //fs.readFileSync(path.resolve(__dirname, sample)).toString()
      console.log("sampleCredential")
      await verifyJWT(sampleCredentialJWT, { resolver })
        .then(({ payload }) => validateSchema(payload.credentialSubject))
    } else {
      console.log("no sample found for schema")
    }
  }
}

test().then(() => {
  console.log('Success!')
  process.exit(0)
}).catch(e => {
  console.log('Failed with error', e)
  process.exit(1)
})
