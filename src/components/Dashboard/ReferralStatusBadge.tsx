interface ReferralStatusBadgeProps {
  status: "qualified" | "signedup" | "invited";
}

export const ReferralStatusBadge = ({ status }: ReferralStatusBadgeProps): JSX.Element => {
  const getBadgeConfig = () => {
    switch (status) {
      case "qualified":
        return {
          text: "Qualified",
          bgColor: "#E2F5EE",
          borderColor: "#1FCB92",
          textColor: "#137C59"
        };
      case "signedup":
        return {
          text: "Signed up",
          bgColor: "#DEE7F6",
          borderColor: "#0051D6",
          textColor: "#003283"
        };
      case "invited":
        return {
          text: "Invited",
          bgColor: "#E2E2E2",
          borderColor: "#575757",
          textColor: "#222222"
        };
      default:
        return {
          text: "Unknown",
          bgColor: "#E2E2E2",
          borderColor: "#575757",
          textColor: "#222222"
        };
    }
  };

  const config = getBadgeConfig();

  return (
    <div 
      className="inline-flex items-center justify-center"
      style={{
        gap: "8px",
        padding: "4px 12px",
        backgroundColor: config.bgColor,
        border: `2px solid ${config.borderColor}`,
        borderRadius: "9999px"
      }}
    >
      <span 
        style={{
          fontFamily: "'Neue Haas Grotesk Display Pro', -apple-system, BlinkMacSystemFont, sans-serif",
          fontWeight: 600,
          fontSize: "16px",
          lineHeight: "1.5",
          color: config.textColor
        }}
      >
        {config.text}
      </span>
    </div>
  );
};
