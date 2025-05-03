import { useEffect, useRef } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { Visit } from "@shared/schema";

// URL to a world map TopoJSON file
const WORLD_MAP_URL = "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

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
  
  // Create a Set of visited country codes for easy lookup
  const visitedCountries = new Set(visits.map(visit => visit.countryCode));
  
  return (
    <div ref={mapContainerRef} className="overflow-hidden">
      <ComposableMap
        projection="geoEqualEarth"
        projectionConfig={{
          scale: 160,
          center: [0, 0]
        }}
      >
        <Geographies geography={WORLD_MAP_URL}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const isVisited = visitedCountries.has(geo.properties.ISO_A2);
              return (
                <Geography
                  key={geo.rsmKey}
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
