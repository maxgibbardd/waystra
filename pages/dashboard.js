import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Navbar from "@/components/Dashboard/Navbar";
import { useAuth } from "@/backend/Auth";
import { useRouter } from "next/router";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [savedTrips, setSavedTrips] = useState([]);
  const [expandedTrips, setExpandedTrips] = useState([]); // Boolean array for collapsible sections
  const [tripAiData, setTripAiData] = useState({});       // Stores AI-generated data

  useEffect(() => {
    if (!user) {
      router.push("/auth");
    }
  }, [user, router]);

  // Load trips & AI data from localStorage
  useEffect(() => {
    const trips = JSON.parse(localStorage.getItem("savedTrips")) || [];
    setSavedTrips(trips);

    // Load AI-generated data from localStorage
    const storedAiData = JSON.parse(localStorage.getItem("tripAiData")) || {};
    setTripAiData(storedAiData);

    // Initialize collapsed state for trips
    setExpandedTrips(Array(trips.length).fill(false));
  }, []);

  // Remove a trip by index and update localStorage
  const handleRemove = (index) => {
    const updatedTrips = savedTrips.filter((_, i) => i !== index);
    setSavedTrips(updatedTrips);
    localStorage.setItem("savedTrips", JSON.stringify(updatedTrips));

    // Remove associated AI data
    const newAiData = { ...tripAiData };
    delete newAiData[index];
    setTripAiData(newAiData);
    localStorage.setItem("tripAiData", JSON.stringify(newAiData));

    // Update expansion state
    const newExpanded = expandedTrips.filter((_, i) => i !== index);
    setExpandedTrips(newExpanded);
  };

  // Fetch AI-generated details if they don't exist yet
  const handleExpand = async (trip, index) => {
    const currentlyExpanded = expandedTrips[index];
    const newExpanded = [...expandedTrips];
    newExpanded[index] = !currentlyExpanded;
    setExpandedTrips(newExpanded);

    if (!currentlyExpanded && !tripAiData[index]) {
      try {
        const response = await fetch("/api/generateTripDetails", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ trip }),
        });
        const result = await response.json();

        if (result.success) {
          const updatedAiData = { ...tripAiData, [index]: result.data };
          setTripAiData(updatedAiData);
          localStorage.setItem("tripAiData", JSON.stringify(updatedAiData)); // Store AI data persistently
        } else {
          console.error("AI generation error:", result.error);
        }
      } catch (err) {
        console.error("Error calling AI API:", err);
      }
    }
  };

  return user ? (
    <Section>
      <Navbar />
      <TopRow>
        <LogoutButton onClick={logout}>Logout</LogoutButton>
      </TopRow>

      <ContentWrapper>
        <WelcomeMsg>Welcome, {user.email}</WelcomeMsg>

        <Title>Saved Trips</Title>
        <TableContainer>
          <StyledTable>
            <TableHeader>
              <tr>
                <HeaderCol style={{ width: "20%" }}>Saved At</HeaderCol>
                <HeaderCol style={{ width: "70%" }}>Locations</HeaderCol>
                <HeaderCol style={{ width: "10%" }}>Remove</HeaderCol>
              </tr>
            </TableHeader>

            <TableBody>
              {savedTrips.map((trip, index) => (
                <React.Fragment key={index}>
                  <ContentRow>
                    <ContentCol style={{ width: "20%" }}>
                      {trip.savedAt}
                    </ContentCol>
                    <ContentCol style={{ width: "70%" }}>
                      <TripCard>
                        {trip.selections
                          .map((loc) => loc.place_name || "Unnamed Location")
                          .join(", ")}
                        <ExpandButton onClick={() => handleExpand(trip, index)}>
                          {expandedTrips[index] ? "–" : "+"}
                        </ExpandButton>

                        {expandedTrips[index] && (
                          <AiDetails>
                            {tripAiData[index] ? (
                              <>
                                <Subtitle>Packing Checklist</Subtitle>
                                <ul>
                                  {tripAiData[index].packing?.map((item, i) => (
                                    <li key={i}>{item}</li>
                                  ))}
                                </ul>

                                <Subtitle>Budget Planner</Subtitle>
                                <p>{tripAiData[index].budget}</p>

                                <Subtitle>Food & Activities</Subtitle>
                                {tripAiData[index].recommendations?.map((rec, i) => (
                                  <Recommendation key={i}>
                                    <strong>{rec.name}</strong> – {rec.description}
                                    {rec.link && (
                                      <>
                                        {" "}
                                        (<a href={rec.link} target="_blank" rel="noreferrer">
                                          Details
                                        </a>)
                                      </>
                                    )}
                                  </Recommendation>
                                ))}
                              </>
                            ) : (
                              <p>Loading AI suggestions...</p>
                            )}
                          </AiDetails>
                        )}
                      </TripCard>
                    </ContentCol>
                    <ContentCol style={{ width: "10%" }}>
                      <RemoveButton onClick={() => handleRemove(index)}>
                        Remove
                      </RemoveButton>
                    </ContentCol>
                  </ContentRow>
                </React.Fragment>
              ))}
            </TableBody>

            <TableFooter>
              <tr>
                <FooterCol style={{ width: "20%" }}>
                  Total Saved Trips: {savedTrips.length}
                </FooterCol>
                <FooterCol style={{ width: "70%" }}></FooterCol>
                <FooterCol style={{ width: "10%" }}></FooterCol>
              </tr>
            </TableFooter>
          </StyledTable>
        </TableContainer>
      </ContentWrapper>
    </Section>
  ) : null;
}

// -------------------- Styled Components --------------------

const Section = styled.section`
  width: 100%;
  height: 100vh;
  padding-top: 55px;
  display: flex;
  flex-direction: column;
`;

const TopRow = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 0 20px;
  margin-bottom: 10px;
`;

const LogoutButton = styled.button`
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

const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const WelcomeMsg = styled.h1`
  font-size: 20px;
  margin-bottom: 16px;
`;

const Title = styled.h2`
  margin-top: 20px;
  margin-bottom: 10px;
`;

/* TABLE CONTENTS */
const TableContainer = styled.div`
  max-height: 70vh;
  overflow-y: auto;
  position: relative;
  flex: 1;
  width: 80%;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
  font-family: var(--font-prm);
`;

/* HEADER */
const TableHeader = styled.thead`
  font-weight: 600;
  font-size: 20px;
  border-bottom: 1px solid var(--prm-light);
  position: sticky;
  top: 0;
  z-index: 2;
  background-color: var(--bg-light);
`;

const HeaderCol = styled.th`
  padding: 10px;
  text-align: left;
`;

/* BODY */
const TableBody = styled.tbody``;

const ContentRow = styled.tr`
  font-size: 20px;
  vertical-align: top;
`;

const ContentCol = styled.td``;

/* NEW/UPDATED: Collapsible Card Styles */
const TripCard = styled.div`
  padding: 10px;
  // border: 1px solid var(--prm-light);
  margin-bottom: 10px;
  border-radius: 4px;
  position: relative;
`;

const ExpandButton = styled.button`
  margin-left: 15px;
  background: none;
  border: 1px solid var(--prm-light);
  border-radius: 4px;
  cursor: pointer;
  font-size: 18px;
  padding: 2px 8px;
  &:hover {
    background-color: var(--prm-light);
    color: #fff;
  }
`;

const AiDetails = styled.div`
  margin-top: 10px;
  padding: 10px;
  border-top: 1px solid var(--prm-light);
`;

const Subtitle = styled.h3`
  margin: 10px 0 5px;
  font-size: 16px;
  font-weight: bold;
`;

const Recommendation = styled.div`
  margin-bottom: 6px;
`;

/* FOOTER */
const TableFooter = styled.tfoot`
  font-weight: 600;
  font-size: 20px;
  border-top: 1px solid var(--prm-light);
  color: var(--ac-light);
  position: sticky;
  bottom: 0;
  z-index: 2;
  background-color: #f8f8f8;
  border-radius: 10px;
`;

const FooterCol = styled.td`
  padding: 10px;
  text-align: left;
`;

/* REMOVE BUTTON */
const RemoveButton = styled.button`
  color: var(--ac-light);
  background: none;
  border: none;
  cursor: pointer;
`;
