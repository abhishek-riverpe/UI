import { Link, useNavigate } from "react-router-dom";

export const AccountType = (): JSX.Element => {
    const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="flex items-center px-4 sm:px-8 lg:px-12 py-6 w-full border-b border-black">
        <Link to="/" className="flex items-center gap-2">
          <img
            className="w-36 h-[27.83px]"
            alt="Riverpe Logo"
            src="/Logo.png"
          />
        </Link>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="w-full max-w-[1200px]">
          <h1 className="text-center [font-family:'Archivo',Helvetica] font-semibold text-2xl sm:text-3xl text-black tracking-[0] leading-[1.2] mb-8 sm:mb-16">
            What kind of account would you like to open?
          </h1>

          <div className="flex flex-col md:flex-row gap-6 sm:gap-8 justify-center items-stretch">
            <button 
            onClick={()=>navigate("/verify-identityStep-1")}
            className="flex-1 min-h-[380px] md:max-h-[380px] md:max-w-[420px] bg-white border-2 border-gray-300 rounded-2xl p-4 sm:p-8 hover:border-[#2e5cef] hover:shadow-lg transition-all flex flex-col items-center">
              <div className="w-40 sm:w-60 h-32 sm:h-40 mb-4 sm:mb-6 flex items-center justify-center">
                <img
                className="w-full h-full object-contain"
                src="/AccountType-self.png"
                alt=""
                />
              </div>

              <h2 className="[font-family:'Archivo',Helvetica] font-semibold text-2xl sm:text-3xl text-[#2e5cef] tracking-[0] leading-[1.2] mb-2 sm:mb-3">
                For myself
              </h2>

              <p className="[font-family:'Archivo',Helvetica] font-medium text-xl text-black tracking-[0] leading-[1.4] mb-4">
                Freelancer / Sole Proprietor
              </p>

              <p className="[font-family:'Archivo',Helvetica] font-light text-md text-gray-600 tracking-[0] leading-[1.5] text-center">
                Open a virtual USD account in your own name. Verify with PAN + one ID.
              </p>
            </button>

            <button className="flex-1 min-h-[380px] md:max-h-[380px] md:max-w-[420px] bg-white border-2 border-gray-300 rounded-2xl p-4 sm:p-8 hover:border-[#2e5cef] hover:shadow-lg transition-all flex flex-col items-center">
              <div className="w-32 sm:w-40 h-32 sm:h-40 mb-4 sm:mb-6 flex items-center justify-center">
                <img
                className="w-full h-full object-contain"
                src="/AccountType-business.png"
                alt=""
                />
              </div>

              <h2 className="[font-family:'Archivo',Helvetica] font-semibold text-2xl sm:text-3xl text-[#2e5cef] tracking-[0] leading-[1.2] mb-2 sm:mb-3">
                For a business
              </h2>

              <p className="[font-family:'Archivo',Helvetica] font-medium text-xl text-black tracking-[0] leading-[1.4] mb-4">
                SMB / Agency / Company
              </p>

              <p className="[font-family:'Archivo',Helvetica] font-light text-md text-gray-600 tracking-[0] leading-[1.5] text-center">
                Open a virtual USD account for your company. Verify your business and owner(s).
              </p>
            </button>
          </div>

          <div className="mt-8 sm:mt-16 max-w-[800px] mx-auto px-4">
            <p className="text-center [font-family:'Archivo',Helvetica] font-normal text-xs sm:text-sm text-gray-700 tracking-[0] leading-[1.6]">
              You must use Riverpe in line with our{" "}
              <a href="#" className="text-black font-semibold underline">
                Acceptable Use Policy
              </a>
              . You cannot use a personal account for personal account for business purposes.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};
