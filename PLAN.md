# eShop Project Plan

## 1. Project Overview

Build **eShop**, a Moldova-based online hardware store for computers, laptops, phones, components, and accessories.

The store will provide:

- A modern dark-only shopping experience
- Product browsing, search, filtering, variants, and stock tracking
- Account-required checkout
- Customer profiles with order history
- Discounts and coupons
- A multi-user admin panel with role-based access
- PayPal payment integration, subject to Moldova merchant onboarding and MDL availability validation
- Free-tier hosting using Vercel and Supabase

Product images, logo, brand assets, product copy, and final visual branding will be supplied separately.

## 2. Technology Stack

### Application

- Next.js with TypeScript
- App Router
- Server Actions and/or Route Handlers for server-side operations
- Tailwind CSS for styling
- Framer Motion for selective interface and scroll animations

### Backend Services

- Supabase PostgreSQL for the database
- Supabase Auth for customer and administrator authentication
- Supabase Storage for product images and media
- Vercel for application hosting and serverless execution

### Payments

- PayPal Checkout using the PayPal Orders API
- PayPal sandbox during development
- PayPal webhooks for payment and order status updates
- A payment-provider abstraction so another Moldova-supported provider can be added if PayPal cannot support the required merchant account or currency flow

### Source Control and Deployment

- GitHub repository
- Automatic deployment from GitHub to Vercel
- Separate development, preview, and production environment variables

## 3. Business and Product Scope

### Product Categories

- Desktop computers
- Laptops
- Mobile phones
- Computer components
- Monitors and peripherals
- Accessories

### Product Data

Every product should support:

- Name
- Slug
- Brand
- Model
- SKU
- Category
- Description
- Technical specifications
- Price in MDL
- Stock quantity
- Product images
- Warranty information
- Active/inactive status
- Featured status
- Created and updated timestamps

Products should support variants from the beginning. Examples include:

- Laptop RAM and storage configurations
- Phone storage capacity and color
- Component model or capacity
- Variant-specific SKU, price, stock, and images

## 4. Customer Experience

### Public Pages

- Home page
- Product catalog
- Category pages
- Search results
- Product detail page
- Shopping cart
- Login
- Registration
- Password reset
- Terms and conditions
- Privacy policy
- Shipping and returns
- Contact information

Visitors may browse products and add items to a cart without an account. An account is required before checkout can begin.

### Account and Authentication

Implement:

- Customer registration
- Login and logout
- Email verification
- Password reset
- Protected profile pages
- Session persistence
- Account details management

Checkout must redirect unauthenticated users to login or registration. After authentication, the customer should be returned to the checkout flow.

### Customer Profile

The profile area should include:

- Account details
- Contact information
- Saved delivery information where appropriate
- Order history
- Order detail pages
- Payment status
- Fulfillment status
- Order date and total
- Purchased products and quantities
- Shipping details
- Receipt or invoice link when available

Customers must only be able to access their own profile and orders. This must be enforced through Supabase Row Level Security as well as application-level authorization checks.

## 5. Cart, Checkout, and Orders

### Cart

- Add and remove products
- Update quantities
- Support product variants
- Validate stock before checkout
- Persist the cart for the current customer/session
- Display subtotal, discount, shipping, and final total

### Checkout Flow

1. Customer reviews the cart.
2. Customer logs in or creates an account.
3. Server validates product prices, variants, stock, and coupon eligibility.
4. Server creates a pending order.
5. Server creates a PayPal order.
6. Customer completes payment through the provider.
7. The server captures the PayPal order after customer approval.
8. A verified PayPal webhook confirms the final payment state.
9. Inventory is reduced after confirmed payment.
10. Customer sees the order confirmation and can find the order in their profile.

Prices, discounts, inventory, and payment status must always be calculated or confirmed server-side.

### Order States

Payment status:

- Pending
- Paid
- Failed
- Expired
- Refunded

Fulfillment status:

- Unfulfilled
- Processing
- Packed
- Shipped
- Delivered
- Cancelled

### Order Data Integrity

- Store product name and price snapshots in order items.
- Store the applied coupon code and discount amount on the order.
- Store payment-provider session and payment identifiers.
- Verify webhook signatures.
- Store processed webhook event IDs to make webhook handling idempotent.
- Do not reduce inventory multiple times for a repeated webhook.

## 6. Discounts and Coupons

The admin panel must support:

- Percentage discounts
- Fixed-value discounts in MDL
- Store-wide coupons
- Product-specific coupons
- Category-specific coupons
- Start and expiration dates
- Minimum order value
- Maximum discount amount
- Total usage limit
- Per-customer usage limit
- Active/inactive status
- Optional first-order restrictions
- Optional free-shipping discounts

Recommended initial rule: one coupon code per order. Product or category promotions may be calculated independently if the business rules require them.

Coupon validation must be server-side and must check:

- Code validity
- Active dates
- Usage limits
- Customer eligibility
- Product/category restrictions
- Minimum order value
- Currency and amount calculations

Recommended tables:

- `coupons`
- `coupon_redemptions`
- `promotions`
- `promotion_products`
- `promotion_categories`

## 7. Admin Panel

The admin panel should support multiple administrator accounts with role-based permissions.

### Roles

- **Owner:** Full access, including administrator and store settings management
- **Admin:** Products, inventory, orders, coupons, and reports
- **Inventory manager:** Products, variants, images, and stock
- **Order manager:** Orders, customers, and fulfillment status

### Admin Features

- Dashboard with sales, order, inventory, and low-stock summaries
- Product creation, editing, archiving, and deletion
- Variant management
- Category management
- Inventory adjustments
- Product image upload and replacement
- Order list and order details
- Fulfillment status updates
- Coupon and promotion management
- Customer lookup
- Admin invitation and role assignment
- Admin suspension or removal
- Activity log for sensitive operations

The public registration form must never create an administrator. The first owner account should be provisioned securely through a controlled setup process.

Admin routes and server operations must independently verify authentication and permissions.

## 8. Database Model

Initial database entities:

### `profiles`

- User ID
- Name
- Email
- Phone
- Role
- Active status
- Created and updated timestamps

### `categories`

- ID
- Name
- Slug
- Description
- Image
- Active status

### `products`

- ID
- Category ID
- Name
- Slug
- Brand
- Model
- Description
- Specifications JSON
- Base price in MDL
- SKU
- Stock quantity where no variants exist
- Warranty information
- Main image
- Active and featured status
- Created and updated timestamps

### `product_variants`

- ID
- Product ID
- Variant name
- Attributes JSON
- SKU
- Price in MDL
- Stock quantity
- Active status

### `product_images`

- ID
- Product ID
- Optional variant ID
- Storage path
- Alt text
- Sort order

### `orders`

- ID
- Customer ID
- Email snapshot
- PayPal Order ID
- PayPal Capture ID
- Subtotal in MDL
- Discount amount in MDL
- Shipping amount in MDL
- Total in MDL
- Coupon code snapshot
- Payment status
- Fulfillment status
- Shipping details JSON
- Created and updated timestamps

### `order_items`

- ID
- Order ID
- Product ID
- Optional variant ID
- Product name snapshot
- SKU snapshot
- Unit price snapshot
- Quantity
- Line total

### `coupons`, `coupon_redemptions`, and promotion tables

Support discount rules, product/category targeting, usage limits, and historical redemption records.

### `webhook_events`

- Provider event ID
- Event type
- Processing status
- Error details
- Processed timestamp

### `admin_activity_logs`

- Admin user ID
- Action
- Entity type
- Entity ID
- Metadata
- Created timestamp

## 9. Security and Authorization

- Keep all payment secret keys on the server.
- Store secrets only in environment variables.
- Verify PayPal webhook signatures using the PayPal webhook verification API.
- Enable Supabase Row Level Security on customer and order data.
- Restrict customer queries to the authenticated customer.
- Restrict administrative operations by role.
- Validate all prices, stock, variants, and coupons on the server.
- Sanitize and validate uploaded product metadata.
- Use secure password reset and email verification flows.
- Add rate limiting to login, coupon validation, and checkout endpoints where practical.
- Prevent duplicate webhook processing.
- Log sensitive administrative actions.

## 10. Visual and Interaction Design

### Brand

- Store name: **eShop**
- Main accent: bright green
- Default theme: dark only
- Product imagery, logo, and final branding assets will be provided separately

### Style

Use a modern, premium hardware-store interface with:

- Dark near-black backgrounds
- Bright-green accents for actions and emphasis
- Charcoal and translucent glass surfaces
- Background blur used selectively
- Thin, low-contrast borders
- Soft shadows
- Grainy green-tinted gradients
- Restrained glow and transparency
- Strong readability for prices, specifications, stock, and checkout actions

Glassmorphism should support hierarchy and usability. Product imagery and important data must remain clear and prominent.

### Typography

Use two font families:

- **Accent serif font:** for major headings, category titles, promotional content, and selected emphasis
- **Secondary sans-serif font:** for navigation, prices, specifications, forms, buttons, filters, checkout, profile, and admin interfaces

Both fonts must support the Romanian alphabet:

```text
Ă Â Î Ș Ț ă â î ș ț
```

Possible starting choices:

- Accent: Cormorant Garamond or DM Serif Display
- Secondary: Manrope, Inter, or Source Sans 3

The final choice must be verified with Romanian copy and loaded using only the required subsets where possible.

### Motion

Use subtle, purposeful animation throughout the customer-facing site:

- Scroll-based section reveals
- Staggered product-card entrances
- Gentle hero-layer movement
- Subtle gradient and grain movement
- Navigation transition between transparent and solid glass states
- Product image hover movement
- Cart and wishlist feedback animations
- Short page transitions

Motion requirements:

- Respect `prefers-reduced-motion`.
- Do not delay browsing, checkout, or form completion.
- Use transform and opacity animations to reduce layout shifts.
- Keep admin animations restrained.
- Ensure animations remain usable on mobile.
- Avoid motion that harms readability or causes discomfort.

### Responsive and Accessibility Requirements

- Design for mobile, tablet, and desktop.
- Use stable dimensions for product cards, controls, and media areas.
- Maintain readable contrast between bright green, glass surfaces, and text.
- Provide visible keyboard focus states.
- Use labels and clear error messages for forms.
- Do not communicate important status through color or animation alone.
- Test mobile performance with animation and glass effects enabled.

## 11. Hosting and Cost Plan

### Free-Tier Deployment

- Vercel free tier for the Next.js application
- Supabase free tier for PostgreSQL, Auth, and Storage
- GitHub free repository and deployment integration
- PayPal or another supported payment provider for payment processing

Required environment variables:

```text
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
PAYPAL_CLIENT_ID
PAYPAL_CLIENT_SECRET
PAYPAL_WEBHOOK_ID
PAYPAL_ENVIRONMENT
NEXT_PUBLIC_SITE_URL
```

Free hosting is intended for early traffic and development. Monitor database, storage, bandwidth, serverless execution, and authentication limits before launch. Payment transaction fees still apply. A custom domain may require a separate purchase; the free Vercel subdomain can be used initially.

## 12. Moldova and Payment Validation

Before production implementation is finalized, confirm:

1. Whether PayPal merchant accounts are available for the intended business setup in Moldova.
2. Whether the intended PayPal account can receive commercial payments from customers in Moldova.
3. Whether PayPal supports MDL for checkout and settlement, or requires a supported presentment and settlement currency such as EUR or USD.
4. Which PayPal payment methods and buyer protections are available to customers in Moldova.
5. Whether PayPal account limitations, withdrawal options, conversion fees, or payout timing affect the business.
6. Whether local tax, invoice, refund, and consumer-protection requirements affect order data or checkout.

PayPal is the primary payment provider for this project. If PayPal cannot satisfy the required Moldova payment flow, integrate a locally supported payment provider behind the same payment interface. The rest of the cart, order, discount, webhook, and profile architecture should remain unchanged.

If PayPal does not support MDL directly, the store should either price and charge orders in a supported currency after a confirmed business decision, or add a currency-conversion layer with clearly displayed totals. The customer-facing currency and the payment-provider currency must not be silently different.

## 13. Delivery Phases

### Phase 1: Foundation

- Initialize Next.js and TypeScript
- Configure Tailwind CSS and design tokens
- Set up typography and dark-only theme
- Create the eShop layout, navigation, and responsive shell
- Configure environment variables
- Add reusable glass surfaces and motion utilities

### Phase 2: Database and Authentication

- Create Supabase project
- Apply schema and indexes
- Configure Row Level Security
- Implement registration, login, verification, reset, and logout
- Add profiles and roles
- Provision the initial owner account

### Phase 3: Catalog

- Implement categories and products
- Add product variants and specifications
- Add search, filtering, sorting, and pagination
- Add product image storage integration
- Build product detail pages
- Add stock and availability states

### Phase 4: Cart and Account-Required Checkout

- Implement cart state and persistence
- Require authentication before checkout
- Build customer contact and shipping information flow
- Validate stock, variants, prices, and totals server-side
- Create pending orders

### Phase 5: Discounts and Coupons

- Create coupon and promotion schema
- Implement admin coupon management
- Implement coupon validation at checkout
- Add usage tracking and limits
- Persist discount snapshots on orders

### Phase 6: Payment Integration

- Implement PayPal sandbox checkout using the Orders API
- Add PayPal order creation, customer approval, and server-side capture
- Add webhook endpoint and PayPal signature verification
- Handle successful, failed, expired, and refunded payments
- Make webhook handling idempotent
- Reduce stock only after confirmed payment
- Validate Moldova and MDL production compatibility

### Phase 7: Customer Profile and Orders

- Build profile page
- Add order history
- Add order detail pages
- Display payment and fulfillment statuses
- Add receipt or invoice links where available

### Phase 8: Admin Panel

- Build role-protected admin layout
- Add dashboard summaries
- Add product, variant, category, and image management
- Add inventory tools
- Add order and fulfillment management
- Add coupon and promotion management
- Add multiple admin users and role assignment
- Add activity logging

### Phase 9: Quality and Launch

- Add loading, empty, error, and success states
- Add legal and store information pages
- Add metadata and SEO basics
- Test keyboard navigation and reduced motion
- Test responsive layouts
- Test checkout with PayPal sandbox accounts and webhook events
- Test authorization boundaries
- Test duplicate webhooks and stock edge cases
- Deploy preview builds to Vercel
- Configure production secrets and webhook URLs
- Run a controlled production payment test

## 14. Definition of Done

The first production-ready version is complete when:

- Customers can browse eShop products and variants.
- Product prices and totals are shown in MDL.
- Customers must authenticate before checkout.
- Customers can place and view orders from their profile.
- Coupons are validated and recorded correctly.
- Paid orders are confirmed through a verified PayPal webhook.
- Stock cannot be reduced twice by repeated events.
- Multiple admins can log in with appropriate permissions.
- Admins can manage products, variants, stock, orders, and coupons.
- Customer data is protected by authentication and Row Level Security.
- The dark glassmorphism design works responsively.
- Romanian characters render correctly in both fonts.
- Scroll animations respect reduced-motion preferences.
- The application deploys on the selected free hosting tiers.
- Moldova and MDL payment compatibility has been confirmed for production.
