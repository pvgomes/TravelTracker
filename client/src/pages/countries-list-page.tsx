import { Layout } from "@/components/layout/layout";
import { useQuery } from "@tanstack/react-query";
import { Visit } from "@shared/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { format } from "date-fns";
import { FlagIcon, MapPinIcon, SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CountryInfoDialog } from "@/components/country-info-dialog"

export default function CountriesListPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  
  const { data: visits = [], isLoading } = useQuery<Visit[]>({
    queryKey: ["/api/visits"],
  });
  
  const filteredVisits = visits.filter(visit => 
    visit.countryName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    visit.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    visit.state?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    visit.notes?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Sort visits by date, most recent first
  const sortedVisits = [...filteredVisits].sort((a, b) => 
    new Date(b.visitDate).getTime() - new Date(a.visitDate).getTime()
  );
  
  return (
    <Layout>
      <div className="flex justify-between items-center pb-5 border-b">
        <h2 className="text-2xl font-bold font-montserrat leading-6">My Visited Countries</h2>
      </div>
      
      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Countries List</CardTitle>
            <div className="mt-4 relative">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search countries..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center p-6">
                <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
              </div>
            ) : sortedVisits.length > 0 ? (
              <div className="space-y-4">
                {sortedVisits.map((visit) => (
                  <div 
                    key={visit.id} 
                    className="flex items-center p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="h-10 w-10 bg-primary rounded-full flex items-center justify-center">
                      <FlagIcon className="h-5 w-5 text-white" />
                    </div>
                    <div className="ml-4 flex-1">
                      <h4 className="font-medium">{visit.countryName}</h4>
                      <p className="text-sm">
                        <MapPinIcon className="inline-block h-3 w-3 mr-1 opacity-70" />
                        {visit.city}{visit.state ? `, ${visit.state}` : ''}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Visited {format(new Date(visit.visitDate), "MMMM d, yyyy")}
                      </p>
                      {visit.notes && (
                        <p className="text-sm mt-1 text-muted-foreground italic">{visit.notes}</p>
                      )}
                    </div>
                   <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => setSelectedCountry(visit.countryCode)}
                      >
                        <MapPinIcon className="h-4 w-4 mr-1" />
                        View
                      </Button>

                      <CountryInfoDialog
                        open={!!selectedCountry}
                        onOpenChange={(open) => !open && setSelectedCountry(null)}
                        countryCode={selectedCountry || ""}
                      />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <FlagIcon className="h-12 w-12 mx-auto text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">No countries found</h3>
                <p className="mt-1 text-muted-foreground">
                  {visits.length === 0 
                    ? "You haven't added any countries yet. Add your first visited country!"
                    : "No countries match your search. Try a different term."}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
