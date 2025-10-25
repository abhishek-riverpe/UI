import { useLocation, useNavigate } from "react-router-dom";

type Item = {
  label: string;
  to: string;
  icon: JSX.Element;
};

const NavIcon = ({ path }: { path: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d={path} />
  </svg>
);

export default function BottomNav() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const items: Item[] = [
    { label: "Home", to: "/dashboard", icon: <NavIcon path="M4 11.5L12 4l8 7.5M6.5 10v8.5H11v-5h2v5h4.5V10" /> },
    { label: "Bank", to: "/dashboard/bank", icon: <NavIcon path="M4 10h16M5 10v8m4-8v8m6-8v8m4-8v8M3 18h18M4 8l8-4 8 4" /> },
    { label: "Withdraw", to: "/dashboard/withdraw", icon: <NavIcon path="M16 19L19 22M19 22L22 19M19 22V16M18 12H18.01M6 12H6.01M14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12M2 8C2 7.46957 2.21071 6.96086 2.58579 6.58579C2.96086 6.21071 3.46957 6 4 6H20C20.5304 6 21.0391 6.21071 21.4142 6.58579C21.7893 6.96086 22 7.46957 22 8V13" /> },
    { label: "Transactions", to: "/dashboard/transactions", icon: <NavIcon path="M16 3L20 7M20 7L16 11M20 7H4M8 21L4 17M4 17L8 13M4 17H20" /> },
    { label: "KYC", to: "/dashboard/kyc", icon: <NavIcon path="M13.5 8H10.5M15 2L14 4H17C18.1046 4 19 4.89543 19 6V20C19 21.1046 18.1046 22 17 22H7C5.89543 22 5 21.1046 5 20V6C5 4.89543 5.89543 4 7 4H10M16.899 22C16.669 20.8702 16.0556 19.8547 15.1628 19.1253C14.2699 18.3959 13.1524 17.9974 11.9995 17.9974C10.8466 17.9974 9.72907 18.3959 8.83621 19.1253C7.94335 19.8547 7.33 20.8702 7.1 22M9 2L12 8M15 15C15 16.6569 13.6569 18 12 18C10.3431 18 9 16.6569 9 15C9 13.3431 10.3431 12 12 12C13.6569 12 15 13.3431 15 15Z" /> },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-gray-200 bg-white py-2 px-3 lg:hidden">
      <ul className="grid grid-cols-5 gap-1">
        {items.map((item) => {
          const active = pathname === item.to || (item.to !== "/dashboard" && pathname.startsWith(item.to));
          return (
            <li key={item.to}>
              <button
                onClick={() => navigate(item.to)}
                className={`flex flex-col items-center justify-center w-full py-1 ${active ? "text-[#0B5FFF]" : "text-gray-800"}`}
              >
                <span className="h-6">{item.icon}</span>
                <span className="text-xs leading-tight mt-1">{item.label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

