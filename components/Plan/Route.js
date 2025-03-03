/**
 * components/Plan/Route.js
 * Displays a Google Map with markers for selected locations.
 * Uses the global Google Maps API instance from _app.js to avoid duplication errors.
 */

import React, { useEffect, useState } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";

export default function Route({ selections, isLoaded }) {
  const [validLocations, setValidLocations] = useState([]);

  useEffect(() => {
    console.log("Route selections:", selections);
    const filtered = selections.filter(
      (loc) => loc.lat && loc.lng && !isNaN(loc.lat) && !isNaN(loc.lng)
    );
    setValidLocations(filtered);
  }, [selections]);

  if (!isLoaded) return <div>Loading...</div>;
  if (validLocations.length === 0) {
    return <div>No valid locations available. Try adding locations to the itinerary.</div>;
  }

  return (
    <GoogleMap
      center={{ lat: validLocations[0].lat, lng: validLocations[0].lng }}
      zoom={10}
      mapContainerStyle={{ width: "100%", height: "70vh" }}
    >
      {validLocations.map((location, index) => (
        <Marker key={index} position={{ lat: location.lat, lng: location.lng }} />
      ))}
    </GoogleMap>
  );
}
