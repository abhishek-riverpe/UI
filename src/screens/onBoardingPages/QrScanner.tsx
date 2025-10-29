import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import { ReactElement } from "react";

const QrScanner = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="flex items-center px-4 sm:px-12 py-4 sm:py-6 border-b border-black">
        <Link to="/" className="flex items-center gap-2">
          <img className="w-24 sm:w-36 h-auto" alt="Riverpe Logo" src="/Logo.png" />
        </Link>
      </header>

      {/* Back */}
      <div className="w-auto px-4 sm:w-[10%] sm:mx-36 mt-8 sm:mt-12 relative z-20 mb-4 sm:mb-6">
        <button
          onClick={() => (navigate(-1))}
          className="flex items-center text-sm sm:text-md font-medium text-black"
        >
          {IoIosArrowRoundBack({ className: "text-3xl sm:text-4xl" }) as ReactElement}
          Back
        </button>
      </div>

      {/* Content */}
      <main className="flex-1 flex flex-col items-center px-4 -mt-8 sm:-mt-14">
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-3">Scan QR Code</h1>
        <p className="text-center text-xs sm:text-sm text-gray-600 max-w-[36rem] px-4">
          Open your phone&apos;s camera and scan the code below. This will open the
          verification page on your phone
        </p>

        {/* QR */}
        <div className="mt-6 sm:mt-8 mb-8 sm:mb-10 rounded-xl border border-gray-300 p-2 sm:p-3 shadow-sm">
          <img
            src="/QRCodeDisplay.png"
            alt="Verification QR code"
            className="w-[180px] h-[180px] sm:w-[220px] sm:h-[220px] object-contain rounded"
          />
        </div>

        {/* CTA (disabled) */}
        <button
          disabled
          className="w-full max-w-[34rem] mx-4 py-3 rounded-lg bg-gray-400 text-white font-medium cursor-not-allowed"
        >
          Complete identity verification
        </button>

        {/* Skip */}
        <button className="text-xs sm:text-sm mt-2">
          <Link to="/dashboard"
          className="font-semibold underline">
            Set up later, skip to dashboard now?
          </Link>
        </button>
      </main>
    </div>
  );
};

export default QrScanner;