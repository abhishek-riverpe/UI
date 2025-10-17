import { useState } from "react";
import BankAccount from "@/components/Dashboard/BankAccount";

export const BankAccountPage = (): JSX.Element => {
  // This would typically come from your app state/API
  const [verificationStatus] = useState<"not_verified" | "pending" | "rejected" | "verified">("verified");
  const [accountCreated] = useState(true);
  const [accountBalance] = useState(0);

  const handleStartVerification = () => {
    console.log("Start verification clicked");
    // Navigate to verification flow
  };

  const handleViewStatus = () => {
    console.log("View status clicked");
    // Navigate to verification status page
  };

  const handleRetryVerification = () => {
    console.log("Retry verification clicked");
    // Navigate to verification flow
  };

  const handleContinue = () => {
    console.log("Continue clicked");
    // Continue to open US bank account
  };

  const handleShowBankDetails = () => {
    console.log("Show bank details clicked");
    // Show bank account details modal
  };

  return (
    <div className="w-full">
      {/* Render BankAccount component based on verification status */}
      {verificationStatus === "not_verified" && (
        <BankAccount
          verificationStatus="not_verified"
          accountCreated={accountCreated}
          accountBalance={accountBalance}
          onPrimary={handleStartVerification}
          onBannerCta={handleStartVerification}
        />
      )}

      {verificationStatus === "pending" && (
        <BankAccount
          verificationStatus="pending"
          accountCreated={accountCreated}
          accountBalance={accountBalance}
          onPrimary={handleViewStatus}
          onBannerCta={handleViewStatus}
        />
      )}

      {verificationStatus === "rejected" && (
        <BankAccount
          verificationStatus="rejected"
          accountCreated={accountCreated}
          accountBalance={accountBalance}
          onPrimary={handleRetryVerification}
          onBannerCta={handleRetryVerification}
        />
      )}

      {verificationStatus === "verified" && !accountCreated && (
        <BankAccount
          verificationStatus="verified"
          accountCreated={false}
          accountBalance={accountBalance}
          onPrimary={handleContinue}
          onBannerCta={handleContinue}
        />
      )}

      {verificationStatus === "verified" && accountCreated && (
        <BankAccount
          verificationStatus="verified"
          accountCreated={true}
          accountBalance={10000}
          onShowBankDetails={handleShowBankDetails}
        />
      )}
    </div>
  );
};
