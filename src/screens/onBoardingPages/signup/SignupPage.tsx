import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import { useAppContext } from "../../../context/AppContext";
import { BACKEND_URL } from "../../../lib/urls";
// import Header from "@/components/common/Header";

export const Signup = (): JSX.Element => {
  const navigate = useNavigate();
  const { signup } = useAppContext();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const canSubmit =
    firstName.trim().length > 0 &&
    lastName.trim().length > 0 &&
    emailRegex.test(email) &&
    password.length >= 8;

  const handleSubmit = async () => {
    if (!canSubmit || loading) return;
    setError(null);
    setLoading(true);
    try {
      await signup(firstName.trim(), lastName.trim(), email, password);
      navigate("/dashboard");
    } catch (e: any) {
      const msg = e?.response?.data?.message || e?.response?.data?.detail || "Failed to sign up";
      setError(msg);
    } finally {
      setLoading(false);
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
      {/* <div className="sticky top-0 z-40 bg-[#FAFAFA]">
        <div className="px-4 sm:px-6 lg:px-8">
          <Header />
        </div>
      </div> */}
      <main className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-[490px]">
          <h1 className="text-center [font-family:'Archivo',Helvetica] font-semibold text-[32px] text-black tracking-[0] leading-[1.2] mb-12">
            Create your Riverpe account
          </h1>

          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <p className="[font-family:'Archivo',Helvetica] font-normal text-base text-black tracking-[0] leading-[normal]">
                Sign up with
              </p>

              <Button
                variant="outline"
                onClick={() => {
                  window.location.href = `${BACKEND_URL}/auth/google`;
                }}
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
              <span className="[font-family:'Archivo',Helvetica] font-normal text-sm text-gray-600 tracking-[0]">
                or
              </span>
              <div className="flex-1 h-[1px] bg-gray-300"></div>
            </div>

            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="firstName" className="[font-family:'Archivo',Helvetica] font-normal text-base text-black tracking-[0] leading-[normal]">First name</label>
                <input
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  type="text"
                  placeholder="John"
                  className="w-full h-[46px] bg-white border border-gray-300 rounded-lg px-4 [font-family:'Archivo',Helvetica] font-normal text-base text-black focus:outline-none focus:border-[#2e5cef] focus:ring-1 focus:ring-[#2e5cef]"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="lastName" className="[font-family:'Archivo',Helvetica] font-normal text-base text-black tracking-[0] leading-[normal]">Last name</label>
                <input
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  type="text"
                  placeholder="Doe"
                  className="w-full h-[46px] bg-white border border-gray-300 rounded-lg px-4 [font-family:'Archivo',Helvetica] font-normal text-base text-black focus:outline-none focus:border-[#2e5cef] focus:ring-1 focus:ring-[#2e5cef]"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="[font-family:'Archivo',Helvetica] font-normal text-base text-black tracking-[0] leading-[normal]">Email</label>
                <input
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="example@email.com"
                  className="w-full h-[46px] bg-white border border-gray-300 rounded-lg px-4 [font-family:'Archivo',Helvetica] font-normal text-base text-black focus:outline-none focus:border-[#2e5cef] focus:ring-1 focus:ring-[#2e5cef]"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="password" className="[font-family:'Archivo',Helvetica] font-normal text-base text-black tracking-[0] leading-[normal]">Password</label>
                <div className="relative">
                  <input
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type={showPassword ? "text" : "password"}
                    placeholder="At least 8 characters"
                    className="w-full h-[46px] bg-white border border-gray-300 rounded-lg pl-4 pr-12 [font-family:'Archivo',Helvetica] font-normal text-base text-black focus:outline-none focus:border-[#2e5cef] focus:ring-1 focus:ring-[#2e5cef]"
                  />
                  <button
                    type="button"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute inset-y-0 right-3 my-auto h-8 w-8 grid place-items-center text-gray-600 hover:text-gray-900"
                  >
                    {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                        <path d="M3 3l18 18" />
                        <path d="M10.58 10.58A2 2 0 0012 14a2 2 0 001.42-.58" />
                        <path d="M17.94 17.94A10.94 10.94 0 0112 20c-5 0-9.27-3.11-11-8 1.02-2.8 2.98-5 5.37-6.37" />
                        <path d="M9.88 4.24A10.94 10.94 0 0112 4c5 0 9.27 3.11 11 8-.62 1.71-1.62 3.22-2.87 4.45" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <div className="text-red-600 [font-family:'Archivo',Helvetica] text-sm">{error}</div>
              )}

              <Button
                disabled={!canSubmit || loading}
                onClick={handleSubmit}
                className="w-full h-[46px] bg-[#2e5cef] hover:bg-[#2449c8] text-white rounded-lg [font-family:'Archivo',Helvetica] font-semibold text-base disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Creating account..." : "Sign up"}
              </Button>
            </div>

            <div className="flex flex-col gap-4 mt-8">
              <p className="text-center [font-family:'Archivo',Helvetica] font-normal text-sm text-gray-600 tracking-[0] leading-[1.5]">
                By creating an account, you accept the{" "}
                <a href="#" className="text-black font-semibold underline">
                  Terms of use
                </a>{" "}
                and{" "}
                <a href="#" className="text-black font-semibold underline">
                  Privacy Policy
                </a>
                .
              </p>

              <p className="text-center [font-family:'Archivo',Helvetica] font-normal text-base text-black tracking-[0] leading-[normal]">
                Already have an account?{" "}
                <Link to="/signin" className="font-semibold underline">
                  Sign in
                </Link>
                !
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
