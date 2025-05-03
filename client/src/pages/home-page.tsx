import { useState } from "react";
import { Layout } from "@/components/layout/layout";
// import { WorldMap } from "@/components/world-map"; // Temporarily removed to fix performance issues
import { StatsOverview } from "@/components/stats-overview";
import { RecentTravels } from "@/components/recent-travels";
import { AddCountryDialog } from "@/components/add-country-dialog";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Visit } from "@shared/schema";
import { useAuth } from "@/hooks/use-auth";

export default function HomePage() {
  const [addCountryOpen, setAddCountryOpen] = useState(false);
  const { user } = useAuth();
  
  const { data: visits = [] } = useQuery<Visit[]>({
    queryKey: ["/api/visits"],
  });

  return (
    <Layout>
      <div className="flex justify-between items-center pb-5 border-b">
        <div>
          <h2 className="text-2xl font-bold font-montserrat leading-6">Adam's Travel Map</h2>
          <p className="text-sm text-muted-foreground mt-2">Track your global adventures</p>
        </div>
        <Button onClick={() => setAddCountryOpen(true)}>
          <PlusIcon className="mr-2 h-4 w-4" />
          Add Country
        </Button>
      </div>
      
      <StatsOverview visits={visits} />
      
      <div className="mt-6 bg-white dark:bg-card overflow-hidden shadow rounded-lg p-4">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-medium">Your World Map</h3>
          <div className="text-sm text-muted-foreground flex flex-wrap items-center gap-y-1">
            <div className="flex items-center mr-2">
              <span className="inline-block w-3 h-3 bg-[#10b981] rounded-full mr-1"></span>
              <span>Fully visited</span>
            </div>
            <div className="flex items-center mr-2">
              <span className="inline-block w-4 h-3 mr-1 rounded-sm" style={{ 
                backgroundColor: "#ddfaea", 
                border: "1px dashed #10b981"
              }}></span>
              <span>Partially visited</span>
            </div>
            {user?.homeCountryCode && (
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
        
        <div className="h-[400px] w-full flex items-center justify-center bg-slate-50 dark:bg-slate-800 rounded">
          <div className="text-center">
            <p className="text-lg font-medium text-slate-600 dark:text-slate-400">Map temporarily disabled for performance reasons</p>
            <p className="text-sm text-slate-500 dark:text-slate-500 mt-2">You've visited {visits.length} locations</p>
          </div>
        </div>
      </div>
      
      <RecentTravels visits={visits} />
      
      <AddCountryDialog 
        open={addCountryOpen} 
        onOpenChange={setAddCountryOpen} 
      />
    </Layout>
  );
}
