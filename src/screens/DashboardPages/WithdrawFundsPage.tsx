import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BankAccountSelector } from "@/components/Dashboard/BankAccountSelector";
import { CurrencySelector } from "@/components/Dashboard/CurrencySelector";
import { AmountInput } from "@/components/Dashboard/AmountInput";
import { TransactionSummary } from "@/components/Dashboard/TransactionSummary";
import { ArrivalTime } from "@/components/Dashboard/ArrivalTime";
import { LinkBankAccountModal } from "@/components/Dashboard/LinkBankAccountModal";
import { SuccessNotification } from "@/components/Dashboard/SuccessNotification";

interface BankAccount {
  id: string;
  bankName: string;
  accountNumber: string;
  ifscCode: string;
}

interface Currency {
  code: string;
  name: string;
  flag: string;
}

export const WithdrawFundsPage = (): JSX.Element => {
  // State management
  const [selectedAccount, setSelectedAccount] = useState<BankAccount | null>(null);
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>({
    code: "USD",
    name: "US Dollars", 
    flag: "🇺🇸"
  });
  const [amount, setAmount] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

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
    setShowSuccess(true);
    setSuccessMessage(`Your INR bank account ending ${accountData.accountNumber.slice(-4)} is now linked! Enjoy seamless transfers between your accounts!`);
    
    // Hide success message after 5 seconds
    setTimeout(() => setShowSuccess(false), 5000);
  };

  const handleAccountChange = () => {
    setIsModalOpen(true);
  };

  const handleWithdraw = async () => {
    setIsWithdrawing(true);
    
    // Simulate withdrawal process
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsWithdrawing(false);
    setShowSuccess(true);
    setSuccessMessage(`Withdrawal of ${selectedCurrency.code}${amount.toFixed(2)} initiated successfully! ₹${(amount * exchangeRate).toFixed(2)} will be transferred to your INR bank account.`);
    setAmount(0);
    
    // Hide success message after 5 seconds
    setTimeout(() => setShowSuccess(false), 5000);
  };

  const canWithdraw = selectedAccount && amount > 0 && amount <= availableBalance && !isWithdrawing;

  return (
    <div>
      {/* Success Notification */}
      <SuccessNotification
        title={showSuccess ? (amount > 0 ? "Withdrawal completed!" : "Account linked successfully!") : ""}
        message={successMessage}
        isVisible={showSuccess}
      />

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
            onCurrencyChange={setSelectedCurrency}
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
            className={`w-full py-4 text-lg font-semibold ${
              canWithdraw 
                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
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

      {/* Link Bank Account Modal */}
      <LinkBankAccountModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleAccountLinked}
      />
    </div>
  );
};
