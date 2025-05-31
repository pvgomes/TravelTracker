// Centralized country data - single source of truth for all country information
export interface Country {
  code: string;      // ISO 2-letter code (e.g., "US", "BR", "CZ")
  code3?: string;    // ISO 3-letter code (e.g., "USA", "BRA", "CZE") 
  name: string;      // Full country name
  continent: string; // Continent name
}

export const COUNTRIES: Country[] = [
  // Europe
  { code: "AD", name: "Andorra", continent: "Europe" },
  { code: "AL", name: "Albania", continent: "Europe" },
  { code: "AT", name: "Austria", continent: "Europe" },
  { code: "BA", name: "Bosnia and Herzegovina", continent: "Europe" },
  { code: "BE", name: "Belgium", continent: "Europe" },
  { code: "BG", name: "Bulgaria", continent: "Europe" },
  { code: "BY", name: "Belarus", continent: "Europe" },
  { code: "CH", name: "Switzerland", continent: "Europe" },
  { code: "CZ", name: "Czech Republic", code3: "CZE", continent: "Europe" },
  { code: "DE", name: "Germany", code3: "DEU", continent: "Europe" },
  { code: "DK", name: "Denmark", continent: "Europe" },
  { code: "EE", name: "Estonia", continent: "Europe" },
  { code: "ES", name: "Spain", code3: "ESP", continent: "Europe" },
  { code: "FI", name: "Finland", continent: "Europe" },
  { code: "FR", name: "France", code3: "FRA", continent: "Europe" },
  { code: "GB", name: "United Kingdom", code3: "GBR", continent: "Europe" },
  { code: "GR", name: "Greece", code3: "GRC", continent: "Europe" },
  { code: "HR", name: "Croatia", continent: "Europe" },
  { code: "HU", name: "Hungary", continent: "Europe" },
  { code: "IE", name: "Ireland", continent: "Europe" },
  { code: "IS", name: "Iceland", continent: "Europe" },
  { code: "IT", name: "Italy", code3: "ITA", continent: "Europe" },
  { code: "LI", name: "Liechtenstein", continent: "Europe" },
  { code: "LT", name: "Lithuania", continent: "Europe" },
  { code: "LU", name: "Luxembourg", continent: "Europe" },
  { code: "LV", name: "Latvia", continent: "Europe" },
  { code: "MC", name: "Monaco", continent: "Europe" },
  { code: "MD", name: "Moldova", continent: "Europe" },
  { code: "ME", name: "Montenegro", continent: "Europe" },
  { code: "MK", name: "North Macedonia", continent: "Europe" },
  { code: "MT", name: "Malta", continent: "Europe" },
  { code: "NL", name: "Netherlands", continent: "Europe" },
  { code: "NO", name: "Norway", continent: "Europe" },
  { code: "PL", name: "Poland", continent: "Europe" },
  { code: "PT", name: "Portugal", continent: "Europe" },
  { code: "RO", name: "Romania", continent: "Europe" },
  { code: "RS", name: "Serbia", continent: "Europe" },
  { code: "RU", name: "Russia", continent: "Europe" },
  { code: "SE", name: "Sweden", continent: "Europe" },
  { code: "SI", name: "Slovenia", continent: "Europe" },
  { code: "SK", name: "Slovakia", continent: "Europe" },
  { code: "SM", name: "San Marino", continent: "Europe" },
  { code: "TR", name: "Turkey", continent: "Europe" },
  { code: "UA", name: "Ukraine", continent: "Europe" },
  { code: "VA", name: "Vatican City", continent: "Europe" },

  // North America
  { code: "AG", name: "Antigua and Barbuda", continent: "North America" },
  { code: "BB", name: "Barbados", continent: "North America" },
  { code: "BZ", name: "Belize", continent: "North America" },
  { code: "BS", name: "Bahamas", continent: "North America" },
  { code: "CA", name: "Canada", code3: "CAN", continent: "North America" },
  { code: "CR", name: "Costa Rica", continent: "North America" },
  { code: "CU", name: "Cuba", continent: "North America" },
  { code: "DM", name: "Dominica", continent: "North America" },
  { code: "DO", name: "Dominican Republic", continent: "North America" },
  { code: "GD", name: "Grenada", continent: "North America" },
  { code: "GT", name: "Guatemala", continent: "North America" },
  { code: "HN", name: "Honduras", continent: "North America" },
  { code: "HT", name: "Haiti", continent: "North America" },
  { code: "JM", name: "Jamaica", continent: "North America" },
  { code: "KN", name: "Saint Kitts and Nevis", continent: "North America" },
  { code: "LC", name: "Saint Lucia", continent: "North America" },
  { code: "MX", name: "Mexico", continent: "North America" },
  { code: "NI", name: "Nicaragua", continent: "North America" },
  { code: "PA", name: "Panama", continent: "North America" },
  { code: "SV", name: "El Salvador", continent: "North America" },
  { code: "TT", name: "Trinidad and Tobago", continent: "North America" },
  { code: "US", name: "United States", code3: "USA", continent: "North America" },
  { code: "VC", name: "Saint Vincent and the Grenadines", continent: "North America" },

  // South America
  { code: "AR", name: "Argentina", continent: "South America" },
  { code: "BO", name: "Bolivia", continent: "South America" },
  { code: "BR", name: "Brazil", code3: "BRA", continent: "South America" },
  { code: "CL", name: "Chile", continent: "South America" },
  { code: "CO", name: "Colombia", continent: "South America" },
  { code: "EC", name: "Ecuador", continent: "South America" },
  { code: "GY", name: "Guyana", continent: "South America" },
  { code: "PE", name: "Peru", continent: "South America" },
  { code: "PY", name: "Paraguay", continent: "South America" },
  { code: "SR", name: "Suriname", continent: "South America" },
  { code: "UY", name: "Uruguay", continent: "South America" },
  { code: "VE", name: "Venezuela", continent: "South America" },

  // Asia
  { code: "AE", name: "United Arab Emirates", continent: "Asia" },
  { code: "AF", name: "Afghanistan", continent: "Asia" },
  { code: "AM", name: "Armenia", continent: "Asia" },
  { code: "AZ", name: "Azerbaijan", continent: "Asia" },
  { code: "BD", name: "Bangladesh", continent: "Asia" },
  { code: "BH", name: "Bahrain", continent: "Asia" },
  { code: "BN", name: "Brunei", continent: "Asia" },
  { code: "BT", name: "Bhutan", continent: "Asia" },
  { code: "CN", name: "China", code3: "CHN", continent: "Asia" },
  { code: "CY", name: "Cyprus", continent: "Asia" },
  { code: "GE", name: "Georgia", continent: "Asia" },
  { code: "HK", name: "Hong Kong", continent: "Asia" },
  { code: "ID", name: "Indonesia", continent: "Asia" },
  { code: "IL", name: "Israel", continent: "Asia" },
  { code: "IN", name: "India", code3: "IND", continent: "Asia" },
  { code: "IQ", name: "Iraq", continent: "Asia" },
  { code: "IR", name: "Iran", continent: "Asia" },
  { code: "JO", name: "Jordan", continent: "Asia" },
  { code: "JP", name: "Japan", code3: "JPN", continent: "Asia" },
  { code: "KG", name: "Kyrgyzstan", continent: "Asia" },
  { code: "KH", name: "Cambodia", continent: "Asia" },
  { code: "KP", name: "North Korea", continent: "Asia" },
  { code: "KR", name: "South Korea", code3: "KOR", continent: "Asia" },
  { code: "KW", name: "Kuwait", continent: "Asia" },
  { code: "KZ", name: "Kazakhstan", continent: "Asia" },
  { code: "LA", name: "Laos", continent: "Asia" },
  { code: "LB", name: "Lebanon", continent: "Asia" },
  { code: "LK", name: "Sri Lanka", continent: "Asia" },
  { code: "MM", name: "Myanmar", continent: "Asia" },
  { code: "MN", name: "Mongolia", continent: "Asia" },
  { code: "MO", name: "Macao", continent: "Asia" },
  { code: "MV", name: "Maldives", continent: "Asia" },
  { code: "MY", name: "Malaysia", continent: "Asia" },
  { code: "NP", name: "Nepal", continent: "Asia" },
  { code: "OM", name: "Oman", continent: "Asia" },
  { code: "PH", name: "Philippines", continent: "Asia" },
  { code: "PK", name: "Pakistan", continent: "Asia" },
  { code: "PS", name: "Palestine", continent: "Asia" },
  { code: "QA", name: "Qatar", continent: "Asia" },
  { code: "SA", name: "Saudi Arabia", continent: "Asia" },
  { code: "SG", name: "Singapore", continent: "Asia" },
  { code: "SY", name: "Syria", continent: "Asia" },
  { code: "TH", name: "Thailand", continent: "Asia" },
  { code: "TJ", name: "Tajikistan", continent: "Asia" },
  { code: "TM", name: "Turkmenistan", continent: "Asia" },
  { code: "TW", name: "Taiwan", continent: "Asia" },
  { code: "UZ", name: "Uzbekistan", continent: "Asia" },
  { code: "VN", name: "Vietnam", continent: "Asia" },
  { code: "YE", name: "Yemen", continent: "Asia" },

  // Africa
  { code: "AO", name: "Angola", continent: "Africa" },
  { code: "BF", name: "Burkina Faso", continent: "Africa" },
  { code: "BI", name: "Burundi", continent: "Africa" },
  { code: "BJ", name: "Benin", continent: "Africa" },
  { code: "BW", name: "Botswana", continent: "Africa" },
  { code: "CD", name: "Democratic Republic of the Congo", continent: "Africa" },
  { code: "CF", name: "Central African Republic", continent: "Africa" },
  { code: "CG", name: "Republic of the Congo", continent: "Africa" },
  { code: "CI", name: "Côte d'Ivoire", continent: "Africa" },
  { code: "CM", name: "Cameroon", continent: "Africa" },
  { code: "CV", name: "Cape Verde", continent: "Africa" },
  { code: "DJ", name: "Djibouti", continent: "Africa" },
  { code: "DZ", name: "Algeria", continent: "Africa" },
  { code: "EG", name: "Egypt", continent: "Africa" },
  { code: "ER", name: "Eritrea", continent: "Africa" },
  { code: "ET", name: "Ethiopia", continent: "Africa" },
  { code: "GA", name: "Gabon", continent: "Africa" },
  { code: "GH", name: "Ghana", continent: "Africa" },
  { code: "GM", name: "Gambia", continent: "Africa" },
  { code: "GN", name: "Guinea", continent: "Africa" },
  { code: "GQ", name: "Equatorial Guinea", continent: "Africa" },
  { code: "GW", name: "Guinea-Bissau", continent: "Africa" },
  { code: "KE", name: "Kenya", continent: "Africa" },
  { code: "KM", name: "Comoros", continent: "Africa" },
  { code: "LR", name: "Liberia", continent: "Africa" },
  { code: "LS", name: "Lesotho", continent: "Africa" },
  { code: "LY", name: "Libya", continent: "Africa" },
  { code: "MA", name: "Morocco", continent: "Africa" },
  { code: "MG", name: "Madagascar", continent: "Africa" },
  { code: "ML", name: "Mali", continent: "Africa" },
  { code: "MR", name: "Mauritania", continent: "Africa" },
  { code: "MU", name: "Mauritius", continent: "Africa" },
  { code: "MW", name: "Malawi", continent: "Africa" },
  { code: "MZ", name: "Mozambique", continent: "Africa" },
  { code: "NA", name: "Namibia", continent: "Africa" },
  { code: "NE", name: "Niger", continent: "Africa" },
  { code: "NG", name: "Nigeria", continent: "Africa" },
  { code: "RW", name: "Rwanda", continent: "Africa" },
  { code: "SC", name: "Seychelles", continent: "Africa" },
  { code: "SD", name: "Sudan", continent: "Africa" },
  { code: "SL", name: "Sierra Leone", continent: "Africa" },
  { code: "SN", name: "Senegal", continent: "Africa" },
  { code: "SO", name: "Somalia", continent: "Africa" },
  { code: "SS", name: "South Sudan", continent: "Africa" },
  { code: "ST", name: "São Tomé and Príncipe", continent: "Africa" },
  { code: "SZ", name: "Eswatini", continent: "Africa" },
  { code: "TD", name: "Chad", continent: "Africa" },
  { code: "TG", name: "Togo", continent: "Africa" },
  { code: "TN", name: "Tunisia", continent: "Africa" },
  { code: "TZ", name: "Tanzania", continent: "Africa" },
  { code: "UG", name: "Uganda", continent: "Africa" },
  { code: "ZA", name: "South Africa", continent: "Africa" },
  { code: "ZM", name: "Zambia", continent: "Africa" },
  { code: "ZW", name: "Zimbabwe", continent: "Africa" },

  // Oceania
  { code: "AU", name: "Australia", code3: "AUS", continent: "Oceania" },
  { code: "FJ", name: "Fiji", continent: "Oceania" },
  { code: "KI", name: "Kiribati", continent: "Oceania" },
  { code: "MH", name: "Marshall Islands", continent: "Oceania" },
  { code: "FM", name: "Micronesia", continent: "Oceania" },
  { code: "NR", name: "Nauru", continent: "Oceania" },
  { code: "NZ", name: "New Zealand", code3: "NZL", continent: "Oceania" },
  { code: "PW", name: "Palau", continent: "Oceania" },
  { code: "PG", name: "Papua New Guinea", continent: "Oceania" },
  { code: "SB", name: "Solomon Islands", continent: "Oceania" },
  { code: "TO", name: "Tonga", continent: "Oceania" },
  { code: "TV", name: "Tuvalu", continent: "Oceania" },
  { code: "VU", name: "Vanuatu", continent: "Oceania" },
  { code: "WS", name: "Samoa", continent: "Oceania" },
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