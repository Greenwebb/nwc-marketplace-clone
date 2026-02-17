# Role Switching Architecture

## Source of truth
- Auth state lives in `AuthProvider` and is derived from `authService`.
- Active mode is persisted via `ActiveModeStorageAdapter`.
- Capability and mode checks are centralized in `src/services/auth/permissions.ts`.

## Route enforcement
- `authorizeRoute` in `src/services/auth/routePolicy.ts` is the single route policy layer.
- Mode redirect behavior is centralized in `src/services/auth/modeRedirect.ts`.

## Switching flow
1. `RoleSwitchFab` calls `setActiveMode`.
2. Auth service updates active mode through profile repository.
3. UI redirect uses `getPostModeSwitchPath`.
4. Protected routes enforce capability, mode, and onboarding state.

## Adding a permission
1. Add key to `PermissionKey` in `src/services/auth/permissions.ts`.
2. Add derived logic in `getPermissions`.
3. Use `can(state, "<permission>")` in UI or route guards.
4. Add tests in `src/services/auth/permissions.test.ts`.

