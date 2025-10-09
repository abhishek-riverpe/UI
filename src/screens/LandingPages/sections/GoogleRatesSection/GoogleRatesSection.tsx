import { ChevronUpIcon, ZapIcon } from "lucide-react";
import React from "react";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";

export const GoogleRatesSection = (): JSX.Element => {
  const comparisonData = [
    {
      icon: "/lucide-landmark.svg",
      label: "Bank",
      amount: "₹ 88,236.6",
      difference: "₹4,367.49",
    },
    {
      logo: "/paypal-svg-1.png",
      amount: "₹ 88,236.6",
      difference: "₹4,367.49",
    },
  ];

  return (
    <section className="my-12 relative w-full bg-white">
      <div className="max-w-[1229px] mx-auto">
        <div className="flex items-center gap-[150px] w-full">

         <div className="flex flex-col w-[519px] items-start gap-20">
             <div className="flex flex-col items-start gap-3">
               <div className="font-light text-black text-[20px] leading-[1.088em]">
                 powered by <span className="text-[#635BFF] font-bold">stripe</span>
               </div>
               <p
                 className="[font-family:'Font family/headings',Helvetica] font-semibold text-[#1f1f1f] text-[52px] tracking-[0] leading-[100%] align-middle"
                 style={{ fontStyle: "normal", fontWeight: 600 }}
               >
                 Instant transfer with Google exchange rate
               </p>
             </div>

            <div className="flex flex-col items-start gap-[5px] w-full">
              <div
                style={{
                  background: "linear-gradient(135deg, rgba(0, 90, 238, 0.75) 0%, rgba(34, 226, 162, 0.75) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontFamily: "'Font family/headings', Helvetica, Arial, sans-serif",
                  fontWeight: 600,
                  fontStyle: "normal",
                  fontSize: "72px",
                  lineHeight: "100%",
                  letterSpacing: "0px",
                  verticalAlign: "middle",
                }}
              >
                0.25%
              </div>

              <div className="inline-flex flex-col items-left gap-1">
                <div className="[font-family:'Archivo',Helvetica] font-normal text-[#1f1f1f] text-xl text-center tracking-[0] leading-[30px]">
                  Fee per transaction
                </div>

                <div
                  className="[font-family:'Font family/body',Helvetica] font-light text-[#1f1f1f] text-[14px] tracking-[0] leading-[21px] align-middle"
                  style={{
                    fontFamily: "'Font family/body', Helvetica, Arial, sans-serif",
                    fontWeight: 300,
                    fontStyle: "normal",
                    fontSize: "14px",
                    lineHeight: "21px",
                    letterSpacing: "0px",
                    verticalAlign: "middle",
                  }}
                >
                  (All inclusive)
                </div>
              </div>
            </div>

            <div className="flex flex-col w-[405px] items-start gap-4">
              <Button className="w-[253px] h-auto bg-[#005aee] hover:bg-[#0047bb] px-6 py-4 rounded-lg">
                <span className="[font-family:'Archivo',Helvetica] font-semibold text-white text-base text-center tracking-[0] leading-[normal] whitespace-nowrap">
                  Get Started
                </span>
              </Button>

              <p
                style={{
                  fontFamily: "'Inter', Helvetica, Arial, sans-serif",
                  fontWeight: 400,
                  fontStyle: "normal",
                  fontSize: "14px",
                  lineHeight: "20px",
                  letterSpacing: "0px",
                  color: "#575757",
                }}
                className="tracking-[0]"
              >
                Custom fee for transactions above USD 50,000.&nbsp;&nbsp;
                <span
                  className="text-[#005aee] cursor-pointer hover:underline"
                  style={{
                    fontFamily: "'Inter', Helvetica, Arial, sans-serif",
                    fontWeight: 400,
                    fontStyle: "normal",
                    fontSize: "14px",
                    lineHeight: "20px",
                    letterSpacing: "0px",
                  }}
                >
                  Talk to us →
                </span>
              </p>
            </div>
          </div>


          <div className="w-[540px] h-[640px] bg-[#dee7f6] rounded-3xl overflow-hidden p-8">
            <Card className="w-full h-full bg-white rounded-2xl overflow-hidden border-0 shadow-none">
              <CardContent className="flex flex-col items-center justify-center gap-8 p-[21px] pt-[27px] h-full">
                <div className="inline-flex flex-col items-center justify-center gap-1">
                  <Badge
                    variant="outline"
                    className="h-6 gap-1 px-6 bg-white rounded-3xl border-0"
                  >
                    <div className="w-2 h-2 bg-[#00c950] rounded-full opacity-[0.94]" />
                    <span className="[font-family:'Archivo',Helvetica] font-medium text-[#00a63d] text-sm tracking-[0] leading-5">
                      Live FX rate
                    </span>
                  </Badge>

                  <div className="flex items-center justify-center gap-2.5 px-3 py-1.5 w-full bg-[#efefef] rounded-3xl">
                    <div className="[font-family:'Archivo',Helvetica] font-semibold text-[#101727] text-base text-center tracking-[0] leading-7 whitespace-nowrap">
                      1 USD = 88.6654 INR
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-start gap-[9px] w-full">
                  <label className="[font-family:'Archivo',Helvetica] font-medium text-[#222222] text-sm tracking-[0] leading-[normal]">
                    Client sends
                  </label>

                  <div className="flex flex-col items-start gap-2.5 px-[11px] py-3 w-full rounded-xl overflow-hidden border border-solid border-[#575757]">
                    <div className="flex items-center justify-between w-full">
                      <div className="[font-family:'Neue_Haas_Grotesk_Display_Pro-Bold',Helvetica] font-bold text-[#222222] text-xl text-center tracking-[0] leading-[normal] whitespace-nowrap">
                        $ 7,000
                      </div>

                      <div className="inline-flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full [background:url(..//container-2.png)_50%_50%_/_cover]" />

                        <div className="inline-flex items-center gap-1">
                          <div className="[font-family:'Archivo',Helvetica] font-bold text-[#101727] text-base tracking-[0] leading-6 whitespace-nowrap">
                            USD
                          </div>

                          <img className="w-4 h-4" alt="Icon" src="/icon.svg" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-start gap-[9px] w-full">
                  <label className="[font-family:'Archivo',Helvetica] font-medium text-[#222222] text-sm tracking-[0] leading-[normal]">
                    You receive in INR
                  </label>

                  <div className="flex flex-col items-start gap-2.5 px-[11px] py-3 w-full rounded-xl overflow-hidden border border-solid border-[#575757]">
                    <div className="flex items-center justify-between w-full">
                      <div className="[font-family:'Neue_Haas_Grotesk_Display_Pro-Bold',Helvetica] font-bold text-[#222222] text-xl text-center tracking-[0] leading-[normal] whitespace-nowrap">
                        ₹ 88,236.6
                      </div>

                      <div className="inline-flex items-center gap-2">
                        <img
                          className="w-6 h-6 object-cover"
                          alt="Flag round"
                          src="/flag-round-250-1-2.png"
                        />

                        <div className="inline-flex items-center gap-1">
                          <div className="[font-family:'Archivo',Helvetica] font-bold text-[#101727] text-base tracking-[0] leading-6 whitespace-nowrap">
                            INR
                          </div>

                          <img className="w-4 h-4" alt="Icon" src="/icon.svg" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between w-full">
                    <div className="inline-flex items-center gap-1">
                      <div className="[font-family:'Archivo',Helvetica] font-bold text-[#137c59] text-xs tracking-[0] leading-4 whitespace-nowrap">
                        Get ₹4,367.49 more with
                      </div>

                      <img
                        className="w-[65.85px] h-[12.73px]"
                        alt="Group"
                        src="/group-2-2.png"
                      />
                    </div>

                    <Badge
                      variant="secondary"
                      className="h-[26px] gap-1 px-3 py-1 bg-[#ccf3e6] rounded-full overflow-hidden border-0 hover:bg-[#ccf3e6]"
                    >
                      <ZapIcon className="w-4 h-4 fill-[#137c59] text-[#137c59]" />
                      <span className="[font-family:'Archivo',Helvetica] font-medium text-[#137c59] text-xs tracking-[0] leading-4 whitespace-nowrap">
                        Instant settlement
                      </span>
                    </Badge>
                  </div>
                </div>

                <div className="w-full h-px bg-[#acacac]" />

                <div className="flex items-center justify-between w-full">
                  {comparisonData.map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-col w-[209px] h-[95px] items-start gap-2.5 px-[13px] py-4 bg-[#ececec] rounded-xl overflow-hidden"
                    >
                      <div className="flex flex-col items-start gap-2 flex-1 w-full">
                        {item.icon ? (
                          <div className="flex items-center gap-1 w-full">
                            <img
                              className="w-4 h-4"
                              alt="Lucide landmark"
                              src={item.icon}
                            />
                            <div className="[font-family:'Archivo',Helvetica] font-normal text-[#222222] text-xs tracking-[0] leading-[normal] whitespace-nowrap">
                              {item.label}
                            </div>
                          </div>
                        ) : (
                          <img
                            className="w-[45px] h-3 object-cover"
                            alt="Paypal svg"
                            src={item.logo}
                          />
                        )}

                        <div className="[font-family:'Neue_Haas_Grotesk_Display_Pro-Roman',Helvetica] font-normal text-[#222222] text-base tracking-[0] leading-[normal]">
                          {item.amount}
                        </div>

                        <div className="flex items-start gap-1 w-full">
                          <ChevronUpIcon className="w-3 h-3 text-colorspink" />
                          <div className="[font-family:'Archivo',Helvetica] font-normal text-colorspink text-[10px] tracking-[0] leading-[normal] whitespace-nowrap">
                            {item.difference}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="[font-family:'Archivo',Helvetica] font-normal text-[#005aee] text-sm text-center tracking-[0] leading-5 whitespace-nowrap">
                  Save ₹52,410 annually with Riverpe compared to banks
                </div>
              </CardContent>
            </Card>
          </div>

        
        </div>
      </div>
    </section>
  );
};
