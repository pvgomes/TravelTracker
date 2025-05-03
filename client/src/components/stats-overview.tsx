import { Visit } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import { GlobeIcon, MapIcon, PercentIcon, CalendarIcon } from "lucide-react";
import { format } from "date-fns";

// Map continents to countries for statistics
const countryToContinentMap: Record<string, string> = {
  // This is a simplified mapping - in a real app, you would have a complete mapping
  "US": "North America", "CA": "North America", "MX": "North America",
  "BR": "South America", "AR": "South America", "CO": "South America",
  "GB": "Europe", "FR": "Europe", "DE": "Europe", "IT": "Europe", "ES": "Europe",
  "RU": "Europe", "UA": "Europe", "PL": "Europe", "SE": "Europe", "NO": "Europe",
  "CN": "Asia", "IN": "Asia", "JP": "Asia", "KR": "Asia", "TH": "Asia",
  "AU": "Oceania", "NZ": "Oceania", "FJ": "Oceania",
  "EG": "Africa", "ZA": "Africa", "MA": "Africa", "NG": "Africa", "KE": "Africa",
};

interface StatsOverviewProps {
  visits: Visit[];
}

export function StatsOverview({ visits }: StatsOverviewProps) {
  // Countries visited
  const countriesVisited = visits.length;
  
  // Continents explored
  const continentsVisited = new Set(
    visits
      .map(visit => countryToContinentMap[visit.countryCode] || "Unknown")
      .filter(continent => continent !== "Unknown")
  ).size;
  
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
