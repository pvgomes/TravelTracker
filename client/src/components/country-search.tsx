import { useState, useEffect, useRef } from "react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Country } from "country-state-city";

// Use the comprehensive country list from the country-state-city library
const COUNTRIES = Country.getAllCountries().map(country => ({
  code: country.isoCode,
  name: country.name
}));

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
    : COUNTRIES.filter(country => {
        const searchLower = searchValue.toLowerCase();
        const nameLower = country.name.toLowerCase();
        const codeLower = country.code.toLowerCase();
        
        // First priority: Check if name or code starts with the search string (best match)
        if (nameLower.startsWith(searchLower) || codeLower.startsWith(searchLower)) {
          return true;
        }
        
        // Second priority: Check if search is a substring of the words in the country name
        // This handles cases like typing "Ita" for "Italy" or "Unit" for "United States"
        const words = nameLower.split(/\s+/);
        for (const word of words) {
          if (word.startsWith(searchLower)) {
            return true;
          }
        }
        
        // Third priority: Check if the search is included anywhere in the name or code
        // This catches any other matches that the above conditions might miss
        return nameLower.includes(searchLower) || codeLower.includes(searchLower);
      });
  
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
