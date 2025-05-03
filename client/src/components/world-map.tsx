import { useEffect, useRef, useMemo } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { Visit } from "@shared/schema";

// Using a reliable TopoJSON map URL
const WORLD_MAP_URL = "https://unpkg.com/world-atlas@2.0.2/countries-110m.json";

// Map for directly matching countries by name
const countryNameToCode: Record<string, string> = {
  "Brazil": "BR",
  "Poland": "PL",
  "United States of America": "US",
  "United States": "US",
  "Russia": "RU",
  "China": "CN",
  "India": "IN",
  "Australia": "AU",
  "Canada": "CA",
  "Mexico": "MX",
  "Argentina": "AR",
  "United Kingdom": "GB",
  "France": "FR",
  "Germany": "DE",
  "Italy": "IT",
  "Spain": "ES",
  "Portugal": "PT",
  "Netherlands": "NL",
  "Belgium": "BE",
  "Switzerland": "CH",
  "Austria": "AT",
  "Greece": "GR",
  "Japan": "JP",
  "Malaysia": "MY"
};

interface WorldMapProps {
  visits: Visit[];
}

export function WorldMap({ visits }: WorldMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  
  // For responsiveness
  useEffect(() => {
    const handleResize = () => {
      // Force re-render on resize if needed
    };
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  // Create sets of visited country codes and names
  const visitedCountryCodes = useMemo(() => {
    const codes = new Set<string>();
    const names = new Set<string>();
    
    visits.forEach(visit => {
      codes.add(visit.countryCode);
      names.add(visit.countryName);
    });
    
    return { codes, names };
  }, [visits]);
  
  return (
    <div ref={mapContainerRef} className="overflow-hidden h-[400px] w-full">
      <ComposableMap
        projection="geoEqualEarth"
        projectionConfig={{
          scale: 160,
          center: [0, 0]
        }}
        width={800}
        height={400}
        style={{
          width: "100%",
          height: "100%"
        }}
      >
        <Geographies geography={WORLD_MAP_URL}>
          {({ geographies }) =>
            geographies.map((geo) => {
              // Get the name from the geography properties
              const countryName = geo.properties.name || "";
              
              // Check if this country is visited using multiple methods:
              // 1. First check by code from our name mapping
              const mappedCode = countryNameToCode[countryName];
              const isCodeVisited = mappedCode && visitedCountryCodes.codes.has(mappedCode);
              
              // 2. Check directly by name
              const isNameVisited = visitedCountryCodes.names.has(countryName);
              
              // Special case for Brazil and Poland
              const specialHandling = 
                (countryName === "Brazil" && visitedCountryCodes.codes.has("BR")) ||
                (countryName === "Poland" && visitedCountryCodes.codes.has("PL"));
              
              // Determine if country should be highlighted
              const isVisited = isCodeVisited || isNameVisited || specialHandling;
              
              // For debugging specific countries
              if (countryName === "Brazil" || countryName === "Poland") {
                console.log(`Country: ${countryName}, Mapped Code: ${mappedCode}, Is Visited: ${isVisited}`);
                console.log(`Special Handling: ${specialHandling}`);
                console.log(`Country codes in our set: ${Array.from(visitedCountryCodes.codes).join(', ')}`);
              }
              
              return (
                <Geography
                  key={geo.rsmKey || geo.id || countryName}
                  geography={geo}
                  fill={isVisited ? "#10b981" : "#e2e8f0"}
                  stroke="#FFFFFF"
                  strokeWidth={0.5}
                  style={{
                    default: {
                      fill: isVisited ? "#10b981" : "#e2e8f0",
                      outline: "none",
                    },
                    hover: {
                      fill: isVisited ? "#059669" : "#bfdbfe",
                      outline: "none",
                      cursor: "pointer"
                    },
                    pressed: {
                      fill: isVisited ? "#059669" : "#bfdbfe",
                      outline: "none",
                    },
                  }}
                  className="transition-colors duration-300"
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
}
