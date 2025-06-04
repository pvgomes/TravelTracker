import { useState, useEffect } from "react";
import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { WorldMap } from "@/components/world-map";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { GlobeIcon, CalendarIcon, Share2Icon, HomeIcon } from "lucide-react";
import { format } from "date-fns";
import { Visit } from "@shared/schema";

interface SharedUser {
  fullName: string;
  homeCountryCode?: string;
  homeCountryName?: string;
  visits: Visit[];
}

export default function SharedMapPage() {
  const { shareId } = useParams();
  const [shareUrl, setShareUrl] = useState("");
  
  // Get the shared profile data
  const { data, isLoading, error } = useQuery<SharedUser>({
    queryKey: [`/api/public/${shareId}`],
    retry: false,
  });
  
  useEffect(() => {
    setShareUrl(window.location.href);
  }, []);
  
  const copyShareLink = () => {
    navigator.clipboard.writeText(shareUrl);
    // Implement toast notification here if needed
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="w-full max-w-md p-8 space-y-8">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 border-4 border-t-blue-500 border-b-blue-500 border-l-transparent border-r-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-lg font-medium">Loading travel map...</p>
          </div>
        </div>
      </div>
    );
  }
  
  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="w-full max-w-md p-8 space-y-8 text-center">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-red-100 dark:bg-red-900">
              <span className="text-2xl">🌍</span>
            </div>
            <h1 className="mt-4 text-xl font-bold">Travel Map Not Found</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              This shared travel map is no longer available or may have been removed.
            </p>
            <Button className="mt-6" asChild>
              <a href="/">Go to Homepage</a>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Sort visits by date (most recent first)
  const sortedVisits = [...data.visits].sort((a, b) => {
    if (!a.visitDate) return 1;
    if (!b.visitDate) return -1;
    return new Date(b.visitDate as string).getTime() - new Date(a.visitDate as string).getTime();
  });
  
  // Get counts and statistics
  const visitedCountryCodes = new Set(data.visits.map(v => v.countryCode));
  
  // Add home country to statistics if it exists
  if (data.homeCountryCode && !visitedCountryCodes.has(data.homeCountryCode)) {
    visitedCountryCodes.add(data.homeCountryCode);
  }
  
  const countryCount = visitedCountryCodes.size;
  const cityCount = data.visits.length;
  
  // Calculate continents explored
  const continentMapping: Record<string, string> = {
    'US': 'North America', 'CA': 'North America', 'MX': 'North America', 
    'BR': 'South America', 'AR': 'South America', 'CO': 'South America',
    'GB': 'Europe', 'FR': 'Europe', 'DE': 'Europe', 'IT': 'Europe', 'ES': 'Europe',
    'CN': 'Asia', 'JP': 'Asia', 'IN': 'Asia', 'RU': 'Asia',
    'AU': 'Oceania', 'NZ': 'Oceania',
    'ZA': 'Africa', 'EG': 'Africa', 'NG': 'Africa',
    'AQ': 'Antarctica'
  };
  
  const continentsExplored = new Set(
    Array.from(visitedCountryCodes)
      .map(code => continentMapping[code] || 'Unknown')
      .filter(continent => continent !== 'Unknown')
  );
  
  // World exploration percentage (approx. 195 countries in the world)
  const worldExploredPercentage = Math.round((countryCount / 195) * 100);
  
  const lastVisit = sortedVisits.length > 0 && sortedVisits[0].visitDate
    ? `${sortedVisits[0].countryName} (${format(new Date(sortedVisits[0].visitDate as string), "MMM yyyy")})` 
    : "None";
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white font-montserrat">
              {data.fullName}'s Travel Map
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Explore {data.fullName}'s journey across {countryCount} countries and {cityCount} cities!
            </p>
            <p className="mt-1 text-muted-foreground">
              Create your own map on Globalia and track your travels!
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={copyShareLink}>
            <Share2Icon className="mr-2 h-4 w-4" />
            Copy Share Link
          </Button>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-primary rounded-md p-3">
                  <GlobeIcon className="h-5 w-5 text-white" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <div className="text-sm font-medium text-muted-foreground truncate">Countries Visited</div>
                  <div className="text-lg font-semibold">{countryCount}</div>
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
                  <div className="text-sm font-medium text-muted-foreground truncate">Cities Visited</div>
                  <div className="text-lg font-semibold">{cityCount}</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-white">
                    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
                    <line x1="4" y1="22" x2="4" y2="15"></line>
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <div className="text-sm font-medium text-muted-foreground truncate">Continents Explored</div>
                  <div className="text-lg font-semibold">{continentsExplored.size} / 7</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-purple-500 rounded-md p-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-white">
                    <path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path>
                    <path d="M22 12A10 10 0 0 0 12 2v10z"></path>
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <div className="text-sm font-medium text-muted-foreground truncate">World Explored</div>
                  <div className="text-lg font-semibold">{worldExploredPercentage}%</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {data.homeCountryName && (
            <Card className="sm:col-span-2 md:col-span-1">
              <CardContent className="p-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-orange-500 rounded-md p-3">
                    <HomeIcon className="h-5 w-5 text-white" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <div className="text-sm font-medium text-muted-foreground truncate">Home Country</div>
                    <div className="text-lg font-semibold truncate">{data.homeCountryName}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
        
        {/* Map */}
        <div className="bg-white dark:bg-card overflow-hidden shadow rounded-lg p-4 mb-8">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-medium">Travel Map</h3>
            <div className="text-sm text-muted-foreground flex flex-wrap items-center gap-y-1">
              <div className="flex items-center mr-2">
                <span className="inline-block w-3 h-3 bg-[#10b981] rounded-full mr-1"></span>
                <span>Visited</span>
              </div>
              {data.homeCountryCode && (
                <div className="flex items-center mr-2">
                  <span className="inline-block w-3 h-3 bg-orange-500 rounded-full mr-1"></span>
                  <span>Home Country</span>
                </div>
              )}
              <div className="flex items-center">
                <span className="inline-block w-3 h-3 bg-neutral-200 dark:bg-muted rounded-full mr-1"></span>
                <span>Not visited</span>
              </div>
            </div>
          </div>
          
          <WorldMap 
            visits={data.visits}
            homeCountryCode={data.homeCountryCode}
            homeCountryName={data.homeCountryName}
          />
        </div>
        
        {/* Recent Visits */}
        <div className="bg-white dark:bg-card overflow-hidden shadow rounded-lg p-4">
          <h3 className="text-lg font-medium mb-4">Recent Travels</h3>
          {data.visits.length === 0 ? (
            <p className="text-muted-foreground">No travels recorded yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Country</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Location</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                  {sortedVisits.slice(0, 5).map(visit => (
                    <tr key={visit.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{visit.countryName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {visit.visitDate ? format(new Date(visit.visitDate as string), 'MMM yyyy') : 'Date unknown'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {visit.city}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          
          <Separator className="my-6" />
          
          <div className="text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
              Inspired by {data.fullName}'s adventures? Create your own travel map!
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Track your visited countries, share with friends, and see where to go next.
            </p>
            <Button className="mt-4" asChild>
              <a href="/auth">Start Your Travel Map</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}