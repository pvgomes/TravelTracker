import { Visit } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import { GlobeIcon, MapIcon, PercentIcon, CalendarIcon, ClipboardListIcon } from "lucide-react";
import { State } from "country-state-city";
import { format } from "date-fns";

// Map continents to countries for statistics
const countryToContinentMap: Record<string, string> = {
  // North America
  "US": "North America", "CA": "North America", "MX": "North America",
  "BZ": "North America", "CR": "North America", "CU": "North America",
  "DO": "North America", "SV": "North America", "GT": "North America",
  "HT": "North America", "HN": "North America", "JM": "North America",
  "NI": "North America", "PA": "North America", "PR": "North America",
  
  // South America
  "BR": "South America", "AR": "South America", "CO": "South America",
  "CL": "South America", "EC": "South America", "GY": "South America",
  "PY": "South America", "PE": "South America", "SR": "South America",
  "UY": "South America", "VE": "South America", "BO": "South America",
  
  // Europe
  "GB": "Europe", "FR": "Europe", "DE": "Europe", "IT": "Europe", "ES": "Europe",
  "RU": "Europe", "UA": "Europe", "PL": "Europe", "SE": "Europe", "NO": "Europe",
  "AL": "Europe", "AT": "Europe", "BY": "Europe", "BE": "Europe", "BA": "Europe",
  "BG": "Europe", "HR": "Europe", "CZ": "Europe", "DK": "Europe", "EE": "Europe",
  "FI": "Europe", "GR": "Europe", "HU": "Europe", "IS": "Europe", "IE": "Europe",
  "LV": "Europe", "LT": "Europe", "LU": "Europe", "MK": "Europe", "MT": "Europe",
  "MD": "Europe", "ME": "Europe", "NL": "Europe", "PT": "Europe", "RO": "Europe",
  "RS": "Europe", "SK": "Europe", "SI": "Europe", "CH": "Europe", "TR": "Europe",
  
  // Asia
  "CN": "Asia", "IN": "Asia", "JP": "Asia", "KR": "Asia", "TH": "Asia",
  "MY": "Asia", "ID": "Asia", "PH": "Asia", "VN": "Asia", "SG": "Asia",
  "AF": "Asia", "AM": "Asia", "AZ": "Asia", "BH": "Asia", "BD": "Asia",
  "BT": "Asia", "KH": "Asia", "GE": "Asia", "IR": "Asia", "IQ": "Asia",
  "IL": "Asia", "JO": "Asia", "KZ": "Asia", "KW": "Asia", "KG": "Asia",
  "LA": "Asia", "LB": "Asia", "MV": "Asia", "MN": "Asia", "MM": "Asia",
  "NP": "Asia", "KP": "Asia", "OM": "Asia", "PK": "Asia", "PS": "Asia",
  "QA": "Asia", "SA": "Asia", "LK": "Asia", "SY": "Asia", "TW": "Asia",
  "TJ": "Asia", "TM": "Asia", "AE": "Asia", "UZ": "Asia", "YE": "Asia",
  
  // Oceania
  "AU": "Oceania", "NZ": "Oceania", "FJ": "Oceania", 
  "PG": "Oceania", "SB": "Oceania", "VU": "Oceania",
  
  // Africa
  "EG": "Africa", "ZA": "Africa", "MA": "Africa", "NG": "Africa", "KE": "Africa",
  "DZ": "Africa", "AO": "Africa", "BJ": "Africa", "BW": "Africa", "BF": "Africa",
  "BI": "Africa", "CV": "Africa", "CM": "Africa", "CF": "Africa", "TD": "Africa",
  "KM": "Africa", "CD": "Africa", "CG": "Africa", "CI": "Africa", "DJ": "Africa",
  "GQ": "Africa", "ER": "Africa", "SZ": "Africa", "ET": "Africa", "GA": "Africa",
  "GM": "Africa", "GH": "Africa", "GN": "Africa", "GW": "Africa", "LS": "Africa",
  "LR": "Africa", "LY": "Africa", "MG": "Africa", "MW": "Africa", "ML": "Africa",
  "MR": "Africa", "MU": "Africa", "MZ": "Africa", "NA": "Africa", "NE": "Africa",
  "RW": "Africa", "ST": "Africa", "SN": "Africa", "SC": "Africa", "SL": "Africa",
  "SO": "Africa", "SS": "Africa", "SD": "Africa", "TZ": "Africa", "TG": "Africa",
  "TN": "Africa", "UG": "Africa", "ZM": "Africa", "ZW": "Africa",
};

interface StatsOverviewProps {
  visits: Visit[];
}

// Function to determine if a country has been fully or partially visited
function getCountryVisitStatus(countryCode: string, visits: Visit[]) {
  // Get all states for this country
  const allStates = State.getStatesOfCountry(countryCode);
  
  if (!allStates || allStates.length === 0) {
    // If the country has no states in our database, a single visit means it's fully visited
    return visits.some(v => v.countryCode === countryCode) ? 'full' : 'none';
  }
  
  // Get all visits for this country
  const countryVisits = visits.filter(v => v.countryCode === countryCode);
  
  if (countryVisits.length === 0) {
    return 'none'; // No visits to this country
  }
  
  // Get all unique states visited in this country
  const visitedStates = new Set(countryVisits.map(v => v.state).filter(Boolean));
  
  // Check if all states are visited (comparing count is a simplification)
  if (visitedStates.size >= allStates.length) {
    return 'full'; // All states visited
  }
  
  return 'partial'; // Some states visited
}

export function StatsOverview({ visits }: StatsOverviewProps) {
  // Get unique country codes from visits
  const countryCodesSet = new Set<string>();
  visits.forEach(visit => countryCodesSet.add(visit.countryCode));
  const uniqueCountryCodes = Array.from(countryCodesSet);
  
  // Categorize countries by visit status
  const visitStats = {
    full: 0,
    partial: 0,
    none: 0
  };
  
  uniqueCountryCodes.forEach(code => {
    const status = getCountryVisitStatus(code, visits);
    visitStats[status] += 1;
  });
  
  // Total countries visited (fully or partially)
  const countriesVisited = visitStats.full + visitStats.partial;
  
  // Continents explored
  const continentsSet = new Set<string>();
  visits.forEach(visit => {
    const continent = countryToContinentMap[visit.countryCode];
    if (continent && continent !== "Unknown") {
      continentsSet.add(continent);
    }
  });
  
  const continentsVisited = continentsSet.size;
  
  // Log any unknown countries for debugging
  const unknownCountries = visits
    .filter(visit => !countryToContinentMap[visit.countryCode])
    .map(visit => `${visit.countryName} (${visit.countryCode})`);
  
  if (unknownCountries.length > 0) {
    console.log("Countries not mapped to continents:", unknownCountries);
  }
  
  // World exploration percentage (very approximate)
  const totalCountries = 195; // Approximate number of countries in the world
  const worldPercentage = (countriesVisited / totalCountries * 100).toFixed(1);
  
  // Last trip
  const sortedVisits = [...visits].sort((a, b) => 
    new Date(b.visitDate).getTime() - new Date(a.visitDate).getTime()
  );
  
  const lastTrip = sortedVisits.length > 0 
    ? `${sortedVisits[0].countryName} (${format(new Date(sortedVisits[0].visitDate), "MMM yyyy")})`
    : "None yet";
  
  return (
    <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-primary rounded-md p-3">
              <GlobeIcon className="h-5 w-5 text-white" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <div className="text-sm font-medium text-muted-foreground truncate">Countries Visited</div>
              <div className="text-lg font-semibold">{countriesVisited}</div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-[#10b981] rounded-md p-3">
              <ClipboardListIcon className="h-5 w-5 text-white" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <div className="text-sm font-medium text-muted-foreground truncate">Visit Status</div>
              <div className="text-sm">
                <span className="text-lg font-semibold">{visitStats.full}</span> Full
                <span className="mx-1">·</span>
                <span className="text-lg font-semibold">{visitStats.partial}</span> Partial
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-[#f59e0b] rounded-md p-3">
              <MapIcon className="h-5 w-5 text-white" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <div className="text-sm font-medium text-muted-foreground truncate">Continents Explored</div>
              <div className="text-lg font-semibold">{continentsVisited}</div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-secondary rounded-md p-3">
              <PercentIcon className="h-5 w-5 text-white" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <div className="text-sm font-medium text-muted-foreground truncate">World Explored</div>
              <div className="text-lg font-semibold">{worldPercentage}%</div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-primary rounded-md p-3">
              <CalendarIcon className="h-5 w-5 text-white" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <div className="text-sm font-medium text-muted-foreground truncate">Last Trip</div>
              <div className="text-lg font-semibold truncate">{lastTrip}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
