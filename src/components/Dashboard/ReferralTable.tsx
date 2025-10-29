import { Button } from "@/components/ui/button";
import { ReferralStatusBadge } from "./ReferralStatusBadge";

interface ReferralData {
  id: string;
  contact: string;
  status: "rewarded" | "qualified" | "verified" | "signed_up" | "invited";
  joined: string;
  qualified: string;
  reward: string;
}

interface ReferralTableProps {
  referrals: ReferralData[];
  onResend: (id: string) => void;
  onCopyLink: (id: string) => void;
}

export const ReferralTable = ({ 
  referrals, 
  onResend, 
  onCopyLink 
}: ReferralTableProps): JSX.Element => {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-4">Your referrals</h3>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-medium text-gray-600">Name</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600">Joined</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600">Qualified</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600">Reward</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {referrals.map((referral) => (
              <tr key={referral.id} className="border-b border-gray-100">
                <td className="py-3 px-4 font-medium text-gray-900">{referral.contact}</td>
                <td className="py-3 px-4">
                  <ReferralStatusBadge status={referral.status} />
                </td>
                <td className="py-3 px-4 text-gray-600">{referral.joined}</td>
                <td className="py-3 px-4 text-gray-600">{referral.qualified}</td>
                <td className="py-3 px-4 text-gray-600">{referral.reward}</td>
                <td className="py-3 px-4">
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onResend(referral.id)}
                    >
                      Resend
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onCopyLink(referral.id)}
                    >
                      Copy link
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
