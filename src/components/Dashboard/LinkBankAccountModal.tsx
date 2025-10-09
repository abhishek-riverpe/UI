import { useState } from "react";
import { X, Share2, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface BankAccount {
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  accountHolderName: string;
}

interface LinkBankAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (account: BankAccount) => void;
}

export const LinkBankAccountModal = ({ 
  isOpen, 
  onClose, 
  onSuccess 
}: LinkBankAccountModalProps): JSX.Element => {
  const [formData, setFormData] = useState<BankAccount>({
    bankName: "",
    accountNumber: "",
    ifscCode: "HDFC0001234",
    accountHolderName: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsLoading(false);
    onSuccess(formData);
    onClose();
  };

  const handleInputChange = (field: keyof BankAccount, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Share2 className="w-5 h-5 text-blue-600 mr-2" />
            <h2 className="text-xl font-bold">Link INR Bank Account</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Description */}
        <p className="text-gray-600 mb-6">
          Add your INR bank account to receive withdrawals from your USD account.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Bank Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bank Name
            </label>
            <Input
              type="text"
              placeholder="Select or type bank name"
              value={formData.bankName}
              onChange={(e) => handleInputChange('bankName', e.target.value)}
              required
            />
          </div>

          {/* Account Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Account Number
            </label>
            <Input
              type="text"
              placeholder="Enter account number"
              value={formData.accountNumber}
              onChange={(e) => handleInputChange('accountNumber', e.target.value)}
              required
            />
          </div>

          {/* IFSC Code */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              IFSC Code
            </label>
            <Input
              type="text"
              value={formData.ifscCode}
              onChange={(e) => handleInputChange('ifscCode', e.target.value)}
              required
            />
          </div>

          {/* Account Holder Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Account Holder Name
            </label>
            <Input
              type="text"
              placeholder="Enter account holder name"
              value={formData.accountHolderName}
              onChange={(e) => handleInputChange('accountHolderName', e.target.value)}
              required
            />
            <div className="flex items-center mt-2 text-blue-600 text-sm">
              <Info className="w-4 h-4 mr-1" />
              <span>Must match your KYC verified name</span>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            disabled={isLoading}
          >
            {isLoading ? "Verifying..." : "Verify and Link Account"}
          </Button>
        </form>
      </div>
    </div>
  );
};
