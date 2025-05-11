import { useState, useEffect, useRef } from "react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

// List of countries with codes (this would typically come from a library like world-countries)
// Simplified list for brevity
const COUNTRIES = [
  { code: "US", name: "United States" },
  { code: "CA", name: "Canada" },
  { code: "MX", name: "Mexico" },
  { code: "BR", name: "Brazil" },
  { code: "AR", name: "Argentina" },
  { code: "GB", name: "United Kingdom" },
  { code: "FR", name: "France" },
  { code: "DE", name: "Germany" },
  { code: "IT", name: "Italy" },
  { code: "ES", name: "Spain" },
  { code: "PT", name: "Portugal" },
  { code: "NL", name: "Netherlands" },
  { code: "BE", name: "Belgium" },
  { code: "CH", name: "Switzerland" },
  { code: "AT", name: "Austria" },
  { code: "GR", name: "Greece" },
  { code: "RU", name: "Russia" },
  { code: "CN", name: "China" },
  { code: "JP", name: "Japan" },
  { code: "KR", name: "South Korea" },
  { code: "IN", name: "India" },
  { code: "AU", name: "Australia" },
  { code: "NZ", name: "New Zealand" },
  { code: "ZA", name: "South Africa" },
  { code: "EG", name: "Egypt" },
  { code: "MA", name: "Morocco" },
  { code: "NG", name: "Nigeria" },
  { code: "KE", name: "Kenya" },
  { code: "SA", name: "Saudi Arabia" },
  { code: "AE", name: "United Arab Emirates" },
  { code: "TR", name: "Turkey" },
  { code: "TH", name: "Thailand" },
  { code: "VN", name: "Vietnam" },
  { code: "SG", name: "Singapore" },
  { code: "MY", name: "Malaysia" },
  { code: "ID", name: "Indonesia" },
  { code: "PH", name: "Philippines" },
  { code: "FI", name: "Finland" },
  { code: "SE", name: "Sweden" },
  { code: "NO", name: "Norway" },
  { code: "DK", name: "Denmark" },
  { code: "IS", name: "Iceland" },
  { code: "IE", name: "Ireland" },
  { code: "PL", name: "Poland" },
  { code: "CZ", name: "Czech Republic" },
  { code: "AT", name: "Austria" },
  { code: "HU", name: "Hungary" },
  { code: "UA", name: "Ukraine" },
  { code: "RO", name: "Romania" },
  { code: "BG", name: "Bulgaria" },
];

interface CountrySearchProps {
  onCountrySelect: (country: { code: string; name: string }) => void;
  selectedCountryCode?: string;
}

export function CountrySearch({ onCountrySelect, selectedCountryCode }: CountrySearchProps) {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  
  const selectedCountry = COUNTRIES.find(country => country.code === selectedCountryCode);
  
  const inputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);
  
  const filteredCountries = searchValue === ""
    ? COUNTRIES
    : COUNTRIES.filter(country => 
        country.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        country.code.toLowerCase().includes(searchValue.toLowerCase())
      );
  
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedCountry ? selectedCountry.name : "Select a country..."}
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput 
            placeholder="Search country..." 
            ref={inputRef}
            value={searchValue}
            onValueChange={setSearchValue}
          />
          <CommandList>
            <CommandEmpty>No country found.</CommandEmpty>
            <CommandGroup>
              <ScrollArea className="h-72">
                {filteredCountries.map(country => (
                  <CommandItem
                    key={country.code}
                    value={country.code}
                    onSelect={() => {
                      onCountrySelect(country);
                      setOpen(false);
                      setSearchValue("");
                    }}
                  >
                    <CheckIcon
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedCountryCode === country.code ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {country.name} ({country.code})
                  </CommandItem>
                ))}
              </ScrollArea>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
