import { Button } from "../../../../components/ui/button";
import { Separator } from "../../../../components/ui/separator";

const footerLinks = {
  product: [
    { label: "Features", href: "#" },
    { label: "Pricing", href: "#" },
    { label: "Security", href: "#" },
  ],
  company: [
    { label: "About Us", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Partners", href: "#" },
    { label: "Investors", href: "#" },
  ],
  support: [
    { label: "Help Center", href: "#" },
    { label: "Contact Support", href: "#" },
    { label: "Community Forum", href: "#" },
    { label: "Freelancer Resources", href: "#" },
  ],
  legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookie Policy", href: "#" },
    { label: "Compliance", href: "#" },
  ],
};

export const CallToActionSection = (): JSX.Element => {
  return (
    <section className="flex flex-col w-full">
      <div className="relative w-full h-[640px] bg-[#005aee] overflow-hidden">
        <div className="absolute top-[76px] left-[104px] w-[647px]">
          <h2 className="[font-family:'Neue_Haas_Grotesk_Display_Pro-Mediu',Helvetica] font-normal text-white text-[64px] leading-[1.2] tracking-[0]">
            Ready to make cross-border payouts simple?
          </h2>
        </div>

        <div className="absolute top-[331px] left-[104px] w-[571px]">
          <p className="[font-family:'Archivo',Helvetica] font-medium text-white text-2xl tracking-[0] leading-[1.3]">
            Open a virtual USD account, convert at the real Google rate, and pay
            a flat 0.25% fee.
          </p>
        </div>

        <Button className="absolute top-[468px] left-[104px] bg-[#0c0c0c] hover:bg-[#1a1a1a] text-white px-20 py-3 rounded-lg h-auto [font-family:'Archivo',Helvetica] font-semibold text-base">
          Get Started
        </Button>

        <img
          className="absolute w-[39.69%] h-[111.84%] top-[22.34%] left-[54.27%] object-contain"
          alt="Element space black"
          src="/006-space-black.png"
        />
      </div>

      <footer className="flex flex-col w-full bg-slate-50 border-t border-[#e1e8f0] px-4 sm:px-8 lg:px-[80.33px] pt-16 pb-0">
        <div className="w-full mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-16">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-4">
                <img
                  className="w-36 h-[27.83px]"
                  alt="Riverpe Logo"
                  src="/group-2-5.png"
                />

                <p className="[font-family:'Archivo',Helvetica] font-normal text-[#45556c] text-base  tracking-[0]">
                  The only banking platform built specifically for freelancers.
                  Save money on every transaction, get paid instantly, and focus
                  on growing your business.
                </p>
              </div>

              <img
                className="w-full h-24"
                alt="Social media icons"
                src="/container-3.svg"
              />
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="[font-family:'Archivo',Helvetica] font-bold text-[#0e162b] text-base leading-6 tracking-[0]">
                Product
              </h3>
              <nav className="flex flex-col gap-3">
                {footerLinks.product.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    className="[font-family:'Archivo',Helvetica] font-normal text-[#45556c] text-sm leading-5 tracking-[0] hover:text-[#0e162b] transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="[font-family:'Archivo',Helvetica] font-bold text-[#0e162b] text-base leading-6 tracking-[0]">
                Company
              </h3>
              <nav className="flex flex-col gap-3">
                {footerLinks.company.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    className="[font-family:'Archivo',Helvetica] font-normal text-[#45556c] text-sm leading-5 tracking-[0] hover:text-[#0e162b] transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="[font-family:'Archivo',Helvetica] font-bold text-[#0e162b] text-base leading-6 tracking-[0]">
                Support
              </h3>
              <nav className="flex flex-col gap-3">
                {footerLinks.support.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    className="[font-family:'Archivo',Helvetica] font-normal text-[#45556c] text-sm leading-5 tracking-[0] hover:text-[#0e162b] transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="[font-family:'Archivo',Helvetica] font-bold text-[#0e162b] text-base leading-6 tracking-[0]">
                Legal
              </h3>
              <nav className="flex flex-col gap-3">
                {footerLinks.legal.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    className="[font-family:'Archivo',Helvetica] font-normal text-[#45556c] text-sm leading-5 tracking-[0] hover:text-[#0e162b] transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>
          </div>

          <Separator className="bg-slate-200 mb-8" />

          <div className="flex items-center justify-between mb-11">
            <p className="[font-family:'Inter',Helvetica] font-normal text-[#45556c] text-sm leading-5 tracking-[0]">
              © 2025 Riverpe. All rights reserved.
            </p>
          </div>

          <div className="bg-slate-100 rounded-[10px] border border-[#e1e8f0] p-[17.21px] mb-6">
            <p className="[font-family:'Archivo',Helvetica] font-normal text-[#45556c] text-xs leading-[19.5px] tracking-[0]">
              Riverpe is a financial technology company, not a bank. USD/EUR
              receiving details and payment services are provided by regulated
              partners. &quot;Powered by Stripe&quot; refers to payment
              processing provided by Stripe and its affiliates. Riverpe does not
              hold deposits; funds movement and FX are executed by licensed
              partners, and access is subject to KYC/AML verification and
              regional availability.
            </p>
          </div>
        </div>
      </footer>
    </section>
  );
};
