import { useState } from "react";
import { Layout } from "@/components/layout/layout";
import { WorldMap } from "@/components/world-map";
import { StatsOverview } from "@/components/stats-overview";
import { RecentTravels } from "@/components/recent-travels";
import { AddCountryDialog } from "@/components/add-country-dialog";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Visit } from "@shared/schema";

export default function HomePage() {
  const [addCountryOpen, setAddCountryOpen] = useState(false);
  
  const { data: visits = [] } = useQuery<Visit[]>({
    queryKey: ["/api/visits"],
  });

  return (
    <Layout>
      <div className="flex justify-between items-center pb-5 border-b">
        <h2 className="text-2xl font-bold font-montserrat leading-6">My Travel Map</h2>
        <Button onClick={() => setAddCountryOpen(true)}>
          <PlusIcon className="mr-2 h-4 w-4" />
          Add Country
        </Button>
      </div>
      
      <StatsOverview visits={visits} />
      
      <div className="mt-6 bg-white dark:bg-card overflow-hidden shadow rounded-lg p-4">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-medium">Your World Map</h3>
          <div className="text-sm text-muted-foreground flex items-center">
            <span className="inline-block w-3 h-3 bg-secondary rounded-full mr-1"></span>
            <span className="mr-3">Visited</span>
            <span className="inline-block w-3 h-3 bg-neutral-200 dark:bg-muted rounded-full mr-1"></span>
            <span>Not visited yet</span>
          </div>
        </div>
        
        <WorldMap visits={visits} />
      </div>
      
      <RecentTravels visits={visits} />
      
      <AddCountryDialog 
        open={addCountryOpen} 
        onOpenChange={setAddCountryOpen} 
      />
    </Layout>
  );
}
