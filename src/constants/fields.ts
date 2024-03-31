const fields = [
  {
    "collection": "directus_settings",
    "field": "stripe_divider",
    "type": "alias",
    "meta": {
      "collection": "directus_settings",
      "field": "stripe_divider",
      "special": [
        "alias",
        "no-data"
      ],
      "interface": "presentation-divider",
      "options": {
        "title": "Stripe",
        "icon": "attach_money"
      },
      "display": null,
      "display_options": null,
      "readonly": false,
      "hidden": false,
      "sort": null,
      "width": "full",
      "translations": null,
      "note": null,
      "conditions": null,
      "required": false,
      "group": null,
      "validation": null,
      "validation_message": null
    },
    "schema": null
  },
  {
    "collection": "directus_settings",
    "field": "stripe_secret_key",
    "type": "string",
    "meta": {
      "collection": "directus_settings",
      "field": "stripe_secret_key",
      "special": null,
      "interface": "input",
      "options": {
        "iconLeft": "vpn_key",
        "masked": true
      },
      "display": null,
      "display_options": null,
      "readonly": false,
      "hidden": false,
      "sort": null,
      "width": "full",
      "translations": null,
      "note": null,
      "conditions": null,
      "required": false,
      "group": null,
      "validation": null,
      "validation_message": null
    },
    "schema": {
      "name": "stripe_secret_key",
      "table": "directus_settings",
      "schema": "public",
      "data_type": "character varying",
      "is_nullable": true,
      "generation_expression": null,
      "default_value": null,
      "is_generated": false,
      "max_length": 255,
      "comment": null,
      "numeric_precision": null,
      "numeric_scale": null,
      "is_unique": false,
      "is_primary_key": false,
      "has_auto_increment": false,
      "foreign_key_schema": null,
      "foreign_key_table": null,
      "foreign_key_column": null
    }
  },
  {
    "collection": "directus_settings",
    "field": "stripe_webhook_user",
    "type": "uuid",
    "meta": {
      "collection": "directus_settings",
      "field": "stripe_webhook_user",
      "special": [
        "m2o"
      ],
      "interface": "select-dropdown-m2o",
      "options": {
        "enableCreate": false
      },
      "display": "user",
      "display_options": null,
      "readonly": false,
      "hidden": false,
      "sort": null,
      "width": "full",
      "translations": null,
      "note": null,
      "conditions": null,
      "required": false,
      "group": null,
      "validation": null,
      "validation_message": null
    },
    "schema": {
      "name": "stripe_webhook_user",
      "table": "directus_settings",
      "schema": "public",
      "data_type": "uuid",
      "is_nullable": true,
      "generation_expression": null,
      "default_value": null,
      "is_generated": false,
      "max_length": null,
      "comment": null,
      "numeric_precision": null,
      "numeric_scale": null,
      "is_unique": false,
      "is_primary_key": false,
      "has_auto_increment": false,
      "foreign_key_schema": "public",
      "foreign_key_table": "directus_users",
      "foreign_key_column": "id"
    }
  },
  {
    "collection": "directus_settings",
    "field": "stripe_webhooks",
    "type": "json",
    "meta": {
      "collection": "directus_settings",
      "field": "stripe_webhooks",
      "special": [
        "cast-json"
      ],
      "interface": "list",
      "options": {
        "fields": [
          {
            "field": "path",
            "name": "path",
            "type": "string",
            "meta": {
              "field": "path",
              "width": "full",
              "type": "string",
              "required": true,
              "interface": "input"
            }
          },
          {
            "field": "secret",
            "name": "secret",
            "type": "string",
            "meta": {
              "field": "secret",
              "width": "full",
              "type": "string",
              "required": true,
              "note": null,
              "interface": "input",
              "options": {
                "placeholder": "whsec_..."
              }
            }
          },
          {
            "field": "verify_signature",
            "name": "verify_signature",
            "type": "boolean",
            "meta": {
              "field": "verify_signature",
              "type": "boolean",
              "interface": "boolean"
            }
          }
        ],
        "template": "{{path}}"
      },
      "display": null,
      "display_options": null,
      "readonly": false,
      "hidden": false,
      "sort": null,
      "width": "full",
      "translations": null,
      "note": null,
      "conditions": null,
      "required": false,
      "group": null,
      "validation": null,
      "validation_message": null
    },
    "schema": {
      "name": "stripe_webhooks",
      "table": "directus_settings",
      "schema": "public",
      "data_type": "json",
      "is_nullable": true,
      "generation_expression": null,
      "default_value": null,
      "is_generated": false,
      "max_length": null,
      "comment": null,
      "numeric_precision": null,
      "numeric_scale": null,
      "is_unique": false,
      "is_primary_key": false,
      "has_auto_increment": false,
      "foreign_key_schema": null,
      "foreign_key_table": null,
      "foreign_key_column": null
    }
  }
];

export default fields;
