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
      <div className="bg-white rounded-3xl p-6 w-full max-w-lg mx-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Share2 className="w-8 h-8" />
            <h2 className="text-2xl font-semibold text-[#222222]">Link INR Bank Account</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-3 h-3" />
          </button>
        </div>

        {/* Description */}
        <p className="text-black text-base leading-6 mb-6">
          Add your INR bank account to receive withdrawals from your USD account.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Bank Name */}
          <div className="space-y-2">
            <label className="block text-base font-normal text-black">
              Bank Name
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <img src="/mail.svg" alt="" className="w-6 h-6" />
              </div>
              <Input
                type="text"
                placeholder="Select or type bank name"
                value={formData.bankName}
                onChange={(e) => handleInputChange('bankName', e.target.value)}
                className="pl-10 pr-6 py-3 h-12 border border-[#ACACAC] rounded-xl text-base placeholder:text-[#8C8C8C]"
                required
              />
            </div>
          </div>

          {/* Account Number */}
          <div className="space-y-2">
            <label className="block text-base font-normal text-black">
              Account Number
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <img src="/mail.svg" alt="" className="w-6 h-6" />
              </div>
              <Input
                type="text"
                placeholder="Enter account number"
                value={formData.accountNumber}
                onChange={(e) => handleInputChange('accountNumber', e.target.value)}
                className="pl-10 pr-6 py-3 h-12 border border-[#ACACAC] rounded-xl text-base placeholder:text-[#8C8C8C]"
                required
              />
            </div>
          </div>

          {/* IFSC Code */}
          <div className="space-y-2">
            <label className="block text-base font-normal text-black">
              IFSC Code
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <img src="/mail.svg" alt="" className="w-6 h-6" />
              </div>
              <Input
                type="text"
                placeholder="HDFC0001234"
                value={formData.ifscCode}
                onChange={(e) => handleInputChange('ifscCode', e.target.value)}
                className="pl-10 pr-6 py-3 h-12 border border-[#ACACAC] rounded-xl text-base placeholder:text-[#8C8C8C]"
                required
              />
            </div>
          </div>

          {/* Account Holder Name */}
          <div className="space-y-2">
            <label className="block text-base font-normal text-black">
              Account Holder Name
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <img src="/mail.svg" alt="" className="w-6 h-6" />
              </div>
              <Input
                type="text"
                placeholder="Enter account holder name"
                value={formData.accountHolderName}
                onChange={(e) => handleInputChange('accountHolderName', e.target.value)}
                className="pl-10 pr-6 py-3 h-12 border border-[#ACACAC] rounded-xl text-base placeholder:text-[#8C8C8C]"
                required
              />
            </div>
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-[#005AEE]" />
              <span className="text-base text-[#005AEE]">Must match your KYC verified name</span>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-[#005AEE] hover:bg-[#0047CC] text-white py-3 px-6 rounded-xl text-base font-bold h-auto"
            disabled={isLoading}
          >
            {isLoading ? "Verifying..." : "Verify and Link Account"}
          </Button>
        </form>
      </div>
    </div>
  );
};
