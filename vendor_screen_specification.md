# Vendor Screen Specification: Minimalist, Mobile-First Design

**Design Philosophy:** Single-responsibility principle per screen, hierarchical navigation with back buttons, responsive mobile-first with desktop accommodation.

---

## 1. Navigation Hierarchy & Workflow Analysis

### Current InoviStore Issues Identified

| Issue | Current Approach | Recommended Workflow |
|-------|------------------|----------------------|
| **Settings Overload** | 6 tabs on one screen (Basic Info, Payment, Business, Social, Notifications, Security) | Separate screens: Settings → [Basic Info / Payment / Business / Social / Notifications / Security] |
| **Dashboard Clutter** | Shows balance, orders, reviews, settings, products all at once | Dashboard → Quick stats only, navigation to dedicated screens |
| **Order Details Complexity** | Single long screen with all info (product, customer, delivery, timeline, actions) | Order Summary → Details (expandable sections) |
| **Product Management** | List and details mixed | Products List → Product Detail → Edit Product |
| **Checkout Multi-step** | 3 steps but each step has multiple concerns | Separate: Customer Info → Delivery Method → Payment → Review → Confirm |

---

## 2. Vendor Screen Hierarchy

```
VENDOR_ROOT
├── Dashboard (Home)
│   ├── Quick Stats (Balance, Today Orders, Pending)
│   └── Navigation to: Orders, Products, Settings
│
├── ORDERS FLOW
│   ├── Orders List (Search, Filter by status)
│   │   └── Order Card (tap to view)
│   │       └── Order Details
│   │           ├── Order Summary (read-only)
│   │           ├── Customer Info (read-only)
│   │           ├── Delivery Info (read-only)
│   │           └── Update Status (single action)
│   │
│   └── Order Tracking (Real-time timeline)
│
├── PRODUCTS FLOW
│   ├── Products List (Search, Add Product button)
│   │   └── Product Card (tap to view)
│   │       └── Product Detail
│   │           ├── View Product Info
│   │           ├── Edit Product
│   │           └── Delete Product
│   │
│   └── Add/Edit Product Form
│       ├── Basic Info (Name, Description, Price)
│       ├── Delivery Settings (Method, Cost)
│       ├── Images (Upload)
│       └── Save
│
└── SETTINGS FLOW
    ├── Settings Menu (List of options)
    │   ├── Basic Info → Edit Screen
    │   ├── Payment → Edit Screen
    │   ├── Business → Edit Screen
    │   ├── Social → Edit Screen
    │   ├── Notifications → Toggle Screen
    │   └── Security → Account Screen
    │
    └── Edit Screens (Each setting type)
        └── Save changes
```

---

## 3. Screen Specifications (Mobile-First)

### 3.1 Dashboard Screen

**Purpose:** Overview and navigation hub
**Complexity:** Minimal - display only essential metrics and navigation

**Layout (Mobile: 375px width):**
```
┌─────────────────────────────────┐
│ George's Store                  │ (Header)
│ ☰ Menu                          │
├─────────────────────────────────┤
│                                 │
│  Balance: UGX 0                 │ (Stat card)
│                                 │
├─────────────────────────────────┤
│                                 │
│  Today Orders: 1                │ (Stat card)
│  Pending: 1                     │
│                                 │
├─────────────────────────────────┤
│                                 │
│  [Orders] [Products] [Settings] │ (Navigation buttons)
│                                 │
└─────────────────────────────────┘
```

**Components:**
- Header with store name and menu icon
- Three stat cards (Balance, Today Orders, Pending)
- Three primary navigation buttons (Orders, Products, Settings)

**Data Parameters:**
- `storeName` (string)
- `balance` (number)
- `todayOrders` (number)
- `pendingOrders` (number)

**Desktop Adaptation (768px+):**
- Sidebar navigation instead of menu icon
- Stat cards displayed in a row
- Navigation buttons as sidebar items

---

### 3.2 Orders List Screen

**Purpose:** View all orders with search and filter
**Complexity:** Low - list with basic filtering

**Layout (Mobile):**
```
┌─────────────────────────────────┐
│ < Orders                        │ (Header with back button)
├─────────────────────────────────┤
│ [Search by order #]             │ (Search input)
│ [All] [Pending] [Confirmed]     │ (Status filter tabs)
│ [Processing] [Delivered]        │
├─────────────────────────────────┤
│                                 │
│ Order #ORD-2AF92126             │ (Order card - tap to view)
│ Website development             │
│ George Munganga                 │
│ UGX 50,000 | Pending            │
│ 3 hrs ago                       │
│                                 │
├─────────────────────────────────┤
│ [More orders...]                │
└─────────────────────────────────┘
```

**Components:**
- Back button (navigation)
- Search input
- Status filter buttons (All, Pending, Confirmed, Processing, Delivered)
- Order cards (tappable)

**Data Parameters:**
- `orders` (array of order objects)
- `searchQuery` (string)
- `selectedStatus` (string)
- Order object: `{id, orderNumber, productName, customerName, amount, status, timestamp}`

**Desktop Adaptation:**
- Sidebar for status filters
- Table view for orders instead of cards

---

### 3.3 Order Details Screen

**Purpose:** View complete order information
**Complexity:** Medium - read-only details with one action (update status)

**Layout (Mobile):**
```
┌─────────────────────────────────┐
│ < Order #ORD-2AF92126           │ (Header with back)
│                                 │
│ Status: Pending Confirmation    │ (Status badge)
│ Last updated: Jan 15, 2:02 PM   │
├─────────────────────────────────┤
│                                 │
│ ORDER SUMMARY                   │
│ Website development             │
│ Qty: 1                          │
│ UGX 50,000                      │
│                                 │
├─────────────────────────────────┤
│                                 │
│ CUSTOMER INFORMATION            │
│ Name: George Munganga           │
│ Phone: +260972827372            │
│ [Call] [WhatsApp]               │
│                                 │
├─────────────────────────────────┤
│                                 │
│ DELIVERY INFORMATION            │
│ Method: Pickup                  │
│ Location: Lusaka                │
│ Cost: Free                      │
│                                 │
├─────────────────────────────────┤
│                                 │
│ [Update Status]                 │ (Primary action)
│ [Print Order]                   │
│                                 │
└─────────────────────────────────┘
```

**Components:**
- Back button
- Status badge
- Four read-only sections (Summary, Customer, Delivery, Timeline)
- Two action buttons (Update Status, Print)

**Data Parameters:**
- `orderId` (string)
- `orderNumber` (string)
- `status` (string)
- `lastUpdated` (timestamp)
- `product` (object: {name, quantity, price})
- `customer` (object: {name, phone})
- `delivery` (object: {method, location, cost})

**Desktop Adaptation:**
- Two-column layout (left: details, right: actions)
- Larger font sizes

---

### 3.4 Update Order Status Screen

**Purpose:** Change order status
**Complexity:** Low - single action form

**Layout (Mobile):**
```
┌─────────────────────────────────┐
│ < Update Status                 │ (Header with back)
├─────────────────────────────────┤
│                                 │
│ Current Status: Pending         │
│                                 │
├─────────────────────────────────┤
│                                 │
│ Select New Status:              │
│                                 │
│ ○ Confirmed                     │ (Radio buttons)
│ ○ Processing                    │
│ ○ Ready                         │
│ ○ Out for Delivery              │
│ ○ Delivered                     │
│ ○ Cancelled                     │
│                                 │
├─────────────────────────────────┤
│                                 │
│ [Cancel] [Update]               │ (Action buttons)
│                                 │
└─────────────────────────────────┘
```

**Components:**
- Back button
- Current status display
- Radio button list for status options
- Cancel and Update buttons

**Data Parameters:**
- `currentStatus` (string)
- `availableStatuses` (array of strings)
- `selectedStatus` (string)

---

### 3.5 Products List Screen

**Purpose:** View and manage products
**Complexity:** Low - list with add button

**Layout (Mobile):**
```
┌─────────────────────────────────┐
│ < Products                      │ (Header with back)
├─────────────────────────────────┤
│ [Search products...]            │ (Search input)
│ [+ Add Product]                 │ (Add button)
├─────────────────────────────────┤
│                                 │
│ [Product Image]                 │ (Product card)
│ Website development             │
│ UGX 50,000                      │
│ Delivery available              │
│                                 │
├─────────────────────────────────┤
│ [More products...]              │
└─────────────────────────────────┘
```

**Components:**
- Back button
- Search input
- Add Product button (floating or sticky)
- Product cards (tappable)

**Data Parameters:**
- `products` (array of product objects)
- `searchQuery` (string)
- Product object: `{id, name, price, image, deliveryAvailable}`

---

### 3.6 Product Detail Screen

**Purpose:** View product information with edit/delete options
**Complexity:** Medium - display product info with action buttons

**Layout (Mobile):**
```
┌─────────────────────────────────┐
│ < Product Detail                │ (Header with back)
├─────────────────────────────────┤
│                                 │
│ [Product Image]                 │
│                                 │
├─────────────────────────────────┤
│                                 │
│ Website development             │
│ UGX 50,000                      │
│                                 │
│ I will build you a professional│
│ website                         │
│                                 │
├─────────────────────────────────┤
│                                 │
│ Delivery Method: Delivery       │
│ Delivery Cost: UGX 50           │
│                                 │
├─────────────────────────────────┤
│                                 │
│ [Edit] [Delete]                 │ (Action buttons)
│                                 │
└─────────────────────────────────┘
```

**Components:**
- Back button
- Product image
- Product details (name, price, description)
- Delivery information
- Edit and Delete buttons

**Data Parameters:**
- `productId` (string)
- `name` (string)
- `price` (number)
- `description` (string)
- `image` (string/URL)
- `deliveryMethod` (string)
- `deliveryCost` (number)

---

### 3.7 Add/Edit Product Screen

**Purpose:** Create or modify product
**Complexity:** High - multi-field form

**Layout (Mobile):**
```
┌─────────────────────────────────┐
│ < Add Product                   │ (Header with back)
├─────────────────────────────────┤
│                                 │
│ [Upload Image]                  │ (Image upload)
│                                 │
├─────────────────────────────────┤
│                                 │
│ Product Name *                  │ (Form fields)
│ [________________]              │
│                                 │
│ Price (UGX) *                   │
│ [________________]              │
│                                 │
│ Description                     │
│ [________________]              │
│ [________________]              │
│                                 │
│ Delivery Method *               │
│ ○ Delivery  ○ Pickup            │
│                                 │
│ Delivery Cost (if applicable)   │
│ [________________]              │
│                                 │
├─────────────────────────────────┤
│                                 │
│ [Cancel] [Save]                 │ (Action buttons)
│                                 │
└─────────────────────────────────┘
```

**Components:**
- Back button
- Image upload field
- Text inputs (Product Name, Price, Description)
- Radio buttons (Delivery Method)
- Number input (Delivery Cost)
- Cancel and Save buttons

**Data Parameters:**
- `productName` (string)
- `price` (number)
- `description` (string)
- `image` (file/URL)
- `deliveryMethod` (string: "delivery" | "pickup")
- `deliveryCost` (number)

---

### 3.8 Settings Menu Screen

**Purpose:** Navigation to different settings
**Complexity:** Low - simple list of options

**Layout (Mobile):**
```
┌─────────────────────────────────┐
│ < Settings                      │ (Header with back)
├─────────────────────────────────┤
│                                 │
│ [Basic Info]                    │ (Settings options)
│ Store name, location, contact   │
│                                 │
├─────────────────────────────────┤
│                                 │
│ [Payment]                       │
│ Mobile money, bank accounts     │
│                                 │
├─────────────────────────────────┤
│                                 │
│ [Business]                      │
│ Hours, currency, minimum order  │
│                                 │
├─────────────────────────────────┤
│                                 │
│ [Social Media]                  │
│ Facebook, Instagram, Twitter    │
│                                 │
├─────────────────────────────────┤
│                                 │
│ [Notifications]                 │
│ Email, SMS, push notifications  │
│                                 │
├─────────────────────────────────┤
│                                 │
│ [Security]                      │
│ Password, account deletion      │
│                                 │
└─────────────────────────────────┘
```

**Components:**
- Back button
- List of setting categories (tappable)

**Data Parameters:**
- `settingCategories` (array of category objects)

---

### 3.9 Edit Basic Info Screen

**Purpose:** Update store basic information
**Complexity:** Medium - multi-field form

**Layout (Mobile):**
```
┌─────────────────────────────────┐
│ < Basic Info                    │ (Header with back)
├─────────────────────────────────┤
│                                 │
│ Store Name *                    │ (Form fields)
│ [George's Store]                │
│                                 │
│ WhatsApp Number *               │
│ [+260972827372]                 │
│                                 │
│ Location *                      │
│ [Lusaka]                        │
│                                 │
│ About Your Store                │
│ [TECHNOLOGY AND GADGETS]        │
│                                 │
│ Brand Color                     │ (Color picker)
│ [#01167d]                       │
│                                 │
│ Store Logo                      │ (Image upload)
│ [Upload Image]                  │
│                                 │
├─────────────────────────────────┤
│                                 │
│ [Cancel] [Save]                 │
│                                 │
└─────────────────────────────────┘
```

**Components:**
- Back button
- Text inputs (Store Name, WhatsApp, Location, About)
- Color picker (Brand Color)
- Image upload (Store Logo)
- Cancel and Save buttons

**Data Parameters:**
- `storeName` (string)
- `whatsappNumber` (string)
- `location` (string)
- `aboutStore` (string)
- `brandColor` (string: hex color)
- `storeLogo` (file/URL)

---

### 3.10 Edit Payment Screen

**Purpose:** Configure payment methods
**Complexity:** Medium - dynamic list management

**Layout (Mobile):**
```
┌─────────────────────────────────┐
│ < Payment                       │ (Header with back)
├─────────────────────────────────┤
│                                 │
│ MOBILE MONEY NUMBERS            │
│ [+ Add Mobile Money]            │
│                                 │
│ +260972827372 (Airtel)  [×]     │ (List items with delete)
│                                 │
├─────────────────────────────────┤
│                                 │
│ MERCHANT CODES                  │
│ [+ Add Merchant Code]           │
│                                 │
├─────────────────────────────────┤
│                                 │
│ BANK ACCOUNTS                   │
│ [+ Add Bank Account]            │
│                                 │
│ Account Name: [_________]       │
│ Account Number: [_________]     │
│ Bank Name: [_________]          │
│ [×]                             │
│                                 │
├─────────────────────────────────┤
│                                 │
│ [Cancel] [Save]                 │
│                                 │
└─────────────────────────────────┘
```

**Components:**
- Back button
- Three collapsible sections (Mobile Money, Merchant Codes, Bank Accounts)
- Add buttons for each section
- Delete buttons for list items
- Cancel and Save buttons

**Data Parameters:**
- `mobileMoneyNumbers` (array of strings)
- `merchantCodes` (array of strings)
- `bankAccounts` (array of objects: {name, accountNumber, bankName})

---

### 3.11 Edit Business Screen

**Purpose:** Configure business settings
**Complexity:** Low - simple form

**Layout (Mobile):**
```
┌─────────────────────────────────┐
│ < Business                      │ (Header with back)
├─────────────────────────────────┤
│                                 │
│ Currency *                      │ (Dropdown)
│ [UGX - Ugandan Shilling]        │
│                                 │
│ Minimum Order Amount            │
│ [0]                             │
│                                 │
│ BUSINESS HOURS                  │
│                                 │
│ Monday                          │ (Day + time range)
│ [08:00] - [17:00]               │
│                                 │
│ Tuesday                         │
│ [08:00] - [17:00]               │
│                                 │
│ ... (other days)                │
│                                 │
│ ☑ Closed on Sunday              │ (Checkbox)
│                                 │
├─────────────────────────────────┤
│                                 │
│ [Cancel] [Save]                 │
│                                 │
└─────────────────────────────────┘
```

**Components:**
- Back button
- Currency dropdown
- Minimum order amount input
- Day-by-day time range inputs
- Closed checkbox for each day
- Cancel and Save buttons

**Data Parameters:**
- `currency` (string)
- `minimumOrderAmount` (number)
- `businessHours` (array of objects: {day, startTime, endTime, isClosed})

---

### 3.12 Edit Social Media Screen

**Purpose:** Configure social media links
**Complexity:** Low - simple form

**Layout (Mobile):**
```
┌─────────────────────────────────┐
│ < Social Media                  │ (Header with back)
├─────────────────────────────────┤
│                                 │
│ Facebook                        │ (Form fields)
│ [https://facebook.com/yourpage] │
│                                 │
│ Instagram                       │
│ [https://instagram.com/yourpage]│
│                                 │
│ Twitter / X                     │
│ [https://twitter.com/yourhandle]│
│                                 │
│ TikTok                          │
│ [https://tiktok.com/@yourhandle]│
│                                 │
│ YouTube                         │
│ [https://youtube.com/@channel]  │
│                                 │
│ WhatsApp Business               │
│ [https://wa.me/256...]          │
│                                 │
├─────────────────────────────────┤
│                                 │
│ [Cancel] [Save]                 │
│                                 │
└─────────────────────────────────┘
```

**Components:**
- Back button
- URL input fields for each platform
- Cancel and Save buttons

**Data Parameters:**
- `facebook` (string: URL)
- `instagram` (string: URL)
- `twitter` (string: URL)
- `tiktok` (string: URL)
- `youtube` (string: URL)
- `whatsappBusiness` (string: URL)

---

### 3.13 Notifications Preferences Screen

**Purpose:** Configure notification settings
**Complexity:** Low - toggle switches

**Layout (Mobile):**
```
┌─────────────────────────────────┐
│ < Notifications                 │ (Header with back)
├─────────────────────────────────┤
│                                 │
│ Enable All Notifications        │ (Master toggle)
│ [Toggle ON/OFF]                 │
│                                 │
├─────────────────────────────────┤
│                                 │
│ Email Notifications             │ (Individual toggles)
│ Get order updates via email     │
│ [Toggle ON/OFF]                 │
│                                 │
├─────────────────────────────────┤
│                                 │
│ SMS Notifications               │
│ Receive alerts via SMS          │
│ [Toggle ON/OFF] (Premium)       │
│                                 │
├─────────────────────────────────┤
│                                 │
│ Push Notifications              │
│ Browser notifications           │
│ [Toggle ON/OFF]                 │
│                                 │
├─────────────────────────────────┤
│                                 │
│ NOTIFICATION TYPES              │
│ ☑ New orders                    │ (Checkboxes)
│ ☑ Order status changes          │
│ ☑ Low stock alerts              │
│ ☑ Customer reviews              │
│                                 │
├─────────────────────────────────┤
│                                 │
│ [Save]                          │
│                                 │
└─────────────────────────────────┘
```

**Components:**
- Back button
- Master toggle switch
- Channel toggles (Email, SMS, Push)
- Notification type checkboxes
- Save button

**Data Parameters:**
- `enableAllNotifications` (boolean)
- `emailNotifications` (boolean)
- `smsNotifications` (boolean)
- `pushNotifications` (boolean)
- `notificationTypes` (object: {newOrders, statusChanges, lowStock, reviews})

---

### 3.14 Security & Account Screen

**Purpose:** Manage account security
**Complexity:** Low - account management options

**Layout (Mobile):**
```
┌─────────────────────────────────┐
│ < Security                      │ (Header with back)
├─────────────────────────────────┤
│                                 │
│ ACCOUNT INFORMATION             │
│ Email: georgemunganga@gmail.com │
│ Store Alias: georgestore        │
│ Account Created: Dec 27, 2025   │
│                                 │
├─────────────────────────────────┤
│                                 │
│ [Change Password]               │ (Action buttons)
│                                 │
├─────────────────────────────────┤
│                                 │
│ DANGER ZONE                     │
│                                 │
│ [Delete Account]                │ (Destructive action)
│ (Permanent, cannot be undone)   │
│                                 │
└─────────────────────────────────┘
```

**Components:**
- Back button
- Account information display
- Change Password button
- Delete Account button (with warning)

**Data Parameters:**
- `email` (string)
- `storeAlias` (string)
- `accountCreatedDate` (timestamp)

---

### 3.15 Change Password Screen

**Purpose:** Update account password
**Complexity:** Low - simple form with validation

**Layout (Mobile):**
```
┌─────────────────────────────────┐
│ < Change Password               │ (Header with back)
├─────────────────────────────────┤
│                                 │
│ Current Password *              │ (Form fields)
│ [________________]              │
│                                 │
│ New Password *                  │
│ [________________]              │
│ Min 8 characters                │
│                                 │
│ Confirm Password *              │
│ [________________]              │
│                                 │
├─────────────────────────────────┤
│                                 │
│ [Cancel] [Update]               │
│                                 │
└─────────────────────────────────┘
```

**Components:**
- Back button
- Password input fields
- Password requirement text
- Cancel and Update buttons

**Data Parameters:**
- `currentPassword` (string)
- `newPassword` (string)
- `confirmPassword` (string)

---

## 4. Responsive Design Breakpoints

### Mobile (320px - 767px)
- Single column layout
- Full-width components
- Hierarchical navigation with back buttons
- Minimalist design (one action per screen)

### Tablet (768px - 1023px)
- Two-column layout where appropriate
- Sidebar navigation
- Larger touch targets
- More information visible at once

### Desktop (1024px+)
- Multi-column layout
- Persistent sidebar
- Table views for lists
- Larger typography

---

## 5. Design System Components

### Reusable Components

| Component | Usage | Mobile Specs |
|-----------|-------|--------------|
| **Header** | Page title with back button | 56px height, left-aligned title |
| **Stat Card** | Display metrics | Full width, 80px height, centered text |
| **Button** | Primary actions | 48px height, full width or 50% width |
| **Input Field** | Text/number entry | 48px height, full width |
| **Card** | Content container | 16px padding, 8px border radius |
| **List Item** | Tappable list element | 56px height, 16px padding |
| **Badge** | Status indicator | 24px height, small font |
| **Toggle** | On/off switch | 48px height, right-aligned |
| **Radio Button** | Single selection | 48px height, left-aligned |
| **Checkbox** | Multiple selection | 48px height, left-aligned |

### Typography

- **Header:** 24px, bold, dark color
- **Subheader:** 18px, bold, dark color
- **Body:** 16px, regular, dark color
- **Caption:** 14px, regular, gray color
- **Label:** 14px, bold, dark color

### Spacing

- **Padding:** 16px (standard), 8px (compact), 24px (generous)
- **Margin:** 16px (standard), 8px (compact)
- **Gap:** 8px (between elements), 16px (between sections)

### Colors

- **Primary:** #01167d (dark blue, from InoviStore)
- **Success:** #4CAF50 (green)
- **Warning:** #FF9800 (orange)
- **Error:** #F44336 (red)
- **Background:** #FFFFFF (white)
- **Text:** #333333 (dark gray)
- **Border:** #E0E0E0 (light gray)

---

## 6. Navigation Flow Summary

```
Dashboard
├── Orders List
│   └── Order Details
│       └── Update Status
├── Products List
│   ├── Product Detail
│   │   └── Edit Product
│   └── Add Product
└── Settings Menu
    ├── Basic Info
    ├── Payment
    ├── Business
    ├── Social Media
    ├── Notifications
    └── Security
        └── Change Password
```

---

## 7. Implementation Notes for AI

1. **Single Responsibility:** Each screen has one primary purpose
2. **Hierarchical Navigation:** All screens have a back button to parent screen
3. **Minimalist Design:** No tabs, no multiple concerns per screen
4. **Mobile-First:** Design optimized for mobile, then scale to desktop
5. **Responsive:** Use flexbox/grid for responsive layouts
6. **Reusable Components:** Extract common UI patterns into reusable components
7. **Accessibility:** Ensure proper touch targets (48px minimum), clear labels
8. **Performance:** Lazy load images, optimize for mobile networks
9. **State Management:** Use context or state management for data flow
10. **Error Handling:** Implement proper error boundaries and user feedback

---

## 8. Data Flow Architecture

### State Management Pattern

```
VendorContext
├── Store State
│   ├── storeName
│   ├── balance
│   ├── location
│   └── ...
├── Orders State
│   ├── orders (array)
│   ├── selectedOrder
│   └── ...
├── Products State
│   ├── products (array)
│   ├── selectedProduct
│   └── ...
└── Settings State
    ├── basicInfo
    ├── payment
    ├── business
    └── ...
```

### API Endpoints (Expected)

```
GET    /api/vendor/dashboard
GET    /api/vendor/orders
GET    /api/vendor/orders/:id
PUT    /api/vendor/orders/:id/status
GET    /api/vendor/products
POST   /api/vendor/products
PUT    /api/vendor/products/:id
DELETE /api/vendor/products/:id
GET    /api/vendor/settings
PUT    /api/vendor/settings/:section
```

---

## 9. Workflow Optimization Summary

| Original Issue | Solution | Benefit |
|---|---|---|
| Settings with 6 tabs | Separate screens per setting type | Reduced cognitive load, easier navigation |
| Dashboard showing everything | Dashboard with stats + navigation | Clear hierarchy, focused purpose |
| Long order details page | Separate sections, one action per screen | Faster load, easier to scan |
| Complex checkout | Multi-step form with clear progression | Better user experience, fewer errors |
| Mixed product list/detail | Separate list and detail screens | Cleaner UI, better performance |

---

## 10. Mobile-First Responsive Strategy

### Principle: Progressive Enhancement

1. **Mobile (Base):** Optimized for 375px width
2. **Tablet (768px):** Add sidebar, two-column layouts
3. **Desktop (1024px+):** Full multi-column, table views

### Implementation Strategy

- Use CSS media queries for responsive design
- Hide/show components based on breakpoints
- Use flexible typography scales
- Optimize images for different screen sizes
- Test on actual devices (not just browser DevTools)

---

**End of Specification**

This specification is ready for AI implementation. Each screen is self-contained, focused, and follows mobile-first principles with hierarchical navigation.
