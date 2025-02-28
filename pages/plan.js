import React, { useState } from "react";
import styled from "styled-components";
import Navbar from "@/components/Dashboard/Navbar";
import Cost from "@/components/Plan/Itinerary";
import Route from "@/components/Plan/Route";
import Sidebar from "@/components/Plan/Sidebar";

export default function Plan() {
    const [activeTab, setActiveTab] = useState("Cost");
    const [selections, setSelections] = useState([]); // Store selected locations

    // Function to add selected locations
    const addSelection = (location) => {
        setSelections((prevSelections) => [...prevSelections, location]);
    };

    // Function to render the correct component
    const renderContent = () => {
        switch (activeTab) {
            case "Cost":
                return <Cost />;
            case "Route":
                return <Route />;
            case "Itinerary":
                return <Itinerary />;
            default:
                return <Cost />;
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
                            className={activeTab === "Cost" ? "active" : ""}
                            onClick={() => setActiveTab("Cost")}
                        >
                            Cost
                        </Tab>
                        <Tab 
                            className={activeTab === "Route" ? "active" : ""}
                            onClick={() => setActiveTab("Route")}
                        >
                            Route
                        </Tab>
                        <Tab 
                            className={activeTab === "Itinerary" ? "active" : ""}
                            onClick={() => setActiveTab("Itinerary")}
                        >
                            Itinerary
                        </Tab>
                    </TabContainer>
                    <ContentArea>
                        {renderContent()}
                        <SelectionTable selections={selections} />
                    </ContentArea>
                </MainContent>
            </PlanContainer>
        </Section>
    );
}

// Selection Table Component
const SelectionTable = ({ selections }) => {
    return (
        <Table>
            <thead>
                <tr>
                    <th>Location</th>
                </tr>
            </thead>
            <tbody>
                {selections.map((location, index) => (
                    <tr key={index}>
                        <td>{location.place_name}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

// Styled Components
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
    padding-left: 100px;
    padding-right: 100px;
    border: 1px solid var(--bg-dark);
    border-radius: 50px;
    width: 60%;
    margin-left: 20%;
    margin-right: 20%;
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

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;

    th, td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: left;
    }

    th {
        background-color: #f4f4f4;
    }
`;