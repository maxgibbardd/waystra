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
    setSelections((prevSelections) => [
      ...prevSelections,
      { ...location, duration: 1 },
    ]);
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

  const handleSave = () => {
    // Load existing saved trips from localStorage
    const savedTrips = JSON.parse(localStorage.getItem("savedTrips")) || [];

    // Create a new “trip” object
    const newTrip = {
      selections,
      savedAt: new Date().toLocaleString(), // Or however you’d like to label it
    };

    // Save to localStorage
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
          <TabContainer>
            {/* Flex wrapper for the tabs themselves */}
            <TabWrapper>
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
            </TabWrapper>

            {/* Button on the right */}
            <SaveButton onClick={handleSave}>Save</SaveButton>
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
`;

const TabContainer = styled.div`
  /* Parent container: let's keep it centered but also allow space for the Save button */
  display: flex;
  align-items: center;
  width: 60%;
  margin: 0 auto;
  border: 1px solid var(--bg-dark);
  border-radius: 50px;
  padding: 0 16px;
  justify-content: space-between;
`;

const TabWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  flex: 1;
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

const SaveButton = styled.button`
  border: none;
  border-radius: 50px;
  padding: 8px 16px;
  font-size: 16px;
  cursor: pointer;
  background-color: var(--scnd-light);
  color: var(--txt-light);
  font-family: var(--font-prm);
`;

const ContentArea = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  height: 90%;
  flex: 1;
`;
