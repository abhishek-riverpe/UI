import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import { ReactElement } from "react";

const QrScanner = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="flex items-center px-12 py-6 border-b border-black">
        <Link to="/" className="flex items-center gap-2">
          <img className="w-36 h-[28px]" alt="Riverpe Logo" src="/Logo.png" />
        </Link>
      </header>

      {/* Back */}
      <div className="w-[10%] mx-36 mt-12 relative z-20 mb-6">
        <button
          onClick={() => (navigate(-1))}
          className="flex items-center text-md font-medium text-black"
        >
          {IoIosArrowRoundBack({ className: "text-4xl" }) as ReactElement}
          Back
        </button>
      </div>

      {/* Content */}
      <main className="flex-1 flex flex-col items-center px-4 -mt-14">
        <h1 className="text-3xl font-bold text-center mb-3">Scan QR Code</h1>
        <p className="text-center text-sm text-gray-600 max-w-[36rem]">
          Open your phone&apos;s camera and scan the code below. This will open the
          verification page on your phone
        </p>

        {/* QR */}
        <div className="mt-8 mb-10 rounded-xl border border-gray-300 p-3 shadow-sm">
          <img
            src="/QRCodeDisplay.png"
            alt="Verification QR code"
            className="w-[220px] h-[220px] object-contain rounded"
          />
        </div>

        {/* CTA (disabled) */}
        <button
          disabled
          className="w-[34rem] max-w-[90vw] py-3 rounded-lg bg-gray-400 text-white font-medium cursor-not-allowed"
        >
          Complete identity verification
        </button>

        {/* Skip */}
   <button className="text-sm mt-2">
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