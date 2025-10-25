import { useState } from "react";
import { ReferralSummaryCards } from "@/components/Dashboard/ReferralSummaryCards";
import { ReferralBenefitCard } from "@/components/Dashboard/ReferralBenefitCard";
import { ReferralListItem } from "@/components/Dashboard/ReferralListItem";

interface Referral {
  id: string;
  contact: string;
  status: "qualified" | "signedup" | "invited";
}

export const ReferralsPage = (): JSX.Element => {
  const [referrals, setReferrals] = useState<Referral[]>([
    {
      id: "1",
      contact: "alex@example.com",
      status: "signedup"
    },
    {
      id: "2",
      contact: "sarah.johnson@email.com",
      status: "qualified"
    },
    {
      id: "3",
      contact: "+1 (555) 123-4567",
      status: "invited"
    }
  ]);

  const handleSendInvite = (contact: string) => {
    const newReferral: Referral = {
      id: Date.now().toString(),
      contact,
      status: "invited"
    };
    setReferrals([...referrals, newReferral]);
    alert(`Invite sent to ${contact}`);
  };

  const handleCopyLink = () => {
    const referralLink = "https://riverpe.com/ref/YOUR_REFERRAL_CODE";
    navigator.clipboard.writeText(referralLink);
    alert("Referral link copied to clipboard!");
  };

  // Calculate stats
  const totalSaved = "$12.34";
  const activeRewards = referrals.filter(r => r.status === "qualified").length;
  const pendingInvites = referrals.filter(r => r.status === "invited").length;

  return (
    <div className="flex flex-col" style={{ gap: "40px", width: "855px" }}>
      {/* Page Title */}
      <div className="flex flex-col self-stretch" style={{ gap: "12px" }}>
        <h1 
          style={{
            fontFamily: "'Neue Haas Grotesk Display Pro', -apple-system, BlinkMacSystemFont, sans-serif",
            fontWeight: 600,
            fontSize: "32px",
            lineHeight: "1.2",
            color: "#222222"
          }}
        >
          Referrals
        </h1>
      </div>

      {/* Summary Cards */}
      <ReferralSummaryCards
        activeRewards={activeRewards}
        totalSaved={totalSaved}
        pendingInvites={pendingInvites}
      />

      {/* Benefit Card with Form */}
      <ReferralBenefitCard
        onSendInvite={handleSendInvite}
        onCopyLink={handleCopyLink}
      />

      {/* Your Referrals Section */}
      <div className="flex flex-col self-stretch" style={{ gap: "24px" }}>
        <h2 
          style={{
            fontFamily: "'Neue Haas Grotesk Display Pro', -apple-system, BlinkMacSystemFont, sans-serif",
            fontWeight: 600,
            fontSize: "24px",
            lineHeight: "1.2",
            color: "#222222"
          }}
        >
          Your referrals
        </h2>

        {/* Referral List */}
        <div className="flex flex-col self-stretch" style={{ gap: "16px" }}>
          {referrals.map((referral) => (
            <ReferralListItem
              key={referral.id}
              contact={referral.contact}
              status={referral.status}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

