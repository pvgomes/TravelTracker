import { useState } from "react";
import { Layout } from "@/components/layout/layout";
import { AddCountryDialog } from "@/components/add-country-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { GlobeIcon, PlusIcon, CalendarIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Visit } from "@shared/schema";
import { useAuth } from "@/hooks/use-auth";
import { format } from "date-fns";

export default function HomePage() {
  const [addCountryOpen, setAddCountryOpen] = useState(false);
  const { user } = useAuth();
  
  const { data: visits = [] } = useQuery<Visit[]>({
    queryKey: ["/api/visits"],
  });

  // Simple statistics
  const countriesVisited = visits.length;
  const sortedVisits = [...visits].sort((a, b) => 
    new Date(b.visitDate).getTime() - new Date(a.visitDate).getTime()
  );
  
  const lastTrip = sortedVisits.length > 0 
    ? `${sortedVisits[0].countryName} (${format(new Date(sortedVisits[0].visitDate), "MMM yyyy")})`
    : "None yet";

  return (
    <Layout>
      <div className="flex justify-between items-center pb-5 border-b">
        <div>
          <h2 className="text-2xl font-bold font-montserrat leading-6">Travel Map</h2>
          <p className="text-sm text-muted-foreground mt-2">Track your global adventures</p>
        </div>
        <Button onClick={() => setAddCountryOpen(true)}>
          <PlusIcon className="mr-2 h-4 w-4" />
          Add Country
        </Button>
      </div>
      
      {/* Simple stats cards */}
      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
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
      
      {/* Recent Visits */}
      <div className="mt-6 bg-white dark:bg-card overflow-hidden shadow rounded-lg p-4">
        <h3 className="text-lg font-medium mb-4">Recent Travels</h3>
        {visits.length === 0 ? (
          <p className="text-muted-foreground">You haven't added any countries yet. Click "Add Country" to get started.</p>
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
                      {format(new Date(visit.visitDate), 'MMM d, yyyy')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {visit.city}{visit.state ? `, ${visit.state}` : ''}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      
      <AddCountryDialog 
        open={addCountryOpen} 
        onOpenChange={setAddCountryOpen} 
      />
    </Layout>
  );
}
