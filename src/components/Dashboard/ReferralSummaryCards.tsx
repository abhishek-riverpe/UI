interface SummaryCardProps {
  value: string | number;
  primaryLabel: string;
  secondaryLabel: string;
}

const SummaryCard = ({ value, primaryLabel, secondaryLabel }: SummaryCardProps): JSX.Element => (
  <div 
    className="flex flex-col justify-between flex-1"
    style={{
      gap: "10px",
      padding: "16px",
      border: "1px solid #ACACAC",
      borderRadius: "16px"
    }}
  >
    <div 
      style={{
        fontFamily: "'Neue Haas Grotesk Display Pro', -apple-system, BlinkMacSystemFont, sans-serif",
        fontWeight: 700,
        fontSize: "40px",
        lineHeight: "1.2",
        color: "#005AEE"
      }}
    >
      {value}
    </div>
    <div className="flex flex-col self-stretch" style={{ gap: "8px" }}>
      <div 
        style={{
          fontFamily: "'Archivo', sans-serif",
          fontWeight: 500,
          fontSize: "20px",
          lineHeight: "1.088",
          color: "#000000"
        }}
      >
        {primaryLabel}
      </div>
      <div 
        style={{
          fontFamily: "'Archivo', sans-serif",
          fontWeight: 500,
          fontSize: "14px",
          lineHeight: "1.088",
          color: "#575757"
        }}
      >
        {secondaryLabel}
      </div>
    </div>
  </div>
);

interface ReferralSummaryCardsProps {
  activeRewards: number;
  totalSaved: string;
  pendingInvites: number;
}

export const ReferralSummaryCards = ({
  activeRewards,
  totalSaved,
  pendingInvites,
}: ReferralSummaryCardsProps): JSX.Element => {
  return (
    <div 
      className="flex justify-stretch items-stretch self-stretch"
      style={{ gap: "16px" }}
    >
      <SummaryCard
        value={totalSaved}
        primaryLabel="Total saved in fees"
        secondaryLabel="From referral discounts"
      />
      <SummaryCard
        value={activeRewards}
        primaryLabel="Active rewards"
        secondaryLabel="Qualified referrals"
      />
      <SummaryCard
        value={pendingInvites}
        primaryLabel="Pending invites"
        secondaryLabel="Awaiting response"
      />
    </div>
  );
};
