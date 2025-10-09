import { useState } from "react";
import { ReferralBenefitCard } from "@/components/Dashboard/ReferralBenefitCard";
import { ReferralSummaryCards } from "@/components/Dashboard/ReferralSummaryCards";
import { ProgressBar } from "@/components/Dashboard/ProgressBar";
import { ReferralTable } from "@/components/Dashboard/ReferralTable";
import { CollapsibleFAQ } from "@/components/Dashboard/CollapsibleFAQ";

interface ReferralData {
  id: string;
  contact: string;
  status: "rewarded" | "qualified" | "verified" | "signed_up" | "invited";
  joined: string;
  qualified: string;
  reward: string;
}

export const ReferralsPage = (): JSX.Element => {
  // State management
  const [referrals] = useState<ReferralData[]>([
    {
      id: "1",
      contact: "john@example.com",
      status: "rewarded",
      joined: "1/15/2024",
      qualified: "1/19/2024",
      reward: "Applied"
    },
    {
      id: "2",
      contact: "sarah.smith@gmail.com",
      status: "qualified",
      joined: "2/1/2024",
      qualified: "2/4/2024",
      reward: "-"
    },
    {
      id: "3",
      contact: "mike.wilson@yahoo.com",
      status: "verified",
      joined: "2/10/2024",
      qualified: "-",
      reward: "-"
    },
    {
      id: "4",
      contact: "emma.davis@outlook.com",
      status: "signed_up",
      joined: "2/15/2024",
      qualified: "-",
      reward: "-"
    },
    {
      id: "5",
      contact: "alex.brown@gmail.com",
      status: "invited",
      joined: "-",
      qualified: "-",
      reward: "-"
    }
  ]);

  // Constants
  const referralLink = "https://riverpe.com/invite/RIVERPE123";
  const activeRewards = referrals.filter(r => r.status === "qualified" || r.status === "rewarded").length;
  const totalSaved = "$0.0";
  const pendingInvites = referrals.filter(r => r.status === "invited").length;

  // FAQ Data
  const faqItems = [
    {
      question: "How does my friend qualify?",
      answer: "Friend signs up, completes verification, and meets the qualification criteria."
    },
    {
      question: "What's my benefit?",
      answer: "You get $0.00 fees on every $100 you withdraw once your friend qualifies."
    },
    {
      question: "Are there any limits?",
      answer: "Fair-use applies. The discount is applied automatically to eligible withdrawals."
    },
    {
      question: "When is the discount applied?",
      answer: "The discount is applied immediately after your friend qualifies and remains active."
    }
  ];

  // Handlers
  const handleInviteFriend = () => {
    // This would typically open a modal or navigate to invite flow
    console.log("Open invite friend modal");
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    // You could show a toast notification here
    console.log("Referral link copied to clipboard");
  };


  const handleResend = (id: string) => {
    console.log(`Resending invite for: ${id}`);
    // This would typically make an API call to resend the invite
  };

  const handleCopyLinkForReferral = (id: string) => {
    navigator.clipboard.writeText(referralLink);
    console.log(`Copied referral link for: ${id}`);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Referrals</h1>
      
      {/* Main Referral Benefit Card */}
      <ReferralBenefitCard
        title="Refer & unlock $0.00 fees on every $100 withdrawn"
        description="Invite friends to join. When they qualify, you get $0.00 fees on each $100 you withdraw."
        onInviteFriend={handleInviteFriend}
        onCopyLink={handleCopyLink}
        referralLink={referralLink}
      />

      {/* Summary Cards */}
      <ReferralSummaryCards
        activeRewards={activeRewards}
        totalSaved={totalSaved}
        pendingInvites={pendingInvites}
      />

      {/* Progress Bar */}
      <ProgressBar
        current={activeRewards}
        max={5}
        label="Progress to next reward"
        description="Next reward at: friend qualifies → adds $0.00 fees per $100 withdrawal to your account"
      />

      {/* Referral Table */}
      <ReferralTable
        referrals={referrals}
        onResend={handleResend}
        onCopyLink={handleCopyLinkForReferral}
      />

      {/* How it works FAQ */}
      <CollapsibleFAQ
        title="How it works"
        items={faqItems}
      />
    </div>
  );
};
