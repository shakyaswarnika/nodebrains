# API Reference

> **Status:** Phase 0 — API documentation placeholder.

Future REST API endpoints for the visual page builder will be documented here.

## Planned Endpoints

| Method | Route                                 | Description             |
| ------ | ------------------------------------- | ----------------------- |
| `GET`  | `/wp-json/nodebrains/v1/layouts/{id}` | Retrieve saved layout   |
| `POST` | `/wp-json/nodebrains/v1/layouts`      | Save layout             |
| `GET`  | `/wp-json/nodebrains/v1/modules`      | List registered modules |

## WordPress Hooks

| Hook                      | Type   | Description                          |
| ------------------------- | ------ | ------------------------------------ |
| `nodebrains_builder_init` | action | Fires when builder registers modules |

## PHP Registry

```php
\NodeBrains\Builder\Module_Registry::register( 'hero', [
    'label' => 'Hero Section',
] );
```

Full API specification will be added in Phase 2.
