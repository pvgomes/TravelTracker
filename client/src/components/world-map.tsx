import { useEffect, useRef, useMemo } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { Visit } from "@shared/schema";

// Using a reliable TopoJSON map URL
const WORLD_MAP_URL = "https://unpkg.com/world-atlas@2.0.2/countries-110m.json";

// Comprehensive map for matching countries by name or properties
const countryMapping: Record<string, string[]> = {
  // Format: { "Country Name": ["2-LETTER-CODE", "3-LETTER-CODE"] }
  "Afghanistan": ["AF", "AFG"],
  "Albania": ["AL", "ALB"],
  "Algeria": ["DZ", "DZA"],
  "Angola": ["AO", "AGO"],
  "Antarctica": ["AQ", "ATA"],
  "Argentina": ["AR", "ARG"],
  "Armenia": ["AM", "ARM"],
  "Australia": ["AU", "AUS"],
  "Austria": ["AT", "AUT"],
  "Azerbaijan": ["AZ", "AZE"],
  "Bahamas": ["BS", "BHS"],
  "Bangladesh": ["BD", "BGD"],
  "Belarus": ["BY", "BLR"],
  "Belgium": ["BE", "BEL"],
  "Belize": ["BZ", "BLZ"],
  "Benin": ["BJ", "BEN"],
  "Bhutan": ["BT", "BTN"],
  "Bolivia": ["BO", "BOL"],
  "Bosnia and Herzegovina": ["BA", "BIH"],
  "Botswana": ["BW", "BWA"],
  "Brazil": ["BR", "BRA"],
  "Brunei": ["BN", "BRN"],
  "Bulgaria": ["BG", "BGR"],
  "Burkina Faso": ["BF", "BFA"],
  "Burundi": ["BI", "BDI"],
  "Cambodia": ["KH", "KHM"],
  "Cameroon": ["CM", "CMR"],
  "Canada": ["CA", "CAN"],
  "Central African Republic": ["CF", "CAF"],
  "Chad": ["TD", "TCD"],
  "Chile": ["CL", "CHL"],
  "China": ["CN", "CHN"],
  "Colombia": ["CO", "COL"],
  "Congo": ["CG", "COG"],
  "Costa Rica": ["CR", "CRI"],
  "Croatia": ["HR", "HRV"],
  "Cuba": ["CU", "CUB"],
  "Cyprus": ["CY", "CYP"],
  "Czech Republic": ["CZ", "CZE"],
  "Democratic Republic of the Congo": ["CD", "COD"],
  "Denmark": ["DK", "DNK"],
  "Djibouti": ["DJ", "DJI"],
  "Dominican Republic": ["DO", "DOM"],
  "Ecuador": ["EC", "ECU"],
  "Egypt": ["EG", "EGY"],
  "El Salvador": ["SV", "SLV"],
  "Equatorial Guinea": ["GQ", "GNQ"],
  "Eritrea": ["ER", "ERI"],
  "Estonia": ["EE", "EST"],
  "Ethiopia": ["ET", "ETH"],
  "Fiji": ["FJ", "FJI"],
  "Finland": ["FI", "FIN"],
  "France": ["FR", "FRA"],
  "French Guiana": ["GF", "GUF"],
  "Gabon": ["GA", "GAB"],
  "Gambia": ["GM", "GMB"],
  "Georgia": ["GE", "GEO"],
  "Germany": ["DE", "DEU"],
  "Ghana": ["GH", "GHA"],
  "Greece": ["GR", "GRC"],
  "Greenland": ["GL", "GRL"],
  "Guatemala": ["GT", "GTM"],
  "Guinea": ["GN", "GIN"],
  "Guinea-Bissau": ["GW", "GNB"],
  "Guyana": ["GY", "GUY"],
  "Haiti": ["HT", "HTI"],
  "Honduras": ["HN", "HND"],
  "Hungary": ["HU", "HUN"],
  "Iceland": ["IS", "ISL"],
  "India": ["IN", "IND"],
  "Indonesia": ["ID", "IDN"],
  "Iran": ["IR", "IRN"],
  "Iraq": ["IQ", "IRQ"],
  "Ireland": ["IE", "IRL"],
  "Israel": ["IL", "ISR"],
  "Italy": ["IT", "ITA"],
  "Ivory Coast": ["CI", "CIV"],
  "Jamaica": ["JM", "JAM"],
  "Japan": ["JP", "JPN"],
  "Jordan": ["JO", "JOR"],
  "Kazakhstan": ["KZ", "KAZ"],
  "Kenya": ["KE", "KEN"],
  "Kosovo": ["XK", "KOS"],
  "Kuwait": ["KW", "KWT"],
  "Kyrgyzstan": ["KG", "KGZ"],
  "Laos": ["LA", "LAO"],
  "Latvia": ["LV", "LVA"],
  "Lebanon": ["LB", "LBN"],
  "Lesotho": ["LS", "LSO"],
  "Liberia": ["LR", "LBR"],
  "Libya": ["LY", "LBY"],
  "Lithuania": ["LT", "LTU"],
  "Luxembourg": ["LU", "LUX"],
  "Macedonia": ["MK", "MKD"],
  "Madagascar": ["MG", "MDG"],
  "Malawi": ["MW", "MWI"],
  "Malaysia": ["MY", "MYS"],
  "Mali": ["ML", "MLI"],
  "Mauritania": ["MR", "MRT"],
  "Mexico": ["MX", "MEX"],
  "Moldova": ["MD", "MDA"],
  "Mongolia": ["MN", "MNG"],
  "Montenegro": ["ME", "MNE"],
  "Morocco": ["MA", "MAR"],
  "Mozambique": ["MZ", "MOZ"],
  "Myanmar": ["MM", "MMR"],
  "Namibia": ["NA", "NAM"],
  "Nepal": ["NP", "NPL"],
  "Netherlands": ["NL", "NLD"],
  "New Zealand": ["NZ", "NZL"],
  "Nicaragua": ["NI", "NIC"],
  "Niger": ["NE", "NER"],
  "Nigeria": ["NG", "NGA"],
  "North Korea": ["KP", "PRK"],
  "Norway": ["NO", "NOR"],
  "Oman": ["OM", "OMN"],
  "Pakistan": ["PK", "PAK"],
  "Panama": ["PA", "PAN"],
  "Papua New Guinea": ["PG", "PNG"],
  "Paraguay": ["PY", "PRY"],
  "Peru": ["PE", "PER"],
  "Philippines": ["PH", "PHL"],
  "Poland": ["PL", "POL"],
  "Portugal": ["PT", "PRT"],
  "Puerto Rico": ["PR", "PRI"],
  "Qatar": ["QA", "QAT"],
  "Romania": ["RO", "ROU"],
  "Russia": ["RU", "RUS"],
  "Rwanda": ["RW", "RWA"],
  "Saudi Arabia": ["SA", "SAU"],
  "Senegal": ["SN", "SEN"],
  "Serbia": ["RS", "SRB"],
  "Sierra Leone": ["SL", "SLE"],
  "Slovakia": ["SK", "SVK"],
  "Slovenia": ["SI", "SVN"],
  "Solomon Islands": ["SB", "SLB"],
  "Somalia": ["SO", "SOM"],
  "South Africa": ["ZA", "ZAF"],
  "South Korea": ["KR", "KOR"],
  "South Sudan": ["SS", "SSD"],
  "Spain": ["ES", "ESP"],
  "Sri Lanka": ["LK", "LKA"],
  "Sudan": ["SD", "SDN"],
  "Suriname": ["SR", "SUR"],
  "Swaziland": ["SZ", "SWZ"],
  "Sweden": ["SE", "SWE"],
  "Switzerland": ["CH", "CHE"],
  "Syria": ["SY", "SYR"],
  "Taiwan": ["TW", "TWN"],
  "Tajikistan": ["TJ", "TJK"],
  "Tanzania": ["TZ", "TZA"],
  "Thailand": ["TH", "THA"],
  "Timor-Leste": ["TL", "TLS"],
  "Togo": ["TG", "TGO"],
  "Trinidad and Tobago": ["TT", "TTO"],
  "Tunisia": ["TN", "TUN"],
  "Turkey": ["TR", "TUR"],
  "Turkmenistan": ["TM", "TKM"],
  "Uganda": ["UG", "UGA"],
  "Ukraine": ["UA", "UKR"],
  "United Arab Emirates": ["AE", "ARE"],
  "United Kingdom": ["GB", "GBR"],
  "United States": ["US", "USA"],
  "United States of America": ["US", "USA"],
  "Uruguay": ["UY", "URY"],
  "Uzbekistan": ["UZ", "UZB"],
  "Venezuela": ["VE", "VEN"],
  "Vietnam": ["VN", "VNM"],
  "Western Sahara": ["EH", "ESH"],
  "Yemen": ["YE", "YEM"],
  "Zambia": ["ZM", "ZMB"],
  "Zimbabwe": ["ZW", "ZWE"]
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
  
  // Create lookup maps for visited countries using various formats
  const visitedCountryData = useMemo(() => {
    const codes2 = new Set<string>(); // 2-letter codes
    const codes3 = new Set<string>(); // 3-letter codes
    const names = new Set<string>(); // Full country names
    
    visits.forEach(visit => {
      // Store the country code (usually 2-letter code)
      const code = visit.countryCode;
      codes2.add(code);
      
      // Find the mapping entry for this country
      const countryName = visit.countryName;
      names.add(countryName);
      
      // Add 3-letter code if we can find it
      for (const [name, codes] of Object.entries(countryMapping)) {
        if (name === countryName || codes[0] === code) {
          if (codes[1]) codes3.add(codes[1]); // Add 3-letter code
        }
      }
    });
    
    return { codes2, codes3, names };
  }, [visits]);
  
  // Debug log of all visited countries
  useEffect(() => {
    if (visits.length > 0) {
      console.log("All visited countries:", visits.map(v => `${v.countryName} (${v.countryCode})`).join(", "));
      console.log("2-letter codes:", Array.from(visitedCountryData.codes2));
      console.log("3-letter codes:", Array.from(visitedCountryData.codes3));
    }
  }, [visits, visitedCountryData]);
  
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
              const geoProps = geo.properties || {};
              const countryName = geoProps.name || "";
              const iso_a2 = (geoProps.iso_a2 || "").toUpperCase();
              const iso_a3 = (geoProps.iso_a3 || "").toUpperCase();
              
              // Try multiple ways to identify if this country is in our visited list
              const isVisited = 
                // Check 2-letter codes
                visitedCountryData.codes2.has(iso_a2) ||
                // Check 3-letter codes
                visitedCountryData.codes3.has(iso_a3) ||
                // Check by name
                visitedCountryData.names.has(countryName) ||
                // Last resort: match against our mapping - for both directions
                (countryMapping[countryName] && visitedCountryData.codes2.has(countryMapping[countryName][0])) ||
                // Special case: check exact matches for Malaysia, Brazil, Poland
                (countryName === "Malaysia" && visitedCountryData.codes2.has("MY")) ||
                (countryName === "Brazil" && visitedCountryData.codes2.has("BR")) ||
                (countryName === "Poland" && visitedCountryData.codes2.has("PL"));
              
              // Debug specific countries
              if (["Malaysia", "Brazil", "Poland"].includes(countryName)) {
                console.log(`Map country: ${countryName}, ISO-A2: ${iso_a2}, ISO-A3: ${iso_a3}, Is Visited: ${isVisited}`);
              }
              
              return (
                <Geography
                  key={geo.rsmKey || iso_a3 || countryName}
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
