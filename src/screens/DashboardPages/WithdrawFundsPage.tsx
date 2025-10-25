import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BankAccountSelector } from "@/components/Dashboard/BankAccountSelector";
import { CurrencySelector } from "@/components/Dashboard/CurrencySelector";
import { AmountInput } from "@/components/Dashboard/AmountInput";
import { TransactionSummary } from "@/components/Dashboard/TransactionSummary";
import { ArrivalTime } from "@/components/Dashboard/ArrivalTime";
import { LinkBankAccountModal } from "@/components/Dashboard/LinkBankAccountModal";
import { SuccessNotification } from "@/components/Dashboard/SuccessNotification";
import { CircleAlert } from "lucide-react";

interface BankAccount {
  id: string;
  bankName: string;
  accountNumber: string;
  ifscCode: string;
}

interface Currency {
  code: string;
  name: string;
}

interface WithdrawFundsPageProps {
  verificationStatus?: "not_verified" | "pending" | "rejected" | "verified";
  onStartVerification?: () => void;
  onViewStatus?: () => void;
  onRetryVerification?: () => void;
}

export const WithdrawFundsPage = ({ 
  verificationStatus = "verified",
  onStartVerification,
  onViewStatus,
  onRetryVerification
}: WithdrawFundsPageProps): JSX.Element => {
  // State management
  const [selectedAccount, setSelectedAccount] = useState<BankAccount | null>(null);
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>({
    code: "USD",
    name: "US Dollars", 
  });
  const [amount, setAmount] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [showInitiatedNotification, setShowInitiatedNotification] = useState(false);
  const [showCompletedNotification, setShowCompletedNotification] = useState(false);
  const [initiatedTitle, setInitiatedTitle] = useState("");
  const [initiatedMessage, setInitiatedMessage] = useState("");
  const [completedTitle, setCompletedTitle] = useState("");
  const [completedMessage, setCompletedMessage] = useState("");
  const [showAccountLinked, setShowAccountLinked] = useState(false);
  const [accountLinkedMessage, setAccountLinkedMessage] = useState("");

  // Constants
  const availableBalance = 10000;
  const exchangeRate = 88.72;
  const feePercentage = 1.75;

  // Handlers
  const handleLinkAccount = () => {
    setIsModalOpen(true);
  };

  const handleAccountLinked = (accountData: any) => {
    const newAccount: BankAccount = {
      id: "1",
      bankName: accountData.bankName,
      accountNumber: accountData.accountNumber,
      ifscCode: accountData.ifscCode
    };
    setSelectedAccount(newAccount);
    setShowAccountLinked(true);
    setAccountLinkedMessage(`Your INR bank account ending ${accountData.accountNumber.slice(-4)} is now linked! Enjoy seamless transfers between your accounts!`);
    
    // Hide success message after 5 seconds
    setTimeout(() => setShowAccountLinked(false), 5000);
  };

  const handleAccountChange = () => {
    setIsModalOpen(true);
  };

  const handleWithdraw = async () => {
    setIsWithdrawing(true);
    
    const withdrawAmount = amount;
    const inrAmount = (amount * exchangeRate).toFixed(2);
    
    // Show first notification immediately
    setShowInitiatedNotification(true);
    setInitiatedTitle(`Withdrawal of $${withdrawAmount.toFixed(2)} initiated successfully!`);
    setInitiatedMessage(`₹${inrAmount} will be transferred to your account.`);
    
    // Simulate withdrawal process
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsWithdrawing(false);
    
    // Show second notification after processing is complete
    setShowCompletedNotification(true);
    setCompletedTitle("Withdrawal completed!");
    setCompletedMessage(`₹${inrAmount} has been transferred to your INR bank account.`);
    
    setAmount(0);
    
    // Hide both notifications after 8 seconds
    setTimeout(() => {
      setShowInitiatedNotification(false);
      setShowCompletedNotification(false);
    }, 8000);
  };

  const canWithdraw = selectedAccount && amount > 0 && amount <= availableBalance && !isWithdrawing;

  // KYC verification screens
  const kycContent = (() => {
    switch (verificationStatus) {
      case "not_verified":
        return {
          title: "Verify to withdraw funds",
          subtitle: "Complete a quick ID check to enable transfers from your US account to your INR bank.",
          primaryBtn: "Start verification",
          secondaryBtn: "Learn about limits & fees",
          onPrimary: onStartVerification,
        };
      case "pending":
        return {
          title: "Verification in progress",
          subtitle: "We're reviewing your details—withdrawals will be available as soon as verification is complete.",
          primaryBtn: "View status",
          secondaryBtn: "Why verification is required",
          onPrimary: onViewStatus,
        };
      case "rejected":
        return {
          title: "We couldn't verify your details",
          subtitle: "Please re-verify with a clear government ID and a name that matches your bank account.",
          primaryBtn: "Retry Verification",
          secondaryBtn: "Help with verification",
          onPrimary: onRetryVerification,
        };
      default:
        return null;
    }
  })();

  const showKYCScreen = verificationStatus !== "verified";

  return (
    <div>
      {/* Notifications */}
      <div className="flex flex-col gap-3">
        {/* Account Linked Notification */}
        <SuccessNotification
          title="Account linked successfully!"
          message={accountLinkedMessage}
          isVisible={showAccountLinked}
        />
        
        {/* Withdrawal Completed Notification */}
        <SuccessNotification
          title={completedTitle}
          message={completedMessage}
          isVisible={showCompletedNotification}
        />
        
        {/* Withdrawal Initiated Notification */}
        <SuccessNotification
          title={initiatedTitle}
          message={initiatedMessage}
          isVisible={showInitiatedNotification}
        />
      </div>

      {/* Page Title */}
      <div className="mb-10">
        <h1 className="text-[32px] font-bold text-[#222222]" style={{ fontFamily: 'Neue Haas Grotesk Display Pro, sans-serif', lineHeight: '1.2' }}>
          Withdraw funds
        </h1>
      </div>

      {/* Show KYC screen if not verified */}
      {showKYCScreen && kycContent ? (
        <div className="flex flex-col items-center gap-10">
          {/* Illustration */}
          <img 
            src="/illustrations/id-card.svg" 
            alt="ID Card"
            className="w-[200px] h-[200px]"
          />

          {/* Content */}
          <div className="flex flex-col items-center justify-center gap-10 w-full max-w-[855px]">
            {/* Title and Subtitle */}
            <div className="flex flex-col gap-3 w-full">
              <h2 className="text-4xl font-bold text-center text-[#222222]" style={{ fontFamily: 'Neue Haas Grotesk Display Pro, sans-serif', lineHeight: '1.2' }}>
                {kycContent.title}
              </h2>
              <p className="text-xl text-center text-[#222222]" style={{ fontFamily: 'Archivo, sans-serif', lineHeight: '1.5' }}>
                {kycContent.subtitle}
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-3 w-full">
              <Button
                onClick={kycContent.onPrimary}
                className="w-screen px-6 py-6 text-base font-bold rounded-xl bg-[#005AEE] hover:bg-[#0052CC] text-white"
                style={{ fontFamily: 'Archivo, sans-serif' }}
              >
                {kycContent.primaryBtn}
              </Button>

              <button
                className="w-full px-6 py-3 text-base font-bold font-archivo bg-white rounded-xl  text-[#005AEE] border border-[#ACACAC]"
                style={{ fontFamily: 'Archivo, sans-serif' }}
              >
                {kycContent.secondaryBtn}
              </button>

              {/* Note */}
              <div className="flex items-center justify-center gap-2 w-full">
                <CircleAlert className="w-6 h-6 text-[#575757]" strokeWidth={2} />
                <p className="text-base text-[#575757]" style={{ fontFamily: 'Archivo, sans-serif' }}>
                  <span className="font-bold">Note:</span> This feature is available once verification is complete.
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Bank Account Selector */}
          <BankAccountSelector
            selectedAccount={selectedAccount}
            onAccountChange={handleAccountChange}
            onLinkAccount={handleLinkAccount}
          />

          {/* Withdrawal Form - Only show if account is linked */}
          {selectedAccount && (
        <>
          {/* Currency Selector */}
          <CurrencySelector
            selectedCurrency={selectedCurrency}
            onCurrencyChange={(currency) => setSelectedCurrency(currency)}
          />

          {/* Amount Input */}
          <AmountInput
            amount={amount}
            onAmountChange={setAmount}
            availableBalance={availableBalance}
            currency={selectedCurrency.code}
          />

          {/* Transaction Summary */}
          <TransactionSummary
            exchangeRate={exchangeRate}
            amount={amount}
            feePercentage={feePercentage}
            currency={selectedCurrency.code}
          />

          {/* Arrival Time */}
          <ArrivalTime arrivalDate="Today" />

          {/* Withdraw Button */}
          <Button
            onClick={handleWithdraw}
            disabled={!canWithdraw}
            className={`w-full px-6 py-4 text-base font-bold rounded-xl ${
              canWithdraw 
                ? 'bg-[#005AEE] hover:bg-[#0052CC] text-white' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            style={{ fontFamily: 'Archivo, sans-serif' }}
          >
            {isWithdrawing ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Processing withdrawal
              </div>
            ) : (
              'Withdraw now'
            )}
          </Button>
          </>
          )}
        </>
      )}

      {/* Link Bank Account Modal */}
      <LinkBankAccountModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleAccountLinked}
      />
    </div>
  );
};