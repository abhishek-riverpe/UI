import { X, Clock, CheckCircle2 } from "lucide-react";

interface TransactionDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: {
    id: number;
    name: string;
    type: string;
    status: "pending" | "received";
    amount: string;
    date: string;
  } | null;
}

export const TransactionDetailsModal = ({ 
  isOpen, 
  onClose, 
  transaction 
}: TransactionDetailsModalProps): JSX.Element => {
  if (!isOpen || !transaction) return null;

  const getStatusConfig = () => {
    switch (transaction.status) {
      case "pending":
        return {
          icon: <Clock size={16} />,
          text: "Payment Pending",
          className: "bg-orange-100 text-orange-800 border-orange-200"
        };
      case "received":
        return {
          icon: <CheckCircle2 size={16} />,
          text: "Payment Received",
          className: "bg-green-100 text-green-800 border-green-200"
        };
      default:
        return {
          icon: <Clock size={16} />,
          text: "Payment Pending",
          className: "bg-orange-100 text-orange-800 border-orange-200"
        };
    }
  };

  const statusConfig = getStatusConfig();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Transaction Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Amount */}
        <div className="text-center mb-6">
          <div className={`text-3xl font-bold ${transaction.status === 'received' ? 'text-green-600' : 'text-orange-600'}`}>
            {transaction.status === 'received' ? '+' : ''}{transaction.amount}
          </div>
          
          {/* Status Badge */}
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border mt-3 ${statusConfig.className}`}>
            {statusConfig.icon}
            <span className="font-medium">{statusConfig.text}</span>
          </div>
        </div>

        {/* Details */}
        <div className="space-y-4">
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-gray-600">Date:</span>
            <span className="font-medium">{transaction.date}</span>
          </div>
          
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-gray-600">Payment Status:</span>
            <span className="font-medium">{statusConfig.text}</span>
          </div>
          
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-gray-600">Client:</span>
            <span className="font-medium">{transaction.name}</span>
          </div>
          
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-gray-600">Added to your USD Account:</span>
            <span className="font-medium">{transaction.amount}</span>
          </div>
          
          <div className="flex justify-between items-center py-2">
            <span className="text-gray-600">Transaction ID:</span>
            <span className="font-medium">{transaction.id}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
