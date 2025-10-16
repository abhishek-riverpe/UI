import { Button } from "../../../../components/ui/button";

const steps = [
  {
    id: 1,
    imagePosition: "left",
    image: "/mobile.png",
    title: "Sign up and open your USD account",
    description:
      "Create your account in minutes and complete quick KYC (PAN + ID) to unlock USD (and EUR) receiving details.",
    cardOverlay: {
      accountType: "USD Account",
      balance: "USD $7,000.00",
      showViewAccount: true,
    },
  },
  {
    id: 2,
    imagePosition: "right",
    image: "/Mobile (1).png",
    title: "Link your platforms & clients",
    description:
      "Add your USD details to Upwork or share them with clients. Receive in USD, then convert at the Google rate with no FX margin.",
    cardOverlay: {
      label: "You receive",
      amount: "+₹ 7,400 INR",
      showFlag: true,
    },
  },

];

export const HowItWorksSection = (): JSX.Element => {
  return (
    <section className="relative w-full bg-white py-12 lg:py-20">
      <div className="flex flex-col items-center gap-12 lg:gap-20 max-w-7xl mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-center gap-4 text-center">
          <h2 className="font-bold text-black text-2xl lg:text-5xl max-w-5xl">
            Simplifying your payouts, so you keep more
          </h2>
          <p className="font-normal text-[#1f1f1f] text-lg lg:text-xl leading-6 lg:leading-7 max-w-5xl">
            No FX markup, just a flat 0.25%, so more of each payout lands in your pocket.
          </p>
        </div>

        {/* Steps */}
        {steps.map((step) => (
          <div
            key={step.id}
            className={`flex flex-col lg:flex-row items-center justify-between w-full gap-8 lg:gap-10 ${
              step.imagePosition === "right" ? "lg:flex-row-reverse" : ""
            }`}
          >
            {/* Image Section */}
            <div className="relative w-full lg:w-[540px] h-auto lg:h-[726px] flex-shrink-0">
              <img 
                src={step.image} 
                alt={step.title}
                className="w-full h-full object-cover rounded-3xl"
              />
            </div>

            {/* Content Section */}
            <div className="flex flex-col items-center lg:items-start gap-6 lg:gap-8 flex-1 max-w-5xl px-4 lg:px-10 text-center lg:text-left">
              <div className="flex flex-col gap-4">
                <h3 className="font-bold text-black text-xl lg:text-[2.6rem] leading-tight">
                  {step.title}
                </h3>
                <p className="font-light text-[#1f1f1f] text-base lg:text-[18px] leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 lg:gap-6">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto px-8 lg:px-14 py-4 lg:py-5 rounded-lg font-semibold">
                  Get Started
                </Button>
                <Button 
                  variant="ghost" 
                  className="text-gray-700 font-semibold underline w-full sm:w-auto"
                >
                  Learn how it works
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
