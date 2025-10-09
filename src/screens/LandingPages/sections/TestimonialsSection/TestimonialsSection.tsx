import { ChevronLeftIcon, ChevronRightIcon, HeartIcon } from "lucide-react";
import {useRef} from "react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";

const testimonialCards = [
  {
    type: "image",
    backgroundImage: "forFreelancer.png",
  },
  {
    type: "testimonial",
    backgroundColor: "bg-[#0059ed]",
    textColor: "text-white",
    quote:
      '"Earlier, Payoneer and PayPal took a big cut every time a buyer paid us. Riverpe changed that — zero FX markup, transparent rates, and smooth settlements to our Indian account. We finally get paid what we truly earn.',
    author: {
      name: "Sarah M.",
      role: "Upwork, Freelancer",
      avatar: "/gettyimages-1296444588-612x612-1.png",
    },
    stars: "/frame-2147223918.svg",
  },
  {
    type: "image",
    backgroundImage: "/frame-2147223912.png",
  },
  {
    type: "testimonial",
    backgroundColor: "bg-white",
    textColor: "text-black",
    borderClass: "border-2 border-solid border-[#acacac]",
    quote:
      '"Earlier, Payoneer and PayPal took a big cut every time a buyer paid us. Riverpe changed that — zero FX markup, transparent rates, and smooth settlements to our Indian account. We finally get paid what we truly earn.',
    author: {
      name: "Sarah M.",
      role: "Upwork, Freelancer",
      avatar: "/gettyimages-1296444588-612x612-1-1.png",
    },
    stars: "/frame-2147223918.svg",
  },
  {
    type: "image",
    backgroundImage: "/frame-2147223912.png",
  },
];

export const TestimonialsSection = (): JSX.Element => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -320, // Card width (300px) + gap (20px)
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 320, // Card width (300px) + gap (20px)
        behavior: 'smooth'
      });
    }
  };
  return (
    <section className="relative w-full py-12 overflow-hidden">
      <div className="container mx-auto px-10">
        <div className="flex flex-col items-center gap-2.5 mb-[50px]">
          <div className="flex items-center justify-center gap-2.5">
            <h2
              className="font-headings font-semibold text-black text-[48px] text-center leading-[100%] tracking-[0px] align-middle"
              style={{
                fontStyle: 'normal', // 65 Medium is typically 'normal' in CSS, but if you have a custom font-weight for 500/600, adjust accordingly
              }}
            >
              Why people choose Riverpe
            </h2>
          </div>

          <p
            className="font-body font-normal text-[24px] leading-[36px] tracking-[0px] text-center align-middle text-[#1f1f1f] max-w-4xl"
            style={{
              fontStyle: 'normal',
              fontWeight: 400,
            }}
          >
            Hear stories from freelancers to agencies on keeping more of every payout.
          </p>
        </div>

        <div className="relative">
          <div 
            ref={scrollContainerRef}
            className="flex items-center gap-6 overflow-x-auto scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {testimonialCards.map((card, index) => {
              if (card.type === "image") {
                return (
                  <div
                    key={index}
                    className="flex-shrink-0 w-[280px] h-[440px] rounded-3xl bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${card.backgroundImage})`,
                    }}
                  />
                );
              }

              return (
                <Card
                  key={index}
                  className={`flex-shrink-0 w-[300px] h-[440px] ${card.backgroundColor} rounded-3xl overflow-hidden ${card.borderClass || ""}`}
                >
                  <CardContent className="relative h-full p-0">
                    <img
                      className="absolute top-[33px] left-[29px] w-[155px] h-[31px]"
                      alt="Rating stars"
                      src={card.stars}
                    />

                    <p
                      className={`absolute top-[88px] left-8 w-[242px] [font-family:'Archivo',Helvetica] font-medium ${card.textColor} text-base tracking-[0] leading-6`}
                    >
                      {card.quote}
                    </p>

                    <div className="flex w-[242px] h-[58px] items-center gap-3 absolute top-[359px] left-[29px]">
                      <div className="inline-flex items-center gap-3">
                        <img
                          className="w-12 h-12 rounded-full"
                          alt={card.author.name}
                          src={card.author.avatar}
                        />

                        <div className="flex flex-col w-[134px]">
                          <div
                            className={`${card.textColor} h-[29px] [font-family:'Neue_Haas_Grotesk_Display_Pro-Mediu',Helvetica] font-normal text-xl tracking-[0] leading-[normal]`}
                          >
                            {card.author.name}
                          </div>

                          <div
                            className={`h-[29px] [font-family:'Neue_Haas_Grotesk_Display_Pro-Roman',Helvetica] ${card.textColor} text-base font-normal tracking-[0] leading-[normal]`}
                          >
                            {card.author.role}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <button
            className="absolute top-1/2 -translate-y-1/2 left-0 w-[60px] h-[60px] rounded-full bg-black/70 shadow-lg "
            aria-label="Previous testimonial"
            onClick={scrollLeft}
          >
            <ChevronLeftIcon className="pl-3 w-12 h-12 text-white" />
          </button>

          <button
            className="absolute top-1/2 -translate-y-1/2 right-0 w-[60px] h-[60px] rounded-full bg-black/70 bg-opacity-80 shadow-lg"
            aria-label="Next testimonial"
            onClick={scrollRight}
          >
            <ChevronRightIcon className="pl-3 w-12 h-12 text-white" />
          </button>
        </div>
      </div>
    </section>
  );
};
