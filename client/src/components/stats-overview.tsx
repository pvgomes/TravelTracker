import { Visit } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import { GlobeIcon, MapIcon, PercentIcon, CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { getCountryByCode } from "@/data/countries";

interface StatsOverviewProps {
  visits: Visit[];
}

// Function to determine if a country has been visited
function getCountryVisitStatus(countryCode: string, visits: Visit[]) {
  // Get all visits for this country
  const countryVisits = visits.filter(v => v.countryCode === countryCode);
  
  // Simple: if there are any visits to this country, it's considered visited
  return countryVisits.length > 0 ? 'visited' : 'none';
}

interface ExtendedStatsOverviewProps extends StatsOverviewProps {
  homeCountryCode?: string;
}

export function StatsOverview({ visits, homeCountryCode }: ExtendedStatsOverviewProps) {
  // Get unique country codes from visits
  const countryCodesSet = new Set<string>();
  visits.forEach(visit => countryCodesSet.add(visit.countryCode));
  
  // Add home country to the set of visited countries if it exists and not already added
  if (homeCountryCode && !countryCodesSet.has(homeCountryCode)) {
    countryCodesSet.add(homeCountryCode);
  }
  
  const uniqueCountryCodes = Array.from(countryCodesSet);
  
  // All countries in our list are considered visited
  const countriesVisited = uniqueCountryCodes.length;
  
  // Continents explored
  const continentsSet = new Set<string>();
  
  // Add continents from visits
  visits.forEach(visit => {
    const continent = countryToContinentMap[visit.countryCode];
    if (continent && continent !== "Unknown") {
      continentsSet.add(continent);
    }
  });
  
  // Add home country's continent if it exists
  if (homeCountryCode) {
    const homeContinent = countryToContinentMap[homeCountryCode];
    if (homeContinent && homeContinent !== "Unknown") {
      continentsSet.add(homeContinent);
    }
  }
  
  const continentsVisited = continentsSet.size;
  
  // Disable logging to prevent potential call stack issues
  // const unknownCountries = visits
  //   .filter(visit => !countryToContinentMap[visit.countryCode])
  //   .map(visit => `${visit.countryName} (${visit.countryCode})`);
  
  // if (unknownCountries.length > 0) {
  //   console.log("Countries not mapped to continents:", unknownCountries);
  // }
  
  // World exploration percentage (very approximate)
  const totalCountries = 195; // Approximate number of countries in the world
  const worldPercentage = (countriesVisited / totalCountries * 100).toFixed(1);
  
  // Last trip
  const sortedVisits = [...visits].sort((a, b) => {
    if (!a.visitDate) return 1;
    if (!b.visitDate) return -1;
    return new Date(b.visitDate as string).getTime() - new Date(a.visitDate as string).getTime();
  });
  
  const lastTrip = sortedVisits.length > 0 && sortedVisits[0].visitDate
    ? `${sortedVisits[0].countryName} (${format(new Date(sortedVisits[0].visitDate as string), "MMM yyyy")})`
    : "None yet";
  
  return (
    <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
