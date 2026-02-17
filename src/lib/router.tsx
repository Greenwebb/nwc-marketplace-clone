import {
  Link as RRLink,
  matchPath,
  useLocation as useRRLocation,
  useNavigate,
  useParams as useRRParams,
} from "react-router-dom";
import { cloneElement, isValidElement, type MouseEvent, type ReactElement, type ReactNode } from "react";

type LinkProps = {
  href?: string;
  to?: string;
  children: ReactNode;
  className?: string;
};

export function Link({ href, to, children, className }: LinkProps) {
  const navigate = useNavigate();
  const target = to ?? href ?? "/";

  if (isValidElement(children) && children.type === "a") {
    const child = children as ReactElement<{
      onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
      href?: string;
      className?: string;
    }>;

    return cloneElement(child, {
      href: target,
      className: child.props.className ?? className,
      onClick: (event: MouseEvent<HTMLAnchorElement>) => {
        child.props.onClick?.(event);
        if (event.defaultPrevented) return;
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        navigate(target);
      },
    });
  }

  return (
    <RRLink className={className} to={target}>
      {children}
    </RRLink>
  );
}

export function useLocation(): [string, (to: string) => void] {
  const navigate = useNavigate();
  const location = useRRLocation();
  return [`${location.pathname}${location.search}`, (to: string) => navigate(to)];
}

export function useRoute(pattern: string): [boolean, Record<string, string>] {
  const location = useRRLocation();
  const matched = matchPath({ path: pattern, end: true }, location.pathname);
  return [Boolean(matched), (matched?.params as Record<string, string>) ?? {}];
}

export function useParams<T extends Record<string, string | undefined>>() {
  return useRRParams<T>();
}

export function useSearch() {
  return useRRLocation().search;
}

