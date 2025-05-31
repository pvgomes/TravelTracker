import { Header } from "./header";
import { Sidebar } from "./sidebar";
import { MobileNav } from "./mobile-nav";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col dark:bg-background">
      <Header />
      
      <main className="flex-grow flex flex-col md:flex-row">
        <Sidebar />
        
        <div className="md:pl-64 flex flex-col flex-grow">
          <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 md:px-8 py-6">
            {children}
          </div>
        </div>
      </main>
      
      <MobileNav />
    </div>
  );
}
