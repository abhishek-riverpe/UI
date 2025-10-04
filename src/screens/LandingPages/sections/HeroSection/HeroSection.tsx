import React from "react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import AgenciesPage from "../../AgenciesPage";
import FreelancersPage from "../../FreelancersPage";
import MarketPlace from "../../MarketPlace";


export const HeroSection = ({ type }: { type: string }) => {
  console.log("herosection",type);
  if (type === "freelancer") {
    return <FreelancersPage/>
  }
  if (type === "agency") {
return <AgenciesPage/>
  }
  if (type === "marketplace") {
    return <MarketPlace/>
  }
  const trustIndicators = [
    { text: "Bank-grade KYC" },
    { text: "Transparent fees" },
  ];

  return (
    <section className="relative w-full mt-20">
      <div className="flex flex-col items-center gap-10 px-4 max-w-[1232px] mx-auto">
        <div className="flex flex-col items-center gap-6 w-full">
          <div className="flex flex-col items-center gap-10 w-full">
            <div className="flex flex-col items-center gap-2.5 w-full">
              <h1 className="flex items-center justify-center w-full mt-[-1.00px] [font-family:'Neue_Haas_Grotesk_Display_Pro-Mediu',Helvetica] font-normal text-black text-[80px] text-center tracking-[0] leading-[normal]">
                Keep what you earn
              </h1>

              <p className="flex items-center justify-center w-full [font-family:'Archivo',Helvetica] font-light text-black text-2xl text-center tracking-[0] leading-9">
                Get paid to a US-dollar account, convert at the mid-market rate,
                and save 3-5% on every payout.
              </p>
            </div>

            <div className="inline-flex items-center gap-4">
              <Button className="w-[253px] h-auto items-center justify-center gap-2.5 px-6 py-4 bg-[#005aee] rounded-lg hover:bg-[#0047bb]">
                <span className="flex items-center justify-center w-fit mt-[-1.00px] [font-family:'Archivo',Helvetica] font-semibold text-white text-base text-center tracking-[0] leading-[normal] whitespace-nowrap">
                  Get Started
                </span>
              </Button>
            </div>

            <div className="inline-flex items-center gap-4">
              {trustIndicators.map((indicator, index) => (
                <React.Fragment key={index}>
                  <div className="inline-flex items-center justify-center gap-2.5">
                    <span className="flex items-center justify-center w-fit mt-[-1.00px] [font-family:'Archivo',Helvetica] font-light text-black text-base text-center tracking-[0] leading-[normal] whitespace-nowrap">
                      {indicator.text}
                    </span>
                  </div>
                  {index < trustIndicators.length - 1 && (
                    <div className="inline-flex items-center justify-center gap-2.5">
                      <span className="w-fit mt-[-1.00px] [font-family:'Archivo',Helvetica] font-light text-black text-base text-center whitespace-nowrap flex items-center justify-center tracking-[0] leading-[normal]">
                        •
                      </span>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        <div className="relative w-full h-[700px] rounded-3xl overflow-hidden [background:url(..//frame-2147223819.png)_50%_50%_/_cover]">
          <Card className="absolute top-[296px] left-[373px] w-[485px] bg-white rounded-2xl overflow-hidden border-0 shadow-lg">
            <CardContent className="flex flex-col items-start gap-4 p-6">
              <img
                className="w-10 h-10 object-cover"
                alt="Flag round"
                src="/flag-round-250-1-2.png"
              />

              <div className="flex flex-col items-start gap-2 w-full">
                <h3 className="w-full mt-[-1.00px] [font-family:'Archivo',Helvetica] font-medium text-[#222222] text-2xl tracking-[0] leading-4">
                  INR Account
                </h3>

                <div className="flex w-full [font-family:'Neue_Haas_Grotesk_Display_Pro-Bold',Helvetica] font-bold text-transparent text-4xl tracking-[0] leading-[normal]">
                  <span className="text-[#005aee]">₹87,993.00</span>
                </div>

                <div className="flex items-center gap-2 w-full">
                  <span className="w-fit mt-[-1.00px] bg-[linear-gradient(135deg,rgba(0,90,238,0.75)_0%,rgba(34,226,162,0.75)_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] [font-family:'Archivo',Helvetica] font-bold text-transparent text-xs tracking-[0] leading-4 whitespace-nowrap">
                    Powered by
                  </span>

                  <img
                    className="w-[102.15px] h-[19.74px] mb-[-3.74px]"
                    alt="Group"
                    src="/group-2-1.png"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col items-center gap-10 w-full">
          <p className="flex items-center justify-center w-full mt-[-1.00px] [font-family:'Archivo',Helvetica] font-light text-[#575757] text-base text-center tracking-[0] leading-[normal]">
            In partnership with
          </p>

          <img className="w-full" alt="Frame" src="/frame-10.svg" />
        </div>
      </div>
    </section>
  );
};
