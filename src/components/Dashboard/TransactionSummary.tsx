import { HelpCircle } from "lucide-react";

interface TransactionSummaryProps {
  exchangeRate: number;
  amount: number;
  feePercentage: number;
  currency: string;
}

export const TransactionSummary = ({ 
  exchangeRate, 
  amount, 
  feePercentage, 
  currency 
}: TransactionSummaryProps): JSX.Element => {
  const feeAmount = (amount * feePercentage) / 100;
  const totalAfterFees = amount - feeAmount;
  const receivedAmount = totalAfterFees * exchangeRate;

  return (
    <div className="bg-gray-50 rounded-lg p-4 mb-6">
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-gray-700">Rate</span>
          <span className="font-semibold">1 {currency} = ₹{exchangeRate.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-gray-700">Total fees</span>
            <HelpCircle className="w-4 h-4 text-gray-400 ml-1" />
          </div>
          <span className="font-semibold">{feePercentage}% ({currency}{feeAmount.toFixed(2)})</span>
        </div>
        
        <div className="flex justify-between items-center pt-2 border-t border-gray-200">
          <span className="text-gray-700 font-medium">You'll receive</span>
          <span className="text-xl font-bold text-blue-600">₹{receivedAmount.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};
