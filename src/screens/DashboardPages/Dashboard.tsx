import { RecentTransaction, RecentTransactions } from "../../components/Dashboard/RecentTransactions";
import { Clock, CheckCircle2 } from "lucide-react";
import { Avatar } from "../../components/ui/avatar";
import LiveCalculator from "../../components/Dashboard/LiveCalculator";
import { Download, Share2, Handshake } from "lucide-react";
import QuickActions, { QuickAction } from "@/components/Dashboard/QuickActions";
import BankAccount from "@/components/Dashboard/BankAccount";

export const Dashboard = (): JSX.Element => {
const transactions: RecentTransaction[] = [
    {
      id: 1,
      icon: (
        <Avatar className="bg-blue-50 text-blue-600">
          <span className="text-sm font-semibold">SJ</span>
        </Avatar>
      ),
      name: "Steve John",
      type: "Payment",
      badge: {
        tone: "pending",
        icon: <Clock size={14} />,
        text: "Pending",
      },
      amount: "$2,500.00",
    },
    {
      id: 2,
      icon: (
        <Avatar className="bg-blue-50 text-blue-600">
          <span className="text-sm font-semibold">SJ</span>
        </Avatar>
      ),
      name: "Steve John",
      type: "Payment",
      badge: {
        tone: "pending",
        icon: <Clock size={14} />,
        text: "Pending",
      },
      amount: "$2,500.00",
    },
    {
      id: 3,
      icon: (
        <Avatar className="bg-blue-50 text-blue-600">
          <span className="text-sm font-semibold">SJ</span>
        </Avatar>
      ),
      name: "Steve John",
      type: "Payment",
      badge: {
        tone: "received",
        icon: <CheckCircle2 size={14} />,
        text: "Received",
      },
      amount: "$2,500.00",
    },
    {
      id: 4,
      icon: (
        <Avatar className="bg-blue-50 text-blue-600">
          <span className="text-sm font-semibold">SJ</span>
        </Avatar>
      ),
      name: "Steve John",
      type: "Payment",
      badge: {
        tone: "received",
        icon: <CheckCircle2 size={14} />,
        text: "Received",
      },
      amount: "$2,500.00",
    },
    {
      id: 5,
      icon: (
        <Avatar className="bg-blue-50 text-blue-600">
          <span className="text-sm font-semibold">SJ</span>
        </Avatar>
      ),
      name: "Steve John",
      type: "Payment",
      badge: {
        tone: "received",
        icon: <CheckCircle2 size={14} />,
        text: "Received",
      },
      amount: "$2,500.00",
    },
  ];
  
  const activeCards: QuickAction[] = [
    {
      id: "withdraw",
      title: "Withdraw to your INR Account",
      description:
        "Transfer your US funds from your platform balance to your linked INR bank account in a few taps.",
      icon: <Download className="w-8 h-8" />,
      onClick: () => alert("Withdraw to INR clicked"),
      disabledReason:"KYC"
    },
    {
      id: "share-us-bank",
      title: "Share US bank details",
      description:
        "Generate and copy your US account and routing numbers to invoice clients securely.",
      icon: <Share2 className="w-8 h-8" />,
      onClick: () => alert("Share US bank details clicked"),
    },
    {
      id: "refer",
      title: "Refer: $0.00 fees on $100 withdrawals",
      description:
        "Invite a friend and unlock $0.00 fees on every $100 you withdraw once they join.",
      icon: <Handshake className="w-8 h-8" />,
      onClick: () => alert("Refer clicked"),
    },
  ];

  return (
    <div className="w-full">
      <BankAccount 
        verificationStatus="not_verified" 
        accountCreated={false} 
        accountBalance={10000}
        onShowBankDetails={() => alert("Show bank details")} 
      />

      <div className="mt-8">
        <QuickActions actions={activeCards}/>
      </div>

      <div className="mt-8">
        <RecentTransactions
          title="Transaction history"
          ctaLabel="View all"
          onCtaClick={() => alert("View all clicked")}
          transactions={transactions}
        />
      </div>

      <div className="mt-8">
        <LiveCalculator />
      </div>
    </div>
  );
};
