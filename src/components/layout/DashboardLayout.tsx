import { Outlet } from "react-router-dom";
import Sidebar from "../common/Sidebar";
import Header from "../common/Header";

export const DashboardLayout = (): JSX.Element => {
  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col">
      {/* Header spans the top and stays fixed while scrolling */}
      <div className="sticky top-0 z-40 bg-[#FAFAFA]">
        <div className="px-20">
          <Header />
        </div>
      </div>

      {/* Main container with sidebar and scrollable content */}
      <div className="flex flex-1 px-20 gap-12 pb-8">
        {/* Sidebar on the left, aligned under the header */}
        <div className="sticky top-[120px] h-[calc(100vh-120px)] flex-shrink-0">
          <Sidebar />
        </div>

        {/* Main content area */}
        <main className="flex-1 min-h-[calc(100vh-120px)] overflow-y-auto px-12 pt-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
