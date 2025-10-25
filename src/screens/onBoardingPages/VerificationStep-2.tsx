import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import { ReactElement } from "react";

const VerifyIdentityStep2 = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="flex items-center px-4 sm:px-12 py-4 sm:py-6 border-b border-black">
        <Link to="/" className="flex items-center gap-2">
          <img
            className="w-24 sm:w-36 h-auto"
            alt="Riverpe Logo"
            src="/Logo.png"
          />
        </Link>
      </header>

      {/* Back button - Desktop Only */}
      <div className="hidden sm:block w-full px-12 lg:px-36 mt-16 mb-6">
        <button
          onClick={() => {
            {console.log("back button clicked")}
            navigate("/verify-identityStep-1")}}
          className="flex items-center text-md font-medium text-black cursor-pointer"
        >
          {IoIosArrowRoundBack({ className: "text-4xl" }) as ReactElement}
          Back
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-between sm:justify-center px-6 sm:px-4 py-8 sm:py-0 sm:-mt-16">
        {/* Top Content */}
        <div className="flex flex-col w-full">
          {/* Back button - Mobile Only */}
          <div className="sm:hidden mb-6">
            <button
              onClick={() => {
                {console.log("back button clicked")}
                navigate("/verify-identityStep-1")}}
              className="flex items-center text-md font-medium text-black cursor-pointer"
            >
              {IoIosArrowRoundBack({ className: "text-3xl" }) as ReactElement}
              Back
            </button>
          </div>

          {/* Title */}
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-left sm:text-center">
            Let's get started
          </h2>

          {/* Description */}
          <p className="max-w-full sm:max-w-[38rem] mb-8 sm:mb-16 text-gray-600 text-sm sm:text-lg leading-tight text-left sm:text-center sm:mx-auto">
            To ensure the security of your account and protect against fraud, we
            require you to complete our identity verification process
          </p>

          {/* Steps */}
          <div className="space-y-4 sm:space-y-6 mb-8 sm:mb-10 w-full sm:max-w-[38rem] sm:mx-auto">
            {/* Photo ID */}
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-600 flex-shrink-0">
                <img
                  src="/photo-id.png"
                  alt="Photo ID"
                  className="w-6 h-6 sm:w-10 sm:h-10 text-white"
                />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-base sm:text-lg">Photo ID</p>
                <p className="text-gray-600 text-xs sm:text-sm">
                  ID card, PAN card, driver license supported
                </p>
              </div>
            </div>

            {/* Facial recognition - Hidden on mobile as per design */}
            <div className="sm:flex items-start gap-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 flex-shrink-0">
                <img
                  src="/face-id.png"
                  alt="Facial recognition"
                  className="w-10 h-10 text-white"
                />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-lg">Facial recognition</p>
                <p className="text-gray-600 text-sm">
                  Confirm that the portrait matches the picture on the identification document
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Content - Sticks to bottom on mobile */}
        <div className="flex flex-col w-full sm:items-center">
          {/* Agreement text */}
          <p className="text-xs sm:text-sm max-w-full sm:max-w-[34rem] mb-4 sm:mb-6 sm:mt-10 text-left sm:text-center">
            Clicking the continue button means that I have read and agreed to the{" "}
            <a href="#" className="font-semibold underline">
              user identity authentication information statement
            </a>
            .
          </p>

          {/* Continue button */}
          <button 
            onClick={()=>navigate("/verify-identityStep-3")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg w-full sm:w-[34rem] mb-4 sm:mb-0"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyIdentityStep2; 