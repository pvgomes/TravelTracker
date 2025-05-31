import { useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { MapPinIcon, PlusCircleIcon, ListIcon, PieChartIcon } from "lucide-react";

export function MobileNav() {
  const [location, setLocation] = useLocation();
  
  const navItems = [
    {
      name: "Map",
      path: "/",
      icon: <MapPinIcon className="w-6 h-6" />,
    },
    {
      name: "Add",
      path: "/add",
      icon: <PlusCircleIcon className="w-6 h-6" />,
    },
    {
      name: "List",
      path: "/countries",
      icon: <ListIcon className="w-6 h-6" />,
    },
    {
      name: "Stats",
      path: "/statistics",
      icon: <PieChartIcon className="w-6 h-6" />,
    },
  ];
  
  return (
    <nav className="md:hidden fixed bottom-0 w-full bg-white dark:bg-card border-t border-border px-4 py-3 z-50">
      <div className="flex justify-around">
        {navItems.map((item) => (
          <a
            key={item.path}
            href={item.path}
            onClick={(e) => {
              e.preventDefault();
              setLocation(item.path);
            }}
            className={cn(
              "flex flex-col items-center",
              location === item.path ? "text-primary" : "text-muted-foreground"
            )}
          >
            {item.icon}
            <span className="text-xs mt-1">{item.name}</span>
          </a>
        ))}
      </div>
    </nav>
  );
}
