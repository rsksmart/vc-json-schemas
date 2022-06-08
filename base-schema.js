module.exports = {
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {
    "type": {
      "type": "string"
    },
    "modelVersion": {
      "type": "string",
      "pattern": "^\\d+\\.\\d+$"
    },
    "id": {
      "type": "string",
      "pattern": "^did:+(\\w+:)+[\\w\\.]+;id=[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12};version=\\d+.\\d+$"
    },
    "name": {
      "type": "string"
    },
    "author": {
      "type": "string"
    },
    "authored": {
      "type": "string"
    },
    "schema": {
      "type": "object",
      "properties": {
        "$schema": {
          "type": "string"
        },
        "description": {
          "type": "string"
        },
        "name": {
          "type": "string"
        },
        "type": {
          "type": "string"
        },
        "properties": {
          "type": "object"
        },
        "required": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "additionalProperties": {
          "type": "boolean"
        }
      },
      "required": [
        "$schema",
        "description",
        "type",
        "properties",
        "required",
        "additionalProperties"
      ]
    }
  },
  "required": [
    "type",
    "modelVersion",
    "id",
    "name",
    "schema"
  ]
}
