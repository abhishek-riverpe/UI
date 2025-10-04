import React from "react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";

const steps = [
  {
    id: 1,
    imagePosition: "left",
    image: "/Mobile.png",
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
  {
    id: 3,
    imagePosition: "left",
    image: "/Mobile (2).png",
    title: "Get paid—clearly and fast",
    description:
      "See fees and final INR upfront, then settle to your local bank. Track payouts, download statements, and stay compliant from day one.",
    cardOverlay: {
      label: "Upwork Client",
      amount: "+$2,500 USD",
      showUsdIcon: true,
    },
    showBorder: true,
  },
];

export const HowItWorksSection = (): JSX.Element => {
  return (
    <section className="relative w-full bg-white py-20">
      <div className="flex flex-col items-center gap-20 max-w-7xl mx-auto px-8">
        {/* Header */}
        <div className="flex flex-col items-center gap-4 text-center">
          <h2 className="font-bold text-black text-5xl max-w-5xl">
            Simplifying your payouts, so you keep more
          </h2>
          <p className="font-normal text-[#1f1f1f] text-xl leading-7 max-w-5xl">
            No FX markup, just a flat 0.25%, so more of each payout lands in your pocket.
          </p>
        </div>

        {/* Steps */}
        {steps.map((step) => (
          <div
            key={step.id}
            className={`flex items-center justify-between w-full gap-10 ${
              step.imagePosition === "right" ? "flex-row-reverse" : ""
            } ${step.showBorder ? "rounded-3xl p-8" : ""}`}
          >
            {/* Image Section */}
            <div className="relative w-[540px] h-[726px] flex-shrink-0">
              <img 
                src={step.image} 
                alt={step.title}
                className="w-full h-full object-cover rounded-3xl"
              />
            </div>

            {/* Content Section */}
            <div className="flex flex-col items-start gap-8 flex-1 max-w-5xl px-10">
              <div className="flex flex-col gap-4">
                <h3 className="font-bold text-black text-[2.6rem]">
                  {step.title}
                </h3>
                <p className="font-light text-[#1f1f1f] text-xl">
                  {step.description}
                </p>
              </div>

              <div className="flex items-center gap-6">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold">
                  Get Started
                </Button>
                <Button 
                  variant="ghost" 
                  className="text-gray-700 font-semibold underline"
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
