import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowRoundBack, IoIosArrowRoundForward} from "react-icons/io";
import { ReactElement } from "react";
const VerifyIdentityStep1 = () => {
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
            <div className="w-[10%] mx-36 mt-16 mb-6">
             <button 
             onClick={()=>navigate("/account-type")}
             className="flex items-center text-md font-medium text-black">
             {IoIosArrowRoundBack({ className: " text-4xl" }) as ReactElement}
             Back  
          </button>
            </div>
            {/* Content */}
        <div className=" flex flex-col items-center justify-center px-4">
            {/* Illustration */}
         <img
          src="IDCard-v-2.png"
          alt="verify identity"
          width="200"
          height="200"
        className="-mt-20 mb-8"
            />

            {/* Title */}
            <h2 className="text-3xl font-bold mb-10">Verify your identity</h2>

            {/* Description */}
            <p className=" max-w-[34rem] mb-10 text-md text-justify">
          We collect this information to verify who you are, protect your account,
          and comply with KYC and AML rules. We never share it with clients or
          sell it for advertising. Your documents are stored securely with
          encryption and strict access controls, and you can request a copy or
          deletion where applicable.
            </p>

            {/* Button */}
            <button 
            onClick={()=>navigate("/verify-identityStep-2")}
            className="flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-600 text-white font-base px-4 py-3 rounded-lg mb-4 w-[34rem]">
  Get Verified 
  {IoIosArrowRoundForward({ className: "text-3xl" }) as ReactElement}
</button>

            {/* Skip link */}
            <p className="text-sm mt-2">
          <a href="" className="font-semibold underline">
            Set up later, skip to dashboard now?
            </a>
            </p>
        </div>
    </div>
  );
};

export default VerifyIdentityStep1;
