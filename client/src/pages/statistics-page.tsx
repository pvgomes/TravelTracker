import { Layout } from "@/components/layout/layout";
import { useQuery } from "@tanstack/react-query";
import { Visit } from "@shared/schema";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, XAxis, YAxis, Bar } from "recharts";
import { Loader2 } from "lucide-react";

// Map continents to countries for statistics
const countryToContinentMap: Record<string, string> = {
  // This is a simplified mapping - in a real app, you would have a complete mapping
  "US": "North America", "CA": "North America", "MX": "North America",
  "BR": "South America", "AR": "South America", "CO": "South America",
  "GB": "Europe", "FR": "Europe", "DE": "Europe", "IT": "Europe", "ES": "Europe",
  "RU": "Europe", "UA": "Europe", "PL": "Europe", "SE": "Europe", "NO": "Europe",
  "CN": "Asia", "IN": "Asia", "JP": "Asia", "KR": "Asia", "TH": "Asia",
  "AU": "Oceania", "NZ": "Oceania", "FJ": "Oceania",
  "EG": "Africa", "ZA": "Africa", "MA": "Africa", "NG": "Africa", "KE": "Africa",
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
  visits.forEach(visit => {
    const continent = countryToContinentMap[visit.countryCode] || "Unknown";
    continentCounts[continent] = (continentCounts[continent] || 0) + 1;
  });
  
  const continentData = Object.keys(continentCounts).map(continent => ({
    name: continent,
    value: continentCounts[continent]
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
                    <Tooltip />
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
    </Layout>
  );
}
