import React, { useState } from "react";
import styled from "styled-components";
import Navbar from "@/components/Dashboard/Navbar";
import Itinerary from "@/components/Plan/Itinerary";
import Route from "@/components/Plan/Route";
import Sidebar from "@/components/Plan/Sidebar";

export default function Plan({ isLoaded }) {
  const [activeTab, setActiveTab] = useState("Itinerary");
  const [selections, setSelections] = useState([]);

  const addSelection = (location) => {
    if (!location.geometry || !location.geometry.coordinates) {
      console.error("Invalid location data:", location);
      return;
    }
  
    const [lng, lat] = location.geometry.coordinates; // Extract correctly
  
    setSelections((prevSelections) => [
      ...prevSelections,
      {
        place_name: location.place_name || "Unnamed Location",
        lat,
        lng,
        duration: 1,
      },
    ]);
  
    console.log("Updated selections:", selections); // Debugging
  };
  
  

  const updateDuration = (index, newDuration) => {
    setSelections((prevSelections) => {
      const updated = [...prevSelections];
      updated[index].duration = newDuration;
      return updated;
    });
  };

  const removeLocation = (index) => {
    setSelections((prevSelections) =>
      prevSelections.filter((_, i) => i !== index)
    );
  };

  // Example localStorage-based “save” function
  const handleSave = () => {
    const savedTrips = JSON.parse(localStorage.getItem("savedTrips")) || [];
    const newTrip = {
      selections,
      savedAt: new Date().toLocaleString(),
    };
    savedTrips.push(newTrip);
    localStorage.setItem("savedTrips", JSON.stringify(savedTrips));
    alert("Trip saved!");
  };

  const renderContent = () => {
    switch (activeTab) {
      case "Itinerary":
        return (
          <Itinerary
            selections={selections}
            updateDuration={updateDuration}
            removeLocation={removeLocation}
          />
        );
      case "Route":
        return <Route selections={selections} isLoaded={isLoaded} />;
      default:
        return (
          <Itinerary
            selections={selections}
            updateDuration={updateDuration}
            removeLocation={removeLocation}
          />
        );
    }
  };

  return (
    <Section>
      <Navbar />
      <PlanContainer>
        <Sidebar addSelection={addSelection} />
        <MainContent>
          {/* Row at the top to place the Save button on the right */}
          <TopRow>
            <SaveButton onClick={handleSave}>Save</SaveButton>
          </TopRow>

          {/* Centered Tab Container below it */}
          <TabContainer>
            <Tab
              className={activeTab === "Itinerary" ? "active" : ""}
              onClick={() => setActiveTab("Itinerary")}
            >
              Itinerary
            </Tab>
            <Tab
              className={activeTab === "Route" ? "active" : ""}
              onClick={() => setActiveTab("Route")}
            >
              Route
            </Tab>
          </TabContainer>

          <ContentArea>{renderContent()}</ContentArea>
        </MainContent>
      </PlanContainer>
    </Section>
  );
}

// STYLED COMPONENTS

const Section = styled.section`
  width: 100%;
  height: 100vh;
  padding-top: 55px;
  display: flex;
`;

const PlanContainer = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
`;

const MainContent = styled.div`
  flex: 1;
  min-width: 25%;
  padding: 20px;
  justify-content: center;
  position: relative;
`;

const TopRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
`;

const SaveButton = styled.button`
  border: none;
  border-radius: 50px;
  padding: 8px 20px;
  font-size: 16px;
  cursor: pointer;
  background-color: var(--scnd-light);
  color: var(--txt-light);
  font-family: var(--font-prm);
  transition: background 0.2s ease-in-out;
  &:hover {
    background-color: var(--scnd-dark);
  }
`;

const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  border: 1px solid var(--bg-dark);
  border-radius: 50px;
  width: 60%;
  margin: 0 auto;
`;

const Tab = styled.button`
  padding: 8px 16px;
  margin: 4px;
  border-radius: 50px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  color: var(--txt-light);
  font-size: 20px;
  font-weight: 300;
  font-family: var(--font-prm);
  outline: none;
  transition: background 0.2s ease-in-out;

  &:hover {
    background-color: var(--scnd-light);
  }

  &.active {
    background-color: var(--scnd-light);
  }
`;

const ContentArea = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  height: 90%;
  flex: 1;
`;
