import { ReferralStatusBadge } from "./ReferralStatusBadge";

interface ReferralListItemProps {
  contact: string;
  status: "qualified" | "signedup" | "invited";
}

export const ReferralListItem = ({ contact, status }: ReferralListItemProps): JSX.Element => {
  return (
    <div 
      className="flex justify-between items-center self-stretch"
      style={{
        gap: "10px",
        padding: "2px 24px",
        border: "1px solid #ACACAC",
        borderRadius: "12px"
      }}
    >
      {/* Left Side - Avatar and Contact */}
      <div className="flex items-center self-stretch" style={{ gap: "16px" }}>
        {/* Avatar */}
        <div 
          style={{
            width: "48px",
            height: "48px",
            backgroundColor: "#DEE7F6",
            borderRadius: "9999px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <img src="/avatar.svg" alt="" />
        </div>

        {/* Contact */}
        <div className="flex flex-col justify-center self-stretch">
          <div 
            style={{
              fontFamily: "'Neue Haas Grotesk Display Pro', -apple-system, BlinkMacSystemFont, sans-serif",
              fontWeight: 600,
              fontSize: "20px",
              lineHeight: "1.2",
              color: "#222222"
            }}
          >
            {contact}
          </div>
        </div>
      </div>

      {/* Right Side - Status Badge */}
      <div 
        className="flex flex-col items-center justify-center"
        style={{
          height: "82px"
        }}
      >
        <ReferralStatusBadge status={status} />
      </div>
    </div>
  );
};

