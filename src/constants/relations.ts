const relations = [
  {
    "collection": "directus_settings",
    "field": "stripe_webhook_user",
    "related_collection": "directus_users",
    "schema": {
      "constraint_name": "directus_settings_stripe_webhook_user_foreign",
      "table": "directus_settings",
      "column": "stripe_webhook_user",
      "foreign_key_schema": "public",
      "foreign_key_table": "directus_users",
      "foreign_key_column": "id",
      "on_update": "NO ACTION",
      "on_delete": "SET NULL"
    },
    "meta": {
      "many_collection": "directus_settings",
      "many_field": "stripe_webhook_user",
      "one_collection": "directus_users",
      "one_field": null,
      "one_collection_field": null,
      "one_allowed_collections": null,
      "junction_field": null,
      "sort_field": null,
      "one_deselect_action": "nullify"
    }
  }
];

export default relations;
