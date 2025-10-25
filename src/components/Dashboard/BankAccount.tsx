// components/BankAccount.tsx
import React from "react";
import {
  CheckCircle2,
  AlertCircle,
  Clock,
  IdCard,
  Info,
} from "lucide-react";

/** --- Tiny flag (round US) --- */
const USFlag = ({ size = 28 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" className="shrink-0">
    <defs><clipPath id="us_round"><circle cx="32" cy="32" r="32" /></clipPath></defs>
    <g clipPath="url(#us_round)">
      {[...Array(13)].map((_, i) => (
        <rect key={i} x="0" y={i * (64 / 13)} width="64" height={64 / 13} fill={i % 2 === 0 ? "#B22234" : "#FFFFFF"} />
      ))}
      <rect x="0" y="0" width="27.7" height="27.7" fill="#3C3B6E" />
      {[...Array(9)].map((_, r) =>
        [...Array(r % 2 === 0 ? 6 : 5)].map((__, c) => (
          <circle
            key={`${r}-${c}`}
            cx={2.5 + (r % 2 === 0 ? c * 4.5 : c * 4.5 + 2.25)}
            cy={2.5 + r * 3}
            r="0.6"
            fill="#fff"
          />
        ))
      )}
    </g>
  </svg>
);

/** --- Simple blue illustrations to match vibe (inline SVGs) --- */
const IdIllustration = () => (
  <svg viewBox="0 0 340 200" className="mx-auto max-w-md w-full h-auto">
    <rect x="40" y="40" width="220" height="120" rx="10" fill="#E8EEFF" />
    <rect x="60" y="60" width="80" height="80" rx="6" fill="#0B5FFF" />
    <rect x="150" y="60" width="90" height="10" rx="5" fill="#BFD3FF" />
    <rect x="150" y="80" width="120" height="10" rx="5" fill="#BFD3FF" />
    <rect x="150" y="100" width="110" height="10" rx="5" fill="#BFD3FF" />
    <rect x="150" y="120" width="70" height="10" rx="5" fill="#BFD3FF" />
  </svg>
);

const PiggyIllustration = () => (
  <svg viewBox="0 0 340 200" className="mx-auto max-w-md w-full h-auto">
    <ellipse cx="160" cy="120" rx="120" ry="60" fill="#0B5FFF" />
    <circle cx="230" cy="100" r="18" fill="#073DBA" />
    <circle cx="230" cy="100" r="6" fill="#fff" />
    <rect x="155" y="58" width="20" height="24" rx="4" fill="#073DBA" />
    <rect x="150" y="50" width="30" height="10" rx="3" fill="#2C6BFF" />
    <rect x="60" y="140" width="30" height="10" rx="3" fill="#073DBA" />
    <rect x="220" y="140" width="30" height="10" rx="3" fill="#073DBA" />
  </svg>
);

/** --- Props --- */
export type BankAccountProps = {
  verificationStatus: "not_verified" | "pending" | "rejected" | "verified";
  accountCreated: boolean;
  accountBalance: number;
  onPrimary?: () => void;       // Start/Retry/Continue/Open actions
  onBannerCta?: () => void;     // CTA in the top banner
  onShowBankDetails?: () => void;
};

/** --- Utils --- */
const fmtUSD = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 }).format(
    isFinite(n) ? n : 0
  );

export default function BankAccount({
  verificationStatus,
  accountCreated,
  accountBalance,
  onPrimary,
  onBannerCta,
  onShowBankDetails,
}: BankAccountProps) {
  const isVirtualAccountsView = verificationStatus === "verified" && accountCreated;

  /** ------- Top Message Banner (shown for first 4 screenshots) ------- */
  const banner = (() => {
    if (isVirtualAccountsView) return null;

    switch (verificationStatus) {
      case "not_verified":
        return {
          icon: <img src="/id-card.svg" alt="" />,
          title: "Verify to activate your US bank account",
          caption:
            "Complete a quick ID check to enable international payments and protect your account.",
          cta: "Start verification",
        };
      case "pending":
        return {
          icon: <img src="/pending.svg" alt="" />,
          title: "Verification in progress",
          caption:
            "We’re reviewing your details — this usually takes less than an hour.",
          cta: "View status",
        };
      case "rejected":
        return {
          icon: <img src="/issue.svg" alt="" />,
          title: "Verification issue",
          caption:
            "We couldn’t verify your details. Please try again with a clear ID and matching legal name.",
          cta: "Retry verification",
        };
      case "verified":
        return {
          icon: <img src="/verified.svg" alt="" />,
          title: "Your account is now verified!",
          caption: "Open your first US bank account and enjoy all of Riverpe’s features!",
          cta: "Open your US bank account",
        };
    }
  })();

  /** ------- Main body content per status (first 4 screenshots) ------- */
  const main = (() => {
    if (isVirtualAccountsView) return null;

    switch (verificationStatus) {
      case "not_verified":
        return {
          heading: "Verify to activate your US bank account",
          sub:
            "Complete a quick ID check to enable transfers from your US account to your INR bank.",
          btn: "Start verification",
          illo: <img src="/illustrations/id-card.svg" alt="ID card illustration" className="mx-auto max-w-md w-full h-auto" />,
          note: "This feature is available once verification is complete.",
        };
      case "pending":
        return {
          heading: "Verification in progress",
          sub:
            "We’re reviewing your details. You’ll receive your US account & routing numbers once approved.",
          btn: "View status",
          illo: <img src="/illustrations/id-card.svg" alt="ID card illustration" className="mx-auto max-w-md w-full h-auto" />,
          note: "Opening US bank account is available once verification is complete.",
        };
      case "rejected":
        return {
          heading: "We couldn’t verify your details",
          sub:
            "Please re-verify with a clear government ID and a name that matches your bank account.",
          btn: "Retry Verification",
          illo: <img src="/illustrations/id-card.svg" alt="ID card illustration" className="mx-auto max-w-md w-full h-auto" />,
          note: "This feature is available once verification is complete.",
        };
      case "verified":
        return {
          heading: "Open your first US bank account",
          sub:
            "You're verified. Next, confirm your identification and agree to the terms—then we'll issue your US account & routing numbers.",
          btn: "Continue",
          illo: <img src="/illustrations/piggy2.svg" alt="Piggy bank illustration" className="mx-auto max-w-md w-full h-auto" />,
          note: undefined,
        };
    }
  })();

  return (
    <section className="w-full">
      {/* Banner */}
      {banner && (
        <div className="mb-8 rounded-2xl border border-dashed border-gray-300 bg-gray-100 px-6 py-5 flex items-center justify-between">
          <div className="flex items-start gap-4">
            <div className="mt-0.5">{banner.icon}</div>
            <div>
              <div className="[font-family:'Archivo',Helvetica] font-semibold text-lg text-black">
                {banner.title}
              </div>
              <div className="[font-family:'Archivo',Helvetica] text-sm text-gray-700">
                {banner.caption}
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onBannerCta?.()}
            className="rounded-xl bg-[#0B5FFF] text-white px-4 py-2 [font-family:'Archivo',Helvetica] font-semibold text-sm hover:brightness-95"
          >
            {banner.cta}
          </button>
        </div>
      )}

      {/* When verified & account created => Virtual accounts view (Screenshot #5) */}
      {isVirtualAccountsView ? (
        <div className="space-y-6">
          <h2 className="[font-family:'Archivo',Helvetica] font-semibold text-2xl text-black">
            Your virtual bank accounts
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* USD account card */}
            <div className="rounded-2xl border flex flex-col justify-between border-gray-300 bg-white p-6">
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-3">
                  <USFlag />
                  <span className="[font-family:'Archivo',Helvetica] font-semibold text-lg">
                    USD
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => onShowBankDetails?.()}
                  className="rounded-lg bg-[#0B5FFF] text-white px-4 py-2 [font-family:'Archivo',Helvetica] font-semibold text-sm hover:brightness-95"
                >
                  Show bank details
                </button>
              </div>
              <div className="[font-family:'Archivo',Helvetica] font-bold text-3xl">
                {fmtUSD(accountBalance)}
              </div>
            </div>

            {/* Coming soon card */}
            <div className="rounded-2xl border-2 border-dashed border-[#ACACAC] bg-[#F8F8F8] p-6 flex items-center justify-center">
              <div className="flex flex-col items-center gap-6">
                <img src="/illustrations/piggy.svg" alt="Piggy bank illustration" className="mx-auto max-w-md w-full h-32" />
                <div className="[font-family:'Archivo',Helvetica] font-semibold text-xl text-gray-800">
                  More virtual bank accounts coming soon!
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Title */}
          <h2 className="[font-family:'Archivo',Helvetica] font-semibold text-2xl text-black mb-8">
            Your US bank account
          </h2>

          {/* Illustration */}
            <div className="h-52 flex items-center justify-center overflow-hidden">
              {main?.illo && (
                <div className="w-full h-full flex items-center justify-center">
                  {React.cloneElement(main.illo, {
                    className: "max-w-md w-full h-full object-contain"
                  })}
                </div>
              )}
            </div>
{/* <img src="/illustrations/id-card.svg" alt="Piggy bank illustration" className="mx-auto max-w-md w-full h-44" /> */}

          {/* Headline + sub + CTA */}
          <div className="text-center max-w-3xl mx-auto mt-6">
            <h3 className="[font-family:'Archivo',Helvetica] font-extrabold text-2xl md:text-2xl text-black">
              {main?.heading}
            </h3>
            {main?.sub && (
              <p className="[font-family:'Archivo',Helvetica] text-base text-gray-700 mt-3">
                {main.sub}
              </p>
            )}

            <button
              type="button"
              onClick={() => onPrimary?.()}
              className="mt-8 w-full md:w-auto rounded-2xl bg-[#0B5FFF] px-72 py-3 text-white [font-family:'Archivo',Helvetica] font-semibold text-base hover:brightness-95"
            >
              {main?.btn}
            </button>

            {/* Note row (when present) */}
            {main?.note && (
              <div className="mt-6 flex items-center justify-center gap-2 text-gray-700">
                <Info className="w-5 h-5" />
                <span className="[font-family:'Archivo',Helvetica]">
                  <span className="font-semibold">Note:</span> {main.note}
                </span>
              </div>
            )}
          </div>
        </>
      )}
    </section>
  );
}
