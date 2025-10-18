import { X, Clock, CheckCircle2, Receipt } from "lucide-react";

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
}: TransactionDetailsModalProps): JSX.Element | null => {
  if (!isOpen || !transaction) return null;

  const getStatusConfig = () => {
    switch (transaction.status) {
      case "pending":
        return {
          icon: <Clock size={16} strokeWidth={2} />,
          text: "Payment Pending",
          bgColor: "#FFFBEB",
          borderColor: "#D97706",
          textColor: "#92400E",
          amountColor: "#B45309"
        };
      case "received":
        return {
          icon: <CheckCircle2 size={16} strokeWidth={2} />,
          text: "Payment Received",
          bgColor: "#E2F5EE",
          borderColor: "#1FCB92",
          textColor: "#137C59",
          amountColor: "#1FCB92"
        };
      default:
        return {
          icon: <Clock size={16} strokeWidth={2} />,
          text: "Payment Pending",
          bgColor: "#FFFBEB",
          borderColor: "#D97706",
          textColor: "#92400E",
          amountColor: "#B45309"
        };
    }
  };

  const statusConfig = getStatusConfig();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
      <div 
        className="bg-white flex flex-col items-center gap-6 p-6 mx-4"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "566px",
          maxWidth: "calc(100vw - 2rem)",
          borderRadius: "24px"
        }}
      >
        {/* Header */}
        <div className="flex items-center w-full" style={{ width: "518px", maxWidth: "100%" }}>
          <div className="flex items-center gap-3 flex-1">
            <Receipt size={32} strokeWidth={3} color="#222222" />
            <h2 
              style={{
                fontFamily: "'Neue Haas Grotesk Display Pro', -apple-system, BlinkMacSystemFont, sans-serif",
                fontWeight: 600,
                fontSize: "24px",
                lineHeight: "1.2",
                color: "#222222"
              }}
            >
              Transaction Details
            </h2>
          </div>
          <button
            onClick={onClose}
            className="flex items-center justify-center p-1.5 hover:bg-gray-100 rounded transition-colors"
          >
            <X size={12} strokeWidth={2} color="#000000" />
          </button>
        </div>

        {/* Amount Section */}
        <div 
          className="w-full flex flex-col items-center self-stretch"
          style={{
            backgroundColor: "#EFEFEF",
            borderRadius: "16px",
            padding: "24px",
            gap: "10px"
          }}
        >
          <div className="flex flex-col items-center self-stretch" style={{ gap: "12px" }}>
            <div 
              className="text-center w-full"
              style={{
                fontFamily: "'Neue Haas Grotesk Display Pro', -apple-system, BlinkMacSystemFont, sans-serif",
                fontWeight: 600,
                fontSize: "32px",
                lineHeight: "1.2",
                color: statusConfig.amountColor
              }}
            >
              +{transaction.amount}
            </div>
            
            {/* Status Badge */}
            <div 
              className="inline-flex items-center justify-center"
              style={{
                gap: "8px",
                padding: "4px 12px",
                backgroundColor: statusConfig.bgColor,
                border: `2px solid ${statusConfig.borderColor}`,
                borderRadius: "9999px"
              }}
            >
              <div style={{ color: statusConfig.textColor }}>
                {statusConfig.icon}
              </div>
              <span 
                style={{
                  fontFamily: "'Neue Haas Grotesk Display Pro', -apple-system, BlinkMacSystemFont, sans-serif",
                  fontWeight: 600,
                  fontSize: "16px",
                  lineHeight: "1.5",
                  color: statusConfig.textColor
                }}
              >
                {statusConfig.text}
              </span>
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="w-full flex flex-col self-stretch" style={{ gap: "24px" }}>
          <div className="flex flex-col self-stretch" style={{ gap: "12px" }}>
            {/* Date */}
            <div className="flex justify-between self-stretch" style={{ gap: "12px" }}>
              <span 
                style={{
                  fontFamily: "'Archivo', sans-serif",
                  fontWeight: 600,
                  fontSize: "16px",
                  lineHeight: "1.088",
                  color: "#000000"
                }}
              >
                Date:
              </span>
              <span 
                style={{
                  fontFamily: "'Archivo', sans-serif",
                  fontWeight: 400,
                  fontSize: "16px",
                  lineHeight: "1.088",
                  color: "#000000"
                }}
              >
                {transaction.date}
              </span>
            </div>

            {/* Payment Status */}
            <div className="flex justify-between self-stretch" style={{ gap: "12px" }}>
              <span 
                style={{
                  fontFamily: "'Archivo', sans-serif",
                  fontWeight: 600,
                  fontSize: "16px",
                  lineHeight: "1.088",
                  color: "#000000"
                }}
              >
                Payment Status:
              </span>
              <span 
                style={{
                  fontFamily: "'Archivo', sans-serif",
                  fontWeight: 400,
                  fontSize: "16px",
                  lineHeight: "1.088",
                  color: "#000000"
                }}
              >
                {statusConfig.text}
              </span>
            </div>

            {/* Client */}
            <div className="flex justify-between self-stretch" style={{ gap: "12px" }}>
              <span 
                style={{
                  fontFamily: "'Archivo', sans-serif",
                  fontWeight: 600,
                  fontSize: "16px",
                  lineHeight: "1.088",
                  color: "#000000"
                }}
              >
                Client:
              </span>
              <span 
                style={{
                  fontFamily: "'Archivo', sans-serif",
                  fontWeight: 400,
                  fontSize: "16px",
                  lineHeight: "1.088",
                  color: "#000000"
                }}
              >
                {transaction.name}
              </span>
            </div>

            {/* Added to USD Account - Only show for received status */}
            {transaction.status === "received" && (
              <div className="flex justify-between self-stretch" style={{ gap: "12px" }}>
                <span 
                  style={{
                    fontFamily: "'Archivo', sans-serif",
                    fontWeight: 600,
                    fontSize: "16px",
                    lineHeight: "1.088",
                    color: "#000000"
                  }}
                >
                  Added to your USD Account:
                </span>
                <span 
                  style={{
                    fontFamily: "'Archivo', sans-serif",
                    fontWeight: 700,
                    fontSize: "16px",
                    lineHeight: "1.088",
                    color: "#1AAA7A"
                  }}
                >
                  {transaction.amount}
                </span>
              </div>
            )}

            {/* Transaction ID */}
            <div className="flex justify-between self-stretch" style={{ gap: "12px" }}>
              <span 
                style={{
                  fontFamily: "'Archivo', sans-serif",
                  fontWeight: 600,
                  fontSize: "16px",
                  lineHeight: "1.088",
                  color: "#000000"
                }}
              >
                Transaction ID:
              </span>
              <span 
                style={{
                  fontFamily: "'Archivo', sans-serif",
                  fontWeight: 400,
                  fontSize: "16px",
                  lineHeight: "1.088",
                  color: "#000000"
                }}
              >
                {transaction.id}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
