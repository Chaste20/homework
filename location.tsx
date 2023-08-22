import React, { useState, useEffect } from 'react';

const LocationApp: React.FC = () => {
  const [locationInfo, setLocationInfo] = useState<string | null>(null);

  useEffect(() => {
    fetchLocation();
  }, []);

  const fetchLocation = async () => {
    try {
      const ipResponse = await fetch('https://api.ipify.org?format=json');
      const ipData = await ipResponse.json();
      const ipAddress = ipData.ip;

      const locationResponse = await fetch(`https://ipinfo.io/${ipAddress}/json`);
      const locationData = await locationResponse.json();
      const { country, city } = locationData;

      setLocationInfo(`Your country is ${country} and city is ${city}`);
    } catch (error) {
      console.error(error);
    }
  };
  
    return (
         <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md">
          <button
            className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={fetchLocation}
          >
            Show My Location
          </button>
          {locationInfo && (
            <div className="mt-4">
              <p>{locationInfo}</p>
            </div>
          )}
        </div>
      </div>
    );
  };
  
  export default LocationApp;