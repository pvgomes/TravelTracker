import React from 'react';
import ReactDOM from 'react-dom/client';
import { useState } from "react";
import './index.css';

// Demo application with minimal dependencies
function App() {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [stateOptions, setStateOptions] = useState<string[]>([]);
  const [city, setCity] = useState("");
  
  // Hardcoded list of countries for demo
  const countries = [
    { code: "US", name: "United States" },
    { code: "UK", name: "United Kingdom" },
    { code: "CA", name: "Canada" },
    { code: "QA", name: "Qatar" },
    { code: "JP", name: "Japan" },
    { code: "FR", name: "France" },
    { code: "DE", name: "Germany" }
  ];
  
  // Hard-coded state options for demonstration
  const statesByCountry: Record<string, string[]> = {
    "US": ["California", "New York", "Texas", "Florida"],
    "UK": ["England", "Scotland", "Wales", "Northern Ireland"],
    "CA": ["Ontario", "Quebec", "British Columbia"],
    "QA": ["Ad Dawhah", "Al Khor", "Ar Rayyan"],
    "JP": ["Tokyo", "Osaka", "Hokkaido"],
    "FR": ["Île-de-France", "Provence-Alpes-Côte d'Azur", "Nouvelle-Aquitaine"],
    "DE": ["Bavaria", "Berlin", "Hesse"]
  };
  
  // Filter countries based on search term
  const filteredCountries = countries.filter(country => 
    country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    country.code.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Handle country selection
  const handleCountrySelect = (countryCode: string) => {
    setSelectedCountry(countryCode);
    setSelectedState("");
    setStateOptions(statesByCountry[countryCode] || []);
  };
  
  return (
    <div className="min-h-screen p-8 bg-slate-50">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">Travel Tracker Demo</h1>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Country</label>
            <div className="relative">
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                placeholder="Search for a country (try typing 'qa')"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              
              {searchTerm && (
                <div className="absolute z-10 mt-1 w-full bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
                  {filteredCountries.length === 0 ? (
                    <div className="p-2 text-sm text-gray-500">No countries found</div>
                  ) : (
                    filteredCountries.map(country => (
                      <div
                        key={country.code}
                        className={`p-2 hover:bg-gray-100 cursor-pointer ${
                          selectedCountry === country.code ? 'bg-blue-50' : ''
                        }`}
                        onClick={() => {
                          handleCountrySelect(country.code);
                          setSearchTerm(country.name);
                        }}
                      >
                        {country.name}
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">State/Province</label>
            <select
              className="w-full p-2 border rounded-md"
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              disabled={!selectedCountry}
            >
              <option value="">Select state/province...</option>
              {stateOptions.map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">City</label>
            <input
              type="text"
              className="w-full p-2 border rounded-md"
              placeholder="Enter city name"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          
          <button
            className="w-full bg-blue-600 text-white font-medium py-2 rounded-md hover:bg-blue-700 transition"
            onClick={() => {
              if (selectedCountry) {
                const country = countries.find(c => c.code === selectedCountry);
                alert(`Visit added to ${city}, ${selectedState}, ${country?.name}`);
              }
            }}
            disabled={!selectedCountry || !city}
          >
            Add Visit
          </button>
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);