import { Button } from "../../components/ui/button";
import { CallToActionSection } from "./sections/CallToActionSection";
import { ComparisonSection } from "./sections/ComparisonSection";
import { GoogleRatesSection } from "./sections/GoogleRatesSection";
import { HowItWorksSection } from "./sections/HowItWorksSection";
import { TestimonialsSection } from "./sections/TestimonialsSection";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex flex-col w-full items-start py-[22px]  relative overflow-x-hidden">
      {/* Header */}
      <header className="flex h-auto lg:h-[74px] items-center justify-between px-4 sm:px-8  md:px-10 lg:px-22 xl:px-32 py-3 relative self-stretch w-full xl:max-w-[1600px] mx-auto bg-white">
        {/* Logo */}
        <div className="flex items-center relative">
          <img
            onClick={() => navigate('/')}
            className="relative w-24 lg:w-36 h-auto cursor-pointer"
            alt="Riverpe Logo"
            src="/Logo.png"
          />
          <div className="pb-3 flex items-center justify-center flex-1 [font-family:'Archivo',Helvetica] font-normal text-black text-xs lg:text-xs tracking-[0] leading-[normal]">
            <span className="font-light">powered by </span>
            <span className="font-bold">stripe</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:inline-flex gap-10 items-center relative">
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
                    className="flex justify-center w-fit [font-family:'Archivo',Helvetica] font-light text-black text-base tracking-[0] leading-[normal] whitespace-nowrap items-center relative hover:font-semibold transition-all cursor-pointer"
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

                  {showDropdown && (
                    <div className="absolute top-full left-0 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-[9999]">
                      {useCasesDropdown.map((item, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
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
                  className="flex justify-center w-fit [font-family:'Archivo',Helvetica] font-light text-black text-base tracking-[0] leading-[normal] whitespace-nowrap items-center relative hover:font-semibold transition-all"
                >
                  {link.label}
                </a>
              )}
            </div>
          ))}
        </nav>

        {/* Desktop Action Buttons */}
        <div className="hidden lg:inline-flex items-center gap-4 relative">
          <Button
            onClick={() => navigate('/signin')}
            variant="outline"
            className="h-auto inline-flex items-center justify-center gap-2.5 px-6 py-4 bg-white rounded-lg border border-solid border-[#222222] hover:bg-gray-50"
          >
            <span className="text-[#222222] [font-family:'Archivo',Helvetica] font-semibold text-base text-center tracking-[0] leading-[normal] whitespace-nowrap">
              Sign in
            </span>
          </Button>

          <Button
            onClick={() => navigate('/signup')}
            className="h-auto inline-flex bg-[#005aee] items-center justify-center gap-2.5 px-6 py-4 rounded-lg hover:bg-[#0047bb]"
          >
            <span className="text-white [font-family:'Archivo',Helvetica] font-semibold text-base text-center tracking-[0] leading-[normal] whitespace-nowrap">
              Sign up
            </span>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 lg:hidden">
            <div className="flex flex-col p-4 space-y-4">
              {/* Mobile powered by stripe */}
              <div className="[font-family:'Archivo',Helvetica] font-light text-black text-xs text-center">
                powered by <span className="font-bold">stripe</span>
              </div>
              
              {/* Mobile Navigation Links */}
              {navigationLinks.map((link, index) => (
                <div key={index}>
                  {link.hasDropdown ? (
                    <div className="space-y-2">
                      <div className="[font-family:'Archivo',Helvetica] font-light text-black text-base">{link.label}</div>
                      <div className="pl-4 space-y-2">
                        {useCasesDropdown.map((item, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              navigate(item.href);
                              setIsMobileMenuOpen(false);
                            }}
                            className="block w-full text-left [font-family:'Archivo',Helvetica] font-light text-gray-600 text-sm"
                          >
                            {item.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <a
                      href={link.href}
                      className="block [font-family:'Archivo',Helvetica] font-light text-black text-base"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </a>
                  )}
                </div>
              ))}
              
              {/* Mobile Action Buttons */}
              <div className="space-y-3 pt-4 border-t border-gray-200">
                <Button
                  onClick={() => navigate('/signin')}
                  variant="outline"
                  className="w-full h-auto px-6 py-4 bg-white rounded-lg border border-solid border-[#222222] hover:bg-gray-50"
                >
                  <span className="text-[#222222] [font-family:'Archivo',Helvetica] font-semibold text-base">
                    Sign in
                  </span>
                </Button>

                <Button
                  onClick={() => {
                    navigate('/signup');
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full h-auto bg-[#005aee] px-6 py-4 rounded-lg hover:bg-[#0047bb]"
                >
                  <span className="text-white [font-family:'Archivo',Helvetica] font-semibold text-base">
                    Sign up
                  </span>
                </Button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="px-4 md:px-10 lg:px-22 flex flex-col items-start relative self-stretch w-full">
        <GoogleRatesSection />
        <ComparisonSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <CallToActionSection />
      </main>
    </div>
  );
};