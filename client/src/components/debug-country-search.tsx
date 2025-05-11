import { useState, useEffect, useRef } from "react";
import { Country } from "country-state-city";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";

// Simple dropdown component that works without any recursion issues
export function DebugCountrySearch({
  onSelect,
  selectedCode
}: {
  onSelect: (country: { code: string; name: string }) => void;
  selectedCode?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [countries, setCountries] = useState<{code: string, name: string}[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Load countries safely
  useEffect(() => {
    try {
      const allCountries = Country.getAllCountries().map(country => ({
        code: country.isoCode,
        name: country.name
      }));
      
      // Make sure Qatar is included
      if (!allCountries.some(country => country.code === "QA")) {
        allCountries.push({ code: "QA", name: "Qatar" });
      }
      
      setCountries(allCountries);
    } catch (error) {
      console.error("Error loading countries:", error);
      // Fallback to a minimal list
      setCountries([
        { code: "US", name: "United States" },
        { code: "UK", name: "United Kingdom" },
        { code: "CA", name: "Canada" },
        { code: "QA", name: "Qatar" },
        { code: "JP", name: "Japan" },
        { code: "FR", name: "France" },
        { code: "DE", name: "Germany" }
      ]);
    }
  }, []);
  
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
  
  const filteredCountries = countries.filter(country => 
    country.name.toLowerCase().includes(searchInput.toLowerCase())
  );
  
  const selectedCountry = countries.find(country => country.code === selectedCode);
  
  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div 
        className="border rounded-md flex justify-between items-center p-2 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={selectedCountry ? "" : "text-muted-foreground"}>
          {selectedCountry ? selectedCountry.name : "Select a country..."}
        </span>
        <Button variant="ghost" size="sm" className="p-1">
          {isOpen ? <ChevronUpIcon size={16} /> : <ChevronDownIcon size={16} />}
        </Button>
      </div>
      
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full border rounded-md bg-white shadow-lg max-h-60 overflow-auto">
          <Input
            type="text"
            placeholder="Search country..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onClick={(e) => e.stopPropagation()}
            className="border-none focus-visible:ring-0"
            autoFocus
          />
          
          <div className="py-1">
            {filteredCountries.length === 0 ? (
              <div className="px-4 py-2 text-sm text-muted-foreground">No countries found</div>
            ) : (
              filteredCountries.map(country => (
                <div
                  key={country.code}
                  className={`px-4 py-2 text-sm cursor-pointer hover:bg-muted ${
                    selectedCode === country.code ? "bg-muted" : ""
                  }`}
                  onClick={() => {
                    onSelect(country);
                    setIsOpen(false);
                    setSearchInput("");
                  }}
                >
                  {country.name}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}