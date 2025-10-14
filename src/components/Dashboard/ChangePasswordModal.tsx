import { useState } from "react";
import { X } from "lucide-react";

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (passwords: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) => void;
}

export const ChangePasswordModal = ({ isOpen, onClose, onSubmit }: ChangePasswordModalProps) => {
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setPasswords(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(passwords);
    // Reset form
    setPasswords({
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    });
  };

  const handleClose = () => {
    // Reset form when closing
    setPasswords({
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    });
    onClose();
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
                Change Password
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
          Enter your current password and choose a new one.
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            width: "100%"
          }}
        >
          {/* Current Password */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px"
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
              Current password
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
              <input
                type="password"
                value={passwords.currentPassword}
                onChange={(e) => handleInputChange("currentPassword", e.target.value)}
                placeholder="Enter current password"
                style={{
                  flex: 1,
                  fontFamily: "'Archivo', sans-serif",
                  fontWeight: 400,
                  fontSize: "16px",
                  lineHeight: "1.09",
                  color: "#000000",
                  backgroundColor: "transparent",
                  border: "none",
                  outline: "none"
                }}
              />
            </div>
          </div>

          {/* New Password */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px"
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
              New password
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
              <input
                type="password"
                value={passwords.newPassword}
                onChange={(e) => handleInputChange("newPassword", e.target.value)}
                placeholder="Enter new password"
                style={{
                  flex: 1,
                  fontFamily: "'Archivo', sans-serif",
                  fontWeight: 400,
                  fontSize: "16px",
                  lineHeight: "1.09",
                  color: "#000000",
                  backgroundColor: "transparent",
                  border: "none",
                  outline: "none"
                }}
              />
            </div>
          </div>

          {/* Confirm New Password */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px"
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
              Confirm new password
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
              <input
                type="password"
                value={passwords.confirmPassword}
                onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                placeholder="Enter new password again"
                style={{
                  flex: 1,
                  fontFamily: "'Archivo', sans-serif",
                  fontWeight: 400,
                  fontSize: "16px",
                  lineHeight: "1.09",
                  color: "#000000",
                  backgroundColor: "transparent",
                  border: "none",
                  outline: "none"
                }}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
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
              Change password
            </span>
          </button>
        </form>
      </div>
    </div>
  );
};
