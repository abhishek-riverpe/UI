// components/QuickActions.tsx
import * as React from "react";
import { cn } from "@/lib/utils"; // optional; replace with your own class merge or remove
import { BadgeCheck } from "lucide-react";

export type QuickAction = {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;      // e.g. <YourIcon className="w-7 h-7" />
  onClick?: () => void;       // click does nothing if disabledReason is set
  disabledReason?: string;    // when present => renders inactive style + pill with this text
};

type QuickActionsProps = {
  heading?: string;           // defaults to "Quick Actions"
  actions: QuickAction[];     // usually 3, but supports any length
  className?: string;
};

export default function QuickActions({
  heading = "Quick Actions",
  actions,
  className,
}: QuickActionsProps) {
  return (
    <section className={cn("w-full", className)}>
      <h2 className="[font-family:'Archivo',Helvetica] font-semibold text-2xl text-black mb-6">
        {heading}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {actions.map((a) => {
          const inactive = Boolean(a.disabledReason);

          return (
            <button
              key={a.id}
              type="button"
              aria-disabled={inactive}
              onClick={() => {
                if (inactive) return;
                a.onClick?.();
              }}
              className={cn(
                "relative text-left w-full h-full rounded-[28px] border px-8 py-9 transition-all",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0B5FFF]",
                inactive
                  ? "bg-gray-100 border-gray-200"
                  : "bg-white border-gray-300 hover:shadow-[0_6px_18px_rgba(0,0,0,0.06)]"
              )}
            >
              {/* Inactive reason pill */}
              {inactive && a.disabledReason ? (
                <div className="absolute right-6 top-6">
                  <span className="inline-flex items-center gap-2 rounded-full bg-gray-200 text-gray-800 px-4 py-2 [font-family:'Archivo',Helvetica] text-sm font-semibold">
                    {/* tiny id-card icon-ish */}
                    <BadgeCheck className="w-4 h-4 text-gray-700" />
                    {a.disabledReason}
                  </span>
                </div>
              ) : null}

              {/* Icon */}
              <div
                className={cn(
                  "mb-6",
                  inactive ? "text-gray-500" : "text-[#0B5FFF]"
                )}
              >
                {/* You control icon color via currentColor */}
                <div className="w-8 h-8">{a.icon}</div>
              </div>

              {/* Title */}
              <h3
                className={cn(
                  "[font-family:'Archivo',Helvetica] font-semibold leading-tight mb-3",
                  "text-[18px]",
                  inactive ? "text-gray-500" : "text-[#0B5FFF]"
                )}
              >
                {a.title}
              </h3>

              {/* Description */}
              <p
                className={cn(
                  "[font-family:'Archivo',Helvetica] text-sm",
                  inactive ? "text-gray-500" : "text-gray-700"
                )}
              >
                {a.description}
              </p>

              {/* Block interactions when inactive, keep cursor default */}
              {inactive && (
                <span className="absolute inset-0 pointer-events-none" />
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}
