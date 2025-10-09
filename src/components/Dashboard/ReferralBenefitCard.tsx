import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";

interface ReferralBenefitCardProps {
  title: string;
  description: string;
  onInviteFriend: () => void;
  onCopyLink: () => void;
  referralLink: string;
}

export const ReferralBenefitCard = ({
  title,
  description,
  onInviteFriend,
  onCopyLink,
  referralLink,
}: ReferralBenefitCardProps): JSX.Element => {
  return (
    <Card className="p-6 mb-6">
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="text-gray-600 mb-6">{description}</p>
      
      <div className="flex space-x-4 mb-4">
        <Button onClick={onInviteFriend} className="flex-1">
          Invite a friend
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            navigator.clipboard.writeText(referralLink);
            onCopyLink();
          }}
          className="flex-1"
        >
          <Share2 className="w-4 h-4 mr-2" />
          Copy referral link
        </Button>
      </div>
      
      {/* Feature Tags */}
      <div className="flex space-x-2">
        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
          No hidden fees
        </span>
        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
          Instant tracking
        </span>
        <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
          Fair-use applies
        </span>
      </div>
    </Card>
  );
};
