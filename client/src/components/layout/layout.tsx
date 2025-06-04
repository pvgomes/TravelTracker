import { Header } from "./header";
import { Sidebar } from "./sidebar";
import { MobileNav } from "./mobile-nav";
import { ReactNode, useState } from "react";
import { AddCountryDialog } from "../add-country-dialog";
import { Button } from "../ui/button";
import { PlusIcon } from "lucide-react";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [addCountryOpen, setAddCountryOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col dark:bg-background">
      <Header />
      
      <main className="flex-grow flex flex-col md:flex-row">
        <Sidebar />
        
        <div className="md:pl-64 flex flex-col flex-grow">
          <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 md:px-8 py-6">
            <div className="mb-6 flex justify-between items-center">
              <Button 
                variant="outline"
                onClick={() => setAddCountryOpen(true)}
              >
                <PlusIcon className="mr-2 h-4 w-4" />
                Add Country
              </Button>
            </div>
            {children}
          </div>
        </div>
      </main>
      
      <MobileNav />

      <AddCountryDialog 
        open={addCountryOpen}
        onOpenChange={setAddCountryOpen}
      />
    </div>
  );
}