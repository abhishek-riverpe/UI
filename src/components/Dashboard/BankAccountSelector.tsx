import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Landmark } from "lucide-react";

interface BankAccount {
  id: string;
  bankName: string;
  accountNumber: string;
  ifscCode: string;
}

interface BankAccountSelectorProps {
  selectedAccount: BankAccount | null;
  onAccountChange: () => void;
  onLinkAccount: () => void;
}

export const BankAccountSelector = ({ 
  selectedAccount, 
  onAccountChange, 
  onLinkAccount 
}: BankAccountSelectorProps): JSX.Element => {
  if (!selectedAccount) {
    return (
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-6">Withdraw funds</h1>
        
        {/* Illustration */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            {/* Blue coins illustration */}
            <img src="/coins.svg" alt="" />
          </div>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-4">Link your INR bank account first</h2>
          <p className="text-gray-600 mb-6">
            Add a verified INR account so we can send your withdrawals securely.
          </p>
          
          <div className="flex justify-center space-x-6 text-blue-600 text-sm mb-8">
            <span>Secure & encrypted</span>
            <span>Takes 2 minutes</span>
            <span>Required for withdrawals</span>
          </div>
          
          <Button 
            onClick={onLinkAccount}
            className="bg-blue-600 rounded-xl hover:bg-blue-700 text-white px-[38%] py-6 text-lg"
          >
            Link your INR account
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <h1 className="text-2xl font-bold mb-6">Withdraw funds</h1>
      
      <Card className="p-4 mb-6 shadow-none border-[#ACACAC]">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-blue-600 rounded-full flex items-center justify-center w-10 h-10 mr-3">
              <Landmark className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="font-semibold">
                {selectedAccount.bankName} • {selectedAccount.accountNumber.slice(-4)}
              </div>
              <div className="text-sm text-gray-600">
                IFSC: {selectedAccount.ifscCode}
              </div>
            </div>
          </div>
          <button 
            onClick={onAccountChange}
            className="bg-blue-600 px-4 py-2 rounded-2xl text-white font-archivo"
          >
            Change
          </button>
        </div>
      </Card>
    </div>
  );
};
