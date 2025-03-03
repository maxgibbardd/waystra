import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

export default function Route({ selections, isLoaded }) {
  const [validLocations, setValidLocations] = useState([]);

  useEffect(() => {
    console.log("Route selections:", selections);
    const filtered = selections.filter(
      (loc) => loc.lat && loc.lng && !isNaN(loc.lat) && !isNaN(loc.lng)
    );

    if (filtered.length === 0) {
      console.warn("No valid locations to display.");
    }

    setValidLocations(filtered);
  }, [selections]);

  if (!isLoaded) return <div>Loading...</div>;

  if (validLocations.length === 0) {
    return <div>No valid locations available. Try adding locations to the itinerary.</div>;
  }

  return (
    <LoadScript googleMapsApiKey="AIzaSyCM_zt-l_E2RYq37B6QO8oSrm_gGTA_XDE" libraries={["places"]}>
      <GoogleMap
        center={{ lat: validLocations[0].lat, lng: validLocations[0].lng }}
        zoom={12}
        mapContainerStyle={{ width: "100%", height: "70vh" }}
      >
        {validLocations.map((location, index) => (
          <Marker key={index} position={{ lat: location.lat, lng: location.lng }} />
        ))}
      </GoogleMap>
    </LoadScript>
  );
}
