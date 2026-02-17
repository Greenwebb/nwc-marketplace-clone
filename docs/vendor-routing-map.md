# Vendor Routing Map

## Main routes
- `/vendor/dashboard` : quick stats and navigation.
- `/vendor/orders` : orders list with search/filter.
- `/vendor/orders/:orderId` : order detail view.
- `/vendor/orders/:orderId/status` : update status flow.
- `/vendor/products` : products list.
- `/vendor/products/new` : create product.
- `/vendor/products/:productId` : product detail.
- `/vendor/products/:productId/edit` : edit product.
- `/vendor/settings` : settings menu.
- `/vendor/settings/basic`
- `/vendor/settings/payment`
- `/vendor/settings/business`
- `/vendor/settings/social`
- `/vendor/settings/notifications`
- `/vendor/settings/security`

## Data layer
- Contract: `src/services/repositories/vendorRepository.ts`
- Mock implementation: `src/services/repositories/mockVendorRepository.ts`
- Shared models: `src/types/vendor.ts`

