import { useEffect, useRef } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { Visit } from "@shared/schema";

// Using a reliable TopoJSON file
const WORLD_MAP_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// ISO country code mapping - for converting 3-letter codes to 2-letter codes
const iso3To2: Record<string, string> = {
  "USA": "US", "CAN": "CA", "MEX": "MX", "BRA": "BR", "ARG": "AR", "GBR": "GB", 
  "FRA": "FR", "DEU": "DE", "ITA": "IT", "ESP": "ES", "PRT": "PT", "NLD": "NL", 
  "BEL": "BE", "CHE": "CH", "AUT": "AT", "GRC": "GR", "RUS": "RU", "CHN": "CN", 
  "JPN": "JP", "KOR": "KR", "IND": "IN", "AUS": "AU", "NZL": "NZ", "ZAF": "ZA", 
  "EGY": "EG", "MAR": "MA", "NGA": "NG", "KEN": "KE", "SAU": "SA", "ARE": "AE", 
  "TUR": "TR", "THA": "TH", "VNM": "VN", "SGP": "SG", "MYS": "MY", "IDN": "ID", 
  "PHL": "PH", "FIN": "FI", "SWE": "SE", "NOR": "NO", "DNK": "DK", "ISL": "IS", 
  "IRL": "IE", "POL": "PL", "CZE": "CZ", "HUN": "HU", "UKR": "UA", "ROU": "RO", 
  "BGR": "BG", "GRL": "GL", "ISR": "IL", "LBN": "LB", "PAK": "PK", "AFG": "AF",
  "IRN": "IR", "IRQ": "IQ", "SYR": "SY", "JOR": "JO", "KWT": "KW", "QAT": "QA",
  "OMN": "OM", "YEM": "YE", "DZA": "DZ", "TUN": "TN", "LBY": "LY", "SDN": "SD",
  "ETH": "ET", "SOM": "SO", "UGA": "UG", "TZA": "TZ", "MOZ": "MZ", "ZWE": "ZW",
  "NAM": "NA", "BWA": "BW", "LSO": "LS", "SWZ": "SZ", "MWI": "MW", "ZMB": "ZM",
  "AGO": "AO", "COD": "CD", "COG": "CG", "GAB": "GA", "CMR": "CM", "TCD": "TD",
  "NER": "NE", "MLI": "ML", "BFA": "BF", "GHA": "GH", "CIV": "CI", "LBR": "LR",
  "SLE": "SL", "GIN": "GN", "GNB": "GW", "SEN": "SN", "GMB": "GM", "MRT": "MR",
  "ESH": "EH", "DJI": "DJ", "ERI": "ER", "BDI": "BI", "RWA": "RW", "CAF": "CF",
  "SSD": "SS"
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
  
  // Create a Set of visited country codes for easy lookup
  const visitedCountries = new Set(visits.map(visit => visit.countryCode));
  
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
              // Get the 3-letter ISO code (ISO_A3) from the properties
              const iso3Code = geo.properties.ISO_A3 || "";
              
              // Convert to 2-letter code using our mapping
              const countryCode = iso3To2[iso3Code] || "";
              
              const isVisited = visitedCountries.has(countryCode);
              
              return (
                <Geography
                  key={geo.rsmKey || geo.id || geo.properties.ISO_A3}
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
