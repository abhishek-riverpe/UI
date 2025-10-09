import { Signup } from "./screens/onBoardingPages/signup/SignupPage";
import { LandingPage } from "./screens/LandingPages";
import { Routes, Route } from "react-router-dom";
import { AccountType } from "./screens/onBoardingPages/AccountTypePage";
import VerifyIdentityStep1 from "./screens/onBoardingPages/VerificationStep-1";
import VerifyIdentityStep2 from "./screens/onBoardingPages/VerificationStep-2";
import VerifyIdentityStep4 from "./screens/onBoardingPages/DocConformation";
import SelectIDType from "./screens/onBoardingPages/VerificationStep-3";
import QrScanner from "./screens/onBoardingPages/QrScanner";
import VerificationSuccess from "./screens/onBoardingPages/VerificationSuccess";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import { Dashboard } from "./screens/DashboardPages/Dashboard";
import { BankAccountPage } from "./screens/DashboardPages/BankAccountPage";
import { WithdrawFundsPage } from "./screens/DashboardPages/WithdrawFundsPage";
import { TransactionHistoryPage } from "./screens/DashboardPages/TransactionHistoryPage";
import { ReferralsPage } from "./screens/DashboardPages/ReferralsPage";
import { KYCPage } from "./screens/DashboardPages/KYCPage";
import { SupportPage } from "./screens/DashboardPages/SupportPage";

export default function App() {
  return (
    <Routes>
      <Route path="/home/:type" element={<LandingPage />} />
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/account-type" element={<AccountType />} />
      <Route path="/verify-identityStep-1" element={<VerifyIdentityStep1/>} />
      <Route path="/verify-identityStep-2" element={<VerifyIdentityStep2/>} />
      <Route path="/verify-identityStep-3" element={<SelectIDType/>} />
      <Route path="/verify-identityStep-4" element={<VerifyIdentityStep4/>} />
      <Route path="/verify-identityStep-5" element={<QrScanner/>} />
      <Route path="/VerificationSuccess" element={<VerificationSuccess/>} />
      
      {/* Dashboard Routes with Layout */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="bank" element={<BankAccountPage />} />
        <Route path="withdraw" element={<WithdrawFundsPage />} />
        <Route path="transactions" element={<TransactionHistoryPage />} />
        <Route path="referrals" element={<ReferralsPage />} />
        <Route path="kyc" element={<KYCPage />} />
        <Route path="support" element={<SupportPage />} />
      </Route>
      
    </Routes>
  );
}