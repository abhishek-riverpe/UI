import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2 } from "lucide-react";

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
            <div className="w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center">
              <div className="w-20 h-20 bg-blue-200 rounded-full flex items-center justify-center">
                <div className="w-12 h-12 bg-blue-300 rounded-full"></div>
              </div>
            </div>
            {/* Small coins around */}
            <div className="absolute -top-2 -left-2 w-6 h-6 bg-blue-200 rounded-full"></div>
            <div className="absolute -top-1 -right-3 w-4 h-4 bg-blue-300 rounded-full"></div>
            <div className="absolute -bottom-1 -left-3 w-5 h-5 bg-blue-200 rounded-full"></div>
            <div className="absolute -bottom-2 -right-1 w-7 h-7 bg-blue-300 rounded-full"></div>
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
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
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
      
      <Card className="p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Building2 className="w-6 h-6 text-blue-600 mr-3" />
            <div>
              <div className="font-semibold">
                {selectedAccount.bankName} • {selectedAccount.accountNumber.slice(-4)}
              </div>
              <div className="text-sm text-gray-600">
                IFSC: {selectedAccount.ifscCode}
              </div>
            </div>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={onAccountChange}
          >
            Change
          </Button>
        </div>
      </Card>
    </div>
  );
};
