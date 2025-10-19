import { MessageCircle } from "lucide-react";
import { CollapsibleFAQ } from "@/components/Dashboard/CollapsibleFAQ";
import { ContactSupportCard } from "@/components/Dashboard/ContactSupportCard";

export const SupportPage = (): JSX.Element => {
  // FAQ Data
  const faqData = [
    {
      id: "withdrawals",
      question: "Withdrawals & timing",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed rhoncus interdum tortor, vitae congue lacus venenatis ac. Vivamus sagittis nisi vitae vulputate consectetur. Maecenas convallis tellus at porttitor aliquam. Nam eget tempor mi. Nulla hendrerit aliquet placerat. Suspendisse potenti. Donec lectus sem, porta congue congue auctor, elementum at nisl. Integer elementum ante tellus, id dignissim tellus consectetur et."
    },
    {
      id: "linking",
      question: "Linking INR account",
      answer: "To link your INR account, go to your profile settings and select 'Link Bank Account'. Follow the verification process to complete the setup."
    },
    {
      id: "kyc",
      question: "Verification (KYC) status",
      answer: "Your KYC verification status can be checked in your account dashboard. Complete all required documents for faster processing."
    },
    {
      id: "fees",
      question: "Fees and FX",
      answer: "Our fee structure is transparent with no hidden charges. Foreign exchange rates are updated in real-time based on market conditions."
    }
  ];

  // Contact Options Data
  const contactOptions = [
    {
      id: "email",
      title: "Email support",
      subtitle: "Avg. reply time: under a day",
      buttonText: "Contact support",
      isEnabled: true
    },
    {
      id: "chat",
      title: "Talk to an agent",
      subtitle: "Feature coming soon",
      buttonText: "Start a chat",
      isEnabled: true,
      icon: <MessageCircle size={16} />
    }
  ];

  const handleContactSupport = (optionId: string) => {
    if (optionId === "email") {
      window.location.href = "mailto:support@riverpe.com";
    } else if (optionId === "chat") {
      alert("Chat feature coming soon!");
    }
  };

  return (
    <div className="w-full flex flex-col px-4 sm:px-6 md:px-8" style={{ gap: "clamp(24px, 5vw, 40px)" }}>
      {/* Page Title */}
      <div className="flex flex-col self-stretch" style={{ gap: "12px" }}>
        <h1 
          style={{
            fontFamily: "'Neue Haas Grotesk Display Pro', -apple-system, BlinkMacSystemFont, sans-serif",
            fontWeight: 600,
            fontSize: "clamp(24px, 5vw, 32px)",
            lineHeight: "1.2",
            color: "#222222"
          }}
        >
          Support & Help
        </h1>
      </div>

      {/* Quick Answers FAQ Section */}
      <CollapsibleFAQ
        title="Quick Answers"
        faqs={faqData}
      />

      {/* Contact Us Section */}
      <ContactSupportCard
        title="Contact us"
        options={contactOptions}
        onContactSupport={handleContactSupport}
      />
    </div>
  );
};
