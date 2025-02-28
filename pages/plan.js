import React, { useState } from "react";
import styled from "styled-components";
import Navbar from "@/components/Dashboard/Navbar";
import Itinerary from "@/components/Plan/Itinerary";
import Route from "@/components/Plan/Route";
import Sidebar from "@/components/Plan/Sidebar";

export default function Plan() {
  // Default to the Itinerary tab for this example.
  const [activeTab, setActiveTab] = useState("Itinerary");  // 
  const [selections, setSelections] = useState([]);         // stores selected locations displayed on the itinerary tab

  // Add a selected location with a default duration of 1 day
  const addSelection = (location) => {
    setSelections((prevSelections) => [
      ...prevSelections,
      { ...location, duration: 1 },
    ]);
  };

  // Update the duration for a given location
  const updateDuration = (index, newDuration) => {
    setSelections((prevSelections) => {
      const updated = [...prevSelections];
      updated[index].duration = newDuration;
      return updated;
    });
  };

  // Remove a location from the itinerary
  const removeLocation = (index) => {
    setSelections((prevSelections) =>
      prevSelections.filter((_, i) => i !== index)
    );
  };

  // Render the active tab content.
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
        return <Route />;
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
`;

const TabContainer = styled.div`
  display: flex;
  padding: 0 100px;
  border: 1px solid var(--bg-dark);
  border-radius: 50px;
  width: 60%;
  margin: 0 auto;
  justify-content: space-between;
`;

const Tab = styled.button`
  padding: 8px 16px;
  margin: 3px;
  border-radius: 50px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  color: var(--txt-light);
  font-size: 20px;
  font-weight: 300;
  font-family: var(--font-prm);
  outline: none;
  transition: background 0.2s ease-in-out, color 0.2s ease-in-out;

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
