import { Layout } from "@/components/layout/layout";
import { useQuery } from "@tanstack/react-query";
import { Visit } from "@shared/schema";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, XAxis, YAxis, Bar } from "recharts";
import { Loader2 } from "lucide-react";

// Map continents to countries for statistics
const countryToContinentMap: Record<string, string> = {
  // North America
  "US": "North America", "CA": "North America", "MX": "North America",
  "BZ": "North America", "CR": "North America", "CU": "North America",
  "DO": "North America", "SV": "North America", "GT": "North America",
  "HT": "North America", "HN": "North America", "JM": "North America",
  "NI": "North America", "PA": "North America", "PR": "North America",
  
  // South America
  "BR": "South America", "AR": "South America", "CO": "South America",
  "CL": "South America", "EC": "South America", "GY": "South America",
  "PY": "South America", "PE": "South America", "SR": "South America",
  "UY": "South America", "VE": "South America", "BO": "South America",
  
  // Europe
  "GB": "Europe", "FR": "Europe", "DE": "Europe", "IT": "Europe", "ES": "Europe",
  "RU": "Europe", "UA": "Europe", "PL": "Europe", "SE": "Europe", "NO": "Europe",
  "AL": "Europe", "AT": "Europe", "BY": "Europe", "BE": "Europe", "BA": "Europe",
  "BG": "Europe", "HR": "Europe", "CZ": "Europe", "DK": "Europe", "EE": "Europe",
  "FI": "Europe", "GR": "Europe", "HU": "Europe", "IS": "Europe", "IE": "Europe",
  "LV": "Europe", "LT": "Europe", "LU": "Europe", "MK": "Europe", "MT": "Europe",
  "MD": "Europe", "ME": "Europe", "NL": "Europe", "PT": "Europe", "RO": "Europe",
  "RS": "Europe", "SK": "Europe", "SI": "Europe", "CH": "Europe", "TR": "Europe",
  
  // Asia
  "CN": "Asia", "IN": "Asia", "JP": "Asia", "KR": "Asia", "TH": "Asia",
  "MY": "Asia", "ID": "Asia", "PH": "Asia", "VN": "Asia", "SG": "Asia",
  "AF": "Asia", "AM": "Asia", "AZ": "Asia", "BH": "Asia", "BD": "Asia",
  "BT": "Asia", "KH": "Asia", "GE": "Asia", "IR": "Asia", "IQ": "Asia",
  "IL": "Asia", "JO": "Asia", "KZ": "Asia", "KW": "Asia", "KG": "Asia",
  "LA": "Asia", "LB": "Asia", "MV": "Asia", "MN": "Asia", "MM": "Asia",
  "NP": "Asia", "KP": "Asia", "OM": "Asia", "PK": "Asia", "PS": "Asia",
  "QA": "Asia", "SA": "Asia", "LK": "Asia", "SY": "Asia", "TW": "Asia",
  "TJ": "Asia", "TM": "Asia", "AE": "Asia", "UZ": "Asia", "YE": "Asia",
  
  // Oceania
  "AU": "Oceania", "NZ": "Oceania", "FJ": "Oceania", 
  "PG": "Oceania", "SB": "Oceania", "VU": "Oceania",
  
  // Africa
  "EG": "Africa", "ZA": "Africa", "MA": "Africa", "NG": "Africa", "KE": "Africa",
  "DZ": "Africa", "AO": "Africa", "BJ": "Africa", "BW": "Africa", "BF": "Africa",
  "BI": "Africa", "CV": "Africa", "CM": "Africa", "CF": "Africa", "TD": "Africa",
  "KM": "Africa", "CD": "Africa", "CG": "Africa", "CI": "Africa", "DJ": "Africa",
  "GQ": "Africa", "ER": "Africa", "SZ": "Africa", "ET": "Africa", "GA": "Africa",
  "GM": "Africa", "GH": "Africa", "GN": "Africa", "GW": "Africa", "LS": "Africa",
  "LR": "Africa", "LY": "Africa", "MG": "Africa", "MW": "Africa", "ML": "Africa",
  "MR": "Africa", "MU": "Africa", "MZ": "Africa", "NA": "Africa", "NE": "Africa",
  "RW": "Africa", "ST": "Africa", "SN": "Africa", "SC": "Africa", "SL": "Africa",
  "SO": "Africa", "SS": "Africa", "SD": "Africa", "TZ": "Africa", "TG": "Africa",
  "TN": "Africa", "UG": "Africa", "ZM": "Africa", "ZW": "Africa",
};

// Colors for the charts
const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

export default function StatisticsPage() {
  const { data: visits = [], isLoading } = useQuery<Visit[]>({
    queryKey: ["/api/visits"],
  });
  
  if (isLoading) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-[500px]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }
  
  // Calculate continent statistics
  const continentCounts: Record<string, number> = {};
  const countriesByContinent: Record<string, string[]> = {};
  
  visits.forEach(visit => {
    const continent = countryToContinentMap[visit.countryCode] || "Unknown";
    
    // Count countries per continent
    continentCounts[continent] = (continentCounts[continent] || 0) + 1;
    
    // Store which countries belong to each continent
    if (!countriesByContinent[continent]) {
      countriesByContinent[continent] = [];
    }
    
    // Only add the country if it's not already in the list
    if (!countriesByContinent[continent].includes(visit.countryName)) {
      countriesByContinent[continent].push(visit.countryName);
    }
  });
  
  // Log any unknown country codes for debugging
  const unknownCountries = visits
    .filter(visit => !countryToContinentMap[visit.countryCode])
    .map(visit => `${visit.countryName} (${visit.countryCode})`);
  
  if (unknownCountries.length > 0) {
    console.log("Countries not mapped to continents:", unknownCountries);
  }
  
  const continentData = Object.keys(continentCounts)
    .sort((a, b) => continentCounts[b] - continentCounts[a]) // Sort by count descending
    .map(continent => ({
      name: continent,
      value: continentCounts[continent],
      countries: countriesByContinent[continent].join(", ")
    }));
  
  // Calculate visits by year
  const visitsByYear: Record<string, number> = {};
  visits.forEach(visit => {
    const year = new Date(visit.visitDate).getFullYear().toString();
    visitsByYear[year] = (visitsByYear[year] || 0) + 1;
  });
  
  const yearData = Object.keys(visitsByYear)
    .sort()
    .map(year => ({
      year,
      visits: visitsByYear[year]
    }));
  
  // Calculate world coverage percentage (very approximate)
  const totalCountries = 195; // Approximate number of countries in the world
  const worldPercentage = (visits.length / totalCountries * 100).toFixed(1);
  
  return (
    <Layout>
      <div className="flex justify-between items-center pb-5 border-b">
        <h2 className="text-2xl font-bold font-montserrat leading-6">My Travel Statistics</h2>
      </div>
      
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-4xl font-bold text-center">{visits.length}</CardTitle>
            <CardDescription className="text-center">Countries Visited</CardDescription>
          </CardHeader>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-4xl font-bold text-center">
              {Object.keys(continentCounts).length}
            </CardTitle>
            <CardDescription className="text-center">Continents Explored</CardDescription>
          </CardHeader>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-4xl font-bold text-center">{worldPercentage}%</CardTitle>
            <CardDescription className="text-center">World Explored</CardDescription>
          </CardHeader>
        </Card>
      </div>
      
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Visits by Continent</CardTitle>
            <CardDescription>
              Distribution of your travels across continents
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              {continentData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={continentData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {continentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value, name, props) => {
                      const entry = continentData.find(d => d.name === name);
                      return [
                        <>
                          <div><strong>{value} countries</strong></div>
                          <div className="text-xs mt-1">{entry?.countries || "None"}</div>
                        </>,
                        name
                      ];
                    }} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-muted-foreground">No data available</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Visits by Year</CardTitle>
            <CardDescription>
              Your travel activity over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              {yearData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={yearData}>
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="visits" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-muted-foreground">No data available</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Continent Breakdown */}
      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4">Continent Breakdown</h3>
        <div className="grid grid-cols-1 gap-4">
          {continentData.map((continent, index) => (
            <Card key={continent.name}>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <h4 className="text-lg font-semibold">{continent.name}</h4>
                  <span className="text-sm text-muted-foreground">
                    ({continent.value} countries - {((continent.value / visits.length) * 100).toFixed(1)}%)
                  </span>
                </div>
                <p className="text-sm pt-2">
                  <span className="font-medium">Countries:</span> {continent.countries || "None"}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}
