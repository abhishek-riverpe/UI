


const FreelancersPage = (): JSX.Element => {
  return (
    <section className="w-full bg-white py-12">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left content */}
        <div className="lg:col-span-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-200 text-emerald-700 px-4 py-2 mb-6">
            <svg
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
            </svg>
            <span className="text-sm font-medium">Instant settlement</span>
          </div>

          {/* Heading */}
          <h1 className="flex gap-x-4 font-semibold leading-[1.05] text-[46px] sm:text-[46px] md:text-[62px] lg:text-[74px] tracking-tight mb-4">
            <span className="text-black">For </span>
            <span className="text-[#0a58f0]">Freelancers</span>
          </h1>

          {/* Sub copy */}
          <p className="text-xl font-semibold text-black mb-2">
            Keep what you earn. Stop losing 5-7% on every withdrawal.
          </p>
          <p className="text-lg font-light text-[#1b1b1b] text-justify leading-8 max-w-[480px]">
            Withdraw from Upwork, Fiverr, and more to your Riverpe USD account for free via ACH. Convert to INR at Google exchange rate — earn ₹7,400 more each month.
          </p>

          {/* CTA */}
          <button className="mt-8 inline-flex items-center justify-center rounded-xl bg-[#0a58f0] hover:bg-[#084acc] text-white font-semibold px-20 py-3">
            Get Started
          </button>
        </div>

        {/* Right image with overlay card */}
        <div className="lg:col-span-6">
          <div className="relative">
            <img
              src="/forFreelancer.png"
              alt="Freelancer"
              className="w-[540px] h-[620px] object-cover rounded-[28px]"
            />

            {/* Overlay payout card */}
            <div className="absolute bottom-6 left-6 right-6 bg-white rounded-2xl shadow-md px-3 py-2 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src="/upWorkLogo.svg"  />
                <span className="font-semibold text-black">Upwork Client</span>
              </div>
              <span className="text-emerald-600 font-semibold text-lg">
                +7,400 INR
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FreelancersPage;