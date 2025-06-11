import { useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { MapPinIcon, PlusCircleIcon, ListIcon, PieChartIcon } from "lucide-react";
import { useState } from "react";
import { AddCountryDialog } from "../add-country-dialog";

export function MobileNav() {
  const [location, setLocation] = useLocation();
  const [addCountryOpen, setAddCountryOpen] = useState(false);

  const navItems = [
    {
      name: "Map",
      path: "/",
      icon: <MapPinIcon className="w-6 h-6" />,
      onClick: () => setLocation("/"),
    },
    {
      name: "Add",
      path: "#",
      icon: <PlusCircleIcon className="w-6 h-6" />,
      onClick: () => setAddCountryOpen(true),
    },
    {
      name: "List",
      path: "/countries",
      icon: <ListIcon className="w-6 h-6" />,
      onClick: () => setLocation("/countries"),
    },
    {
      name: "Stats",
      path: "/statistics",
      icon: <PieChartIcon className="w-6 h-6" />,
      onClick: () => setLocation("/statistics"),
    },
  ];

  return (
    <>
      <nav className="md:hidden fixed bottom-0 w-full bg-white dark:bg-card border-t border-border px-4 py-3 z-50">
        <div className="flex justify-around">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={item.onClick}
              className={cn(
                "flex flex-col items-center",
                location === item.path ? "text-primary" : "text-muted-foreground"
              )}
            >
              {item.icon}
              <span className="text-xs mt-1">{item.name}</span>
            </button>
          ))}
        </div>
      </nav>

      <AddCountryDialog 
        open={addCountryOpen}
        onOpenChange={setAddCountryOpen}
      />
    </>
  );
}
