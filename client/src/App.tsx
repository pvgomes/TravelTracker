import { useState } from "react";
import { DebugCountrySearch } from "./components/debug-country-search";

// Super simple app with minimal dependencies
function App() {
  const [selectedCountry, setSelectedCountry] = useState<{ code: string; name: string } | null>(null);
  const [selectedState, setSelectedState] = useState("");
  const [city, setCity] = useState("");
  
  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-6">Travel Tracker (Debug Mode)</h1>
        
        <p className="text-gray-500 mb-6">
          Testing country selection with type-ahead search. Try typing "qa" to find Qatar.
        </p>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Country</label>
            <DebugCountrySearch 
              onSelect={(country) => setSelectedCountry(country)}
              selectedCode={selectedCountry?.code}
            />
            {selectedCountry && (
              <p className="mt-2 text-sm text-green-600">
                Selected: {selectedCountry.name} ({selectedCountry.code})
              </p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">State/Province</label>
            <input
              type="text"
              className="w-full p-2 border rounded-md"
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              placeholder={selectedCountry ? "Enter state or province" : "First select a country"}
              disabled={!selectedCountry}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">City</label>
            <input
              type="text"
              className="w-full p-2 border rounded-md"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city name"
            />
          </div>
          
          <button 
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
            onClick={() => {
              if (selectedCountry) {
                alert(`Added visit to ${city}, ${selectedState}, ${selectedCountry.name}`);
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

export default App;
