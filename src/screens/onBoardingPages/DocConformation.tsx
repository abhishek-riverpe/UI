import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import { ReactElement } from "react";

const VerifyIdentityStep4 = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="flex items-center px-12 py-6 border-b border-black">
        <Link to="/" className="flex items-center gap-2">
          <img className="w-36 h-[28px]" alt="Riverpe" src="/Logo.png" />
        </Link>
      </header>

      {/* Back */}
      <div className="w-[10%] mx-36 mt-12 relative z-20 mb-6">
        <button
          onClick={() => navigate("/verify-identityStep-3")}
          className="flex items-center text-md font-medium cursor-pointer text-black"
        >
          {IoIosArrowRoundBack({ className: "text-4xl" }) as ReactElement}
          Back
        </button>
      </div>

      {/* Content */}
      <main className="flex-1 flex flex-col items-center px-4 -mt-20">
        {/* Illustration */}
        <img
          src="/IDCard-v-2.png"
          alt="Verify illustration"
          className="w-[200px] h-[200px] object-contain mb-8"
        />

        {/* Title */}
        <h1 className="text-center font-bold text-3xl leading-tight mb-10">
          Before you take your photo, please
          <br /> make sure that
        </h1>

        {/* Checklist */}
      <div className="flex flex-col gap-6 mb-10 w-[34rem]">
          {[
            "Your ID isn’t expired",
            "Take a clear photo",
            "Capture your entire ID",
          ].map((item) => (
            <div key={item} className="flex items-center gap-4">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#0a58f0]">
                <svg
                  className="w-4 h-4 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              <span className="text-lg text-black">{item}</span>
            </div>
          ))}
        </div>

        {/* Button */}
        <button
          onClick={() => navigate("/verify-identityStep-5")}
          className="w-[34rem] max-w-[90vw] py-3 rounded-lg bg-[#0a58f0] hover:bg-[#0a4bdd] text-white font-semibold mb-4"
        >
          Take photo
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

export default VerifyIdentityStep4;