import { useState } from "react";
import { CircleX } from "lucide-react";

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

  const hasInsufficientFunds = amount > availableBalance;

  return (
    <div className="mb-6">
      <div className="text-center flex flex-col items-center gap-10">
        <div className="w-full flex flex-col items-center gap-3">
          <div className="flex flex-col items-center">
            <div 
              onClick={handleAmountClick}
              className="text-[70px] leading-[1.2] font-bold text-black cursor-pointer"
              style={{ fontFamily: 'Neue Haas Grotesk Display Pro, sans-serif' }}
            >
              {isEditing ? (
                <input
                  type="text"
                  value={tempAmount}
                  onChange={(e) => setTempAmount(e.target.value)}
                  onBlur={handleAmountSubmit}
                  onKeyDown={handleKeyPress}
                  className="text-[70px] leading-[1.2] font-bold text-black bg-transparent border-none outline-none text-center"
                  style={{ fontFamily: 'Neue Haas Grotesk Display Pro, sans-serif' }}
                  autoFocus
                />
              ) : (
                `$${amount.toFixed(2)}`
              )}
            </div>
            {/* Small black underline */}
            <div className="w-72 h-1 bg-black mt-1"></div>
          </div>
          
          <div className="flex flex-col items-center gap-2 text-base font-medium text-[#222222]" style={{ fontFamily: 'Neue Haas Grotesk Display Pro, sans-serif' }}>
            <div>Available: ${availableBalance.toFixed(2)}</div>
            <div className="text-[#8C8C8C]">After withdrawal ${(availableBalance - amount).toFixed(2)}</div>
          </div>
        </div>

        {/* Insufficient Funds Warning */}
        {hasInsufficientFunds && amount > 0 && (
          <div className="flex items-center justify-center gap-2 w-full">
            <CircleX className="w-4 h-4 text-[#E7000B]" strokeWidth={2} />
            <p className="text-base text-[#E7000B]" style={{ fontFamily: 'Archivo, sans-serif' }}>
              Oops! You don't have enough funds to complete this withdrawal.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
