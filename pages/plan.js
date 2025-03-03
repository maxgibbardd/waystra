import React, { useState } from "react";
import styled from "styled-components";
import Navbar from "@/components/Dashboard/Navbar";
import Itinerary from "@/components/Plan/Itinerary";
import Route from "@/components/Plan/Route";
import Sidebar from "@/components/Plan/Sidebar";
import { useAuth } from "@/backend/Auth";  // Import useAuth for user info
import { saveTrip } from "@/backend/Database"; // Import your Firestore save function

export default function Plan({ isLoaded }) {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("Itinerary");
  const [selections, setSelections] = useState([]);

  const addSelection = (location) => {
    if (!location.geometry || !location.geometry.coordinates) {
      console.error("Invalid location data:", location);
      return;
    }
  
    const [lng, lat] = location.geometry.coordinates;
    setSelections((prevSelections) => [
      ...prevSelections,
      {
        place_name: location.place_name || "Unnamed Location",
        lat,
        lng,
        duration: 1,
      },
    ]);
  
    console.log("Updated selections:", selections);
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

  // Updated save function to use Firestore
  const handleSave = async () => {
    if (!user) {
      alert("You must be logged in to save a trip!");
      return;
    }
    const tripData = {
      selections,
      savedAt: new Date().toLocaleString(),
    };
    await saveTrip(user.uid, tripData);
    alert("Trip saved to Firestore!");
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
          <TopRow>
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
            <SaveButton onClick={handleSave}>Save</SaveButton>
          </TopRow>
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
  font-size: 20px;
  font-weight: 300;
  font-family: var(--font-prm);
  outline: none;
  transition: background 0.2s ease-in-out, color 0.2s ease-in-out;

  color: ${({ theme }) => (theme === "dark" ? "var(--txt-dark)" : "var(--txt-light)")};

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
