import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

interface CollapsibleFAQProps {
  title: string;
  faqs: FAQItem[];
}

export const CollapsibleFAQ = ({ title, faqs }: CollapsibleFAQProps): JSX.Element => {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = (id: string) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  return (
    <div className="flex flex-col self-stretch" style={{ gap: "24px" }}>
      {/* Section Title */}
      <div 
        style={{
          fontFamily: "'Neue Haas Grotesk Display Pro', -apple-system, BlinkMacSystemFont, sans-serif",
          fontWeight: 600,
          fontSize: "24px",
          lineHeight: "1.2",
          color: "#222222"
        }}
      >
        {title}
      </div>

      {/* FAQ Container */}
      <div 
        className="flex flex-col items-stretch self-stretch"
        style={{
          gap: "32px",
          padding: "36px",
          border: "1px solid #ACACAC",
          borderRadius: "16px"
        }}
      >
        {faqs.map((faq, index) => (
          <div key={faq.id}>
            {/* Question Row */}
            <div 
              className="flex justify-between items-center w-full cursor-pointer"
              style={{
                gap: "10px",
                padding: "12px",
                backgroundColor: openItems.has(faq.id) ? "transparent" : "transparent",
                borderRadius: "12px"
              }}
              onClick={() => toggleItem(faq.id)}
            >
              <div 
                style={{
                  fontFamily: "'Neue Haas Grotesk Display Pro', -apple-system, BlinkMacSystemFont, sans-serif",
                  fontWeight: 600,
                  fontSize: "16px",
                  lineHeight: "1.5",
                  color: "#222222"
                }}
              >
                {faq.question}
              </div>
              <ChevronDown 
                size={24} 
                color="#000000" 
                style={{
                  transform: openItems.has(faq.id) ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.2s ease"
                }}
              />
            </div>

            {/* Answer */}
            {openItems.has(faq.id) && (
              <div 
                className="flex self-stretch"
                style={{
                  gap: "10px",
                  padding: "12px",
                  borderRadius: "12px"
                }}
              >
                <div 
                  style={{
                    fontFamily: "'Neue Haas Grotesk Display Pro', -apple-system, BlinkMacSystemFont, sans-serif",
                    fontWeight: 500,
                    fontSize: "16px",
                    lineHeight: "1.5",
                    color: "#222222"
                  }}
                >
                  {faq.answer}
                </div>
              </div>
            )}

            {/* Separator */}
            {index < faqs.length - 1 && openItems.has(faq.id) &&(
              <div 
                className="self-stretch"
                style={{
                  height: "1px",
                  backgroundColor: "#ACACAC"
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};