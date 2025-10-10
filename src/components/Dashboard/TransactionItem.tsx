import { Clock, CheckCircle2 } from "lucide-react";

interface TransactionItemProps {
  id: number;
  name: string;
  type: string;
  status: "pending" | "received";
  amount: string;
  onClick?: () => void;
}

export const TransactionItem = ({ 
  id, 
  name, 
  type, 
  status, 
  amount, 
  onClick 
}: TransactionItemProps): JSX.Element => {
  const getStatusConfig = () => {
    switch (status) {
      case "pending":
        return {
          icon: <Clock size={14} className="text-[#92400E]"/>,
          text: "Pending",
          className: "bg-orange-100 text-[#92400E] border-2 border-[#D97706] font-bold"
        };
      case "received":
        return {
          icon: <CheckCircle2 size={14} className="text-[#137C59]"/>,
          text: "Received", 
          className: "bg-green-100 text-[#137C59] border-2 border-[#1FCB92] font-bold"
        };
      default:
        return {
          icon: <Clock size={14} className="text-[#92400E]"/>,
          text: "Pending",
          className: "bg-orange-100 text-[#92400E] border-2 border-[#D97706] font-bold"
        };
    }
  };

  const statusConfig = getStatusConfig();

  return (
    <div 
      onClick={onClick}
      className="flex items-center justify-between p-4 bg-white rounded-2xl border border-[#ACACAC] hover:border-gray-300 cursor-pointer transition-colors"
    >
      {/* Left Side - Avatar and Info */}
      <div className="flex items-center gap-4">
       
        <img src="/avatar.svg" alt="avatar" className="w-10 h-10" />
        
        <div>
          <div className="font-semibold text-[#222222]">{name}</div>
          <div className="text-sm text-[#666666]">{type}</div>
        </div>
      </div>

      {/* Right Side - Status and Amount */}
      <div className="flex items-center gap-4 flex-col">
        <div className={`px-3 py-1 rounded-full border flex items-center gap-1 text-sm font-medium ${statusConfig.className}`}>
          {statusConfig.icon}
          <span>{statusConfig.text}</span>
        </div>
        
        <div className="text-right">
          <div className="font-bold text-[#1FCE92]">{amount}</div>
        </div>
      </div>
    </div>
  );
};
