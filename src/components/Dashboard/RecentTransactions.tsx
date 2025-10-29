import { ReactNode } from "react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { TransactionItem } from "./TransactionItem";

type TransactionBadge = {
  /** Tailwind classes for outline color set below (e.g., 'pending' | 'received') */
  tone: "pending" | "received";
  icon: ReactNode;
  text: string;
};

export type RecentTransaction = {
  id?: string | number;
  icon: ReactNode; // avatar/icon node
  name: string;
  /** Secondary line under name (fixed as "Payment" in the design, but kept overridable) */
  type?: string;
  badge: TransactionBadge;
  amount: string; // already formatted (e.g., "$2,500.00")
};

type EmptyStateConfig = {
  title?: string; // top page title ("Recent transactions")
  heading?: string;
  subheading?: string;
  illustrationSrc?: string;
  illustrationAlt?: string;
};

export  type RecentTransactionsProps = {
  /** Section title on list state ("Transaction history") */
  title?: string;
  ctaLabel?: string;
  onCtaClick?: () => void;
  transactions: RecentTransaction[];
  emptyState?: EmptyStateConfig;
  onTransactionClick?: (transactionId: string | number) => void;
};

const defaultEmptyState: EmptyStateConfig = {
  title: "Recent transactions",
  heading:
    "Track payments from clients and transfers to your INR account — all in one place.",
  subheading:
    "No transactions yet. Your payments will appear here once clients start paying you.",
  illustrationSrc: "recent-transactions.svg",
  illustrationAlt: "No transactions illustration",
};

const toneClasses: Record<
  TransactionBadge["tone"],
  { ring: string; text: string; badgeBg: string; badgeBorder: string }
> = {
  pending: {
    ring: "ring-orange-200",
    text: "text-orange-600",
    badgeBg: "bg-orange-50",
    badgeBorder: "border-orange-300",
  },
  received: {
    ring: "ring-emerald-200",
    text: "text-emerald-600",
    badgeBg: "bg-emerald-50",
    badgeBorder: "border-emerald-300",
  },
};

export const RecentTransactions = ({
  title = "Transaction history",
  ctaLabel = "View all",
  onCtaClick,
  transactions,
  emptyState,
  onTransactionClick,
}: RecentTransactionsProps): JSX.Element => {
  const es = { ...defaultEmptyState, ...emptyState };
  const hasTransactions = transactions.length > 0;

  if (!hasTransactions) {
    return (
      <section className="space-y-8">
        {es.title ? (
          <h2 className="[font-family:'Archivo',Helvetica] font-semibold text-2xl md:text-3xl text-black">
            {es.title}
          </h2>
        ) : null}

        <div className="border border-gray-200 rounded-2xl bg-white p-10 md:p-14 text-center flex flex-col items-center justify-center gap-10">
          {es.illustrationSrc ? (
            <img
              src={es.illustrationSrc}
              alt={es.illustrationAlt}
              className="mx-auto max-w-sm"
            />
          ) : null}
          <div className="max-w-3xl space-y-5">
            {es.heading ? (
              <p className="[font-family:'Archivo',Helvetica] font-semibold text-3xl md:text-4xl leading-tight text-black">
                {es.heading}
              </p>
            ) : null}
            {es.subheading ? (
              <p className="[font-family:'Archivo',Helvetica] font-normal text-base md:text-lg text-gray-600">
                {es.subheading}
              </p>
            ) : null}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section>
      <header className="flex items-center justify-between mb-5">
        {title ? (
          <h2 className="[font-family:'Archivo',Helvetica] font-semibold text-2xl text-black">
            {title}
          </h2>
        ) : <span />}
        <button
          className="[font-family:'Archivo',Helvetica] font-medium text-sm text-black underline hover:text-gray-700"
          onClick={onCtaClick}
          type="button"
        >
          {ctaLabel}
        </button>
      </header>

      <div className="flex flex-col gap-3">
        {transactions.map((tx) => {
          return (
            <TransactionItem
              key={tx.id ?? `${tx.name}-${tx.amount}`}
              id={typeof tx.id === 'number' ? tx.id : parseInt(String(tx.id || 0))}
              name={tx.name}
              type={tx.type ?? "Payment"}
              status={tx.badge.tone as "pending" | "received"}
              amount={tx.amount}
              onClick={() => tx.id && onTransactionClick?.(tx.id)}
            />
          );
        })}
      </div>
    </section>
  );
};
