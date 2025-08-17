// Centralized country data - single source of truth for all country information
export interface Country {
  code: string;      // ISO 2-letter code (e.g., "US", "BR", "CZ")
  code3?: string;    // ISO 3-letter code (e.g., "USA", "BRA", "CZE") 
  name: string;      // Full country name
  continent: string; // Continent name
  flag: string;      // Flag emoji
}

export const COUNTRIES: Country[] = [
  // Europe
  { code: "AD", name: "Andorra", continent: "Europe", flag: "🇦🇩" },
  { code: "AL", name: "Albania", continent: "Europe", flag: "🇦🇱" },
  { code: "AT", name: "Austria", continent: "Europe", flag: "🇦🇹" },
  { code: "BA", name: "Bosnia and Herzegovina", continent: "Europe", flag: "🇧🇦" },
  { code: "BE", name: "Belgium", continent: "Europe", flag: "🇧🇪" },
  { code: "BG", name: "Bulgaria", continent: "Europe", flag: "🇧🇬" },
  { code: "BY", name: "Belarus", continent: "Europe", flag: "🇧🇾" },
  { code: "CH", name: "Switzerland", continent: "Europe", flag: "🇨🇭" },
  { code: "CZ", name: "Czech Republic", code3: "CZE", continent: "Europe", flag: "🇨🇿" },
  { code: "DE", name: "Germany", code3: "DEU", continent: "Europe", flag: "🇩🇪" },
  { code: "DK", name: "Denmark", continent: "Europe", flag: "🇩🇰" },
  { code: "EE", name: "Estonia", continent: "Europe", flag: "🇪🇪" },
  { code: "ES", name: "Spain", code3: "ESP", continent: "Europe", flag: "🇪🇸" },
  { code: "FI", name: "Finland", continent: "Europe", flag: "🇫🇮" },
  { code: "FR", name: "France", code3: "FRA", continent: "Europe", flag: "🇫🇷" },
  { code: "GB", name: "United Kingdom", code3: "GBR", continent: "Europe", flag: "🇬🇧" },
  { code: "GR", name: "Greece", code3: "GRC", continent: "Europe", flag: "🇬🇷" },
  { code: "HR", name: "Croatia", continent: "Europe", flag: "🇭🇷" },
  { code: "HU", name: "Hungary", continent: "Europe", flag: "🇭🇺" },
  { code: "IE", name: "Ireland", continent: "Europe", flag: "🇮🇪" },
  { code: "IS", name: "Iceland", continent: "Europe", flag: "🇮🇸" },
  { code: "IT", name: "Italy", code3: "ITA", continent: "Europe", flag: "🇮🇹" },
  { code: "LI", name: "Liechtenstein", continent: "Europe", flag: "🇱🇮" },
  { code: "LT", name: "Lithuania", continent: "Europe", flag: "🇱🇹" },
  { code: "LU", name: "Luxembourg", continent: "Europe", flag: "🇱🇺" },
  { code: "LV", name: "Latvia", continent: "Europe", flag: "🇱🇻" },
  { code: "MC", name: "Monaco", continent: "Europe", flag: "🇲🇨" },
  { code: "MD", name: "Moldova", continent: "Europe", flag: "🇲🇩" },
  { code: "ME", name: "Montenegro", continent: "Europe", flag: "🇲🇪" },
  { code: "MK", name: "North Macedonia", continent: "Europe", flag: "🇲🇰" },
  { code: "MT", name: "Malta", continent: "Europe", flag: "🇲🇹" },
  { code: "NL", name: "Netherlands", continent: "Europe", flag: "🇳🇱" },
  { code: "NO", name: "Norway", continent: "Europe", flag: "🇳🇴" },
  { code: "PL", name: "Poland", continent: "Europe", flag: "🇵🇱" },
  { code: "PT", name: "Portugal", continent: "Europe", flag: "🇵🇹" },
  { code: "RO", name: "Romania", continent: "Europe", flag: "🇷🇴" },
  { code: "RS", name: "Serbia", continent: "Europe", flag: "🇷🇸" },
  { code: "RU", name: "Russia", continent: "Europe", flag: "🇷🇺" },
  { code: "SE", name: "Sweden", continent: "Europe", flag: "🇸🇪" },
  { code: "SI", name: "Slovenia", continent: "Europe", flag: "🇸🇮" },
  { code: "SK", name: "Slovakia", continent: "Europe", flag: "🇸🇰" },
  { code: "SM", name: "San Marino", continent: "Europe", flag: "🇸🇲" },
  { code: "TR", name: "Turkey", continent: "Europe", flag: "🇹🇷" },
  { code: "UA", name: "Ukraine", continent: "Europe", flag: "🇺🇦" },
  { code: "VA", name: "Vatican City", continent: "Europe", flag: "🇻🇦" },

  // North America
  { code: "AG", name: "Antigua and Barbuda", continent: "North America", flag: "🇦🇬" },
  { code: "BB", name: "Barbados", continent: "North America", flag: "🇧🇧" },
  { code: "BZ", name: "Belize", continent: "North America", flag: "🇧🇿" },
  { code: "BS", name: "Bahamas", continent: "North America", flag: "🇧🇸" },
  { code: "CA", name: "Canada", code3: "CAN", continent: "North America", flag: "🇨🇦" },
  { code: "CR", name: "Costa Rica", continent: "North America", flag: "🇨🇷" },
  { code: "CU", name: "Cuba", continent: "North America", flag: "🇨🇺" },
  { code: "DM", name: "Dominica", continent: "North America", flag: "🇩🇲" },
  { code: "DO", name: "Dominican Republic", continent: "North America", flag: "🇩🇴" },
  { code: "GD", name: "Grenada", continent: "North America", flag: "🇬🇩" },
  { code: "GT", name: "Guatemala", continent: "North America", flag: "🇬🇹" },
  { code: "HN", name: "Honduras", continent: "North America", flag: "🇭🇳" },
  { code: "HT", name: "Haiti", continent: "North America", flag: "🇭🇹" },
  { code: "JM", name: "Jamaica", continent: "North America", flag: "🇯🇲" },
  { code: "KN", name: "Saint Kitts and Nevis", continent: "North America", flag: "🇰🇳" },
  { code: "LC", name: "Saint Lucia", continent: "North America", flag: "🇱🇨" },
  { code: "MX", name: "Mexico", continent: "North America", flag: "🇲🇽" },
  { code: "NI", name: "Nicaragua", continent: "North America", flag: "🇳🇮" },
  { code: "PA", name: "Panama", continent: "North America", flag: "🇵🇦" },
  { code: "SV", name: "El Salvador", continent: "North America", flag: "🇸🇻" },
  { code: "TT", name: "Trinidad and Tobago", continent: "North America", flag: "🇹🇹" },
  { code: "US", name: "United States", code3: "USA", continent: "North America", flag: "🇺🇸" },
  { code: "VC", name: "Saint Vincent and the Grenadines", continent: "North America", flag: "🇻🇨" },

  // South America
  { code: "AR", name: "Argentina", continent: "South America", flag: "🇦🇷" },
  { code: "BO", name: "Bolivia", continent: "South America", flag: "🇧🇴" },
  { code: "BR", name: "Brazil", code3: "BRA", continent: "South America", flag: "🇧🇷" },
  { code: "CL", name: "Chile", continent: "South America", flag: "🇨🇱" },
  { code: "CO", name: "Colombia", continent: "South America", flag: "🇨🇴" },
  { code: "EC", name: "Ecuador", continent: "South America", flag: "🇪🇨" },
  { code: "GY", name: "Guyana", continent: "South America", flag: "🇬🇾" },
  { code: "PE", name: "Peru", continent: "South America", flag: "🇵🇪" },
  { code: "PY", name: "Paraguay", continent: "South America", flag: "🇵🇾" },
  { code: "SR", name: "Suriname", continent: "South America", flag: "🇸🇷" },
  { code: "UY", name: "Uruguay", continent: "South America", flag: "🇺🇾" },
  { code: "VE", name: "Venezuela", continent: "South America", flag: "🇻🇪" },

  // Asia
  { code: "AE", name: "United Arab Emirates", continent: "Asia", flag: "🇦🇪" },
  { code: "AF", name: "Afghanistan", continent: "Asia", flag: "🇦🇫" },
  { code: "AM", name: "Armenia", continent: "Asia", flag: "🇦🇲" },
  { code: "AZ", name: "Azerbaijan", continent: "Asia", flag: "🇦🇿" },
  { code: "BD", name: "Bangladesh", continent: "Asia", flag: "🇧🇩" },
  { code: "BH", name: "Bahrain", continent: "Asia", flag: "🇧🇭" },
  { code: "BN", name: "Brunei", continent: "Asia", flag: "🇧🇳" },
  { code: "BT", name: "Bhutan", continent: "Asia", flag: "🇧🇹" },
  { code: "CN", name: "China", code3: "CHN", continent: "Asia", flag: "🇨🇳" },
  { code: "CY", name: "Cyprus", continent: "Asia", flag: "🇨🇾" },
  { code: "GE", name: "Georgia", continent: "Asia", flag: "🇬🇪" },
  { code: "HK", name: "Hong Kong", continent: "Asia", flag: "🇭🇰" },
  { code: "ID", name: "Indonesia", continent: "Asia", flag: "🇮🇩" },
  { code: "IL", name: "Israel", continent: "Asia", flag: "🇮🇱" },
  { code: "IN", name: "India", code3: "IND", continent: "Asia", flag: "🇮🇳" },
  { code: "IQ", name: "Iraq", continent: "Asia", flag: "🇮🇶" },
  { code: "IR", name: "Iran", continent: "Asia", flag: "🇮🇷" },
  { code: "JO", name: "Jordan", continent: "Asia", flag: "🇯🇴" },
  { code: "JP", name: "Japan", code3: "JPN", continent: "Asia", flag: "🇯🇵" },
  { code: "KG", name: "Kyrgyzstan", continent: "Asia", flag: "🇰🇬" },
  { code: "KH", name: "Cambodia", continent: "Asia", flag: "🇰🇭" },
  { code: "KP", name: "North Korea", continent: "Asia", flag: "🇰🇵" },
  { code: "KR", name: "South Korea", code3: "KOR", continent: "Asia", flag: "🇰🇷" },
  { code: "KW", name: "Kuwait", continent: "Asia", flag: "🇰🇼" },
  { code: "KZ", name: "Kazakhstan", continent: "Asia", flag: "🇰🇿" },
  { code: "LA", name: "Laos", continent: "Asia", flag: "🇱🇦" },
  { code: "LB", name: "Lebanon", continent: "Asia", flag: "🇱🇧" },
  { code: "LK", name: "Sri Lanka", continent: "Asia", flag: "🇱🇰" },
  { code: "MM", name: "Myanmar", continent: "Asia", flag: "🇲🇲" },
  { code: "MN", name: "Mongolia", continent: "Asia", flag: "🇲🇳" },
  { code: "MO", name: "Macao", continent: "Asia", flag: "🇲🇴" },
  { code: "MV", name: "Maldives", continent: "Asia", flag: "🇲🇻" },
  { code: "MY", name: "Malaysia", continent: "Asia", flag: "🇲🇾" },
  { code: "NP", name: "Nepal", continent: "Asia", flag: "🇳🇵" },
  { code: "OM", name: "Oman", continent: "Asia", flag: "🇴🇲" },
  { code: "PH", name: "Philippines", continent: "Asia", flag: "🇵🇭" },
  { code: "PK", name: "Pakistan", continent: "Asia", flag: "🇵🇰" },
  { code: "PS", name: "Palestine", continent: "Asia", flag: "🇵🇸" },
  { code: "QA", name: "Qatar", continent: "Asia", flag: "🇶🇦" },
  { code: "SA", name: "Saudi Arabia", continent: "Asia", flag: "🇸🇦" },
  { code: "SG", name: "Singapore", continent: "Asia", flag: "🇸🇬" },
  { code: "SY", name: "Syria", continent: "Asia", flag: "🇸🇾" },
  { code: "TH", name: "Thailand", continent: "Asia", flag: "🇹🇭" },
  { code: "TJ", name: "Tajikistan", continent: "Asia", flag: "🇹🇯" },
  { code: "TM", name: "Turkmenistan", continent: "Asia", flag: "🇹🇲" },
  { code: "TW", name: "Taiwan", continent: "Asia", flag: "🇹🇼" },
  { code: "UZ", name: "Uzbekistan", continent: "Asia", flag: "🇺🇿" },
  { code: "VN", name: "Vietnam", continent: "Asia", flag: "🇻🇳" },
  { code: "YE", name: "Yemen", continent: "Asia", flag: "🇾🇪" },

  // Africa
  { code: "AO", name: "Angola", continent: "Africa", flag: "🇦🇴" },
  { code: "BF", name: "Burkina Faso", continent: "Africa", flag: "🇧🇫" },
  { code: "BI", name: "Burundi", continent: "Africa", flag: "🇧🇮" },
  { code: "BJ", name: "Benin", continent: "Africa", flag: "🇧🇯" },
  { code: "BW", name: "Botswana", continent: "Africa", flag: "🇧🇼" },
  { code: "CD", name: "Democratic Republic of the Congo", continent: "Africa", flag: "🇨🇩" },
  { code: "CF", name: "Central African Republic", continent: "Africa", flag: "🇨🇫" },
  { code: "CG", name: "Republic of the Congo", continent: "Africa", flag: "🇨🇬" },
  { code: "CI", name: "Côte d'Ivoire", continent: "Africa", flag: "🇨🇮" },
  { code: "CM", name: "Cameroon", continent: "Africa", flag: "🇨🇲" },
  { code: "CV", name: "Cape Verde", continent: "Africa", flag: "🇨🇻" },
  { code: "DJ", name: "Djibouti", continent: "Africa", flag: "🇩🇯" },
  { code: "DZ", name: "Algeria", continent: "Africa", flag: "🇩🇿" },
  { code: "EG", name: "Egypt", continent: "Africa", flag: "🇪🇬" },
  { code: "ER", name: "Eritrea", continent: "Africa", flag: "🇪🇷" },
  { code: "ET", name: "Ethiopia", continent: "Africa", flag: "🇪🇹" },
  { code: "GA", name: "Gabon", continent: "Africa", flag: "🇬🇦" },
  { code: "GH", name: "Ghana", continent: "Africa", flag: "🇬🇭" },
  { code: "GM", name: "Gambia", continent: "Africa", flag: "🇬🇲" },
  { code: "GN", name: "Guinea", continent: "Africa", flag: "🇬🇳" },
  { code: "GQ", name: "Equatorial Guinea", continent: "Africa", flag: "🇬🇶" },
  { code: "GW", name: "Guinea-Bissau", continent: "Africa", flag: "🇬🇼" },
  { code: "KE", name: "Kenya", continent: "Africa", flag: "🇰🇪" },
  { code: "KM", name: "Comoros", continent: "Africa", flag: "🇰🇲" },
  { code: "LR", name: "Liberia", continent: "Africa", flag: "🇱🇷" },
  { code: "LS", name: "Lesotho", continent: "Africa", flag: "🇱🇸" },
  { code: "LY", name: "Libya", continent: "Africa", flag: "🇱🇾" },
  { code: "MA", name: "Morocco", continent: "Africa", flag: "🇲🇦" },
  { code: "MG", name: "Madagascar", continent: "Africa", flag: "🇲🇬" },
  { code: "ML", name: "Mali", continent: "Africa", flag: "🇲🇱" },
  { code: "MR", name: "Mauritania", continent: "Africa", flag: "🇲🇷" },
  { code: "MU", name: "Mauritius", continent: "Africa", flag: "🇲🇺" },
  { code: "MW", name: "Malawi", continent: "Africa", flag: "🇲🇼" },
  { code: "MZ", name: "Mozambique", continent: "Africa", flag: "🇲🇿" },
  { code: "NA", name: "Namibia", continent: "Africa", flag: "🇳🇦" },
  { code: "NE", name: "Niger", continent: "Africa", flag: "🇳🇪" },
  { code: "NG", name: "Nigeria", continent: "Africa", flag: "🇳🇬" },
  { code: "RW", name: "Rwanda", continent: "Africa", flag: "🇷🇼" },
  { code: "SC", name: "Seychelles", continent: "Africa", flag: "🇸🇨" },
  { code: "SD", name: "Sudan", continent: "Africa", flag: "🇸🇩" },
  { code: "SL", name: "Sierra Leone", continent: "Africa", flag: "🇸🇱" },
  { code: "SN", name: "Senegal", continent: "Africa", flag: "🇸🇳" },
  { code: "SO", name: "Somalia", continent: "Africa", flag: "🇸🇴" },
  { code: "SS", name: "South Sudan", continent: "Africa", flag: "🇸🇸" },
  { code: "ST", name: "São Tomé and Príncipe", continent: "Africa", flag: "🇸🇹" },
  { code: "SZ", name: "Eswatini", continent: "Africa", flag: "🇸🇿" },
  { code: "TD", name: "Chad", continent: "Africa", flag: "🇹🇩" },
  { code: "TG", name: "Togo", continent: "Africa", flag: "🇹🇬" },
  { code: "TN", name: "Tunisia", continent: "Africa", flag: "🇹🇳" },
  { code: "TZ", name: "Tanzania", continent: "Africa", flag: "🇹🇿" },
  { code: "UG", name: "Uganda", continent: "Africa", flag: "🇺🇬" },
  { code: "ZA", name: "South Africa", continent: "Africa", flag: "🇿🇦" },
  { code: "ZM", name: "Zambia", continent: "Africa", flag: "🇿🇲" },
  { code: "ZW", name: "Zimbabwe", continent: "Africa", flag: "🇿🇼" },

  // Oceania
  { code: "AU", name: "Australia", code3: "AUS", continent: "Oceania", flag: "🇦🇺" },
  { code: "FJ", name: "Fiji", continent: "Oceania", flag: "🇫🇯" },
  { code: "KI", name: "Kiribati", continent: "Oceania", flag: "🇰🇮" },
  { code: "MH", name: "Marshall Islands", continent: "Oceania", flag: "🇲🇭" },
  { code: "FM", name: "Micronesia", continent: "Oceania", flag: "🇫🇲" },
  { code: "NR", name: "Nauru", continent: "Oceania", flag: "🇳🇷" },
  { code: "NZ", name: "New Zealand", code3: "NZL", continent: "Oceania", flag: "🇳🇿" },
  { code: "PW", name: "Palau", continent: "Oceania", flag: "🇵🇼" },
  { code: "PG", name: "Papua New Guinea", continent: "Oceania", flag: "🇵🇬" },
  { code: "SB", name: "Solomon Islands", continent: "Oceania", flag: "🇸🇧" },
  { code: "TO", name: "Tonga", continent: "Oceania", flag: "🇹🇴" },
  { code: "TV", name: "Tuvalu", continent: "Oceania", flag: "🇹🇻" },
  { code: "VU", name: "Vanuatu", continent: "Oceania", flag: "🇻🇺" },
  { code: "WS", name: "Samoa", continent: "Oceania", flag: "🇼🇸" },
];

// Helper functions for easy access
export const getCountryByCode = (code: string): Country | undefined => {
  return COUNTRIES.find(country => 
    country.code.toLowerCase() === code.toLowerCase() || 
    country.code3?.toLowerCase() === code.toLowerCase()
  );
};

export const getCountryByName = (name: string): Country | undefined => {
  return COUNTRIES.find(country => 
    country.name.toLowerCase() === name.toLowerCase()
  );
};

export const getCountriesByContinent = (continent: string): Country[] => {
  return COUNTRIES.filter(country => 
    country.continent.toLowerCase() === continent.toLowerCase()
  );
};

export const searchCountries = (query: string): Country[] => {
  const lowerQuery = query.toLowerCase();
  return COUNTRIES.filter(country =>
    country.name.toLowerCase().includes(lowerQuery) ||
    country.code.toLowerCase().includes(lowerQuery) ||
    country.code3?.toLowerCase().includes(lowerQuery)
  );
};