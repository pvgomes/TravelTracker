import { Visit } from "@shared/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FlagIcon } from "lucide-react";
import { format } from "date-fns";
import { useLocation } from "wouter";

interface RecentTravelsProps {
  visits: Visit[];
}

export function RecentTravels({ visits }: RecentTravelsProps) {
  const [_, navigate] = useLocation();
  
  // Sort visits by date, most recent first
  const sortedVisits = [...visits].sort((a, b) => 
    new Date(b.visitDate).getTime() - new Date(a.visitDate).getTime()
  );
  
  // Get the most recent 3 visits
  const recentVisits = sortedVisits.slice(0, 3);
  
  return (
    <Card className="mt-6">
      <CardHeader className="pb-2">
        <CardTitle>Recent Travels</CardTitle>
        <p className="text-sm text-muted-foreground">Your most recent country visits.</p>
      </CardHeader>
      <CardContent>
        <div className="flow-root">
          {recentVisits.length > 0 ? (
            <ul className="divide-y divide-border">
              {recentVisits.map((visit) => (
                <li key={visit.id} className="py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 h-10 w-10 bg-primary rounded-full flex items-center justify-center">
                      <FlagIcon className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{visit.countryName}</p>
                      <p className="text-sm truncate">
                        {visit.city}{visit.state ? `, ${visit.state}` : ''}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        Visited {format(new Date(visit.visitDate), "MMMM d, yyyy")}
                      </p>
                    </div>
                    <Button variant="outline" size="sm" className="rounded-full">
                      View
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-6">
              <FlagIcon className="mx-auto h-10 w-10 text-muted-foreground/50" />
              <p className="mt-2 text-muted-foreground">No travels recorded yet.</p>
            </div>
          )}
          
          <div className="mt-6">
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={() => navigate("/countries")}
            >
              View all travels
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
