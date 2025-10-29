import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";
import { ReactElement } from "react";

const VerifyIdentityStep1 = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="flex items-center px-4 sm:px-8 md:px-12 py-4 sm:py-6 border-b border-black">
        <Link to="/" className="flex items-center gap-2">
          <img
            className="w-24 sm:w-32 md:w-36 h-auto"
            alt="Riverpe Logo"
            src="/Logo.png"
          />
        </Link>
      </header>
      <div className="w-full px-4 sm:px-8 md:px-12 lg:px-36 mt-8 sm:mt-12 md:mt-16 mb-4 sm:mb-6">
        <button
          onClick={() => navigate("/account-type")}
          className="flex items-center text-sm sm:text-md font-medium text-black"
        >
          {IoIosArrowRoundBack({ className: "text-3xl sm:text-4xl" }) as ReactElement}
          Back
        </button>
      </div>
      {/* Content */}
      <div className="flex flex-col items-center justify-center px-4 sm:px-6 md:px-8">
        {/* Illustration */}
        <img
          src="IDCard-v-2.png"
          alt="verify identity"
          width="200"
          height="200"
          className="-mt-10 sm:-mt-16 md:-mt-20 mb-6 sm:mb-8 w-32 sm:w-40 md:w-48 lg:w-52 h-auto"
        />

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 md:mb-10 text-center">
          Verify your identity
        </h2>

        {/* Description */}
        <p className="max-w-full sm:max-w-[30rem] md:max-w-[34rem] mb-6 sm:mb-8 md:mb-10 text-sm sm:text-md text-justify px-2">
          We collect this information to verify who you are, protect your
          account, and comply with KYC and AML rules. We never share it with
          clients or sell it for advertising. Your documents are stored securely
          with encryption and strict access controls, and you can request a copy
          or deletion where applicable.
        </p>

        {/* Button */}
        <button
          onClick={() => navigate("/verify-identityStep-2")}
          className="flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-600 text-white font-base px-4 py-3 rounded-lg mb-4 w-full sm:w-[30rem] md:w-[34rem] text-sm sm:text-base"
        >
          Get Verified
          {IoIosArrowRoundForward({ className: "text-2xl sm:text-3xl" }) as ReactElement}
        </button>

        {/* Skip link */}
        <button className="text-xs sm:text-sm mt-2">
          <Link to="/dashboard" className="font-semibold underline">
            Set up later, skip to dashboard now?
          </Link>
        </button>
      </div>
    </div>
  );
};

export default VerifyIdentityStep1;