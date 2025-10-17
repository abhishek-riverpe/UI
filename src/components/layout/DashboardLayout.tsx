import { Outlet } from "react-router-dom";
import Sidebar from "../common/Sidebar";
import Header from "../common/Header";
import BottomNav from "../common/BottomNav";

export const DashboardLayout = (): JSX.Element => {
  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col px-4 sm:px-6 lg:px-6">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-[#FAFAFA]">
        <div className="px-4 sm:px-6 lg:px-8">
          <Header />
        </div>
      </div>

      {/* Main layout: sidebar collapses on small screens */}
      <div className="flex flex-1  gap-6 lg:gap-1 pb-20 md:pb-8">
        {/* Sidebar (hidden on small screens) */}
        <div className="hidden lg:block sticky top-[120px] h-[calc(100vh-120px)] flex-shrink-0 w-64">
          <Sidebar />
        </div>

        {/* Main content area */}
        <main className="flex-1 min-h-[calc(100vh-120px)] overflow-y-auto md:px-8 lg:px-12 pt-4 md:pt-6">
          <Outlet />
        </main>
      </div>

      {/* Bottom tabs on small screens */}
      <BottomNav />
    </div>
  );
};
