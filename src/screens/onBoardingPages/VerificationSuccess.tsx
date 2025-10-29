import { Link, useNavigate } from "react-router-dom";

const VerificationSuccess = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="flex items-center px-12 py-6 border-b border-black">
        <Link to="/" className="flex items-center gap-2">
          <img className="w-36 h-[28px]" alt="Riverpe Logo" src="/Logo.png" />
        </Link>
      </header>

      {/* Content */}
      <main className="flex-1 flex flex-col items-center px-4">
        <img
          src="/IDCard-v-2.png"
          alt="Verified"
          className="w-[140px] h-[140px] object-contain mt-16 mb-8"
        />

        <h1 className="text-3xl font-bold text-center mb-4">
          You’re now verified!
        </h1>

        <p className="max-w-[35rem] justify-text text-md text-gray-700 leading-relaxed mb-8">
          Your profile is verified. Start by setting up your USD receiving
          details so you can accept payments from anywhere. When payments
          arrive, add a bank account to withdraw in INR with fees shown upfront
          and a receipt for every step.
        </p>

        <button
          onClick={() => navigate("/dashboard")}
          className="w-[34rem] max-w-[90vw] py-3 rounded-lg bg-[#0a58f0] hover:bg-[#0a4bdd] text-white font-semibold"
        >
          See your dashboard!
        </button>
      </main>
    </div>
  );
};

export default VerificationSuccess;