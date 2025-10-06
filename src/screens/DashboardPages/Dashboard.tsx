import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";

export const Dashboard = (): JSX.Element => {

const navigate = useNavigate();
const transactions = [
  {
    icon: (
        <img
        src="upWorkLogo.svg"
        className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-lg"
        alt="Upwork Logo"
      />
    ),
    name: "Steve John",
    contract: "Website Redesign",
    type: "Project Payment",
    badge: {
      color: "bg-green-100 text-green-700 border-green-200",
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M5 8L7 10L11 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      text: "Received"
    },
    amount: "$2,500.00",
    amountColor: "text-green-600"
  },
  {
    icon: (
      <div className="w-12 h-12 rounded-lg overflow-hidden">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <rect width="48" height="16" fill="#FF9933"/>
          <rect y="16" width="48" height="16" fill="white"/>
          <rect y="32" width="48" height="16" fill="#138808"/>
          <circle cx="24" cy="24" r="4" fill="#000080"/>
        </svg>
      </div>
    ),
    name: "USD to INR",
    contract: "Currency Conversion",
    type: "Project Payment",
    badge: {
      color: "bg-blue-100 text-blue-700 border-blue-200",
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 3V8M8 8L11 5M8 8L5 5M3 13H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      text: "Converted"
    },
    amount: "₹87,329.39",
    amountColor: "text-blue-600"
  },
  {
    icon: (
      <img
        src="upWorkLogo.svg"
        className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-lg"
        alt="Upwork Logo"
      />
    ),
    name: "Client Name",
    contract: "Contract Name",
    type: "Project Payment",
    badge: {
      color: "bg-red-100 text-red-700 border-red-200",
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M6 6L10 10M10 6L6 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      ),
      text: "Failed"
    },
    amount: "$0.00",
    amountColor: "text-gray-900"
  },
  {
    icon: (
        <img
        src="upWorkLogo.svg"
        className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-lg"
        alt="Upwork Logo"
      />
    ),
    name: "Client Name",
    contract: "Contract Name",
    type: "Project Payment",
    badge: {
      color: "bg-gray-100 text-gray-700 border-gray-200",
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M8 4V8L10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      ),
      text: "Pending"
    },
    amount: "$2,500.00",
    amountColor: "text-gray-900"
  }
];


  return (
    <div className="min-h-screen bg-white flex">
      <aside className="w-64 border-r border-gray-200 p-6 flex flex-col gap-2">
        <div className="mb-8">
          <img
          onClick={()=>{navigate("/")}}
            className="w-36 h-[27.83px] cursor-pointer"
            alt="Riverpe Logo"
            src="/Logo.png"
          />
        </div>

        <button className="flex items-center gap-3 px-4 py-3 bg-[#2e5cef] text-white rounded-lg [font-family:'Archivo',Helvetica] font-medium text-base hover:bg-[#2449c8] transition-colors">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 10L10 3L17 10M5 8V17H8V13H12V17H15V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Home
        </button>

        <button className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg [font-family:'Archivo',Helvetica] font-medium text-base hover:bg-gray-100 transition-colors">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="4" width="14" height="13" rx="2" stroke="currentColor" strokeWidth="2"/>
            <path d="M7 4V2M13 4V2M3 8H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          Bank
        </button>

        <button className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg [font-family:'Archivo',Helvetica] font-medium text-base hover:bg-gray-100 transition-colors">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 7L10 3L16 7M4 7V16L10 20M4 7L10 11M16 7V16L10 20M16 7L10 11M10 11V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Transactions
        </button>

        <button className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg [font-family:'Archivo',Helvetica] font-medium text-base hover:bg-gray-100 transition-colors">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="10" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
            <path d="M3 18C3 14.134 6.134 11 10 11C13.866 11 17 14.134 17 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          Clients
        </button>

        <button className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg [font-family:'Archivo',Helvetica] font-medium text-base hover:bg-gray-100 transition-colors">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 14L7 10L11 14L17 8M17 8V12M17 8H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Insights
        </button>
      </aside>

      <main className="flex-1 p-8">
        <header className="flex items-center justify-end mb-8">
          <button className="flex items-center gap-3 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="w-10 h-10 bg-[#2e5cef] rounded-lg flex items-center justify-center text-white [font-family:'Archivo',Helvetica] font-semibold text-sm">
              JD
            </div>
            <span className="[font-family:'Archivo',Helvetica] font-medium text-base text-black">
              Jane Doe
            </span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 8L10 11L13 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </header>

        <div className="mb-8">
          <p className="[font-family:'Archivo',Helvetica] font-normal text-sm text-gray-600 mb-2">
            Total balance
          </p>
          <h1 className="[font-family:'Archivo',Helvetica] font-bold text-5xl text-black">
            ₹87,329.39
          </h1>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card className="p-6 border border-gray-300 rounded-2xl bg-white hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="40" height="13.33" fill="#FF9933"/>
                  <rect y="13.33" width="40" height="13.34" fill="white"/>
                  <rect y="26.67" width="40" height="13.33" fill="#138808"/>
                  <circle cx="20" cy="20" r="3" fill="#000080"/>
                </svg>
              </div>
              <span className="[font-family:'Archivo',Helvetica] font-semibold text-lg text-black">
                INR
              </span>
              <button className="ml-auto p-1 hover:bg-gray-100 rounded">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 5C10.5523 5 11 4.55228 11 4C11 3.44772 10.5523 3 10 3C9.44772 3 9 3.44772 9 4C9 4.55228 9.44772 5 10 5Z" fill="currentColor"/>
                  <path d="M10 11C10.5523 11 11 10.5523 11 10C11 9.44772 10.5523 9 10 9C9.44772 9 9 9.44772 9 10C9 10.5523 9.44772 11 10 11Z" fill="currentColor"/>
                  <path d="M10 17C10.5523 17 11 16.5523 11 16C11 15.4477 10.5523 15 10 15C9.44772 15 9 15.4477 9 16C9 16.5523 9.44772 17 10 17Z" fill="currentColor"/>
                </svg>
              </button>
              <span className="[font-family:'Archivo',Helvetica] font-normal text-sm text-gray-600">
                ••0763
              </span>
            </div>
            <p className="[font-family:'Archivo',Helvetica] font-bold text-3xl text-black">
              ₹45,329.39
            </p>
          </Card>

          <Card className="p-6 border border-gray-300 rounded-2xl bg-white hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="40" height="40" fill="#B22234"/>
                  <rect width="40" height="3.08" fill="white"/>
                  <rect y="6.15" width="40" height="3.08" fill="white"/>
                  <rect y="12.31" width="40" height="3.08" fill="white"/>
                  <rect y="18.46" width="40" height="3.08" fill="white"/>
                  <rect y="24.62" width="40" height="3.08" fill="white"/>
                  <rect y="30.77" width="40" height="3.08" fill="white"/>
                  <rect y="36.92" width="40" height="3.08" fill="white"/>
                  <rect width="16" height="21.54" fill="#3C3B6E"/>
                </svg>
              </div>
              <span className="[font-family:'Archivo',Helvetica] font-semibold text-lg text-black">
                USD
              </span>
              <button className="ml-auto p-1 hover:bg-gray-100 rounded">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 5C10.5523 5 11 4.55228 11 4C11 3.44772 10.5523 3 10 3C9.44772 3 9 3.44772 9 4C9 4.55228 9.44772 5 10 5Z" fill="currentColor"/>
                  <path d="M10 11C10.5523 11 11 10.5523 11 10C11 9.44772 10.5523 9 10 9C9.44772 9 9 9.44772 9 10C9 10.5523 9.44772 11 10 11Z" fill="currentColor"/>
                  <path d="M10 17C10.5523 17 11 16.5523 11 16C11 15.4477 10.5523 15 10 15C9.44772 15 9 15.4477 9 16C9 16.5523 9.44772 17 10 17Z" fill="currentColor"/>
                </svg>
              </button>
              <span className="[font-family:'Archivo',Helvetica] font-normal text-sm text-gray-600">
                ••0763
              </span>
            </div>
            <p className="[font-family:'Archivo',Helvetica] font-bold text-3xl text-black">
              $2,329.39
            </p>
          </Card>

          <Card className="p-6 border-2 border-dashed border-gray-300 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer flex flex-col items-center justify-center">
            <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center mb-3 relative">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5V19M5 12H19" stroke="#666" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#2e5cef] rounded-full text-white text-xs flex items-center justify-center font-semibold">
                2
              </div>
            </div>
            <p className="[font-family:'Archivo',Helvetica] font-normal text-sm text-gray-700 text-center">
              Add another currency to your account
            </p>
          </Card>
        </div>

        <div className="flex gap-3 mb-8">
          <Button className="bg-[#2e5cef] hover:bg-[#2449c8] text-white px-6 py-3 rounded-lg [font-family:'Archivo',Helvetica] font-medium text-base flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="2"/>
              <path d="M10 7V13M7 10H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Add money
          </Button>
          <Button className="bg-[#2e5cef] hover:bg-[#2449c8] text-white px-6 py-3 rounded-lg [font-family:'Archivo',Helvetica] font-medium text-base flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17 10L10 3M17 10L10 17M17 10H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Send money
          </Button>
          <Button className="bg-[#2e5cef] hover:bg-[#2449c8] text-white px-6 py-3 rounded-lg [font-family:'Archivo',Helvetica] font-medium text-base flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="6" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="2"/>
              <path d="M7 6V4C7 2.89543 7.89543 2 9 2H11C12.1046 2 13 2.89543 13 4V6M3 10H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Withdraw money
          </Button>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="[font-family:'Archivo',Helvetica] font-semibold text-2xl text-black">
              Recent transactions
            </h2>
            <button className="[font-family:'Archivo',Helvetica] font-medium text-sm text-black underline hover:text-gray-700">
              View all
            </button>
          </div>

        <div className="flex flex-col gap-3">
  {transactions.map((tx, idx) => (
    <Card key={idx} className="p-5 border border-gray-200 rounded-xl bg-white hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4">
        {tx.icon}
        <div className="flex-1">
          <p className="[font-family:'Archivo',Helvetica] font-semibold text-base text-black">
            {tx.name}
          </p>
          <p className="[font-family:'Archivo',Helvetica] font-normal text-sm text-gray-600">
            {tx.contract}
          </p>
          <p className="[font-family:'Archivo',Helvetica] font-normal text-xs text-gray-500">
            {tx.type}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Badge className={`${tx.badge.color} px-3 py-1 [font-family:'Archivo',Helvetica] font-medium text-sm flex items-center gap-1`}>
            {tx.badge.icon}
            {tx.badge.text}
          </Badge>
          <p className={`[font-family:'Archivo',Helvetica] font-bold text-lg ${tx.amountColor}`}>
            {tx.amount}
          </p>
        </div>
      </div>
    </Card>
  ))}
</div>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="[font-family:'Archivo',Helvetica] font-semibold text-2xl text-black">
              Monthly Insights
            </h2>
            <button className="[font-family:'Archivo',Helvetica] font-medium text-sm text-black underline hover:text-gray-700">
              View all
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Card className="p-6 border border-gray-200 rounded-xl bg-white">
              <p className="[font-family:'Archivo',Helvetica] font-medium text-base text-gray-700 mb-4">
                This Month
              </p>
              <p className="[font-family:'Archivo',Helvetica] font-bold text-3xl text-green-600 mb-3">
                ₹87,329.39
              </p>
              <div className="flex items-center gap-2 mb-2">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 12V4M8 4L4 8M8 4L12 8" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="[font-family:'Archivo',Helvetica] font-medium text-sm text-green-600">
                  +18.2% from last month
                </span>
              </div>
              <p className="[font-family:'Archivo',Helvetica] font-normal text-sm text-gray-600">
                4 payments received
              </p>
            </Card>

            <Card className="p-6 border border-gray-200 rounded-xl bg-white">
              <p className="[font-family:'Archivo',Helvetica] font-medium text-base text-gray-700 mb-4">
                Pending Payments
              </p>
              <p className="[font-family:'Archivo',Helvetica] font-bold text-3xl text-orange-600 mb-3">
                $2,150.00
              </p>
              <p className="[font-family:'Archivo',Helvetica] font-normal text-sm text-gray-600 mb-4">
                2 invoices pending
              </p>
              <Button variant="outline" className="w-full border-gray-300 hover:bg-gray-50 [font-family:'Archivo',Helvetica] font-medium text-sm">
                Follow Up
              </Button>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};
