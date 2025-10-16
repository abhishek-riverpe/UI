import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import { api } from "../../../lib/api";
import { useAppContext } from "../../../context/AppContext";

type Step = "email" | "password";

export const SigninPage = (): JSX.Element => {
  const navigate = useNavigate();
  const { setAuth } = useAppContext();
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const canContinue = emailRegex.test(email);
  const canSubmit = canContinue && password.length > 0;

  const onContinue = () => {
    if (!canContinue) return;
    setStep("password");
  };

  const handleSignin = async () => {
    if (!canSubmit || loading) return;
    setError(null);
    setLoading(true);
    try {
      const res = await api.post("/api/v1/user/signin", {
        username: email,
        password,
      });
      const token = res.data?.access_token as string;
      if (token) {
        setAuth(token, { username: email });
        navigate("/dashboard");
      } else {
        setError("Unexpected response from server.");
      }
    } catch (e: any) {
      const msg = e?.response?.data?.detail || "Failed to sign in";
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
            <div className="flex flex-col gap-6">
              {step === "email" && (
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="email"
                    style={{ fontFamily: "'Archivo', sans-serif", fontWeight: 400, fontSize: "16px", lineHeight: "1.09", color: "#000000" }}
                  >
                    Enter your email address
                  </label>
                  <input
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="example@email.com"
                    className={`w-full h-[48px] bg-white border rounded-xl px-4 ${
                      !canContinue && email.length > 0
                        ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                        : "border-gray-300 focus:outline-none focus:border-[#2e5cef] focus:ring-1 focus:ring-[#2e5cef]"
                    }`}
                    style={{ fontFamily: "'Archivo', sans-serif", fontWeight: 400, fontSize: "16px", lineHeight: "1.09", color: "#000000" }}
                  />
                  {(!canContinue && email.length > 0) && (
                    <div className="text-red-600 [font-family:'Archivo',Helvetica] text-sm">Enter a valid email address</div>
                  )}
                  <Button
                    disabled={!canContinue}
                    onClick={onContinue}
                    className="w-full h-[48px] bg-[#005AEE] hover:bg-[#0045C7] text-white rounded-xl font-semibold text-base disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Continue
                  </Button>
                </div>
              )}

              {step === "password" && (
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="password"
                    style={{ fontFamily: "'Archivo', sans-serif", fontWeight: 400, fontSize: "16px", lineHeight: "1.09", color: "#000000" }}
                  >
                    Enter your password for {email}
                  </label>
                  <input
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="Your password"
                    className="w-full h-[48px] bg-white border border-gray-300 rounded-xl px-4 focus:outline-none focus:border-[#2e5cef] focus:ring-1 focus:ring-[#2e5cef]"
                    style={{ fontFamily: "'Archivo', sans-serif", fontWeight: 400, fontSize: "16px", lineHeight: "1.09", color: "#000000" }}
                  />
                  {error && <div className="text-red-600 [font-family:'Archivo',Helvetica] text-sm">{error}</div>}
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setStep("email")}
                      className="w-1/3 h-[48px] border-gray-300 rounded-xl"
                    >
                      Back
                    </Button>
                    <Button
                      disabled={!canSubmit || loading}
                      onClick={handleSignin}
                      className="w-2/3 h-[48px] bg-[#005AEE] hover:bg-[#0045C7] text-white rounded-xl font-semibold text-base disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? "Signing in..." : "Sign in"}
                    </Button>
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-4 mt-8">
              <p
                style={{ fontFamily: "'Archivo', sans-serif", fontWeight: 400, fontSize: "16px", lineHeight: "1.09", color: "#000000", textAlign: "center" }}
              >
                Don't have an account? <Link to="/signup" className="font-semibold underline">Sign up!</Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
