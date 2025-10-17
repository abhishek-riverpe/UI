import * as React from "react";
import { ArrowUpDown, Info, Loader2 } from "lucide-react";

/** ---- Tiny round flag SVGs (no external assets) ---- */
const USFlag = ({ size = 36 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" className="shrink-0">
    <defs>
      <clipPath id="us_round">
        <circle cx="32" cy="32" r="32" />
      </clipPath>
    </defs>
    <g clipPath="url(#us_round)">
      {/* stripes */}
      {[...Array(13)].map((_, i) => (
        <rect
          key={i}
          x="0"
          y={i * (64 / 13)}
          width="64"
          height={64 / 13}
          fill={i % 2 === 0 ? "#B22234" : "#FFFFFF"}
        />
      ))}
      {/* canton */}
      <rect x="0" y="0" width="27.7" height="27.7" fill="#3C3B6E" />
      {/* star dots */}
      {[...Array(9)].map((_, r) =>
        [...Array(r % 2 === 0 ? 6 : 5)].map((__, c) => (
          <circle
            key={`${r}-${c}`}
            cx={2.5 + (r % 2 === 0 ? c * 4.5 : c * 4.5 + 2.25)}
            cy={2.5 + r * 3}
            r="0.6"
            fill="#FFFFFF"
          />
        ))
      )}
    </g>
  </svg>
);

const INFlag = ({ size = 36 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" className="shrink-0">
    <defs>
      <clipPath id="in_round">
        <circle cx="32" cy="32" r="32" />
      </clipPath>
    </defs>
    <g clipPath="url(#in_round)">
      <rect width="64" height="64" fill="#FF9933" />
      <rect y="21.33" width="64" height="21.33" fill="#FFFFFF" />
      <rect y="42.66" width="64" height="21.34" fill="#138808" />
      {/* Ashoka Chakra */}
      <circle cx="32" cy="32" r="6.5" fill="none" stroke="#1A3C8E" strokeWidth="2" />
      {[...Array(24)].map((_, i) => {
        const a = (i * Math.PI * 2) / 24;
        const x1 = 32 + Math.cos(a) * 6.5;
        const y1 = 32 + Math.sin(a) * 6.5;
        const x2 = 32 + Math.cos(a) * 3.2;
        const y2 = 32 + Math.sin(a) * 3.2;
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#1A3C8E" strokeWidth="1.3" />;
      })}
      <circle cx="32" cy="32" r="1.2" fill="#1A3C8E" />
    </g>
  </svg>
);

/** ---- Helpers ---- */
type Direction = "USD_TO_INR" | "INR_TO_USD";

const fmtUSD = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 }).format(
    isFinite(n) ? n : 0
  );

const fmtINR = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 2 }).format(
    isFinite(n) ? n : 0
  );

/** ---- Fetch real-time exchange rate ---- */
const fetchExchangeRate = async (): Promise<number> => {
  try {
    // Using exchangerate-api.com - Free tier allows 1500 requests/month
    const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
    const data = await response.json();
    return data.rates.INR || 83.5; // Fallback rate
  } catch (error) {
    console.error('Failed to fetch exchange rate:', error);
    return 83.5; // Fallback rate
  }
};

/** ---- Component ---- */
export default function LiveCalculator() {
  const [direction, setDirection] = React.useState<Direction>("USD_TO_INR");
  const [sourceAmount, setSourceAmount] = React.useState<string>("1000.00");
  const [exchangeRate, setExchangeRate] = React.useState<number>(83.5);
  const [isLoadingRate, setIsLoadingRate] = React.useState<boolean>(true);
  const [lastUpdated, setLastUpdated] = React.useState<Date>(new Date());

  // Fetch exchange rate on mount and every 5 minutes
  React.useEffect(() => {
    const updateRate = async () => {
      setIsLoadingRate(true);
      const rate = await fetchExchangeRate();
      setExchangeRate(rate);
      setLastUpdated(new Date());
      setIsLoadingRate(false);
    };

    updateRate();
    const interval = setInterval(updateRate, 5 * 60 * 1000); // Update every 5 minutes

    return () => clearInterval(interval);
  }, []);

  const srcIsUSD = direction === "USD_TO_INR";
  const rate = exchangeRate;

  // compute target amount
  const num = parseFloat(sourceAmount.replace(/,/g, ""));
  const targetVal = srcIsUSD ? num * rate : num / rate;

  const topLabel = srcIsUSD ? "USD" : "INR";
  const bottomLabel = srcIsUSD ? "INR" : "USD";

  const topFlag = srcIsUSD ? '/usa-flag.svg' : '/india-flag.svg';
  const bottomFlag = srcIsUSD ? '/india-flag.svg' : '/usa-flag.svg';

  const bottomFormatted = srcIsUSD ? fmtINR(targetVal || 0) : fmtUSD(targetVal || 0);

  // State to track if input is focused
  const [isFocused, setIsFocused] = React.useState(false);

  // Display value: show raw number when focused, formatted when not
  const displayValue = isFocused ? sourceAmount : (srcIsUSD ? fmtUSD(num || 0) : fmtINR(num || 0));

  // allow typing raw number
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^\d.]/g, "");
    // Prevent multiple decimal points
    const parts = raw.split('.');
    const cleanValue = parts.length > 2 ? parts[0] + '.' + parts.slice(1).join('') : raw;
    setSourceAmount(cleanValue);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    const n = parseFloat(sourceAmount);
    if (!isNaN(n) && n >= 0) {
      setSourceAmount(n.toFixed(2));
    } else {
      setSourceAmount("0.00");
    }
  };

  const swap = () => {
    setDirection((d) => (d === "USD_TO_INR" ? "INR_TO_USD" : "USD_TO_INR"));
    // Keep the same numeric value when swapping
    const currentNum = parseFloat(sourceAmount);
    if (!isNaN(currentNum)) {
      setSourceAmount(currentNum.toFixed(2));
    }
  };

  // Calculate fee percentage (1.75% of source amount)
  const feePercentage = 1.75;
  const calculatedFee = srcIsUSD ? (num * feePercentage) / 100 : ((num / rate) * feePercentage) / 100;

  return (
    <section className="max-w-5xl w-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="[font-family:'Archivo',Helvetica] font-semibold text-2xl text-black">
          Live Calculator
        </h2>
      </div>

      {/* Top input */}
      <div className="relative">
        <div className="flex items-center justify-between w-full rounded-2xl border border-gray-300 bg-white px-6 py-6">
          <input
            value={displayValue}
            onChange={handleInput}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className="[font-family:'Archivo',Helvetica] font-bold text-2xl lg:text-3xl outline-none w-full bg-transparent"
            inputMode="decimal"
            type="text"
            placeholder="0.00"
            aria-label={`Amount in ${topLabel}`}
            disabled={isLoadingRate}
          />
          <div className="flex items-center gap-3 pr-6">
            <img src={topFlag} alt="Top Flag" />
            <span className="[font-family:'Archivo',Helvetica] font-semibold text-lg text-black">
              {topLabel}
            </span>
          </div>
        </div>

        {/* Swap button */}
        <button
          type="button"
          onClick={swap}
          aria-label="Swap currencies"
          disabled={isLoadingRate}
          className="absolute left-1/2 -translate-x-1/2 -bottom-11 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-[#0B5FFF] text-white shadow-lg hover:bg-[#0052CC] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ArrowUpDown />
        </button>
      </div>

      {/* Bottom display */}
      <div className="mt-10">
        <div className="flex items-center justify-between w-full rounded-2xl border border-gray-300 bg-white px-6 py-6">
          <div className="[font-family:'Archivo',Helvetica] font-bold text-2xl">
            {bottomFormatted}
          </div>
          <div className="flex items-center gap-3 pr-4">
            <img src={bottomFlag} alt="Bottom-flag" />
            <span className="[font-family:'Archivo',Helvetica] font-semibold text-lg text-black">
              {bottomLabel}
            </span>
          </div>
        </div>
      </div>

      {/* Fees / Arrival */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div>
          <div className="[font-family:'Archivo',Helvetica] text-center text-gray-700 mb-2 flex items-center justify-center gap-2">
            <span>Includes total fees ({feePercentage}%)</span>
            <Info size={16} className="text-gray-500" />
          </div>
          <div className="rounded-2xl border border-gray-300 bg-white px-6 py-4 text-center">
            <span className="[font-family:'Archivo',Helvetica] font-bold text-2xl">
              {fmtUSD(calculatedFee)}
            </span>
          </div>
        </div>
        <div>
          <div className="[font-family:'Archivo',Helvetica] text-center text-gray-700 mb-2">
            Should arrive by
          </div>
          <div className="rounded-2xl border border-gray-300 bg-white px-6 py-4 text-center">
            <span className="[font-family:'Archivo',Helvetica] font-extrabold text-2xl">
              Today
            </span>
          </div>
        </div>
      </div>


      {/* CTA */}
      <button
        type="button"
        onClick={() => {
          const topFormatted = srcIsUSD ? fmtUSD(num || 0) : fmtINR(num || 0);
          const confirmMsg = `Withdraw ${topFormatted} (${bottomFormatted} after conversion)\nFee: ${fmtUSD(calculatedFee)}\nRate: 1 USD = ₹${rate.toFixed(2)}`;
          if (confirm(confirmMsg)) {
            alert("Withdrawal initiated successfully!");
          }
        }}
        disabled={isLoadingRate || num <= 0}
        className="mt-8 w-full rounded-2xl bg-[#0B5FFF] py-4 text-white [font-family:'Archivo',Helvetica] font-semibold text-lg hover:bg-[#0052CC] active:brightness-90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isLoadingRate ? 'Loading rate...' : 'Withdraw now'}
      </button>
    </section>
  );
}
