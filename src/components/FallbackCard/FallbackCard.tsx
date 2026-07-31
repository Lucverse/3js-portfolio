import React from "react";

interface FallbackCardProps {
  /** Short code or label shown as the large heading (e.g. "404", "500") */
  code?: string;
  /** Title line below the code */
  title: string;
  /** Descriptive message */
  message: string;
  /** Action buttons rendered at the bottom */
  children: React.ReactNode;
}

/**
 * Shared card shell used by error.tsx, not-found.tsx, and any other
 * full-page fallback routes. Keeps visual style consistent across all
 * fallback surfaces without duplicating markup.
 */
const FallbackCard: React.FC<FallbackCardProps> = ({
  code,
  title,
  message,
  children,
}) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative">
      <div className="max-w-md w-full bg-transparent border border-primary p-8 rounded-custom shadow-[0_0_30px_rgba(191,174,147,0.1),inset_0_0_80px_rgba(191,174,147,0.03)] text-center backdrop-blur-[0.5px]">
        {code && (
          <p className="text-5xl font-extrabold text-primary tracking-wider mb-2">
            {code}
          </p>
        )}
        <h1 className="text-lg font-semibold text-secondary mb-4">{title}</h1>
        <p className="text-xs text-muted-color mb-8 leading-relaxed">
          {message}
        </p>
        <div className="flex flex-wrap gap-3 justify-center">{children}</div>
      </div>
    </div>
  );
};

export default FallbackCard;
