import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Layout } from "@/components/layout/layout";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

export default function WhyNoStatePage() {
  return (
    <Layout>
      <div className="container py-8 max-w-3xl">
        <Link href="/" className="inline-block mb-6">
          <Button variant="outline" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to dashboard
          </Button>
        </Link>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl">Why don't all cities have states or provinces?</CardTitle>
            <CardDescription>
              Understanding global administrative divisions
            </CardDescription>
          </CardHeader>
          <CardContent className="prose prose-slate">
            <h3>Different Administrative Structures</h3>
            <p>
              Not all countries organize their territories using states or provinces. The administrative divisions of countries around the world vary greatly based on historical, cultural, and political factors.
            </p>
            
            <h3>Common Scenarios</h3>
            <ul>
              <li>
                <strong>City-states</strong>: Places like Singapore and Monaco are sovereign city-states without any higher administrative divisions.
              </li>
              <li>
                <strong>Capitals with special status</strong>: Many capital cities like Washington D.C. (USA) or Canberra (Australia) have special administrative status outside the normal state/province system.
              </li>
              <li>
                <strong>Different administrative structures</strong>: Some countries use different systems like departments, districts, counties, or regions instead of states/provinces.
              </li>
              <li>
                <strong>Small countries</strong>: Countries like Luxembourg or Malta may be too small to need state/provincial divisions.
              </li>
            </ul>
            
            <h3>Examples Around the World</h3>
            <ul>
              <li>
                <strong>France</strong> uses départements and régions rather than states or provinces.
              </li>
              <li>
                <strong>United Kingdom</strong> uses counties, regions, and constituent countries (England, Scotland, Wales, Northern Ireland).
              </li>
              <li>
                <strong>Japan</strong> uses prefectures as its primary administrative division.
              </li>
              <li>
                <strong>Vatican City</strong> is the world's smallest sovereign state with no subdivisions.
              </li>
            </ul>
            
            <p>
              This is why our Globalia makes the state/province field optional, allowing you to accurately record your travels regardless of the administrative structure of the places you've visited.
            </p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}