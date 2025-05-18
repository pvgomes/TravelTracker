import { useEffect, useRef, useMemo } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { Visit } from "@shared/schema";
import { State } from "country-state-city";

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
  homeCountryCode?: string;
  homeCountryName?: string;
}

// Simplified function - only determines if a country has been visited
function getCountryVisitStatus(countryCode: string, visits: Visit[]) {
  // Get all visits for this country
  const countryVisits = visits.filter(v => v.countryCode === countryCode);
  
  if (countryVisits.length === 0) {
    return 'none'; // No visits to this country
  }
  
  // Any country with at least one visit is considered visited
  return 'visited';
}

export function WorldMap({ visits, homeCountryCode, homeCountryName }: WorldMapProps) {
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
      
      // Find the 3-letter code from our mapping
      Object.entries(countryMapping).forEach(([name, codes]) => {
        if (name === countryName || codes[0] === code) {
          if (codes[1]) codes3.add(codes[1]); // Add 3-letter code
        }
      });
    });
    
    return { codes2, codes3, names };
  }, [visits]);
  
  // Debug log of visited countries only once during initialization
  useEffect(() => {
    // Disabled for now to prevent console flooding
    // if (visits.length > 0) {
    //   console.log("Visited countries count:", visits.length);
    // }
  }, []);
  
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
              
              // Try multiple ways to identify the country code in our map
              let matchedCountryCode: string | undefined;
              
              // Check direct matches
              if (visitedCountryData.codes2.has(iso_a2)) {
                matchedCountryCode = iso_a2;
              } 
              // Try to find through country mapping
              else if (countryMapping[countryName] && visitedCountryData.codes2.has(countryMapping[countryName][0])) {
                matchedCountryCode = countryMapping[countryName][0];
              }
              // Special cases
              else if (countryName === "United States" && visitedCountryData.codes2.has("US")) {
                matchedCountryCode = "US";
              } else if (countryName === "Brazil" && visitedCountryData.codes2.has("BR")) {
                matchedCountryCode = "BR";
              }
              
              // Determine the visit status
              let visitStatus = 'none';
              if (matchedCountryCode) {
                visitStatus = getCountryVisitStatus(matchedCountryCode, visits);
              }
              
              // Check if this is the home country
              const isHomeCountry = 
                (homeCountryCode && (
                  iso_a2 === homeCountryCode || 
                  (countryMapping[countryName] && countryMapping[countryName][0] === homeCountryCode)
                )) || 
                (homeCountryName && homeCountryName === countryName);
              
              // Set different colors and styles based on status
              let fillColor = "#e2e8f0"; // Default (not visited)
              let hoverFillColor = "#bfdbfe";
              let strokeStyle = "solid";
              let strokeWidth = 0.5;
              let strokeColor = "#FFFFFF";
              
              if (isHomeCountry) {
                fillColor = "#f97316"; // Orange for home country
                hoverFillColor = "#ea580c";
              } else if (visitStatus === 'visited') {
                fillColor = "#10b981"; // Green for visited countries
                hoverFillColor = "#059669";
              }
              
              // Debug specific countries - disabled to prevent call stack issues
              // if (["Malaysia", "Brazil", "Poland", "United States"].includes(countryName)) {
              //  console.log(`Map country: ${countryName}, ISO-A2: ${iso_a2}, Status: ${visitStatus}`);
              // }
              
              return (
                <Geography
                  key={geo.rsmKey || iso_a3 || countryName}
                  geography={geo}
                  fill={fillColor}
                  stroke={strokeColor}
                  strokeWidth={strokeWidth}
                  strokeDasharray={strokeStyle !== "solid" ? strokeStyle : undefined}
                  style={{
                    default: {
                      fill: fillColor,
                      outline: "none",
                    },
                    hover: {
                      fill: hoverFillColor,
                      outline: "none",
                      cursor: "pointer"
                    },
                    pressed: {
                      fill: hoverFillColor,
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
