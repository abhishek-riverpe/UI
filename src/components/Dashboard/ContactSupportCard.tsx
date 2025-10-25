interface ContactOption {
  id: string;
  title: string;
  subtitle: string;
  buttonText: string;
  isEnabled: boolean;
  icon?: React.ReactNode;
}

interface ContactSupportCardProps {
  title: string;
  options: ContactOption[];
  onContactSupport: (optionId: string) => void;
}

export const ContactSupportCard = ({ title, options, onContactSupport }: ContactSupportCardProps): JSX.Element => {
  return (
    <div className="flex flex-col self-stretch" style={{ gap: "24px" }}>
      {/* Section Title */}
      <div 
        style={{
          fontFamily: "'Neue Haas Grotesk Display Pro', -apple-system, BlinkMacSystemFont, sans-serif",
          fontWeight: 600,
          fontSize: "clamp(20px, 4vw, 24px)",
          lineHeight: "1.2",
          color: "#222222"
        }}
      >
        {title}
      </div>

      {/* Contact Options Container */}
      <div 
        className="flex flex-col self-stretch"
        style={{
          gap: "clamp(16px, 4vw, 32px)",
          padding: "clamp(24px, 5vw, 36px)",
          border: "1px solid #ACACAC",
          borderRadius: "16px"
        }}
      >
        {options.map((option) => (
          <div key={option.id}>
            {/* Option Row */}
            <div 
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center"
              style={{
                gap: "16px",
                padding: "12px",
                borderRadius: "12px"
              }}
            >
              {/* Left Side - Text Content */}
              <div className="flex flex-col" style={{ gap: "4px" }}>
                <div 
                  style={{
                    fontFamily: "'Neue Haas Grotesk Display Pro', -apple-system, BlinkMacSystemFont, sans-serif",
                    fontWeight: 600,
                    fontSize: "clamp(14px, 3vw, 16px)",
                    lineHeight: "1.5",
                    color: "#222222"
                  }}
                >
                  {option.title}
                </div>
                <div 
                  style={{
                    fontFamily: "'Neue Haas Grotesk Display Pro', -apple-system, BlinkMacSystemFont, sans-serif",
                    fontWeight: 500,
                    fontSize: "clamp(11px, 2.5vw, 12px)",
                    lineHeight: "2",
                    color: "#575757"
                  }}
                >
                  {option.subtitle}
                </div>
              </div>

              {/* Right Side - Button */}
              <button
                onClick={() => onContactSupport(option.id)}
                className="w-full sm:w-auto"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  padding: "12px 16px",
                  minHeight: "40px",
                  border: option.buttonText === "Start a chat" ? "none" : "1px solid #ACACAC",
                  borderRadius: "8px",
                  cursor: "pointer",
                  backgroundColor: option.buttonText === "Start a chat" ? "#005AEE" : "#FFFFFF",
                  transition: "all 0.2s ease"
                }}
              >
                {option.icon && (
                  <div style={{ 
                    color: option.buttonText === "Start a chat" ? "#FFFFFF" : "#222222",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "0px 5px"
                  }}>
                    {option.icon}
                  </div>
                )}
                <span 
                  style={{
                    fontFamily: "'Archivo', sans-serif",
                    fontWeight: 500,
                    fontSize: "clamp(12px, 2.5vw, 14px)",
                    lineHeight: "1.2",
                    textAlign: "center",
                    color: option.buttonText === "Start a chat" ? "#FFFFFF" : "#222222",
                    whiteSpace: "nowrap"
                  }}
                >
                  {option.buttonText}
                </span>
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};
