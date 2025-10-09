import { Card } from "@/components/ui/card";

interface SummaryCardProps {
  value: string | number;
  label: string;
}

const SummaryCard = ({ value, label }: SummaryCardProps): JSX.Element => (
  <Card className="p-6 text-center">
    <div className="text-3xl font-bold text-gray-900 mb-2">{value}</div>
    <div className="text-sm text-gray-600">{label}</div>
  </Card>
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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <SummaryCard
        value={activeRewards}
        label="Qualified referrals"
      />
      <SummaryCard
        value={totalSaved}
        label="From referral discounts"
      />
      <SummaryCard
        value={pendingInvites}
        label="Awaiting response"
      />
    </div>
  );
};
