import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useQuery } from "@tanstack/react-query";
import { Globe2Icon, Users, GlobeIcon, Coins, Loader2 } from "lucide-react";

interface CountryInfoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  countryCode: string;
}

export function CountryInfoDialog({ open, onOpenChange, countryCode }: CountryInfoDialogProps) {
  const { data: countryInfo, isLoading } = useQuery({
    queryKey: [`country-${countryCode}`],
    queryFn: async () => {
      const res = await fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`);
      const data = await res.json();
      return data[0];
    },
    enabled: open && !!countryCode,
  });

 return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {countryInfo?.flags?.emoji} {countryInfo?.name?.common}
          </DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : (
          <div className="grid gap-4 py-4">
            <div className="flex items-center gap-4">
              <Globe2Icon className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Capital</p>
                <p className="text-sm text-muted-foreground">{countryInfo?.capital?.[0]}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Users className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Population</p>
                <p className="text-sm text-muted-foreground">
                  {countryInfo?.population?.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <GlobeIcon className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Languages</p>
                <p className="text-sm text-muted-foreground">
                  {Object.values(countryInfo?.languages || {}).join(", ")}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Coins className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Currencies</p>
                <p className="text-sm text-muted-foreground">
                  {Object.values(countryInfo?.currencies || {})
                    .map((curr: any) => `${curr.name} (${curr.symbol})`)
                    .join(", ")}
                </p>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}