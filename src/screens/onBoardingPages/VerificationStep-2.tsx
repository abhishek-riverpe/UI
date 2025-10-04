import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import { ReactElement } from "react";

const VerifyIdentityStep2 = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="flex items-center px-12 py-6 border-b border-black">
        <Link to="/" className="flex items-center gap-2">
          <img
            className="w-36 h-[27.83px]"
            alt="Riverpe Logo"
            src="/Logo.png"
          />
        </Link>
      </header>

      {/* Back button */}
      <div className="w-[10%] mx-36 mt-16 relative z-20 mb-6">
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
      <div className="flex flex-col items-center justify-center px-4 text-center -mt-16">
        {/* Title */}
        <h2 className="text-3xl font-bold mb-6">Let’s get started</h2>

        {/* Description */}
        <p className="max-w-[38rem] mb-16 text-gray-600 text-lg leading-tight">
          To ensure the security of your account and protect against fraud, we
          require you to complete our identity verification process
        </p>

        {/* Steps */}
        <div className="space-y-6 text-left mb-10">
          {/* Photo ID */}
          <div className="flex items-start gap-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-600">
              <img
                src="/photo-id.png"
                alt="Photo ID"
                className="w-10 h-10 text-white"
              />
            </div>
            <div>
              <p className="font-semibold text-lg">Photo ID</p>
              <p className="text-gray-600 text-sm">
                ID card, PAN card, driver license supported
              </p>
            </div>
          </div>

          {/* Facial recognition */}
          <div className="flex items-start gap-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-600">
              <img
                src="/face-id.png"
                alt="Facial recognition"
                className="w-10 h-10 text-white"
              />
            </div>
            <div>
              <p className="font-semibold text-lg">Facial recognition</p>
              <p className="text-gray-600 text-sm">
                Confirm that the portrait matches the picture on the identification document
              </p>
            </div>
          </div>
        </div>

        {/* Agreement text */}
        <p className="text-sm max-w-[34rem] mb-6 mt-10">
          Clicking the continue button means that I have read and agreed to the{" "}
          <a href="#" className="font-semibold underline">
            user identity authentication information statement
          </a>
          .
        </p>

        {/* Continue button */}
        <button 
        onClick={()=>navigate("/verify-identityStep-3")}
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg w-[34rem]">
          Continue
        </button>
      </div>
    </div>
  );
};

export default VerifyIdentityStep2;
