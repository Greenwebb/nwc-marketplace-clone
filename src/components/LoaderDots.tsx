interface LoaderDotsProps {
  /** Show the Newworld logo above the dots (full-page style) */
  withLogo?: boolean;
  /** Render as a full-page centered overlay */
  fullPage?: boolean;
  /** Additional CSS classes on the outer wrapper */
  className?: string;
}

export function LoaderDots({ withLogo = false, fullPage = false, className = "" }: LoaderDotsProps) {
  const dots = (
    <div className="flex items-center gap-2">
      <span className="h-2.5 w-2.5 rounded-full bg-primary animate-[dotPulse_1.4s_ease-in-out_infinite]" />
      <span className="h-2.5 w-2.5 rounded-full bg-primary animate-[dotPulse_1.4s_ease-in-out_0.2s_infinite]" />
      <span className="h-2.5 w-2.5 rounded-full bg-primary animate-[dotPulse_1.4s_ease-in-out_0.4s_infinite]" />
    </div>
  );

  const content = withLogo ? (
    <div className="flex flex-col items-center gap-8">
      <div className="flex items-center gap-1.5">
        <span className="text-3xl font-bold tracking-tight text-primary">
          New<span className="text-secondary">world</span>
        </span>
        <span className="h-2 w-2 rounded-full bg-secondary" />
      </div>
      {dots}
    </div>
  ) : (
    dots
  );

  if (fullPage) {
    return (
      <div className={`flex min-h-screen items-center justify-center ${className}`}>
        {content}
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-center py-12 ${className}`}>
      {content}
    </div>
  );
}
