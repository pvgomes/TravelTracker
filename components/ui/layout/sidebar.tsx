import { useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { MapPinIcon, PlusCircleIcon, ListIcon, PieChartIcon } from "lucide-react";

export function Sidebar() {
  const [location] = useLocation();
  
  const navItems = [
    {
      name: "My Travel Map",
      path: "/",
      icon: <MapPinIcon className="w-6 h-6 mr-3" />,
    },
    {
      name: "Add New Country",
      path: "/add",
      icon: <PlusCircleIcon className="w-6 h-6 mr-3" />,
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
    <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 md:pt-16 md:border-r md:border-border bg-white dark:bg-card">
      <div className="flex-grow flex flex-col overflow-y-auto">
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
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
  );
}
