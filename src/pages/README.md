# Pages Directory Structure

This directory contains all page components for the Newworld Marketplace Marketplace Clone, organized by user role and access level for better maintainability and scalability.

## Directory Structure

```
pages/
├── (public)/          # Public marketplace pages (no authentication required)
├── (customer)/        # Customer dashboard pages (requires customer authentication)
├── (vendor)/          # Vendor dashboard pages (requires vendor authentication)
└── [root files]       # Shared pages (legal, errors, etc.)
```

## (public) - Public Marketplace Pages

Pages accessible to all visitors without authentication:

- **Home.tsx** - Main landing page with hero sections, featured products, and deals
- **Shop.tsx** - Product listing page with filters and sorting
- **ProductDetail.tsx** - Individual product detail page
- **About.tsx** - About us page with company information
- **Contact.tsx** - Contact page with form and contact information
- **Careers.tsx** - Careers page with job listings
- **HelpCenter.tsx** - Help center with FAQ categories and search
- **FAQ.tsx** - Frequently asked questions with accordion sections
- **OrderTracking.tsx** - Order tracking page for guest users

## (customer) - Customer Dashboard Pages

Pages for authenticated customer users:

- **Dashboard.tsx** - Customer dashboard with order overview, wishlist, and account stats
- **Cart.tsx** - Shopping cart page with checkout flow

## (vendor) - Vendor Dashboard Pages

Pages for authenticated vendor users (to be implemented):

- **Dashboard.tsx** - Vendor dashboard with sales analytics and order management
- **Products.tsx** - Product management (add, edit, delete products)
- **Orders.tsx** - Order management and fulfillment
- **Analytics.tsx** - Sales analytics and reports
- **Settings.tsx** - Vendor account settings

## Root Pages (Shared)

Pages that don't fit specific user roles:

- **NotFound.tsx** - 404 error page
- **Legal.tsx** - Legal landing page
- **PrivacyPolicy.tsx** - Privacy policy page
- **TermsOfUse.tsx** - Terms of use page
- **SiteMap.tsx** - Site map page
- **ComponentShowcase.tsx** - Development component showcase

## Import Path Changes

Due to the new directory structure, import paths for components have been updated:

### Before (flat structure):
```tsx
import Header from '../components/Header';
import Footer from '../components/Footer';
```

### After (nested structure):
```tsx
// For pages in (public), (customer), or (vendor) directories:
import Header from '../../components/Header';
import Footer from '../../components/Footer';

// For root pages:
import Header from '../components/Header';
import Footer from '../components/Footer';
```

## Benefits

1. **Clear Separation of Concerns** - Easy to identify which pages belong to which user role
2. **Scalability** - Simple to add new pages to specific sections
3. **Maintainability** - Developers can quickly find pages by user role
4. **Security** - Easier to implement role-based access control at the routing level
5. **Code Organization** - Related pages are grouped together logically

## Adding New Pages

When adding new pages, place them in the appropriate directory:

1. **Public pages** (accessible to all) → `(public)/`
2. **Customer pages** (requires customer auth) → `(customer)/`
3. **Vendor pages** (requires vendor auth) → `(vendor)/`
4. **Shared pages** (legal, errors) → root `pages/`

Remember to update `App.tsx` with the correct import path and route configuration.
