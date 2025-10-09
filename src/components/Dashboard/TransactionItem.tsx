import { Avatar } from "@/components/ui/avatar";
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
          icon: <Clock size={14} />,
          text: "Pending",
          className: "bg-orange-100 text-orange-800 border-orange-200"
        };
      case "received":
        return {
          icon: <CheckCircle2 size={14} />,
          text: "Received", 
          className: "bg-green-100 text-green-800 border-green-200"
        };
      default:
        return {
          icon: <Clock size={14} />,
          text: "Pending",
          className: "bg-orange-100 text-orange-800 border-orange-200"
        };
    }
  };

  const statusConfig = getStatusConfig();

  return (
    <div 
      onClick={onClick}
      className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:border-gray-300 cursor-pointer transition-colors"
    >
      {/* Left Side - Avatar and Info */}
      <div className="flex items-center gap-4">
        <Avatar className="bg-blue-50 text-blue-600">
          <span className="text-sm font-semibold">
            {name.split(' ').map(n => n[0]).join('').toUpperCase()}
          </span>
        </Avatar>
        
        <div>
          <div className="font-semibold text-gray-900">{name}</div>
          <div className="text-sm text-gray-600">{type}</div>
        </div>
      </div>

      {/* Right Side - Status and Amount */}
      <div className="flex items-center gap-4">
        <div className={`px-3 py-1 rounded-full border flex items-center gap-1 text-sm font-medium ${statusConfig.className}`}>
          {statusConfig.icon}
          <span>{statusConfig.text}</span>
        </div>
        
        <div className="text-right">
          <div className="font-bold text-gray-900">{amount}</div>
        </div>
      </div>
    </div>
  );
};
