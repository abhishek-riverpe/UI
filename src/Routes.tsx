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
import FreelancersPage from "./screens/LandingPages/FreelancersPage";
import AgenciesPage from "./screens/LandingPages/AgenciesPage";
import MarketPlace from "./screens/LandingPages/MarketPlace";

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
      {/* <Route path="/forfreelancers" element={<FreelancersPage />} />
      <Route path="/forAgencies" element={<AgenciesPage />} />
      <Route path="/forMarketPlace" element={<MarketPlace />} /> */}
      
    </Routes>
  );
}