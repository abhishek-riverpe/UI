import { useLocation, useNavigate } from "react-router-dom";
import React from "react";

type Item = {
  label: string;
  to: string;
  icon: React.ReactNode;
};

const IconHome = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
    <path d="M4 11.5L12 4l8 7.5M6.5 10v8.5H11v-5h2v5h4.5V10"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconBank = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
    <path d="M4 10h16M5 10v8m4-8v8m6-8v8m4-8v8M3 18h18M4 8l8-4 8 4"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconWithdraw = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 18H4C3.46957 18 2.96086 17.7893 2.58579 17.4142C2.21071 17.0391 2 16.5304 2 16V8C2 7.46957 2.21071 6.96086 2.58579 6.58579C2.96086 6.21071 3.46957 6 4 6H20C20.5304 6 21.0391 6.21071 21.4142 6.58579C21.7893 6.96086 22 7.46957 22 8V13M16 19L19 22M19 22L22 19M19 22V16M18 12H18.01M6 12H6.01M14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
);

const IconTxn = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 3L20 7M20 7L16 11M20 7H4M8 21L4 17M4 17L8 13M4 17H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconReferrals = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H6C4.93913 15 3.92172 15.4214 3.17157 16.1716C2.42143 16.9217 2 17.9391 2 19V21M16 3.128C16.8578 3.35037 17.6174 3.85126 18.1597 4.55206C18.702 5.25286 18.9962 6.11389 18.9962 7C18.9962 7.88611 18.702 8.74714 18.1597 9.44794C17.6174 10.1487 16.8578 10.6496 16 10.872M22 21V19C21.9993 18.1137 21.7044 17.2528 21.1614 16.5523C20.6184 15.8519 19.8581 15.3516 19 15.13M13 7C13 9.20914 11.2091 11 9 11C6.79086 11 5 9.20914 5 7C5 4.79086 6.79086 3 9 3C11.2091 3 13 4.79086 13 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconKyc = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.5 8H10.5M15 2L14 4H17C17.5304 4 18.0391 4.21071 18.4142 4.58579C18.7893 4.96086 19 5.46957 19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6C5 5.46957 5.21071 4.96086 5.58579 4.58579C5.96086 4.21071 6.46957 4 7 4H10M16.899 22C16.669 20.8702 16.0556 19.8547 15.1628 19.1253C14.2699 18.3959 13.1524 17.9974 11.9995 17.9974C10.8466 17.9974 9.72907 18.3959 8.83621 19.1253C7.94335 19.8547 7.33 20.8702 7.1 22M9 2L12 8M15 15C15 16.6569 13.6569 18 12 18C10.3431 18 9 16.6569 9 15C9 13.3431 10.3431 12 12 12C13.6569 12 15 13.3431 15 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>

);

const IconHelp = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
    <path d="M12 8.5v4M12 16h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

function NavItem({
  active,
  icon,
  children,
  onClick,
  showNotification = false,
}: {
  active?: boolean;
  icon: React.ReactNode;
  children: React.ReactNode;
  onClick: () => void;
  showNotification?: boolean;
}) {
  if (active) {
    // Active state with blue background
    return (
      <button
        onClick={onClick}
        className="flex items-center gap-3 rounded-[12px] bg-[#0B5FFF] text-white px-4 py-3 w-full h-12 hover:bg-[#0052CC] transition-colors"
      >
        <span className="text-white">{icon}</span>
        <span className="font-archivo font-normal text-base leading-none tracking-normal">
          {children}
        </span>
      </button>
    );
  }

  return (
    <button 
      onClick={onClick} 
      className="flex items-center gap-3 px-4 py-3 w-full h-12 text-left hover:bg-gray-50 rounded-lg transition-colors relative"
    >
      <span className="text-gray-700">{icon}</span>
      <span className="font-archivo font-normal text-base leading-none tracking-normal text-gray-700 flex-1">
        {children}
      </span>
      {showNotification && (
        <div className="absolute right-3 top-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          15
        </div>
      )}
    </button>
  );
}

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const items: (Item & { showNotification?: boolean })[] = [
    { label: "Dashboard", to: "/dashboard", icon: <IconHome /> },
    { label: "Bank Account", to: "/dashboard/bank", icon: <IconBank />, showNotification: true },
    { label: "Withdraw Funds", to: "/dashboard/withdraw", icon: <IconWithdraw /> },
    { label: "Transaction History", to: "/dashboard/transactions", icon: <IconTxn /> },
    { label: "Referrals", to: "/dashboard/referrals", icon: <IconReferrals /> },
    { label: "KYC", to: "/dashboard/kyc", icon: <IconKyc /> },
    { label: "Support & Help", to: "/dashboard/support", icon: <IconHelp /> },
  ];

  return (
    <aside className="w-[264px] h-full flex flex-col overflow-y-auto">
      {/* Nav */}
      <nav className="px-6 pb-6 flex flex-col gap-[15px]">
        {items.map((it, idx) => {
          const active =
            (it.to === "/dashboard" && pathname === "/dashboard") ||
            (it.to !== "/dashboard" && pathname.startsWith(it.to));
          return (
            <NavItem
              key={idx}
              active={active}
              icon={it.icon}
              onClick={() => navigate(it.to)}
              // showNotification={it.showNotification}
            >
              {it.label}
            </NavItem>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
