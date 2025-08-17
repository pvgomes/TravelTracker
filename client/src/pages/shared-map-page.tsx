import { useState, useEffect } from "react";
import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { WorldMap } from "@/components/world-map";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { GlobeIcon, CalendarIcon, Share2Icon, HomeIcon, PlaneIcon } from "lucide-react";
import { format } from "date-fns";
import { Visit } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { getCountryByCode } from "@/data/countries";

interface SharedUser {
  fullName: string;
  homeCountryCode?: string;
  homeCountryName?: string;
  visits: Visit[];
}

export default function SharedMapPage() {
  const { shareId } = useParams();
  const [shareUrl, setShareUrl] = useState("");
  const { toast } = useToast();
  
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
    toast({
      title: "Link copied!",
      description: "Share link has been copied to clipboard",
    });
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
  
  const visitedCountryCodes = new Set(data.visits.map(v => v.countryCode));

  // Only add home country if there is at least one visit for it
  const hasVisitForHomeCountry =
    !!data.homeCountryCode &&
    data.visits.some(v => v.countryCode === data.homeCountryCode);

  if (
    data.homeCountryCode &&
    !visitedCountryCodes.has(data.homeCountryCode) &&
    hasVisitForHomeCountry
  ) {
    visitedCountryCodes.add(data.homeCountryCode);
  }
  
  const countryCount = visitedCountryCodes.size;
  const cityCount = data.visits.length;
  
  // Calculate continents explored using our complete countries database
  const continentsExplored = new Set(
    Array.from(visitedCountryCodes)
      .map(code => {
        const country = getCountryByCode(code);
        return country?.continent;
      })
      .filter(continent => continent)
  );
  
  // Get country flag emojis for visited countries using our countries data
  const countryFlags = Array.from(visitedCountryCodes)
    .map(code => {
      const country = getCountryByCode(code);
      return country?.flag || '🏳️';
    })
    .join('');

  // Get home country flag
  const homeCountryFlag = data.homeCountryCode ? 
    getCountryByCode(data.homeCountryCode)?.flag : null;

  // World exploration percentage (approx. 195 countries in the world)
  const worldExploredPercentage = Math.round((countryCount / 195) * 100);
  
  const lastVisit = sortedVisits.length > 0 && sortedVisits[0].visitDate
    ? `${sortedVisits[0].countryName} (${format(new Date(sortedVisits[0].visitDate as string), "MMM yyyy")})` 
    : "None";
  
  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <div className="bg-white dark:bg-card border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="text-center">
            <img 
              src="/web-logo-globalia-crop.png"
              alt="Globalia" 
              className="h-12 w-auto mx-auto mb-3"
              loading="eager"
            />
            <h1 className="text-2xl font-bold text-foreground mb-2">
              {homeCountryFlag && <span className="mr-2">{homeCountryFlag}</span>}
              {data.fullName}'s travel map
            </h1>
            <p className="text-sm text-muted-foreground mb-3">
              {countryCount} countries • {cityCount} cities
            </p>
            {countryFlags && (
              <div className="text-2xl mb-4" style={{ lineHeight: '1.2' }}>
                {countryFlags}
              </div>
            )}
            <Button variant="outline" size="sm" onClick={copyShareLink} className="mb-2">
              <Share2Icon className="mr-2 h-4 w-4" />
              share
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        
        {/* World Map */}
        <Card className="p-4 lg:p-6">
          <CardContent className="p-0">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-medium">Travel Map</h3>
              <div className="text-xs lg:text-sm text-muted-foreground flex flex-wrap items-center gap-2">
                <div className="flex items-center">
                  <span className="inline-block w-3 h-3 bg-[#10b981] rounded-full mr-1"></span>
                  <span>Visited</span>
                </div>
                {data.homeCountryCode && (
                  <div className="flex items-center">
                    <span className="inline-block w-3 h-3 bg-orange-500 rounded-full mr-1"></span>
                    <span>Home</span>
                  </div>
                )}
              </div>
            </div>
            <WorldMap 
              visits={data.visits}
              homeCountryCode={data.homeCountryCode}
              homeCountryName={data.homeCountryName}
            />
          </CardContent>
        </Card>

        {/* Recent Travels - Mobile Simplified */}
        {data.visits.length > 0 && (
          <Card className="p-4 lg:p-6">
            <CardHeader className="p-0 pb-4">
              <CardTitle className="text-lg lg:text-xl">Recent Travels</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-3 lg:hidden">
                {sortedVisits.slice(0, 5).map((visit) => (
                  <div key={visit.id} className="flex justify-between items-center py-2 border-b last:border-b-0">
                    <div>
                      <div className="font-medium text-sm">{visit.city}</div>
                      <div className="text-xs text-muted-foreground">{visit.countryName}</div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {visit.visitDate ? format(new Date(visit.visitDate as string), 'MMM yyyy') : 'Unknown'}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Desktop Table */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Country</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Location</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                    {sortedVisits.slice(0, 10).map(visit => (
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
            </CardContent>
          </Card>
        )}

        {/* CTA Section */}
        <Card className="p-4 lg:p-6 bg-primary/5 border-primary/20">
          <CardContent className="p-0 text-center">
            <img 
              src="/web-logo-globalia.png"
              alt="Globalia" 
              className="h-6 w-auto mx-auto mb-3"
            />
            <h3 className="text-lg font-semibold mb-2">Create Your Travel Map</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Track your travels and share your journey with friends
            </p>
            <Button asChild>
              <a href="/auth" className="inline-flex items-center">
                Start Tracking
                <PlaneIcon className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}