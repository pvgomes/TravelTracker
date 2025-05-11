import { useState, useEffect, useRef } from "react";
import { State } from "country-state-city";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";

// Simple dropdown component for states that only loads after country is selected
export function DebugStateSearch({
  countryCode,
  onSelect,
  selectedState
}: {
  countryCode: string | undefined;
  onSelect: (state: { code: string; name: string }) => void;
  selectedState?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [states, setStates] = useState<{code: string, name: string}[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Load states only after a country is selected
  useEffect(() => {
    if (!countryCode) {
      setStates([]);
      return;
    }
    
    setIsLoading(true);
    try {
      const statesList = State.getStatesOfCountry(countryCode);
      setStates(statesList.map(state => ({
        code: state.isoCode,
        name: state.name
      })));
    } catch (error) {
      console.error("Error loading states:", error);
      setStates([]);
    } finally {
      setIsLoading(false);
    }
  }, [countryCode]);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  const filteredStates = states.filter(state => 
    state.name.toLowerCase().includes(searchInput.toLowerCase())
  );
  
  const selectedStateObj = states.find(state => state.name === selectedState);
  
  if (!countryCode) {
    return (
      <div className="border rounded-md p-2 bg-gray-100 text-gray-500 cursor-not-allowed">
        First select a country
      </div>
    );
  }
  
  if (isLoading) {
    return (
      <div className="border rounded-md p-2 text-gray-500">
        Loading states...
      </div>
    );
  }
  
  if (states.length === 0) {
    return (
      <Input
        type="text"
        placeholder="Enter state or province manually"
        className="w-full"
        onChange={(e) => onSelect({ code: "", name: e.target.value })}
        value={selectedState || ""}
      />
    );
  }
  
  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div 
        className="border rounded-md flex justify-between items-center p-2 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={selectedStateObj ? "" : "text-muted-foreground"}>
          {selectedStateObj ? selectedStateObj.name : "Select a state/province..."}
        </span>
        <Button variant="ghost" size="sm" className="p-1">
          {isOpen ? <ChevronUpIcon size={16} /> : <ChevronDownIcon size={16} />}
        </Button>
      </div>
      
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full border rounded-md bg-white shadow-lg max-h-60 overflow-auto">
          <Input
            type="text"
            placeholder="Search state..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onClick={(e) => e.stopPropagation()}
            className="border-none focus-visible:ring-0"
            autoFocus
          />
          
          <div className="py-1">
            {filteredStates.length === 0 ? (
              <div className="px-4 py-2 text-sm text-muted-foreground">No states found</div>
            ) : (
              filteredStates.map(state => (
                <div
                  key={state.code}
                  className={`px-4 py-2 text-sm cursor-pointer hover:bg-muted ${
                    selectedState === state.name ? "bg-muted" : ""
                  }`}
                  onClick={() => {
                    onSelect(state);
                    setIsOpen(false);
                    setSearchInput("");
                  }}
                >
                  {state.name}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}