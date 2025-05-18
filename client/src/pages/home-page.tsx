import { useState } from "react";
import { Layout } from "@/components/layout/layout";
import { WorldMap } from "@/components/world-map";
import { AddCountryDialog } from "@/components/add-country-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { GlobeIcon, PlusIcon, CalendarIcon, Share2Icon } from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Visit } from "@shared/schema";
import { useAuth } from "@/hooks/use-auth";
import { format } from "date-fns";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function HomePage() {
  const [addCountryOpen, setAddCountryOpen] = useState(false);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  const { toast } = useToast();
  const { user } = useAuth();
  
  const { data: visits = [] } = useQuery<Visit[]>({
    queryKey: ["/api/visits"],
  });

  // Generate share link
  const shareMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", "/api/share");
      return await res.json();
    },
    onSuccess: (data: { shareId: string }) => {
      const url = `${window.location.origin}/social/${data.shareId}`;
      setShareUrl(url);
      setShareDialogOpen(true);
    },
    onError: (error: Error) => {
      toast({
        title: "Sharing failed",
        description: "Could not generate share link. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleShare = () => {
    shareMutation.mutate();
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    toast({
      title: "Link copied!",
      description: "Share link copied to clipboard",
    });
  };

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
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleShare} disabled={shareMutation.isPending}>
            <Share2Icon className="mr-2 h-4 w-4" />
            Share Map
          </Button>
          <Button onClick={() => setAddCountryOpen(true)}>
            <PlusIcon className="mr-2 h-4 w-4" />
            Add Country
          </Button>
        </div>
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
      
      {/* World Map */}
      <div className="mt-6 bg-white dark:bg-card overflow-hidden shadow rounded-lg p-4">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-medium">Your World Map</h3>
          <div className="text-sm text-muted-foreground flex flex-wrap items-center gap-y-1">
            <div className="flex items-center mr-2">
              <span className="inline-block w-3 h-3 bg-[#10b981] rounded-full mr-1"></span>
              <span>Visited</span>
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
        
        <WorldMap 
          visits={visits} 
          homeCountryCode={user?.homeCountryCode ? String(user.homeCountryCode) : undefined}
          homeCountryName={user?.homeCountryName ? String(user.homeCountryName) : undefined}
        />
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
                      {visit.city}
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
      
      {/* Share Dialog */}
      <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share your travel map</DialogTitle>
            <DialogDescription>
              Use this link to share your travel map with friends and family.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2 mt-4">
            <Input
              value={shareUrl}
              readOnly
              className="flex-1"
            />
            <Button size="sm" onClick={copyToClipboard}>
              Copy
            </Button>
          </div>
          <DialogFooter className="mt-6">
            <Button variant="outline" onClick={() => setShareDialogOpen(false)}>
              Close
            </Button>
            <Button asChild>
              <a href={shareUrl} target="_blank" rel="noopener noreferrer">
                View Shared Map
              </a>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
