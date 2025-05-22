import { useState, useEffect, useRef, useMemo } from "react";
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
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [zoom, setZoom] = useState(160); // Default zoom scale
  const [center, setCenter] = useState<[number, number]>([0, 0]); // [longitude, latitude]
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  
  // Enhanced touch/mouse event handlers for smooth dragging
  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setSelectedCountry(null); // Clear any selected country
    
    setDragStart({ x: e.clientX, y: e.clientY });
    
    // Capture pointer for smooth tracking on mobile
    if (mapContainerRef.current) {
      mapContainerRef.current.setPointerCapture(e.pointerId);
    }
  };
  
  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    
    e.preventDefault();
    
    const dx = e.clientX - dragStart.x;
    const dy = e.clientY - dragStart.y;
    
    // More responsive sensitivity for smooth Google Maps-like movement
    const sensitivity = 0.2 / (zoom / 160);
    
    // Update the map center with smooth movement
    setCenter(prevCenter => [
      prevCenter[0] - dx * sensitivity,
      prevCenter[1] + dy * sensitivity
    ]);
    
    // Update drag start for continuous smooth movement
    setDragStart({ x: e.clientX, y: e.clientY });
  };
  
  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    
    // Release pointer capture
    if (mapContainerRef.current) {
      mapContainerRef.current.releasePointerCapture(e.pointerId);
    }
  };
  
  // Fallback touch handlers for better mobile support
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      e.preventDefault();
      setIsDragging(true);
      setSelectedCountry(null);
      
      const touch = e.touches[0];
      setDragStart({ x: touch.clientX, y: touch.clientY });
    }
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    
    e.preventDefault();
    
    const touch = e.touches[0];
    const dx = touch.clientX - dragStart.x;
    const dy = touch.clientY - dragStart.y;
    
    const sensitivity = 0.2 / (zoom / 160);
    
    setCenter(prevCenter => [
      prevCenter[0] - dx * sensitivity,
      prevCenter[1] + dy * sensitivity
    ]);
    
    setDragStart({ x: touch.clientX, y: touch.clientY });
  };
  
  const handleTouchEnd = () => {
    setIsDragging(false);
  };
  
  // Prevent scrolling and other default behaviors when dragging
  useEffect(() => {
    if (isDragging && mapContainerRef.current) {
      const preventDefault = (e: Event) => e.preventDefault();
      
      // Prevent scrolling and zooming on mobile while dragging
      document.addEventListener('touchmove', preventDefault, { passive: false });
      document.addEventListener('gesturestart', preventDefault);
      document.addEventListener('gesturechange', preventDefault);
      
      return () => {
        document.removeEventListener('touchmove', preventDefault);
        document.removeEventListener('gesturestart', preventDefault);
        document.removeEventListener('gesturechange', preventDefault);
      };
    }
  }, [isDragging]);
  
  // For responsiveness
  useEffect(() => {
    const handleResize = () => {
      // Force re-render on resize if needed
    };
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  const handleZoomIn = () => {
    setZoom(prevZoom => Math.min(prevZoom + 50, 600)); // Limit maximum zoom level
  };
  
  const handleZoomOut = () => {
    setZoom(prevZoom => Math.max(prevZoom - 50, 100)); // Limit minimum zoom level
  };
  
  // Navigation buttons for panning
  const panMap = (direction: 'up' | 'down' | 'left' | 'right') => {
    const panAmount = 15 / (zoom / 160); // Adjust pan amount based on zoom level
    
    setCenter(prevCenter => {
      const [lon, lat] = prevCenter;
      switch (direction) {
        case 'up':
          return [lon, lat - panAmount];
        case 'down':
          return [lon, lat + panAmount];
        case 'left':
          return [lon + panAmount, lat];
        case 'right':
          return [lon - panAmount, lat];
        default:
          return prevCenter;
      }
    });
  };
  
  // Preset regions to quickly jump to
  const goToRegion = (region: 'world' | 'europe' | 'asia' | 'africa' | 'americas' | 'oceania') => {
    switch (region) {
      case 'world':
        setZoom(160);
        setCenter([0, 0]);
        break;
      case 'europe':
        setZoom(400);
        setCenter([15, 50]);
        break;
      case 'asia':
        setZoom(250);
        setCenter([100, 30]);
        break;
      case 'africa':
        setZoom(250);
        setCenter([20, 0]);
        break;
      case 'americas':
        setZoom(200);
        setCenter([-80, 0]);
        break;
      case 'oceania':
        setZoom(250);
        setCenter([140, -25]);
        break;
    }
  };
  
  // Create lookup maps for visited countries using various formats
  const visitedCountryData = useMemo(() => {
    const codes2 = new Set<string>(); // 2-letter codes
    const codes3 = new Set<string>(); // 3-letter codes
    const names = new Set<string>(); // Full country names
    
    // Add all visited countries
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
    
    // Add home country if provided
    if (homeCountryCode) {
      codes2.add(homeCountryCode);
      
      if (homeCountryName) {
        names.add(homeCountryName);
      }
      
      // Find the 3-letter code for the home country
      Object.entries(countryMapping).forEach(([name, codes]) => {
        if (name === homeCountryName || codes[0] === homeCountryCode) {
          if (codes[1]) codes3.add(codes[1]); // Add 3-letter code
        }
      });
    }
    
    return { codes2, codes3, names };
  }, [visits, homeCountryCode, homeCountryName]);
  
  // Debug log of visited countries only once during initialization
  useEffect(() => {
    // Disabled for now to prevent console flooding
    // if (visits.length > 0) {
    //   console.log("Visited countries count:", visits.length);
    // }
  }, []);
  
  return (
    <div 
      ref={mapContainerRef} 
      className="relative overflow-hidden h-[400px] w-full cursor-grab active:cursor-grabbing touch-none"
      style={{ touchAction: 'none' }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {selectedCountry && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 bg-black/75 text-white py-2 px-4 rounded-md shadow-lg transition-opacity duration-300">
          {selectedCountry}
        </div>
      )}
      
      {/* Drag indicator - only visible when not dragging */}
      {!isDragging && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-5 text-black/30 text-center pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 17.001h2c.5 0 1-.4.5-.9L9 11.6c-.2-.3-.7-.3-1 0l-4.5 4.5c-.5.5 0 .9.5.9h2v3c0 .5.5 1 1 1h3c.6 0 1-.5 1-1v-3z" />
            <path d="M13 7.001h-2c-.5 0-1 .4-.5.9l4.5 4.5c.2.3.7.3 1 0l4.5-4.5c.5-.5 0-.9-.5-.9h-2v-3c0-.5-.5-1-1-1h-3c-.6 0-1 .5-1 1v3z" />
          </svg>
          <div className="text-xs mt-1">Drag to move</div>
        </div>
      )}
      
      {/* Zoom Controls - keep these for convenience */}
      <div className="absolute bottom-4 right-4 z-10 flex flex-col space-y-2">
        <button 
          onClick={handleZoomIn}
          className="bg-white text-gray-800 p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
          aria-label="Zoom in"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="16"></line>
            <line x1="8" y1="12" x2="16" y2="12"></line>
          </svg>
        </button>
        <button 
          onClick={handleZoomOut}
          className="bg-white text-gray-800 p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
          aria-label="Zoom out"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="8" y1="12" x2="16" y2="12"></line>
          </svg>
        </button>
      </div>
      
      {/* Reset button */}
      <div className="absolute bottom-4 left-4 z-10">
        <button 
          onClick={() => goToRegion('world')}
          className="bg-white text-gray-800 p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors flex items-center gap-1"
          aria-label="Reset view"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
          </svg>
          <span className="text-xs">Reset</span>
        </button>
      </div>
      
      {/* Continent buttons removed for better mobile experience */}
      
      <ComposableMap
        projection="geoEqualEarth"
        projectionConfig={{
          scale: zoom,
          center: center
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
                  onClick={() => {
                    setSelectedCountry(countryName);
                    // Auto-hide the tooltip after 3 seconds
                    setTimeout(() => {
                      setSelectedCountry(null);
                    }, 3000);
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
