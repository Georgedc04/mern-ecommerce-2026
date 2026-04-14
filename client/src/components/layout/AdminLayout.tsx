import { Outlet } from "react-router-dom";
import { AdminSidebar } from "../admin/common/sidebar";
import { UserButton } from "@clerk/react";

// ADMIN STYLES:
// - Sharp corners (rounded-none or sm)
// - High contrast borders (border-zinc-300)
// - Subtle background for the main canvas (bg-zinc-100)
const STYLES = {
  wrapper: "min-h-screen bg-zinc-100/50 selection:bg-cyan-100",
  layout: "flex min-h-screen",
  contentArea: "flex min-w-0 flex-1 flex-col",
  header: "sticky top-0 z-30 flex h-12 items-center gap-4 border-b border-zinc-300 bg-white px-4 lg:px-6 shadow-sm",
  main: "flex-1 p-4 lg:p-6" // Tight but consistent padding
};

export function AdminLayout() {
  return (
    <div className={STYLES.wrapper}>
      <div className={STYLES.layout}>
        {/* --- 1. SIDEBAR --- */}
        <AdminSidebar />

        <div className={STYLES.contentArea}>
          {/* --- 2. UTILITY HEADER --- */}
          {/* Reduced height from h-16 to h-12 for more vertical data room */}
          <header className={STYLES.header}>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-widest text-zinc-400">
                Admin Console
              </span>
            </div>
            
            <div className="ml-auto flex items-center gap-4">
              {/* Internal Admin Info */}
              <div className="hidden border-r border-zinc-200 pr-4 sm:block">
                <p className="text-right text-[10px] font-medium leading-none text-zinc-500 uppercase">
                  Server Status
                </p>
                <p className="text-right text-[11px] font-bold text-green-600">
                  Operational
                </p>
              </div>

              <UserButton 
            /* 1. In Clerk v5, redirection is handled globally or via sign-out options */
            /* If you need a specific redirect just for this button: */
            // signOutOptions={{ sessionId: "...", redirectUrl: "/" }} 

            appearance={{
              elements: {
                /* This keeps the avatar small and professional for the Admin view */
                userButtonAvatarBox: "size-7 border border-zinc-300" 
              }
            }}
          />
            
            </div>
          </header>

          {/* --- 3. CANVAS --- */}
          <main className={STYLES.main}>
            {/* Added a subtle internal container for content consistency */}
            <div className="mx-auto max-w-400 animate-in fade-in duration-500">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}