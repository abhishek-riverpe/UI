import { RecentTransaction, RecentTransactions } from "../../components/Dashboard/RecentTransactions";
import { Clock, CheckCircle2 } from "lucide-react";
import { Avatar } from "../../components/ui/avatar";
import LiveCalculator from "../../components/Dashboard/LiveCalculator";
import { Download, Share2, Handshake } from "lucide-react";
import QuickActions, { QuickAction } from "@/components/Dashboard/QuickActions";
import BankAccount from "@/components/Dashboard/BankAccount";
import { useNavigate } from "react-router-dom";
import { TransactionDetailsModal } from "@/components/Dashboard/TransactionDetailsModal";
import { useState } from "react";

interface Transaction {
  id: number;
  name: string;
  type: string;
  status: "pending" | "received";
  amount: string;
  date: string;
}

export const Dashboard = (): JSX.Element => {
  const navigate = useNavigate();
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const transactionsData: Transaction[] = [
    {
      id: 1,
      name: "Steve John",
      type: "Payment",
      status: "pending",
      amount: "$2,500.00",
      date: "4 October 2025"
    },
    {
      id: 2,
      name: "Steve John",
      type: "Payment",
      status: "pending",
      amount: "$2,500.00",
      date: "3 October 2025"
    },
    {
      id: 3,
      name: "Steve John",
      type: "Payment",
      status: "received",
      amount: "$2,500.00",
      date: "2 October 2025"
    },
    {
      id: 4,
      name: "Steve John",
      type: "Payment",
      status: "received",
      amount: "$2,500.00",
      date: "1 October 2025"
    },
    {
      id: 5,
      name: "Steve John",
      type: "Payment",
      status: "received",
      amount: "$2,500.00",
      date: "30 September 2025"
    },
  ];

  const transactions: RecentTransaction[] = transactionsData.map((tx) => ({
    id: tx.id,
    icon: (
      <Avatar className="bg-blue-50 text-blue-600">
        <span className="text-sm font-semibold">SJ</span>
      </Avatar>
    ),
    name: tx.name,
    type: tx.type,
    badge: {
      tone: tx.status,
      icon: tx.status === "pending" ? <Clock size={14} /> : <CheckCircle2 size={14} />,
      text: tx.status === "pending" ? "Pending" : "Received",
    },
    amount: tx.amount,
  }));

  const handleTransactionClick = (transactionId: string | number) => {
    const transaction = transactionsData.find(t => t.id === transactionId);
    if (transaction) {
      setSelectedTransaction(transaction);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTransaction(null);
  };
  
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
          onCtaClick={() => navigate("/dashboard/transactions")}
          transactions={transactions}
          onTransactionClick={handleTransactionClick}
        />
      </div>

      <div className="mt-8">
        <LiveCalculator />
      </div>

      {/* Transaction Details Modal */}
      <TransactionDetailsModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        transaction={selectedTransaction}
      />
    </div>
  );
};
