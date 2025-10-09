import { Outlet } from "react-router-dom";
import Sidebar from "../common/Sidebar";
import Header from "../common/Header";

export const DashboardLayout = (): JSX.Element => {
  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col">
      {/* Header spans full width at the top */}
      <Header />
      
      {/* Main container with sidebar and content */}
      <div className="flex flex-1 px-20">
        {/* Sidebar on the left */}
        <Sidebar />
        
        {/* Main content area */}
        <main className="flex-1 px-12 pb-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
