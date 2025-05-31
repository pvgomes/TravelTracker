import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@hooks/use-auth";

// Simplified header to avoid potential issues
export function Header() {
  const { user, logoutMutation } = useAuth();
  
  const handleLogout = () => {
    logoutMutation.mutate();
  };
  
  return (
    <header className="bg-white dark:bg-card shadow-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:pl-64">
        <div className="flex justify-between h-16">
          <div className="flex items-center pl-2 sm:pl-0">
            <h1 className="font-montserrat font-bold text-2xl text-primary">TravelTracker</h1>
          </div>
          
          <div className="flex items-center">
            {user ? (
              <Button variant="ghost" onClick={handleLogout} className="text-sm">
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </Button>
            ) : (
              <span className="text-sm text-muted-foreground">Not logged in</span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
