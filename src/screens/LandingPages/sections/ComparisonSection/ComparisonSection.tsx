import { ArrowUpIcon } from "lucide-react";
import { Card, CardContent } from "../../../../components/ui/card";

const tableHeaders = [
  { label: "Provider", width: "w-[105px]" },
  { label: "Exchange Rate", width: "w-[158px]" },
  { label: "Transfer fee", width: "w-[125px]" },
  { label: "Recipient gets", width: "w-[150px]" },
];

const comparisonData = [
  {
    provider: "Riverpe",
    logo: "/group-2-3.png",
    logoClass: "w-36 h-[27.83px]",
    exchangeRate: "119.40",
    transferFee: "$2.22",
    recipientGets: "₹113,999.23",
    highlighted: true,
    earnMore: "Earn ₹113,999.23 more",
  },
  {
    provider: "Remitly",
    logo: "/remitly-logo-brandlogos-net-ahlj6-1.png",
    logoClass: "w-full h-[30px] object-cover",
    exchangeRate: "119.40",
    transferFee: "$2.22",
    recipientGets: "₹113,999.23",
    highlighted: false,
  },
  {
    provider: "Aspora",
    logo: "/1744040432-aspora-logo--1--1.svg",
    logoClass: "w-[105px] h-[29px]",
    exchangeRate: "119.40",
    transferFee: "$2.22",
    recipientGets: "₹113,999.23",
    highlighted: false,
  },
  {
    provider: "Wise",
    logo: "/wise-logo-512x124-1.svg",
    logoClass: "w-[105px] h-11",
    exchangeRate: "119.40",
    transferFee: "$2.22",
    recipientGets: "₹113,999.23",
    highlighted: false,
  },
  {
    provider: "Skrill",
    logo: "/skrill-logo-1.svg",
    logoClass: "w-[74px] h-[26px]",
    exchangeRate: "119.40",
    transferFee: "$2.22",
    recipientGets: "₹113,999.23",
    highlighted: false,
  },
];

export const  ComparisonSection = (): JSX.Element => {
  return (
    <section className="relative w-full bg-[#efefef] py-12 lg:py-[84px] px-4 lg:px-10">
      <div className="flex flex-col items-center gap-2.5 max-w-[1400px] mx-auto px-4">
        <h2 className="font-bold [font-family:'Neue_Haas_Grotesk_Display_Pro-Mediu',Helvetica] text-black text-2xl lg:text-5xl text-center tracking-[0] leading-[normal]">
          Keep more of every payout with Google&apos;s mid-market rate to India
        </h2>

        <p className="mt-4 mb-4 [font-family:'Archivo',Helvetica] font-light text-[#1f1f1f] text-lg lg:text-2xl text-center tracking-[0] leading-6 lg:leading-9">
          Riverpe uses the real Google rate and a simple 0.25 percent fee. No
          hidden spreads, clear totals upfront.
        </p>
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block max-w-[1407px] mt-20 mx-auto overflow-visible">
        <Card className="w-full max-w-[1200px] mx-auto bg-white rounded-3xl overflow-visible border-0 shadow-none">
          <CardContent className="p-0">
            <div className="flex border-b border-[#acacac]">
              <div className="flex items-center font-semibold justify-center w-[300px] h-[98px] [font-family:'Neue_Haas_Grotesk_Display_Pro-Mediu',Helvetica] text-black text-2xl text-center tracking-[0] leading-9">
                {tableHeaders[0].label}
              </div>
              <div className="flex items-center justify-center w-[300px] h-[98px] [font-family:'Neue_Haas_Grotesk_Display_Pro-Mediu',Helvetica] font-semibold text-black text-2xl text-center tracking-[0] leading-9 whitespace-nowrap">
                {tableHeaders[1].label}
              </div>
              <div className="flex items-center justify-center w-[300px] h-[98px] [font-family:'Neue_Haas_Grotesk_Display_Pro-Mediu',Helvetica] font-semibold text-black text-2xl text-center tracking-[0] leading-9 whitespace-nowrap">
                {tableHeaders[2].label}
              </div>
              <div className="flex items-center justify-center flex-1 h-[98px] [font-family:'Neue_Haas_Grotesk_Display_Pro-Mediu',Helvetica] font-semibold text-black text-2xl text-center tracking-[0] leading-9 whitespace-nowrap">
                {tableHeaders[3].label}
              </div>
            </div>

            {comparisonData.map((row, index) => (
              <div
                key={row.provider}
                className={`flex ${
                  row.highlighted
                    ? "bg-blue-700 h-[120px] -mx-[30px] px-[46px] rounded-3xl "
                    : "h-[100px]"
                } ${
                  index < comparisonData.length - 1 && !row.highlighted
                    ? "border-b border-[#acacac]"
                    : ""
                }`}
              >
                <div className="flex items-center justify-center w-[300px]">
                  {row.provider === "Remitly" ? (
                    <div className="w-[146px] h-[50px] flex items-center justify-center p-2.5">
                      <img
                        className={row.logoClass}
                        alt={`${row.provider} logo`}
                        src={row.logo}
                      />
                    </div>
                  ) : (
                    <img
                      className={row.logoClass}
                      alt={`${row.provider} logo`}
                      src={row.logo}
                    />
                  )}
                </div>

                <div
                  className={`flex items-center justify-center w-[300px] [font-family:'Neue_Haas_Grotesk_Display_Pro-Mediu',Helvetica] font-normal ${
                    row.highlighted ? "text-white font-semibold" : "text-[#222222] font-semibold"
                  } text-2xl text-center tracking-[0] leading-[normal]`}
                >
                  {row.exchangeRate}
                </div>

                <div
                  className={`flex items-center justify-center w-[300px] [font-family:'Neue_Haas_Grotesk_Display_Pro-Mediu',Helvetica] font-normal ${
                    row.highlighted ? "text-white font-semibold" : "text-[#222222] font-semibold"
                  } text-2xl text-center tracking-[0] leading-[normal]`}
                >
                  {row.transferFee}
                </div>

                <div className="flex items-center justify-center flex-1">
                  {row.highlighted ? (
                    <div className="flex flex-col items-center gap-1">
                      <div className="font-semibold [font-family:'Neue_Haas_Grotesk_Display_Pro-Mediu',Helvetica] text-white text-[32px] tracking-[0] leading-[normal]">
                        {row.recipientGets}
                      </div>
                      <div className="flex items-center gap-1">
                        <ArrowUpIcon className="w-6 h-6 text-[#00ff44]" />
                        <div className="[font-family:'Neue_Haas_Grotesk_Display_Pro-Mediu',Helvetica] font-normal text-[#00ff44] text-base text-center tracking-[0] leading-[normal] whitespace-nowrap">
                          {row.earnMore}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="font-semibold [font-family:'Neue_Haas_Grotesk_Display_Pro-Mediu',Helvetica] text-[#222222] text-2xl text-center tracking-[0] leading-[normal]">
                      {row.recipientGets}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Mobile Table */}
      <div className="lg:hidden mt-8 max-w-md mx-auto">
        <Card className="bg-white rounded-3xl overflow-hidden border-0 shadow-none">
          <CardContent className="p-0">
            {/* Header */}
            <div className="flex border-b border-[#acacac]">
              <div className="flex items-center justify-center w-1/2 h-14 [font-family:'Neue_Haas_Grotesk_Display_Pro-Mediu',Helvetica] font-semibold text-black text-base text-center tracking-[0] leading-6">
                Provider
              </div>
              <div className="flex items-center justify-center w-1/2 h-14 [font-family:'Neue_Haas_Grotesk_Display_Pro-Mediu',Helvetica] font-semibold text-black text-base text-center tracking-[0] leading-6">
                Recipient gets
              </div>
            </div>

            {/* Rows */}
            {comparisonData.map((row, index) => (
              <div
                key={row.provider}
                className={`flex ${
                  row.highlighted
                    ? "bg-[#005aee] h-20 -mx-6 px-6 rounded-2xl my-1"
                    : "h-14"
                } ${
                  index < comparisonData.length - 1 && !row.highlighted
                    ? "border-b border-[#acacac]"
                    : ""
                }`}
              >
                <div className="flex items-center justify-center w-1/2">
                  {row.provider === "Remitly" ? (
                    <div className="flex items-center justify-center p-2">
                      <img
                        className="h-6 object-contain"
                        alt={`${row.provider} logo`}
                        src={row.logo}
                      />
                    </div>
                  ) : (
                    <img
                      className="h-6 object-contain"
                      alt={`${row.provider} logo`}
                      src={row.logo}
                    />
                  )}
                </div>

                <div className="flex items-center justify-center w-1/2">
                  {row.highlighted ? (
                    <div className="flex flex-col items-center">
                      <div className="font-semibold [font-family:'Neue_Haas_Grotesk_Display_Pro-Mediu',Helvetica] text-white text-xl tracking-[0] leading-[normal]">
                        {row.recipientGets}
                      </div>
                      <div className="flex items-center gap-1">
                        <ArrowUpIcon className="w-4 h-4 text-[#00ff44]" />
                        <div className="[font-family:'Neue_Haas_Grotesk_Display_Pro-Mediu',Helvetica] font-normal text-[#00ff44] text-xs text-center tracking-[0] leading-[normal]">
                          {row.earnMore}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="font-semibold [font-family:'Neue_Haas_Grotesk_Display_Pro-Mediu',Helvetica] text-[#222222] text-base text-center tracking-[0] leading-[normal]">
                      {row.recipientGets}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
