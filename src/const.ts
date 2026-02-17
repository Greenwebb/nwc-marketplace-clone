export const COOKIE_NAME = "app_session_id";
export const ONE_YEAR_MS = 1000 * 60 * 60 * 24 * 365;

// Frontend-only app: direct users to local role-selection page.
export const getLoginUrl = () => {
  return "/auth/login";
};
