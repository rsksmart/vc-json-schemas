<p align="middle">
  <img src="https://www.rifos.org/assets/img/logo.svg" alt="logo" height="100" >
</p>
<h3 align="middle"><code>vc-json-schemas</code></h3>
<p align="middle">
  A repository of JSON Schemas for Verifiable Credentials
</p>
<p align="middle">
  <a href="https://github.com/rsksmart/vc-json-schemas/actions?query=workflow%3Aci">
    <img src="https://github.com/rsksmart/vc-json-schemas/workflows/ci/badge.svg" />
  </a>
  <a href="https://github.com/rsksmart/vc-json-schemas/actions?query=workflow%3Acd">
    <img src="https://github.com/rsksmart/vc-json-schemas/workflows/cd/badge.svg" />
  </a>
  <a href="https://badge.fury.io/js/%40rsksmart%2Fvc-json-schemas">
    <img src="https://badge.fury.io/js/%40rsksmart%2Fvc-json-schemas.svg" alt="npm" />
  </a>
</p>

The **Credential Schema** is a document that is used to guarantee the structure, and by extension the semantics, of the set of claims comprising a Verifiable Credential. A shared Credential Schema allows all parties to reference data in a known way<sup><a href="https://w3c-ccg.github.io/vc-json-schemas/#overview">1</a></sup>

References:
- [Verifiable Credentials Data Model 1.0](https://www.w3.org/TR/vc-data-model/)
- [Verifiable Credentials JSON Schema Specification](https://w3c-ccg.github.io/vc-json-schemas/)

## Overview

This repository contains a set of Credential Schemas. These schemes are hosted and available for use by the community. The objective is to provide a standard, reusable and extensible set of schemas that can be used over different applications enabling the portability of user's information.

For example, if a trusted service like [NeverBounce](https://neverbounce.com/) verifies an email and digitally signs a Verifiable Credential complying with a standard schema, the credential can be reused as an email credential over any other application model.

## Schemas

- [`EmailCredentialSchema`](https://rsksmart.github.io/vc-json-schemas/EmailCredentialSchema/v1.0/schema.json)

## The repo

The repository has 4 important modules:
- The credential schemas folder
- The sample folder
- CI linting and testing
- CD on Github Pages

### The credential schemas folder

This folder contains the schema definitions. Each schema is stored in `/schema/SCHEMA_NAME/SCHEMA_VERSION/schema.json`.

The definitions must be Verifiable Credentials JSON Schemas compliant with:
- [RFC-8529 - The JavaScript Object Notation (JSON) Data Interchange Format](https://tools.ietf.org/html/rfc8259)
- [JSON Schema](https://json-schema.org/specification.html)
- [Verifiable Credentials JSON Schema Specification](https://w3c-ccg.github.io/vc-json-schemas/)

They must also meet:
- Have a unique name
- Be posted in human-readable string representation, using [MDN `JSON.stringify`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) with `space` parameter set in `2`

Pull requests must meet:
- Do not modify or delete an existing schema
- If schema is to be updated, create a new schema with compliant versioning

### The sample folder

This folder stores sample Verifiable Credentials for each existent schema. The examples of each schema are stored in `/sample/SCHEMA_NAME/SCHEMA_VERSION/sample-K.json`, where `k` is index (starting from 1) of the sample enabling more than one sample to be stored for each schema.

The sample must:
- Be compliant with the schema specified by the path of the file
- If credential provides proof, it must be valid

### CI linting and testing

Continuous integration is set to

- [ ] Invalidate any schema update or deletion
- [x] Verify credential schemas format are valid
- [ ] Check spacing is correct
- [x] Validate the samples against the corresponding schema
- [ ] Versioning is correct

### CD on Github Pages

Continuous delivery will make new schemas go live instantly. It will use Github Pages host to serve each of the credential schemas definitions approved and merged into `master` branch.

## Changes to standards

The base schema: is the JSON Schema of the schemas. We made two changes to https://w3c-ccg.github.io/vc-json-schemas/schema/1.0/schema.json:

**Enable more DID networks in method**

`id` pattern is `^did:+(\w+:)+\w+;id=[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12};version=d+.\d+$`

Changes `\w+:` for `(\w+:)+`

**Made `required` property JSON Schema compliant**

Changes

```json
{
  "required": {
    "type": "array",
    "items": [ {
      "type": "string" } ] } }
```

for

```json
{
  "required": {
    "type": "array",
    "items": {
      "type": "string" } } }
```

## Drawbacks

Verifiable Credentials JSON Schema Specification is still a draft so we decided initially to
- do not include cryptographic proof for these schemas - as it is not yet defined
- do not publish them in a public ledger - as it may make this project unflexible to future changes
