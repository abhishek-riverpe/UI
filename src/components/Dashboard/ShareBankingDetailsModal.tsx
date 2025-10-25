import { useState } from "react";
import { X, Share2, Copy, Mail, AlertCircle } from "lucide-react";

interface ShareBankingDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShare: (email: string) => void;
}

export const ShareBankingDetailsModal = ({ isOpen, onClose, onShare }: ShareBankingDetailsModalProps) => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleClose = () => {
    setEmail("");
    setEmailError("");
    onClose();
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    setEmailError("");
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleShare = () => {
    if (!email.trim()) {
      setEmailError("Please enter a valid email address");
      return;
    }
    
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    onShare(email);
    handleClose();
  };

  const handleCopyDetails = () => {
    const bankDetails = `Account Type: Checking\nAccount Number: ****7890\nRouting Number: 021000021`;
    navigator.clipboard.writeText(bankDetails);
    // You could add a toast notification here
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000
      }}
      onClick={handleClose}
    >
      <div
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius: "24px",
          padding: "24px",
          width: "90%",
          maxWidth: "518px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "24px",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "10px",
            width: "100%",
            maxWidth: "518px"
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "12px",
              flex: 1
            }}
          >
            <Share2 size={32} color="#222222" />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "16px"
              }}
            >
              <h2
                style={{
                  fontFamily: "'Neue Haas Grotesk Display Pro', sans-serif",
                  fontWeight: 600,
                  fontSize: "24px",
                  lineHeight: "1.2",
                  color: "#222222"
                }}
              >
                Share Banking Details
              </h2>
            </div>
          </div>
          <button
            onClick={handleClose}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "10px",
              padding: "6px",
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
              borderRadius: "6px"
            }}
          >
            <X size={24} color="#000000" />
          </button>
        </div>

        {/* Banking Details Card */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            padding: "24px",
            backgroundColor: "#EFEFEF",
            borderRadius: "16px",
            width: "100%"
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "24px"
            }}
          >
            {/* Header with Copy Button */}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "24px"
              }}
            >
              <h3
                style={{
                  fontFamily: "'Archivo', sans-serif",
                  fontWeight: 600,
                  fontSize: "20px",
                  lineHeight: "1.09",
                  color: "#000000"
                }}
              >
                Information to be shared:
              </h3>
              <button
                onClick={handleCopyDetails}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "transparent",
                  border: "none",
                  cursor: "pointer",
                  padding: "4px"
                }}
              >
                <Copy size={24} color="#222222" />
              </button>
            </div>

            {/* Banking Details */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px"
              }}
            >
              <p
                style={{
                  fontFamily: "'Archivo', sans-serif",
                  fontWeight: 600,
                  fontSize: "16px",
                  lineHeight: "1.09",
                  color: "#000000",
                  margin: 0
                }}
              >
                Account Type: Checking
              </p>
              <p
                style={{
                  fontFamily: "'Archivo', sans-serif",
                  fontWeight: 600,
                  fontSize: "16px",
                  lineHeight: "1.09",
                  color: "#000000",
                  margin: 0
                }}
              >
                Account Number: ****7890
              </p>
              <p
                style={{
                  fontFamily: "'Archivo', sans-serif",
                  fontWeight: 600,
                  fontSize: "16px",
                  lineHeight: "1.09",
                  color: "#000000",
                  margin: 0
                }}
              >
                Routing Number: 021000021
              </p>
            </div>
          </div>
        </div>

        {/* Email Input */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            width: "100%"
          }}
        >
          <label
            style={{
              fontFamily: "'Archivo', sans-serif",
              fontWeight: 400,
              fontSize: "16px",
              lineHeight: "1.09",
              color: "#000000"
            }}
          >
            Client's Email Address
          </label>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "10px",
              padding: "12px 24px 12px 12px",
              backgroundColor: "#FFFFFF",
              border: "1px solid #ACACAC",
              borderRadius: "12px"
            }}
          >
            <Mail size={24} color="#222222" />
            <input
              type="email"
              value={email}
              onChange={(e) => handleEmailChange(e.target.value)}
              placeholder="Enter email address"
              style={{
                flex: 1,
                fontFamily: "'Archivo', sans-serif",
                fontWeight: 400,
                fontSize: "16px",
                lineHeight: "1.09",
                color: email ? "#000000" : "#8C8C8C",
                backgroundColor: "transparent",
                border: "none",
                outline: "none"
              }}
            />
          </div>
          
          {/* Error Message */}
          {emailError && (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "8px"
              }}
            >
              <AlertCircle size={16} color="#E7000B" />
              <span
                style={{
                  fontFamily: "'Archivo', sans-serif",
                  fontWeight: 400,
                  fontSize: "16px",
                  lineHeight: "1.09",
                  color: "#E7000B"
                }}
              >
                {emailError}
              </span>
            </div>
          )}
        </div>

        {/* Share Button */}
        <button
          onClick={handleShare}
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            padding: "16px 24px",
            backgroundColor: "#005AEE",
            borderRadius: "12px",
            border: "none",
            cursor: "pointer",
            width: "100%"
          }}
        >
          <span
            style={{
              fontFamily: "'Archivo', sans-serif",
              fontWeight: 700,
              fontSize: "16px",
              lineHeight: "1.09",
              color: "#FFFFFF"
            }}
          >
            Share Details
          </span>
        </button>
      </div>
    </div>
  );
};
