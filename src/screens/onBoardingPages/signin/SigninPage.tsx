import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import { X } from "lucide-react";

type SigninStep = "input" | "email-otp" | "phone-otp" | "error-invalid" | "error-unregistered";

interface SigninPageProps {
  initialStep?: SigninStep;
}

export const SigninPage = ({ initialStep = "input" }: SigninPageProps): JSX.Element => {
  const [currentStep, setCurrentStep] = useState<SigninStep>(initialStep);
  const [input, setInput] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\d{10,15}$/;
  const otpRegex = /^\d{6}$/;

  const isValidEmail = emailRegex.test(input);
  const isValidPhone = phoneRegex.test(input);
  const isValidOtp = otpRegex.test(otpCode);
  const isValidInput = isValidEmail || isValidPhone;

  const handleSubmit = async () => {
    if (!isValidInput) return;
    
    setIsLoading(true);
    // Simulate API call with demo logic
    setTimeout(() => {
      setIsLoading(false);
      
      // Demo: Show different error states based on input
      if (input === "invalid@test" || input === "12345") {
        setCurrentStep("error-invalid");
        return;
      }
      
      if (input === "notfound@test.com" || input === "12345678901") {
        setCurrentStep("error-unregistered");
        return;
      }
      
      // Check if user entered email or phone number
      if (isValidEmail) {
        setCurrentStep("email-otp");
      } else if (isValidPhone) {
        setCurrentStep("phone-otp");
      }
    }, 1000);
  };

  const handleOtpSubmit = async () => {
    if (!isValidOtp) return;
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Navigate to dashboard on successful login
      navigate("/dashboard");
    }, 1000);
  };

  const handleGoogleSignin = () => {
    // Simulate Google signin
    navigate("/dashboard");
  };

  const handleBackToInput = () => {
    setCurrentStep("input");
    setInput("");
  };

  const renderErrorState = () => {
    const isInvalidError = currentStep === "error-invalid";
    const errorMessage = isInvalidError 
      ? "Enter a valid email address or phone number"
      : "This email/number is not registered. Please sign up first.";

    return (
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <X size={16} color="#E7000B" />
          <span 
            style={{
              fontFamily: "'Archivo', sans-serif",
              fontWeight: 400,
              fontSize: "16px",
              lineHeight: "1.09",
              color: "#E7000B"
            }}
          >
            {errorMessage}
          </span>
        </div>
      </div>
    );
  };

  const renderInputStep = () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <label
          htmlFor="input"
          style={{
            fontFamily: "'Archivo', sans-serif",
            fontWeight: 400,
            fontSize: "16px",
            lineHeight: "1.09",
            color: "#000000"
          }}
        >
          Enter your email address or phone number
        </label>
        <input
          id="input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          placeholder="example@email.com or 1234567890"
          className={`w-full h-[48px] bg-white border rounded-xl px-4 ${
            currentStep === "error-invalid" || currentStep === "error-unregistered"
              ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
              : "border-gray-300 focus:outline-none focus:border-[#2e5cef] focus:ring-1 focus:ring-[#2e5cef]"
          }`}
          style={{
            fontFamily: "'Archivo', sans-serif",
            fontWeight: 400,
            fontSize: "16px",
            lineHeight: "1.09",
            color: "#000000"
          }}
        />
        {(currentStep === "error-invalid" || currentStep === "error-unregistered") && renderErrorState()}
      </div>

      <Button
        disabled={!isValidInput || isLoading}
        onClick={handleSubmit}
        className="w-full h-[48px] bg-[#005AEE] hover:bg-[#0045C7] text-white rounded-xl font-semibold text-base disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? "Sending..." : "Sign in"}
      </Button>
    </div>
  );

  const renderOtpStep = (isEmailOtp: boolean) => {
    return (
      <div className="relative flex flex-col gap-6">
        {/* Back button - positioned far left */}
        <button
          onClick={handleBackToInput}
          className="absolute left-0 top-0 flex items-center gap-2 text-gray-600 hover:text-gray-800"
          style={{
            fontFamily: "'Archivo', sans-serif",
            fontWeight: 400,
            fontSize: "16px",
            lineHeight: "1.09"
          }}
        >
          ← Back
        </button>

        {/* Centered content */}
        <div className="flex flex-col items-center gap-4 mt-8">
          {/* Dynamic icon based on verification method */}
          <div className="w-[250px] h-[250px] rounded-lg flex items-center justify-center">
            <img 
              src={isEmailOtp ? "/illustrations/email.svg" : "/illustrations/message.svg"} 
              alt={isEmailOtp ? "email" : "message"} 
              className="w-full h-full object-contain"
            />
          </div>
          
          <div className="text-center">
            <h2 
              style={{
                fontFamily: "'Neue Haas Grotesk Display Pro', sans-serif",
                fontWeight: 600,
                fontSize: "28px",
                lineHeight: "1.2",
                color: "#000000",
                marginBottom: "8px"
              }}
            >
              {isEmailOtp ? "We just sent you the code by email!" : "We just sent you an SMS!"}
            </h2>
            <p 
              style={{
                fontFamily: "'Archivo', sans-serif",
                fontWeight: 400,
                fontSize: "16px",
                lineHeight: "1.09",
                color: "#000000"
              }}
            >
              {isEmailOtp 
                ? <>We sent it to {input}. <button 
                    onClick={handleBackToInput}
                    style={{ 
                      color: "#005AEE", 
                      background: "none", 
                      border: "none", 
                      cursor: "pointer",
                      fontFamily: "'Archivo', sans-serif",
                      fontWeight: 400,
                      fontSize: "16px",
                      lineHeight: "1.09",
                      textDecoration: "underline"
                    }}
                  >
                    Change email
                  </button>.</>
                : <>We sent it to +1{input}. <button 
                    onClick={handleBackToInput}
                    style={{ 
                      color: "#005AEE", 
                      background: "none", 
                      border: "none", 
                      cursor: "pointer",
                      fontFamily: "'Archivo', sans-serif",
                      fontWeight: 400,
                      fontSize: "16px",
                      lineHeight: "1.09",
                      textDecoration: "underline"
                    }}
                  >
                    Change phone number
                  </button>.</>
              }
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label
            style={{
              fontFamily: "'Archivo', sans-serif",
              fontWeight: 700,
              fontSize: "20px",
              lineHeight: "1.09",
              color: "#000000"
            }}
          >
            Your 6-digit code
          </label>
          <input
            value={otpCode}
            onChange={(e) => setOtpCode(e.target.value)}
            type="text"
            placeholder="123456"
            maxLength={6}
            className="w-full h-[48px] bg-white border border-gray-300 rounded-xl px-4 focus:outline-none focus:border-[#2e5cef] focus:ring-1 focus:ring-[#2e5cef]"
            style={{
              fontFamily: "'Archivo', sans-serif",
              fontWeight: 500,
              fontSize: "16px",
              lineHeight: "1.09",
              color: "#575757"
            }}
          />
          <p 
            style={{
              fontFamily: "'Archivo', sans-serif",
              fontWeight: 700,
              fontSize: "16px",
              lineHeight: "1.09",
              color: "#8C8C8C"
            }}
          >
            Resend code in 0:53
          </p>
        </div>

        <Button
          disabled={!isValidOtp || isLoading}
          onClick={handleOtpSubmit}
          className="w-full h-[48px] bg-[#005AEE] hover:bg-[#0045C7] text-white rounded-xl font-semibold text-base disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Verifying..." : "Done"}
        </Button>
      </div>
    );
  };

  const renderMainContent = () => {
    switch (currentStep) {
      case "input":
        return renderInputStep();
      case "email-otp":
        return renderOtpStep(true);
      case "phone-otp":
        return renderOtpStep(false);
      case "error-invalid":
        return renderInputStep();
      case "error-unregistered":
        return renderInputStep();
      default:
        return renderInputStep();
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="flex items-center px-12 py-6 border-b border-black">
        <Link to="/" className="flex items-center gap-2">
          <img
            className="w-36 h-[27.83px]"
            alt="Riverpe Logo"
            src="/Logo.png"
          />
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-[540px]">
          <h1 
            style={{
              fontFamily: "'Neue Haas Grotesk Display Pro', sans-serif",
              fontWeight: 600,
              fontSize: "32px",
              lineHeight: "1.2",
              color: "#000000",
              textAlign: "center",
              marginBottom: "40px"
            }}
          >
            Sign in to Riverpe
          </h1>

          <div className="flex flex-col gap-8">
            {/* Google Sign In - only show on initial steps */}
            {(currentStep === "input" || currentStep === "error-invalid" || currentStep === "error-unregistered") && (
              <>
                <div className="flex flex-col gap-4">
                  <p 
                    style={{
                      fontFamily: "'Archivo', sans-serif",
                      fontWeight: 400,
                      fontSize: "16px",
                      lineHeight: "1.09",
                      color: "#000000"
                    }}
                  >
                    Sign in with
                  </p>

                  <Button
                    variant="outline"
                    onClick={handleGoogleSignin}
                    className="w-full h-[36px] bg-white border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-3"
                  >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                  </Button>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex-1 h-[1px] bg-gray-300"></div>
                  <span 
                    style={{
                      fontFamily: "'Archivo', sans-serif",
                      fontWeight: 400,
                      fontSize: "16px",
                      lineHeight: "1.09",
                      color: "#000000"
                    }}
                  >
                    or
                  </span>
                  <div className="flex-1 h-[1px] bg-gray-300"></div>
                </div>
              </>
            )}

            {/* Main form content */}
            {renderMainContent()}

            {/* Footer - only show on initial steps */}
            {(currentStep === "input" || currentStep === "error-invalid" || currentStep === "error-unregistered") && (
              <div className="flex flex-col gap-4 mt-8">
                <p 
                  style={{
                    fontFamily: "'Archivo', sans-serif",
                    fontWeight: 400,
                    fontSize: "16px",
                    lineHeight: "1.09",
                    color: "#000000",
                    textAlign: "center"
                  }}
                >
                  By creating an account, you accept the{" "}
                  <a href="#" className="font-semibold underline">
                    Terms of use
                  </a>{" "}
                  and{" "}
                  <a href="#" className="font-semibold underline">
                    Privacy Policy
                  </a>
                  .
                </p>

                <p 
                  style={{
                    fontFamily: "'Archivo', sans-serif",
                    fontWeight: 400,
                    fontSize: "16px",
                    lineHeight: "1.09",
                    color: "#000000",
                    textAlign: "center"
                  }}
                >
                  Don't have an account?{" "}
                  <Link to="/signup" className="font-semibold underline">
                    Sign up!
                  </Link>
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
