import { useState } from "react";

interface AmountInputProps {
  amount: number;
  onAmountChange: (amount: number) => void;
  availableBalance: number;
  currency: string;
}

export const AmountInput = ({ 
  amount, 
  onAmountChange, 
  availableBalance, 
  currency 
}: AmountInputProps): JSX.Element => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempAmount, setTempAmount] = useState(amount.toString());

  const handleAmountClick = () => {
    setIsEditing(true);
    setTempAmount(amount.toString());
  };

  const handleAmountSubmit = () => {
    const newAmount = parseFloat(tempAmount) || 0;
    onAmountChange(newAmount);
    setIsEditing(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAmountSubmit();
    }
    if (e.key === 'Escape') {
      setIsEditing(false);
      setTempAmount(amount.toString());
    }
  };

  return (
    <div className="mb-6">
      <div className="text-center">
        <div 
          onClick={handleAmountClick}
          className="text-4xl font-bold text-gray-900 cursor-pointer border-b-2 border-transparent hover:border-gray-300 transition-colors mb-2"
        >
          {isEditing ? (
            <input
              type="text"
              value={tempAmount}
              onChange={(e) => setTempAmount(e.target.value)}
              onBlur={handleAmountSubmit}
              onKeyDown={handleKeyPress}
              className="text-4xl font-bold text-gray-900 bg-transparent border-none outline-none text-center w-full"
              autoFocus
            />
          ) : (
            `${currency}${amount.toFixed(2)}`
          )}
        </div>
        
        <div className="text-sm text-gray-600 space-y-1">
          <div>Available: {currency}{availableBalance.toFixed(2)}</div>
          <div>After withdrawal {currency}{(availableBalance - amount).toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
};
