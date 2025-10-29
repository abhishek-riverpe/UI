// components/ui/avatar.tsx
import React from "react";

// Simple className merge helper
const cn = (...classes: (string | undefined)[]) => classes.filter(Boolean).join(' ');

export function Avatar({
  children,
  className = "",
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 text-gray-700",
        className
      )}
    >
      {children}
    </div>
  );
}
