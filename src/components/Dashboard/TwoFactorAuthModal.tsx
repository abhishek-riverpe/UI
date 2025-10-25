import { X, Shield } from "lucide-react";

interface TwoFactorAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEnable2FA: () => void;
}

export const TwoFactorAuthModal = ({ isOpen, onClose, onEnable2FA }: TwoFactorAuthModalProps) => {
  const handleClose = () => {
    onClose();
  };

  const handleEnable2FA = () => {
    onEnable2FA();
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
                Set up Two-Factor Authentication
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

        {/* Description */}
        <p
          style={{
            fontFamily: "'Archivo', sans-serif",
            fontWeight: 400,
            fontSize: "16px",
            lineHeight: "1.5",
            color: "#000000",
            width: "100%",
            textAlign: "left"
          }}
        >
          Secure your account with an additional layer of protection.
        </p>

        {/* 2FA Option Card */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            width: "100%"
          }}
        >
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
            <Shield size={32} color="#137C59" />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: "4px"
              }}
            >
              <h3
                style={{
                  fontFamily: "'Archivo', sans-serif",
                  fontWeight: 400,
                  fontSize: "16px",
                  lineHeight: "1.09",
                  color: "#222222"
                }}
              >
                Authenticator App
              </h3>
              <p
                style={{
                  fontFamily: "'Archivo', sans-serif",
                  fontWeight: 400,
                  fontSize: "12px",
                  lineHeight: "1.09",
                  color: "#8C8C8C"
                }}
              >
                Use an authenticator app like Google Authenticator or Authy
              </p>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <p
          style={{
            fontFamily: "'Archivo', sans-serif",
            fontWeight: 400,
            fontSize: "12px",
            lineHeight: "2",
            color: "#575757",
            width: "100%",
            textAlign: "left"
          }}
        >
          This will add an extra layer of security to your account.
        </p>

        {/* Enable Button */}
        <button
          onClick={handleEnable2FA}
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
            Enable 2FA
          </span>
        </button>
      </div>
    </div>
  );
};
