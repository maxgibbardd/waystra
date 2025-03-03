import { useState } from "react";
import styled from "styled-components";
import axios from "axios";

export default function Sidebar({ addSelection }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [locations, setLocations] = useState([]);

  // Function to search for locations using Mapbox or OpenStreetMap
  const fetchLocations = async (query) => {
    if (!query) return;

    try {
      // Using Mapbox API (replace YOUR_MAPBOX_ACCESS_TOKEN with your actual token)
      const response = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          query
        )}.json?access_token=pk.eyJ1IjoibWF4d2VsbGdpYmJhcmRkIiwiYSI6ImNtN25oNHZxNjAxMnIybG9tcWdhamVxY28ifQ.0MNkYws_BZedy1KMRjHyPA&limit=5`
      );

      setLocations(response.data.features);
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  };

  return (
    <Section>
      <SearchInput
        placeholder="Search locations..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          fetchLocations(e.target.value);
        }}
      />
      <DestinationList>
        {locations.map((location) => (
          <DestinationItem
            key={location.id}
            onClick={() => addSelection(location)} // passes location to plan.js
          >
            {location.place_name}
          </DestinationItem>
        ))}
      </DestinationList>
    </Section>
  );
}

// Styled Components
const Section = styled.div`
  width: 25%;
  padding: 20px;
  overflow: hidden;
  border-right: 2px solid #ccc;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px;
  border-radius: 50px;
  border: 2px solid #ccc;
  margin-bottom: 20px;
  font-size: 20px;
  font-family: var(--font-prm);
  outline: none;
  background-color: transparent;
  color: var(--prm-light);

  &::placeholder {
    color: var(--prm-light);
  }
`;

const DestinationList = styled.ul`
  font-family: var(--font-prm);
  list-style-type: none;
  padding-left: 0;
`;

const DestinationItem = styled.li`
  padding: 8px;
  border-bottom: 1px solid #ccc;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;
