import { Outlet } from "react-router-dom";
import { CustomerNavbar } from "../customer/common/desktop-navbar";
import { CustomerFooter } from "../customer/common/CustomerFooter";

export function CustomerLayout() {
  return (
    // 'flex flex-col' allows the main content to expand and push the footer down
    <div className="relative flex min-h-screen flex-col bg-background antialiased">
      
      {/* 1. NAVIGATION */}
      <CustomerNavbar />

      {/* 2. MAIN CONTENT AREA */}
      {/* 'flex-1' is the magic: it grows to fill all available space */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* 3. FOOTER */}
      <CustomerFooter />
      
    </div>
  );
}