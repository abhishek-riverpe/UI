import { Button } from "../../components/ui/button";
import { CallToActionSection } from "./sections/CallToActionSection";
import { ComparisonSection } from "./sections/ComparisonSection";
import { GoogleRatesSection } from "./sections/GoogleRatesSection";
import { HeroSection } from "./sections/HeroSection";
import { HowItWorksSection } from "./sections/HowItWorksSection";
import { SecuritySection } from "./sections/SecuritySection";
import { TestimonialsSection } from "./sections/TestimonialsSection";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

const navigationLinks = [
  { label: "Our rate", href: "#" },
  { label: "How it works", href: "#" },
  { label: "Use Cases", href: "#", hasDropdown: true },
  { label: "Testimonials", href: "#" },
];

const useCasesDropdown = [
  { label: "For Freelancers", href: "/home/freelancer" },
  { label: "For Agencies", href: "/home/agency" },
  { label: "For Marketplaces", href: "/home/marketplace" },
];

export const LandingPage = (): JSX.Element => {
  const { type } = useParams();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="flex flex-col w-full items-start px-0 py-[22px] relative bg-white overflow-x-hidden">
      <header className="flex h-[74px] items-center justify-between px-[60px] py-3 relative self-stretch w-full bg-white rounded-xl">
        <div className="flex w-[250px] items-center gap-2.5 relative">
          <img
          onClick={() => {navigate('/')}}
            className="relative w-36 h-[27.83px] mb-[-5.28px] cursor-pointer"
            alt="Group"
            src="/Logo.png"
          />

          <div className="relative flex items-center justify-center flex-1 self-stretch mt-[-1.00px] [font-family:'Archivo',Helvetica] font-normal text-black text-xs tracking-[0] leading-[normal]">
            <span className="font-light">powered by </span>
            <span className="font-bold">stripe</span>
          </div>
        </div>

        <nav className="inline-flex gap-10 flex-[0_0_auto] items-center relative">
          {navigationLinks.map((link, index) => (
            <div key={index} className="relative">
              {link.hasDropdown ? (
                <div
                  className="relative"
                  onMouseEnter={() => setShowDropdown(true)}
                  onMouseLeave={() => setShowDropdown(false)}
                >
                  <a
                    href={link.href}
                    className="flex justify-center w-fit mt-[-1.00px] [font-family:'Archivo',Helvetica] font-light text-black text-base tracking-[0] leading-[normal] whitespace-nowrap items-center relative hover:font-semibold transition-all cursor-pointer"
                  >
                    {link.label}
                    <svg
                      className="ml-1 w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </a>

                  {/* Dropdown */}
                  {showDropdown && (
                    <div className="absolute top-full left-0 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-[9999]">
                      {useCasesDropdown.map((item, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={(e) => {
                            navigate(item.href);
                            setShowDropdown(false);
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-black transition-colors [font-family:'Archivo',Helvetica]"
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <a
                  href={link.href}
                  className="flex justify-center w-fit mt-[-1.00px] [font-family:'Archivo',Helvetica] font-light text-black text-base tracking-[0] leading-[normal] whitespace-nowrap items-center relative hover:font-semibold transition-all"
                >
                  {link.label}
                </a>
              )}
            </div>
          ))}
        </nav>

        <div className="inline-flex items-center gap-4 relative flex-[0_0_auto]">
          <Button
            variant="outline"
            className="h-auto inline-flex items-center justify-center gap-2.5 px-6 py-4 relative flex-[0_0_auto] bg-white rounded-lg border border-solid border-[#222222]"
          >
            <span className="text-[#222222] relative flex items-center justify-center w-fit mt-[-1.00px] [font-family:'Archivo',Helvetica] font-semibold text-base text-center tracking-[0] leading-[normal] whitespace-nowrap">
              Sign in
            </span>
          </Button>

          <Button
            onClick={() => {navigate('/signup')}}
            className="h-auto inline-flex relative flex-[0_0_auto] bg-[#005aee] items-center justify-center gap-2.5 px-6 py-4 rounded-lg hover:bg-[#0047bb]"
          >
            <span className="text-white relative flex items-center justify-center w-fit mt-[-1.00px] [font-family:'Archivo',Helvetica] font-semibold text-base text-center tracking-[0] leading-[normal] whitespace-nowrap">
              Sign up
            </span>
          </Button>
        </div>
      </header>

      <main className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
        {/* <HeroSection type={type ?? ""} /> */}
        <GoogleRatesSection />
        <ComparisonSection />
        <HowItWorksSection />
        {/* <SecuritySection /> */}
        <TestimonialsSection />
        <CallToActionSection />
      </main>
    </div>
  );
};