import { Share2 } from "lucide-react";
import { useState } from "react";

interface ReferralBenefitCardProps {
  onSendInvite: (contact: string) => void;
  onCopyLink: () => void;
}

export const ReferralBenefitCard = ({
  onSendInvite,
  onCopyLink,
}: ReferralBenefitCardProps): JSX.Element => {
  const [contact, setContact] = useState("");

  const handleSendInvite = () => {
    if (contact.trim()) {
      onSendInvite(contact);
      setContact("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendInvite();
    }
  };

  return (
    <div 
      className="flex flex-col justify-center items-center self-stretch"
      style={{
        gap: "40px",
        padding: "32px",
        backgroundColor: "#FFFFFF",
        border: "1px solid #ACACAC",
        borderRadius: "16px"
      }}
    >
      {/* Illustration */}
      <img 
        src="/illustrations/refer-friend.svg" 
        alt="Refer a friend" 
        style={{
          width: "250px",
          height: "250px"
        }}
      />

      {/* Heading and Description */}
      <div className="flex flex-col items-center self-stretch" style={{ gap: "12px" }}>
        <div 
          style={{
            fontFamily: "'Neue Haas Grotesk Display Pro', -apple-system, BlinkMacSystemFont, sans-serif",
            fontWeight: 600,
            fontSize: "24px",
            lineHeight: "1.2",
            textAlign: "center",
            color: "#222222"
          }}
        >
          Refer a friend and get $0.00 fees on every $100 withdrawn!
        </div>
        <div 
          style={{
            fontFamily: "'Archivo', sans-serif",
            fontWeight: 400,
            fontSize: "16px",
            lineHeight: "1.25",
            textAlign: "center",
            color: "#575757"
          }}
        >
          Invite a friend. When they qualify, your withdrawal fees drop automatically.
        </div>
      </div>

      {/* Form Section */}
      <div className="flex flex-col items-center self-stretch" style={{ gap: "12px" }}>
        <div className="flex" style={{ gap: "19px" }}>
          {/* Input Field */}
          <input
            type="text"
            placeholder="Enter friend's email or phone number"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            onKeyPress={handleKeyPress}
            style={{
              width: "378px",
              height: "54px",
              padding: "12px 24px",
              backgroundColor: "#FFFFFF",
              border: "1px solid #ACACAC",
              borderRadius: "12px",
              fontFamily: "'Archivo', sans-serif",
              fontWeight: 400,
              fontSize: "16px",
              lineHeight: "1.088",
              color: "#222222",
              outline: "none"
            }}
          />

          {/* Send Invite Button */}
          <button
            onClick={handleSendInvite}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "8px 16px",
              backgroundColor: "#005AEE",
              borderRadius: "12px",
              border: "none",
              cursor: "pointer",
              fontFamily: "'Archivo', sans-serif",
              fontWeight: 700,
              fontSize: "16px",
              lineHeight: "1.088",
              textAlign: "center",
              color: "#FFFFFF"
            }}
          >
            Send invite
          </button>

          {/* Copy Link Button */}
          <button
            onClick={onCopyLink}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "8px 16px",
              backgroundColor: "#FFFFFF",
              border: "1px solid #ACACAC",
              borderRadius: "12px",
              cursor: "pointer",
              fontFamily: "'Archivo', sans-serif",
              fontWeight: 700,
              fontSize: "16px",
              lineHeight: "1.088",
              textAlign: "center",
              color: "#005AEE"
            }}
          >
            Copy referral link
          </button>

        </div>

        {/* Footer Note */}
        <div 
          style={{
            fontFamily: "'Archivo', sans-serif",
            fontWeight: 400,
            fontSize: "12px",
            lineHeight: "1.667",
            textAlign: "center",
            color: "#575757"
          }}
        >
          One invite, one reminder. No spam.
        </div>
      </div>
    </div>
  );
};
