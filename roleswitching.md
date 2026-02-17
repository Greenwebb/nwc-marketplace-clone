# Role Switching in React Apps: A Comprehensive Checklist

This document is a **living reference** for developers building role‑based interfaces (e.g., switching between “Vendor” and “Customer” modes). It is not a rigid prescription but a collection of concepts, patterns, and questions to inspire your own implementation. Use it to audit an existing codebase, plan a new feature, or simply deepen your understanding of what industrial‑strength role switching entails.

---

## 1. State Management: The Single Source of Truth

Your application needs a **reliable, reactive store** for the current user’s role. This store must be:

- **Global** – accessible from any component without prop drilling.
- **Persistent** – survives a page refresh (usually by syncing with `localStorage`, a cookie, or a token).
- **Reactive** – changing the role immediately triggers re‑renders of all dependent UI.

**Patterns to consider:**

- React Context + `useReducer` / `useState` for smaller apps.
- Redux, Zustand, or Recoil for larger apps with complex state.
- A custom hook (e.g., `useAuth()`) that exposes `role` and a `switchRole` function.

**Checklist questions:**

- [ ] Is the role stored in a central state container?
- [ ] Does the role persist after a page refresh?
- [ ] Does updating the role cause components to re‑render automatically?
- [ ] Is there a clear, documented way to change the role (e.g., a toggle or dropdown)?

---

## 2. Routing: Guarding Access Dynamically

Different roles should see different pages. Your router must be aware of the current role and protect routes accordingly.

- **Route guards** – components that check the role and redirect if the user lacks permission.
- **Dynamic navigation** – menus, sidebars, and links appear/disappear based on role.
- **Role‑specific route trees** – you may have separate sections of the app (e.g., `/vendor/*`, `/customer/*`) that are only accessible when the role matches.

**Implementation ideas:**

- Create a `<PrivateRoute>` component that takes a `requiredRole` prop and conditionally renders its children or redirects.
- Use a layout component that reads the role and renders different navigation bars.

**Checklist questions:**

- [ ] Are routes protected so that a customer cannot access vendor pages by typing the URL?
- [ ] Does the navigation menu update correctly when the role changes?
- [ ] Are redirects handled gracefully (e.g., to a “not authorized” page or the login screen)?

---

## 3. UI Reactivity: Instant Visual Feedback

When a user switches roles, the interface should feel **instant and seamless**. This goes beyond just showing/hiding links – entire sections, icons, labels, and dashboards should transform.

- **Shared layout that adapts** – a single layout component that renders different children based on role.
- **Component‑level conditions** – use conditional rendering for role‑specific UI elements, but avoid scattering `role === 'vendor'` everywhere. Instead, consider a permissions hook or a mapping object.
- **Real‑time updates** – no full page reload; the UI updates as soon as the state changes.

**Example pattern:**

```jsx
const Dashboard = () => {
  const { role } = useAuth();
  return (
    <div>
      <Header />
      {role === 'vendor' ? <VendorStats /> : <CustomerStats />}
      <Sidebar menuItems={role === 'vendor' ? vendorMenu : customerMenu} />
    </div>
  );
};
Checklist questions:

Does the UI change immediately when the role toggles (without a refresh)?

Are role‑specific elements clearly separated in the code (e.g., in dedicated folders or components)?

Is there a central place that defines what each role sees (to avoid duplication)?

4. API Integration & Mock Layers
Even if you are currently using a mock API (MSW, Mirage, or local JSON), your app should be structured as if a real backend is in place. This makes the eventual switch painless and ensures your frontend logic correctly handles permissions.

Abstract API client – all API calls go through a service module that can be swapped between mock and real implementations.

Role in requests – every API request should include the current role (e.g., in a header like X-User-Role). This allows your mock server to simulate role‑based responses.

Mock enforces permissions – your mock handlers should check the role header and return appropriate data (or even 403 errors) to mimic backend behaviour.

Error handling – the app must gracefully handle 401/403 responses (e.g., redirect to login or reset state).

Checklist questions:

Is there a clear abstraction layer for API calls (e.g., api/products.js)?

Does the app attach the current role to every outgoing request?

Does your mock server use the role header to return role‑specific data?

If the mock returned a 403, would the app handle it appropriately?

5. Session & Token Management
The user’s role is often tied to an authentication token (JWT). How you store and refresh this token affects security and user experience.

Secure storage – prefer HTTP‑only cookies for production; if using localStorage, be aware of XSS risks.

Role expiration – if the backend changes a user’s role, the frontend should reflect this. This can be done by periodically fetching the user profile or forcing a refresh when a 403 occurs.

Logout – clears the role state and removes any stored tokens.

Checklist questions:

Is the role stored securely (considering your threat model)?

Does the app handle role changes that happen on the backend (e.g., by re‑fetching user data)?

On logout, is all role state cleared?

6. Testing: Confidence Through Automation
Role‑switching logic is critical – you don’t want it to break accidentally. A solid test suite gives you confidence.

Unit tests – test the role‑switching hook/reducer and permission helpers.

Component tests – render components with different role contexts (using a test wrapper) and assert that the correct UI appears.

Integration tests – use your mock API to test that data fetching respects the role.

E2E tests – simulate full user flows (login, switch role, perform actions) with tools like Cypress or Playwright.

Checklist questions:

Are there unit tests for permission logic?

Do component tests cover role‑specific rendering?

Are your mock API handlers used in tests to verify role‑based data?

Do E2E tests include a role‑switching scenario?

7. Performance: Keep It Fast
Role switching should not cause lag or unnecessary re‑renders.

Lazy loading – load vendor‑only code only when the user switches to vendor mode (React.lazy + Suspense).

Memoization – use useMemo, React.memo, and useSelector (with shallow equality) to avoid wasted renders.

Bundle splitting – ensure role‑specific chunks are separate so customers don’t download vendor code.

Checklist questions:

Are role‑specific components lazy‑loaded?

Does switching roles trigger re‑renders only in components that depend on the role?

Is the bundle size optimised (check with a tool like webpack-bundle-analyzer)?

8. Code Organisation: Maintainability Matters
How you structure your code today determines how easy it is to add new roles or modify behaviour tomorrow.

Separation of concerns – keep auth logic in one place (e.g., auth/ folder), role‑specific components in their own directories (vendor/, customer/).

Centralised permissions – create a custom hook like usePermissions() that returns boolean flags (canEdit, canViewSales) instead of scattering role === 'vendor' checks.

API abstraction – as mentioned earlier, a single client file that conditionally uses mocks or real endpoints.

Documentation – comments or a README explaining how to add a new role, how the mock API works, and how to switch to a real backend.

Checklist questions:

Is auth logic isolated and reusable?

Are role checks abstracted (e.g., if (can('editProduct')) instead of if (role === 'vendor'))?

Is there a clear path to replace the mock API with a real one?

Is the role‑switching feature documented for other developers?

Summary Checklist
Area	Status
State Management (global, persistent, reactive)	☐
Routing (guards, dynamic nav, redirects)	☐
UI Reactivity (shared layout, real‑time updates)	☐
API Integration (abstract layer, role headers, mock enforces permissions)	☐
Session Management (secure storage, logout, expiration)	☐
Testing (unit, component, mock integration, E2E)	☐
Performance (lazy loading, memoization)	☐
Code Organization (separation, permissions utility, API abstraction)	☐
Final Thoughts
This checklist is a map, not a cage. Every codebase has its own constraints, tech stack, and business logic. Use these questions to guide discussions, identify gaps, and ensure your role‑switching implementation is robust, secure, and delightful for users.

Remember: The goal is not to tick every box blindly, but to understand why each item matters and adapt the ideas to your context. Happy coding!