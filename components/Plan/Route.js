import React from "react";
import { GoogleMap, Polyline } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const defaultCenter = { lat: 0, lng: 0 };

export default function Route({ selections, isLoaded }) {
  if (!isLoaded) return <div>Loading Map...</div>;

  const pathCoordinates = selections.map((location) => ({
    lat: location.lat,
    lng: location.lng,
  }));

  const mapCenter = selections.length > 0 ? pathCoordinates[0] : defaultCenter;

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={mapCenter} zoom={4}>
      {selections.length > 0 && (
        <Polyline
          path={pathCoordinates}
          options={{
            strokeColor: "#FF0000",
            strokeOpacity: 0.8,
            strokeWeight: 2,
          }}
        />
      )}
    </GoogleMap>
  );
}
