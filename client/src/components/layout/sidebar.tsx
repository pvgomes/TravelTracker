import { useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { MapPinIcon, PlusCircleIcon, ListIcon, PieChartIcon } from "lucide-react";
import { useState } from "react";
import { AddCountryDialog } from "../add-country-dialog";

export function Sidebar() {
  const [location] = useLocation();
  const [addCountryOpen, setAddCountryOpen] = useState(false);
  
  const navItems = [
    {
      name: "My Travel Map",
      path: "/",
      icon: <MapPinIcon className="w-6 h-6 mr-3" />,
    },
    {
      name: "Country List",
      path: "/countries",
      icon: <ListIcon className="w-6 h-6 mr-3" />,
    },
    {
      name: "Statistics",
      path: "/statistics",
      icon: <PieChartIcon className="w-6 h-6 mr-3" />,
    },
  ];
  
  return (
    <>
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 md:pt-16 md:border-r md:border-border bg-white dark:bg-card">
        <div className="flex-grow flex flex-col overflow-y-auto">
          <nav className="flex-1 p-4 space-y-1">
            {/* My Travel Map */}
            <a
              href="/"
              className={cn(
                "group flex items-center px-3 py-2 text-sm font-medium rounded-md",
                location === "/"
                  ? "bg-primary text-white"
                  : "text-muted-foreground hover:bg-muted hover:text-primary"
              )}
              aria-current={location === "/" ? "page" : undefined}
            >
              <MapPinIcon className="w-6 h-6 mr-3" />
              My Travel Map
            </a>

            {/* Add New Country Button */}
            <button
              onClick={() => setAddCountryOpen(true)}
              className={cn(
                "group flex items-center px-3 py-2 text-sm font-medium rounded-md w-full text-left",
                "text-muted-foreground hover:bg-muted hover:text-primary"
              )}
            >
              <PlusCircleIcon className="w-6 h-6 mr-3" />
              Add New Country
            </button>

            {/* Remaining Navigation Items */}
            {navItems.slice(1).map((item) => (
              <a
                key={item.path}
                href={item.path}
                className={cn(
                  "group flex items-center px-3 py-2 text-sm font-medium rounded-md",
                  location === item.path
                    ? "bg-primary text-white"
                    : "text-muted-foreground hover:bg-muted hover:text-primary"
                )}
                aria-current={location === item.path ? "page" : undefined}
              >
                {item.icon}
                {item.name}
              </a>
            ))}
          </nav>
        </div>
      </div>

      <AddCountryDialog 
        open={addCountryOpen}
        onOpenChange={setAddCountryOpen}
      />
    </>
  );
}
