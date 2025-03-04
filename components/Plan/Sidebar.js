import { useState } from "react";
import styled from "styled-components";
import axios from "axios";

export default function Sidebar({ addSelection }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [locations, setLocations] = useState([]);

  const MAPBOX_ACCESS_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

  // Fetch locations from Mapbox API based on user input
  const fetchLocations = async (query) => {
    if (!query) return;

    try {
      const response = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?` +
        `access_token=${MAPBOX_ACCESS_TOKEN}&limit=5`
      );      
      setLocations(response.data.features);
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  };

  return (
    <Section>
      {/* Search input for entering location names */}
      <SearchInput
        type="text"
        placeholder="Search locations..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          fetchLocations(e.target.value);
        }}
      />
      
      {/* Display search results as selectable locations */}
      <DestinationList>
        {locations.map((location) => (
          <DestinationItem key={location.id} onClick={() => addSelection(location)}>
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
  border-right: 2px solid #ccc;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px;
  border-radius: 50px;
  border: 2px solid #ccc;
  font-size: 18px;
  font-family: var(--font-prm);
  outline: none;
  background-color: transparent;
  color: var(--prm-light);

  &::placeholder {
    color: var(--prm-light);
  }
`;

const DestinationList = styled.ul`
  list-style: none;
  padding: 0;
  font-family: var(--font-prm);
`;

const DestinationItem = styled.li`
  padding: 10px;
  border-bottom: 1px solid #ccc;
  cursor: pointer;
  transition: background 0.2s ease-in-out;

  &:hover {
    background-color: #f0f0f0;
  }
`;
