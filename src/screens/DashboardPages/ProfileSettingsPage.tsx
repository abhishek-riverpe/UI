import { useState } from "react";
import { CheckCircle, Copy, AlertTriangle, CreditCard } from "lucide-react";
import { ChangePasswordModal } from "../../components/Dashboard/ChangePasswordModal";
import { TwoFactorAuthModal } from "../../components/Dashboard/TwoFactorAuthModal";
import { LinkBankAccountModal } from "../../components/Dashboard/LinkBankAccountModal";
import { ToggleButton } from "../../components/Dashboard/ToggleButton";

export const ProfileSettingsPage = () => {
  const formData = {
    fullName: "Jane Doe",
    email: "jane.doe@gmail.com",
    phoneNumber: "+1 (555) 123-4567",
    displayName: "Jane",
    nationality: "Indian",
    localCurrency: "Indian Rupee"
  };

  const [notifications, setNotifications] = useState({
    payoutCompleted: true,
    verificationUpdates: false,
    securityAlerts: false
  });

  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);
  const [isTwoFactorAuthModalOpen, setIsTwoFactorAuthModalOpen] = useState(false);
  const [isLinkBankAccountModalOpen, setIsLinkBankAccountModalOpen] = useState(false);



  const handleNotificationToggle = (key: string) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }));
  };

  const handleCopyReferralLink = () => {
    const referralLink = "https://riverpe.com/janedoe/referrallinkxyz";
    navigator.clipboard.writeText(referralLink);
    // You could add a toast notification here
  };

  const handleChangePassword = (passwords: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) => {
    // Implement password change logic here
    console.log("Changing password:", passwords);
    setIsChangePasswordModalOpen(false);
    // You could add success/error handling here
  };

  const handleEnable2FA = () => {
    // Implement 2FA setup logic here
    console.log("Enabling 2FA");
    setIsTwoFactorAuthModalOpen(false);
    // You could add success/error handling here
  };

  const handleBankAccountLink = (account: {
    bankName: string;
    accountNumber: string;
    ifscCode: string;
    accountHolderName: string;
  }) => {
    // Implement bank account linking logic here
    console.log("Linking bank account:", account);
    setIsLinkBankAccountModalOpen(false);
    // You could add success/error handling here
  };

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#FFFFFF",
        padding: "40px 24px"
      }}
    >
      {/* Main Content */}
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "24px"
        }}
      >
        {/* Profile Information Card */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "stretch",
            gap: "32px",
            padding: "36px",
            backgroundColor: "#FFFFFF",
            borderRadius: "16px",
            border: "1px solid #ACACAC"
          }}
        >
          {/* Profile Picture */}
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "50%",
              backgroundColor: "#E5E7EB",
              backgroundImage: "url('/Profile.svg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              flexShrink: 0
            }}
          />

          {/* Profile Details */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "24px",
              flex: 1
            }}
          >
            {/* Name and Badge */}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "16px"
              }}
            >
              <h1
                style={{
                  fontFamily: "'Neue Haas Grotesk Display Pro', sans-serif",
                  fontWeight: 600,
                  fontSize: "28px",
                  lineHeight: "1.2",
                  color: "#000000"
                }}
              >
                {formData.fullName}
              </h1>
              
              {/* Verified Badge */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "8px",
                  padding: "4px 12px",
                  backgroundColor: "#E2F5EE",
                  border: "2px solid #1FCB92",
                  borderRadius: "20px"
                }}
              >
                <CheckCircle size={16} color="#137C59" />
                <span
                  style={{
                    fontFamily: "'Neue Haas Grotesk Display Pro', sans-serif",
                    fontWeight: 600,
                    fontSize: "16px",
                    lineHeight: "1.5",
                    color: "#137C59"
                  }}
                >
                  Verified
                </span>
              </div>
            </div>

            {/* Email Field */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px"
              }}
            >
              <label
                style={{
                  fontFamily: "'Archivo', sans-serif",
                  fontWeight: 400,
                  fontSize: "16px",
                  lineHeight: "1.09",
                  color: "#222222"
                }}
              >
                Email
              </label>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "12px",
                  padding: "12px 24px",
                  backgroundColor: "#EFEFEF",
                  borderRadius: "8px"
                }}
              >
                <span
                  style={{
                    flex: 1,
                    fontFamily: "'Archivo', sans-serif",
                    fontWeight: 400,
                    fontSize: "16px",
                    lineHeight: "1.09",
                    color: "#222222"
                  }}
                >
                  {formData.email}
                </span>
              </div>
            </div>

            {/* Phone Field */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px"
              }}
            >
              <label
                style={{
                  fontFamily: "'Archivo', sans-serif",
                  fontWeight: 400,
                  fontSize: "16px",
                  lineHeight: "1.09",
                  color: "#222222"
                }}
              >
                Phone
              </label>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "12px",
                  padding: "12px 24px",
                  backgroundColor: "#EFEFEF",
                  borderRadius: "8px"
                }}
              >
                <span
                  style={{
                    flex: 1,
                    fontFamily: "'Archivo', sans-serif",
                    fontWeight: 400,
                    fontSize: "16px",
                    lineHeight: "1.09",
                    color: "#222222"
                  }}
                >
                  {formData.phoneNumber}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Button */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "24px"
          }}
        >
        </div>

        {/* Personal Details Section */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px"
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
            Personal details
          </h2>
          
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "32px",
              padding: "36px",
              backgroundColor: "#FFFFFF",
              borderRadius: "16px",
              border: "1px solid #ACACAC"
            }}
          >
            {/* Display Name */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px"
              }}
            >
              <label
                style={{
                  fontFamily: "'Archivo', sans-serif",
                  fontWeight: 400,
                  fontSize: "16px",
                  lineHeight: "1.09",
                  color: "#222222"
                }}
              >
                Display name
              </label>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "12px",
                  padding: "12px 24px",
                  backgroundColor: "#EFEFEF",
                  borderRadius: "8px"
                }}
              >
                <span
                  style={{
                    flex: 1,
                    fontFamily: "'Archivo', sans-serif",
                    fontWeight: 400,
                    fontSize: "16px",
                    lineHeight: "1.09",
                    color: "#222222"
                  }}
                >
                  {formData.displayName}
                </span>
              </div>
            </div>

            {/* Nationality */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px"
              }}
            >
              <label
                style={{
                  fontFamily: "'Archivo', sans-serif",
                  fontWeight: 400,
                  fontSize: "16px",
                  lineHeight: "1.09",
                  color: "#222222"
                }}
              >
                Nationality
              </label>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "12px",
                  padding: "12px 24px",
                  backgroundColor: "#EFEFEF",
                  borderRadius: "8px"
                }}
              >
                <span
                  style={{
                    flex: 1,
                    fontFamily: "'Archivo', sans-serif",
                    fontWeight: 400,
                    fontSize: "16px",
                    lineHeight: "1.09",
                    color: "#222222"
                  }}
                >
                  {formData.nationality}
                </span>
              </div>
            </div>

            {/* Local Currency */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px"
              }}
            >
              <label
                style={{
                  fontFamily: "'Archivo', sans-serif",
                  fontWeight: 400,
                  fontSize: "16px",
                  lineHeight: "1.09",
                  color: "#222222"
                }}
              >
                Local currency
              </label>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "12px",
                  padding: "12px 24px",
                  backgroundColor: "#EFEFEF",
                  borderRadius: "8px"
                }}
              >
                <span
                  style={{
                    flex: 1,
                    fontFamily: "'Archivo', sans-serif",
                    fontWeight: 400,
                    fontSize: "16px",
                    lineHeight: "1.09",
                    color: "#222222"
                  }}
                >
                  {formData.localCurrency}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Payout Methods Section */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px"
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
            Payout methods
          </h2>
          
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "32px",
              padding: "36px",
              backgroundColor: "#FFFFFF",
              borderRadius: "16px",
              border: "1px solid #ACACAC"
            }}
          >
            {/* US Virtual Account */}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "10px",
                padding: "16px",
                // backgroundColor: "#F8F9FA",
                borderRadius: "12px"
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
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    backgroundColor: "#E5E7EB",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <img src="/usa-flag.svg" alt="usa-flag" />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center"
                  }}
                >
                  <h3
                    style={{
                      fontFamily: "'Neue Haas Grotesk Display Pro', sans-serif",
                      fontWeight: 500,
                      fontSize: "20px",
                      lineHeight: "1.2",
                      color: "#222222"
                    }}
                  >
                    US virtual account
                  </h3>
                </div>
              </div>
              <button
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "10px",
                  padding: "10px 12px",
                  backgroundColor: "#005AEE",
                  borderRadius: "8px",
                  border: "none",
                  cursor: "pointer"
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
                  View bank account
                </span>
              </button>
            </div>

            {/* Linked Bank Account */}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "10px",
                padding: "16px",
                // backgroundColor: "#F8F9FA",
                borderRadius: "12px"
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
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    backgroundColor: "#005AEE",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <CreditCard size={24} color="white" />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center"
                  }}
                >
                  <h3
                    style={{
                      fontFamily: "'Neue Haas Grotesk Display Pro', sans-serif",
                      fontWeight: 500,
                      fontSize: "20px",
                      lineHeight: "1.2",
                      color: "#222222"
                    }}
                  >
                    alex@example.com
                  </h3>
                  <p
                    style={{
                      fontFamily: "'Archivo', sans-serif",
                      fontWeight: 400,
                      fontSize: "12px",
                      lineHeight: "2",
                      color: "#575757"
                    }}
                  >
                    HDFC BANK • •••7890 • HDFC0001234
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsLinkBankAccountModalOpen(true)}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "10px",
                  padding: "10px 12px",
                  backgroundColor: "#005AEE",
                  border: "1px solid #ACACAC",
                  borderRadius: "8px",
                  cursor: "pointer"
                }}
              >
                <span
                  style={{
                    fontFamily: "'Archivo', sans-serif",
                    fontWeight: 500,
                    fontSize: "16px",
                    lineHeight: "1.09",
                    color: "white"
                  }}
                >
                  Change bank
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Notifications Section */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px"
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
            Notifications
          </h2>
          
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: "32px",
              padding: "36px",
              backgroundColor: "#FFFFFF",
              borderRadius: "16px",
              border: "1px solid #ACACAC"
            }}
          >
            {/* Payout Completed */}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "10px",
                width: "100%",
                padding: "16px",
                backgroundColor: "#F8F9FA",
                borderRadius: "12px"
              }}
            >
              <span
                style={{
                  fontFamily: "'Neue Haas Grotesk Display Pro', sans-serif",
                  fontWeight: 500,
                  fontSize: "16px",
                  lineHeight: "1.5",
                  color: "#222222"
                }}
              >
                Payout completed
              </span>
              <ToggleButton
                isActive={notifications.payoutCompleted}
                onClick={() => handleNotificationToggle("payoutCompleted")}
              />
            </div>

            {/* Verification Updates */}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "10px",
                width: "100%",
                padding: "16px",
                backgroundColor: "#F8F9FA",
                borderRadius: "12px"
              }}
            >
              <span
                style={{
                  fontFamily: "'Neue Haas Grotesk Display Pro', sans-serif",
                  fontWeight: 500,
                  fontSize: "16px",
                  lineHeight: "1.5",
                  color: "#222222"
                }}
              >
                Verification updates
              </span>
              <ToggleButton
                isActive={notifications.verificationUpdates}
                onClick={() => handleNotificationToggle("verificationUpdates")}
              />
            </div>

            {/* Security Alerts */}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "10px",
                width: "100%",
                padding: "16px",
                backgroundColor: "#F8F9FA",
                borderRadius: "12px"
              }}
            >
              <span
                style={{
                  fontFamily: "'Neue Haas Grotesk Display Pro', sans-serif",
                  fontWeight: 500,
                  fontSize: "16px",
                  lineHeight: "1.5",
                  color: "#222222"
                }}
              >
                Security alerts
              </span>
              <ToggleButton
                isActive={notifications.securityAlerts}
                onClick={() => handleNotificationToggle("securityAlerts")}
              />
            </div>

            {/* Save Preferences Button */}
            <button
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "10px",
                padding: "10px 12px",
                backgroundColor: "#005AEE",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer"
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
                Save preferences
              </span>
            </button>
          </div>
        </div>

        {/* Security Section */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px"
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
            Security
          </h2>
          
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: "32px",
              padding: "36px",
              backgroundColor: "#FFFFFF",
              borderRadius: "16px",
              border: "1px solid #ACACAC"
            }}
          >
            {/* Password */}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "10px",
                width: "100%",
                padding: "16px",
                // backgroundColor: "#F8F9FA",
                borderRadius: "12px"
              }}
            >
              <span
                style={{
                  fontFamily: "'Neue Haas Grotesk Display Pro', sans-serif",
                  fontWeight: 500,
                  fontSize: "16px",
                  lineHeight: "1.5",
                  color: "#222222"
                }}
              >
                Password
              </span>
              <button
                onClick={() => setIsChangePasswordModalOpen(true)}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "10px",
                  padding: "10px 12px",
                  backgroundColor: "#005AEE",
                  border: "1px solid #ACACAC",
                  borderRadius: "8px",
                  cursor: "pointer"
                }}
              >
                <span
                  style={{
                    fontFamily: "'Archivo', sans-serif",
                    fontWeight: 500,
                    fontSize: "16px",
                    lineHeight: "1.09",
                    color: "white"
                  }}
                >
                  Change password
                </span>
              </button>
            </div>

            {/* Two-Factor Authentication */}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "10px",
                width: "100%",
                padding: "16px",
                // backgroundColor: "#F8F9FA",
                borderRadius: "12px"
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  flex: 1
                }}
              >
                <h3
                  style={{
                    fontFamily: "'Neue Haas Grotesk Display Pro', sans-serif",
                    fontWeight: 500,
                    fontSize: "16px",
                    lineHeight: "1.5",
                    color: "#222222",
                    marginBottom: "4px"
                  }}
                >
                  Two-factor authentication (2FA)
                </h3>
                <p
                  style={{
                    fontFamily: "'Archivo', sans-serif",
                    fontWeight: 400,
                    fontSize: "12px",
                    lineHeight: "2",
                    color: "#575757"
                  }}
                >
                  Add an extra layer of protection to your account.
                </p>
              </div>
              <button
                onClick={() => setIsTwoFactorAuthModalOpen(true)}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "10px",
                  padding: "10px 12px",
                  backgroundColor: "#005AEE",
                  borderRadius: "8px",
                  border: "none",
                  cursor: "pointer"
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
                  Set up 2FA
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Referrals Section */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px"
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
            Referrals
          </h2>
          
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: "32px",
              padding: "36px",
              backgroundColor: "#FFFFFF",
              borderRadius: "16px",
              border: "1px solid #ACACAC"
            }}
          >
            {/* Referral Link */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                width: "100%"
              }}
            >
              <label
                style={{
                  fontFamily: "'Archivo', sans-serif",
                  fontWeight: 400,
                  fontSize: "16px",
                  lineHeight: "1.09",
                  color: "#222222"
                }}
              >
                Your referral link
              </label>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "12px"
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: "12px",
                    padding: "12px 24px",
                    backgroundColor: "#EFEFEF",
                    borderRadius: "8px",
                    flex: 1
                  }}
                >
                  <span
                    style={{
                      flex: 1,
                      fontFamily: "'Archivo', sans-serif",
                      fontWeight: 400,
                      fontSize: "16px",
                      lineHeight: "1.09",
                      color: "#8C8C8C"
                    }}
                  >
                    https://riverpe.com/janedoe/referrallinkxyz
                  </span>
                </div>
                <button
                  onClick={handleCopyReferralLink}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: "10px",
                    padding: "10px 12px",
                    // backgroundColor: "#005AEE",
                    border: "1px solid #ACACAC",
                    borderRadius: "8px",
                    cursor: "pointer"
                  }}
                >
                  <Copy size={24} color="black" />
                  <span
                    style={{
                      fontFamily: "'Archivo', sans-serif",
                      fontWeight: 500,
                      fontSize: "16px",
                      lineHeight: "1.09",
                      color: "black"
                    }}
                  >
                    Copy link
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Danger Zone Section */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px"
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
            Danger zone
          </h2>
          
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: "32px",
              padding: "36px",
              backgroundColor: "#FFFFFF",
              borderRadius: "16px",
              border: "1px solid #ACACAC"
            }}
          >
            {/* Deactivate Account */}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "10px",
                width: "100%",
                padding: "16px",
                // backgroundColor: "#F8F9FA",
                borderRadius: "12px"
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "16px",
                  flex: 1
                }}
              >
                <AlertTriangle size={24} color="#E7000B" />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column"
                  }}
                >
                  <h3
                    style={{
                      fontFamily: "'Neue Haas Grotesk Display Pro', sans-serif",
                      fontWeight: 500,
                      fontSize: "16px",
                      lineHeight: "1.5",
                      color: "#222222",
                      marginBottom: "4px"
                    }}
                  >
                    Deactivate account
                  </h3>
                  <p
                    style={{
                      fontFamily: "'Archivo', sans-serif",
                      fontWeight: 400,
                      fontSize: "12px",
                      lineHeight: "2",
                      color: "#575757"
                    }}
                  >
                    Permanently deactivate your account and remove all data
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  if (window.confirm("Are you sure you want to deactivate your account? This action cannot be undone.")) {
                    console.log("Deactivate account");
                  }
                }}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "10px",
                  padding: "10px 12px",
                  backgroundColor: "#EFEFEF",
                  borderRadius: "8px",
                  border: "none",
                  cursor: "pointer"
                }}
              >
                <span
                  style={{
                    fontFamily: "'Archivo', sans-serif",
                    fontWeight: 700,
                    fontSize: "16px",
                    lineHeight: "1.09",
                    color: "#E7000B"
                  }}
                >
                  Deactivate account
                </span>
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Change Password Modal */}
      <ChangePasswordModal
        isOpen={isChangePasswordModalOpen}
        onClose={() => setIsChangePasswordModalOpen(false)}
        onSubmit={handleChangePassword}
      />

      {/* Two-Factor Authentication Modal */}
      <TwoFactorAuthModal
        isOpen={isTwoFactorAuthModalOpen}
        onClose={() => setIsTwoFactorAuthModalOpen(false)}
        onEnable2FA={handleEnable2FA}
      />

      {/* Link Bank Account Modal */}
      <LinkBankAccountModal
        isOpen={isLinkBankAccountModalOpen}
        onClose={() => setIsLinkBankAccountModalOpen(false)}
        onSuccess={handleBankAccountLink}
      />
    </div>
  );
};

