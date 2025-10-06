import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import { ReactElement, useState } from "react";

const SelectIDType = () => {
  const navigate = useNavigate();
   const [selected, setSelected] = useState<string[]>([]);

  const handleSelect = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

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

      {/* Back Button */}
      <div className="w-[10%] mx-36 mt-16 relative z-10 mb-6">
        <button
          onClick={() => navigate("/verify-identityStep-2")}
          className="flex items-center text-md font-medium text-black cursor-pointer"
        >
          {IoIosArrowRoundBack({ className: "text-4xl" }) as ReactElement}
          Back
        </button>
      </div>

     <div className="flex flex-col items-center justify-center px-4 -mt-16">
        <h2 className="text-3xl font-bold mb-10">Select ID type</h2>
         <p className="max-w-[38rem] mb-6 text-gray-600 text-lg leading-tight">
          What method would you prefer to use?
        </p>
        <div className="space-y-4 w-[34rem] mb-10">
          {/* Driver's License */}
          <label
            className={`flex items-center justify-between border rounded-lg px-4 py-4 cursor-pointer transition ${
              selected.includes("license") ? "border-blue-600" : "border-gray-300"
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-600">
                <img 
                src="license.png"
                className="text-white font-bold text-sm"/>
              </div>
              <span className="font-medium text-lg">Driver’s license</span>
            </div>
            <div
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                selected.includes("license")
                  ? "bg-blue-600 border-blue-600"
                  : "border-gray-300 bg-white"
              }`}
            >
              {selected.includes("license") && (
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <input
              type="checkbox"
              name="idType"
              checked={selected.includes("license")}
              onChange={() => handleSelect("license")}
              className="sr-only"
            />
          </label>
          {/* PAN Card */}
          <label
            className={`flex items-center justify-between border rounded-lg px-4 py-4 cursor-pointer transition ${
              selected.includes("pan") ? "border-blue-600" : "border-gray-300"
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-600">
                <img 
                src="license.png"
                className="text-white font-bold text-sm"/>
              </div>
              <span className="font-medium text-lg">PAN card</span>
            </div>
            <div
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                selected.includes("pan")
                  ? "bg-blue-600 border-blue-600"
                  : "border-gray-300 bg-white"
              }`}
            >
              {selected.includes("pan") && (
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <input
              type="checkbox"
              name="idType"
              checked={selected.includes("pan")}
              onChange={() => handleSelect("pan")}
              className="sr-only"
            />
          </label>
        </div>
        {/* Info text and buttons remain unchanged */}
        <p className="max-w-[34rem] text-sm text-gray-600 mb-8 text-justify">
          We collect this information to verify who you are, protect your
          account, and comply with KYC and AML rules. We never share it with
          clients or sell it for advertising. Your documents are stored securely
          with encryption and strict access controls, and you can request a copy
          or deletion where applicable.
        </p>
        <button
        onClick={()=>navigate("/verify-identityStep-4")}
          disabled={selected.length === 0}
          className={`w-[34rem] py-3 rounded-lg text-white font-medium mb-4 ${
            selected.length > 0
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          Continue
        </button>
        <button className="text-sm mt-2">
          <Link to="/dashboard"
          className="font-semibold underline">
            Set up later, skip to dashboard now?
            </Link>
            </button>
      </div>
    </div>
  );
};

export default SelectIDType;


