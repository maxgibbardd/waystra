import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Navbar from "@/components/Dashboard/Navbar";
import { useAuth } from "@/backend/Auth";
import { useRouter } from "next/router";
import { fetchUserTrips, deleteTrip, updateTripAiData } from "@/backend/Database";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const [savedTrips, setSavedTrips] = useState([]);
  const [expandedTrips, setExpandedTrips] = useState([]);
  const [loadingStates, setLoadingStates] = useState({});
  const [loadingRegenerate, setLoadingRegenerate] = useState(null);

  useEffect(() => {
    if (!user) {
      router.push("/auth");
      return;
    }
    loadTrips(user.uid);
  }, [user]);

  const loadTrips = async (userId) => {
    const trips = await fetchUserTrips(userId);
    setSavedTrips(trips);
    setExpandedTrips(Array(trips.length).fill(false));
  };

  const handleRemove = async (tripId) => {
    await deleteTrip(user.uid, tripId);
    setSavedTrips((prev) => prev.filter((t) => t.id !== tripId));
  };

  const handleExpand = async (trip, index) => {
    const currentlyExpanded = expandedTrips[index];
    const newExpanded = [...expandedTrips];
    newExpanded[index] = !currentlyExpanded;
    setExpandedTrips(newExpanded);

    if (currentlyExpanded || (trip.aiData && Object.keys(trip.aiData).length)) return;

    setLoadingStates((prev) => ({ ...prev, [trip.id]: true }));

    try {
      const response = await fetch("/api/generateTripDetails", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ trip }),
      });
      const result = await response.json();

      if (result.success) {
        await updateTripAiData(user.uid, trip.id, result.data);

        setSavedTrips((prevTrips) => {
          const updated = [...prevTrips];
          updated[index] = { ...updated[index], aiData: result.data };
          return updated;
        });
      } else {
        console.error("AI generation error:", result.error);
      }
    } catch (err) {
      console.error("Error calling AI API:", err);
    } finally {
      setLoadingStates((prev) => ({ ...prev, [trip.id]: false }));
    }
  };

  const handleRegenerate = async (trip, index) => {
    setLoadingRegenerate(trip.id);
    try {
      const response = await fetch("/api/generateTripDetails", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ trip }),
      });
      const result = await response.json();

      if (result.success) {
        await updateTripAiData(user.uid, trip.id, result.data);

        setSavedTrips((prevTrips) => {
          const updated = [...prevTrips];
          updated[index] = { ...updated[index], aiData: result.data };
          return updated;
        });
      } else {
        console.error("AI regeneration error:", result.error);
      }
    } catch (err) {
      console.error("Error calling AI API:", err);
    } finally {
      setLoadingRegenerate(null);
    }
  };

  return user ? (
    <Section>
      <Navbar />
      <ContentWrapper>
        <WelcomeMsg>
          Welcome, <span>{user.email}</span>
        </WelcomeMsg>

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
                <React.Fragment key={trip.id}>
                  <ContentRow>
                    <ContentCol style={{ width: "20%" }}>{trip.savedAt}</ContentCol>
                    <ContentCol style={{ width: "70%" }}>
                      <TripCard>
                        {trip.selections.map((loc, i) => (
                          <TripLocation key={i}>
                            {i + 1}) {loc.place_name}
                          </TripLocation>
                        ))}

                        <ExpandButton
                          onClick={() => handleExpand(trip, index)}
                          disabled={loadingStates[trip.id]}
                        >
                          {expandedTrips[index] ? "–" : "+"}
                        </ExpandButton>
                      </TripCard>

                      {expandedTrips[index] && (
                        <AiDetails>
                          {loadingStates[trip.id] ? (
                            <LoadingMessage>Fetching AI details...</LoadingMessage>
                          ) : trip.aiData && Object.keys(trip.aiData).length ? (
                            <>
                              <Subtitle>Packing Tips</Subtitle>
                              <ul>
                                {trip.aiData.packing?.map((item, i) => (
                                  <li key={i}>{item}</li>
                                ))}
                              </ul>

                              <Subtitle>Budget Breakdown</Subtitle>
                              {trip.aiData.budget && Array.isArray(trip.aiData.budget) && (
                                <BudgetBreakdown>
                                  <p><strong>Travel:</strong> ${trip.aiData.budget[0]?.travel ?? 0}</p>
                                  <p><strong>Hotels:</strong> ${trip.aiData.budget[0]?.hotels ?? 0}</p>
                                  <p><strong>Food:</strong> ${trip.aiData.budget[0]?.food ?? 0}</p>
                                  <p><strong>Total:</strong> ${trip.aiData.budget[0]?.total ?? 0}</p>
                                </BudgetBreakdown>
                              )}

                              <Subtitle>Recommendations</Subtitle>
                              <ul>
                                {trip.aiData.recommendations?.map((rec, i) => (
                                  <li key={i}>
                                    <strong>{rec.name}</strong> – {rec.description}{" "}
                                    {rec.link && (
                                      <a href={rec.link} target="_blank" rel="noopener noreferrer">
                                        (More Info)
                                      </a>
                                    )}
                                  </li>
                                ))}
                              </ul>

                              <RegenerateButton
                                onClick={() => handleRegenerate(trip, index)}
                                disabled={loadingRegenerate === trip.id}
                              >
                                {loadingRegenerate === trip.id
                                  ? "Regenerating..."
                                  : "Regenerate Trip Info"}
                              </RegenerateButton>
                            </>
                          ) : (
                            <p>No AI data available.</p>
                          )}
                        </AiDetails>
                      )}
                    </ContentCol>

                    <ContentCol style={{ width: "10%" }}>
                      <RemoveButton onClick={() => handleRemove(trip.id)}>✖</RemoveButton>
                    </ContentCol>
                  </ContentRow>
                </React.Fragment>
              ))}
            </TableBody>
          </StyledTable>
        </TableContainer>
      </ContentWrapper>
    </Section>
  ) : null;
}

/* -------------------- Styled Components -------------------- */

const LoadingMessage = styled.p`
  font-size: 18px;
  font-style: italic;
  color: grey;
  text-align: center;
  margin: 10px 0;
`;

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
  background-color: var(--bg-light);

  .dark-mode & {
    background-color: var(--bg-dark);
  }
`;

const HeaderCol = styled.th`
  padding: 10px;
  text-align: left;
  background-color: inherit;
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

const TripLocation = styled.div`
  margin-bottom: 8px;
  font-size: 16px;
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
  font-size: 18px;
`;

const Subtitle = styled.h3`
  margin: 10px 0 5px;
  font-size: 20px;
  font-weight: bold;
`;

/* Budget breakdown section */
const BudgetBreakdown = styled.div`
  margin-bottom: 10px;
  font-size: 18px;
`;

const Recommendation = styled.div`
  margin-bottom: 6px;
  font-size: 18px;
`;

const RemoveButton = styled.button`
  color: var(--ac-light);
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  padding: 10px;
  justify-content: center;
`;

const RegenerateButton = styled.button`
  margin-top: 10px;
  padding: 8px 12px;
  border: none;
  background-color: var(--scnd-light);
  color: var(--txt-light);
  font-size: 18px;
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
