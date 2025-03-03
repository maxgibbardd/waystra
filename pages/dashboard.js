import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Navbar from "@/components/Dashboard/Navbar";
import Footer from "@/components/LandingPage/Footer"
import { useAuth } from "@/backend/Auth";
import { useRouter } from "next/router";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [savedTrips, setSavedTrips] = useState([]);
  const [expandedTrips, setExpandedTrips] = useState([]); // Boolean array for collapsible sections
  const [tripAiData, setTripAiData] = useState({});       // Stores AI-generated data
  const [loadingRegenerate, setLoadingRegenerate] = useState(null); // Tracks loading state for regenerating AI data

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

    // If we're expanding for the first time and no AI data stored yet...
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
          localStorage.setItem("tripAiData", JSON.stringify(updatedAiData));
        } else {
          console.error("AI generation error:", result.error);
        }
      } catch (err) {
        console.error("Error calling AI API:", err);
      }
    }
  };

  // NEW: Regenerate AI data when the button is clicked
  const handleRegenerate = async (trip, index) => {
    setLoadingRegenerate(index); // Show loading state for this trip

    try {
        const response = await fetch("/api/generateTripDetails", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ trip }) // ✅ Ensure correct structure
        });

        const result = await response.json();

        if (result.success && result.data) {
            const updatedAiData = { ...tripAiData, [index]: result.data };
            setTripAiData(updatedAiData);
            localStorage.setItem("tripAiData", JSON.stringify(updatedAiData));
        } else {
            console.error("AI regeneration error:", result.error || "Unexpected response");
        }
    } catch (err) {
        console.error("Error calling AI API:", err);
    } finally {
        setLoadingRegenerate(null); // Reset loading state
    }
  };


  return user ? (
    <Section>
      <Navbar />

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
                        {trip.selections.map((loc, i) => (
                          <React.Fragment key={i}>
                            {(i + 1) + ") " + loc.place_name || "Unnamed Location"}
                            <br />
                          </React.Fragment>
                        ))}
                        <ExpandButton onClick={() => handleExpand(trip, index)}>
                          {expandedTrips[index] ? "–" : "+"}
                        </ExpandButton>

                        {expandedTrips[index] && (
                          <AiDetails>
                            {tripAiData[index] ? (
                              <>
                                {/* PACKING LIST */}
                                <Subtitle>Packing Checklist</Subtitle>
                                <ul>
                                  {tripAiData[index].packing?.map((item, i) => (
                                    <li key={i}>{item}</li>
                                  ))}
                                </ul>

                                {/* BUDGET PLANNER */}
                                <Subtitle>Budget Planner</Subtitle>
                                {Array.isArray(tripAiData[index].budget) &&
                                  tripAiData[index].budget.map((bItem, i) => (
                                    <BudgetBreakdown key={i}>
                                      <p>Travel: {bItem.travel}</p>
                                      <p>Hotels: {bItem.hotels}</p>
                                      <p>Food: {bItem.food}</p>
                                      <p><strong>Total:</strong> {bItem.total}</p>
                                    </BudgetBreakdown>
                                  ))
                                }

                                {/* RECOMMENDATIONS */}
                                <Subtitle>Food & Activities</Subtitle>
                                {tripAiData[index].recommendations?.map((rec, i) => (
                                  <Recommendation key={i}>
                                    <strong>{rec.name}</strong> – {rec.description}
                                    {rec.link && (
                                      <>
                                        {" "}
                                        (<a
                                          href={rec.link}
                                          target="_blank"
                                          rel="noreferrer"
                                        >
                                          Details
                                        </a>)
                                      </>
                                    )}
                                  </Recommendation>
                                ))}

                                {/* NEW: Regenerate Button */}
                                <RegenerateButton
                                  onClick={() => handleRegenerate(trip, index)}
                                  disabled={loadingRegenerate === index}
                                >
                                  {loadingRegenerate === index ? "Regenerating..." : "Regenerate Trip Info"}
                                </RegenerateButton>
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
          </StyledTable>
        </TableContainer>
      </ContentWrapper>
      <Footer />
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

const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const WelcomeMsg = styled.h1`
  font-size: 24px;
  margin: 30px 0;
  font-weight: 700;
  text-align: center;
  font-family: var(--font-prm);
  span {
    color: var(--prm-light);
  }
`;

const Title = styled.h2`
  font-size: 30px;
  margin-bottom: 20px;
  text-align: center;
  font-family: var(--font-prm);
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

const TableHeader = styled.thead`
  font-weight: 600;
  font-size: 20px;
  border-bottom: 1px solid var(--scnd-light);
  position: sticky;
  top: 0;
  z-index: 2;
  background-color: 
`;

const HeaderCol = styled.th`
  padding: 10px;
  text-align: left;
`;

const TableBody = styled.tbody``;

const ContentRow = styled.tr`
  font-size: 20px;
  vertical-align: top;
  padding-top: 10px;
  border-bottom: 1px solid var(--prm-light);
`;

const ContentCol = styled.td``;


const TripCard = styled.div`
  padding: 10px;
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
  border-top: 1px dashed var(--prm-light);
`;

const Subtitle = styled.h3`
  margin: 10px 0 5px;
  font-size: 16px;
  font-weight: bold;
`;

/* Budget breakdown section */
const BudgetBreakdown = styled.div`
  margin-bottom: 10px;
`;

const Recommendation = styled.div`
  margin-bottom: 6px;
`;

const RemoveButton = styled.button`
  color: var(--ac-light);
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  padding: 10px;
`;

const RegenerateButton = styled.button`
  margin-top: 10px;
  padding: 8px 12px;
  border: none;
  background-color: var(--scnd-light);
  color: var(--txt-light);
  font-size: 14px;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background-color: var(--scnd-dark);
  }

  &:disabled {
    background-color: grey;
    cursor: not-allowed;
  }
`;
