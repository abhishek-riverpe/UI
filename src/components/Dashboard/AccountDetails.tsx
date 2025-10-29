import { Copy, Share2, ArrowLeft } from "lucide-react";

interface AccountDetailsProps {
  onShareBankingDetails: () => void;
  onBack?: () => void;
}

interface AccountDetailItemProps {
  label: string;
  value: string;
}

const AccountDetailItem = ({ label, value }: AccountDetailItemProps) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    // You could add a toast notification here
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        flex: 1
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
        {label}
      </label>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "10px",
          padding: "12px 24px",
          backgroundColor: "#E2E2E2",
          borderRadius: "12px"
        }}
      >
        <span
          style={{
            flex: 1,
            fontFamily: "'Archivo', sans-serif",
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "1.09",
            color: "#222222"
          }}
        >
          {value}
        </span>
        <button
          onClick={handleCopy}
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
          <Copy size={16} color="#FFFFFF" />
        </button>
      </div>
    </div>
  );
};

export const AccountDetails = ({ onShareBankingDetails, onBack }: AccountDetailsProps) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "40px",
        width: "100%",
        maxWidth: "1000px"
      }}
    >
      {/* Back Button */}
      {onBack && (
        <button
          onClick={onBack}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            backgroundColor: "transparent",
            border: "none",
            cursor: "pointer",
            padding: "8px 0",
            alignSelf: "flex-start"
          }}
        >
          <ArrowLeft size={20} color="#005AEE" />
          <span
            style={{
              fontFamily: "'Archivo', sans-serif",
              fontWeight: 400,
              fontSize: "16px",
              lineHeight: "1.09",
              color: "#005AEE"
            }}
          >
            Back to Dashboard
          </span>
        </button>
      )}
      {/* Account Summary Section */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px"
        }}
      >
        {/* Balance Section */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "stretch",
            alignItems: "stretch",
            gap: "320px",
            width: "100%"
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              flex: 1
            }}
          >
            {/* Currency and Balance */}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "12px"
              }}
            >
              {/* US Flag */}
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  backgroundImage: "url('/usa-flag.svg')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat"
                }}
              />
              <span
                style={{
                  fontFamily: "'Archivo', sans-serif",
                  fontWeight: 600,
                  fontSize: "18px",
                  lineHeight: "1.09",
                  color: "#000000"
                }}
              >
                USD
              </span>
            </div>
            <span
              style={{
                fontFamily: "'Archivo', sans-serif",
                fontWeight: 400,
                fontSize: "16px",
                lineHeight: "1.09",
                color: "#222222"
              }}
            >
              Total balance
            </span>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "baseline",
                gap: "8px"
              }}
            >
              <span
                style={{
                  fontFamily: "'Neue Haas Grotesk Display Pro', sans-serif",
                  fontWeight: 700,
                  fontSize: "32px",
                  lineHeight: "1.2",
                  color: "#222222"
                }}
              >
                $10,000.00
              </span>
              <span
                style={{
                  fontFamily: "'Archivo', sans-serif",
                  fontWeight: 400,
                  fontSize: "16px",
                  lineHeight: "1.09",
                  color: "#222222"
                }}
              >
                USD
              </span>
            </div>
          </div>

          {/* Transfer Information */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              padding: "24px",
              backgroundColor: "#EFEFEF",
              borderRadius: "16px",
              flex: 1
            }}
          >
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
                  fontWeight: 400,
                  fontSize: "14px",
                  lineHeight: "1.4",
                  color: "#000000",
                  margin: 0
                }}
              >
                Minimum accepted: $123,456.67
              </p>
              <p
                style={{
                  fontFamily: "'Archivo', sans-serif",
                  fontWeight: 400,
                  fontSize: "14px",
                  lineHeight: "1.4",
                  color: "#000000",
                  margin: 0
                }}
              >
                Maximum accepted: $123,456.67
              </p>
              <p
                style={{
                  fontFamily: "'Archivo', sans-serif",
                  fontWeight: 400,
                  fontSize: "14px",
                  lineHeight: "1.4",
                  color: "#000000",
                  margin: 0
                }}
              >
                Time to completion: Most transfers complete instantly; rare delays may occur during bank maintenance or compliance checks.
              </p>
              <p
                style={{
                  fontFamily: "'Archivo', sans-serif",
                  fontWeight: 400,
                  fontSize: "14px",
                  lineHeight: "1.4",
                  color: "#000000",
                  margin: 0
                }}
              >
                FX rate: Mid-market; guaranteed INR shown upfront before confirm (no hidden markup)
              </p>
              <p
                style={{
                  fontFamily: "'Archivo', sans-serif",
                  fontWeight: 400,
                  fontSize: "14px",
                  lineHeight: "1.4",
                  color: "#000000",
                  margin: 0
                }}
              >
                Fees: Fully disclosed in the quote screen (total fees + final INR you'll receive)
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* US Virtual Account Details */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "24px"
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "12px"
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
            US Virtual Account Details
          </h2>
        </div>

        {/* Banking Details Grid */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "32px"
          }}
        >
          {/* Row 1 */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "stretch",
              alignItems: "stretch",
              gap: "16px"
            }}
          >
            <AccountDetailItem label="Beneficiary name" value="Jane Doe" />
            <AccountDetailItem label="Beneficiary address" value="3333 Yellow Road, Toronto, Ontario" />
          </div>

          {/* Row 2 */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "stretch",
              alignItems: "stretch",
              gap: "16px"
            }}
          >
            <AccountDetailItem label="Beneficiary account currency" value="USD" />
            <AccountDetailItem label="Account type" value="Checking" />
          </div>

          {/* Row 3 */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "stretch",
              alignItems: "stretch",
              gap: "16px"
            }}
          >
            <AccountDetailItem label="Routing number" value="12347890" />
            <AccountDetailItem label="Account number" value="12347890" />
          </div>

          {/* Row 4 */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "stretch",
              alignItems: "stretch",
              gap: "16px"
            }}
          >
            <AccountDetailItem label="Bank name" value="12347890" />
            <AccountDetailItem label="Bank address" value="12347890" />
          </div>
        </div>

        {/* Share Banking Details Button */}
        <button
          onClick={onShareBankingDetails}
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: "12px",
            padding: "15px 12px",
            backgroundColor: "#005AEE",
            borderRadius: "12px",
            border: "none",
            cursor: "pointer",
            width: "100%"
          }}
        >
          <Share2 size={16} color="#FFFFFF" />
          <span
            style={{
              fontFamily: "'Archivo', sans-serif",
              fontWeight: 600,
              fontSize: "12px",
              lineHeight: "1.29",
              color: "#FFFFFF"
            }}
          >
            Share banking details with client
          </span>
        </button>
      </div>
    </div>
  );
};
