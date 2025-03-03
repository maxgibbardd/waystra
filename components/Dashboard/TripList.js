import React from "react";
import styled from "styled-components";

/**
 * Renders a table of user’s saved trips.
 * Accepts trips, removeTrip, handleExpand, etc. as props.
 */
export default function TripList({
  trips,
  expandedTrips,
  tripAiData,
  onExpand,
  onRemove,
  onRegenerate,
  loadingRegenerate
}) {
  return (
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
          {trips.map((trip, index) => (
            <React.Fragment key={index}>
              <ContentRow>
                <ContentCol style={{ width: "20%" }}>{trip.savedAt}</ContentCol>
                <ContentCol style={{ width: "70%" }}>
                  <TripCard>
                    {trip.selections?.map((loc, i) => (
                      <React.Fragment key={i}>
                        {i + 1}) {loc.place_name || "Unnamed Location"}
                        <br />
                      </React.Fragment>
                    ))}

                    <ExpandButton onClick={() => onExpand(trip, index)}>
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
                            {Array.isArray(tripAiData[index].budget) &&
                              tripAiData[index].budget.map((bItem, i) => (
                                <BudgetBreakdown key={i}>
                                  <p>Travel: {bItem.travel}</p>
                                  <p>Hotels: {bItem.hotels}</p>
                                  <p>Food: {bItem.food}</p>
                                  <p>
                                    <strong>Total:</strong> {bItem.total}
                                  </p>
                                </BudgetBreakdown>
                              ))}

                            <Subtitle>Food & Activities</Subtitle>
                            {tripAiData[index].recommendations?.map(
                              (rec, i) => (
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
                              )
                            )}

                            <RegenerateButton
                              onClick={() => onRegenerate(trip, index)}
                              disabled={loadingRegenerate === index}
                            >
                              {loadingRegenerate === index
                                ? "Regenerating..."
                                : "Regenerate Trip Info"}
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
                  <RemoveButton onClick={() => onRemove(index)}>Remove</RemoveButton>
                </ContentCol>
              </ContentRow>
            </React.Fragment>
          ))}
        </TableBody>
      </StyledTable>
    </TableContainer>
  );
}

/* STYLED COMPONENTS (same as in your original) */

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
  border-bottom: 1px solid var(--prm-light);
  position: sticky;
  top: 0;
  z-index: 2;
`;

const HeaderCol = styled.th`
  padding: 10px;
  text-align: left;
`;

const TableBody = styled.tbody``;
const ContentRow = styled.tr`
  font-size: 20px;
  vertical-align: top;
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
  border-top: 1px solid var(--prm-light);
`;

const Subtitle = styled.h3`
  margin: 10px 0 5px;
  font-size: 16px;
  font-weight: bold;
`;

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
  cursor: pointer;
  align-items: center;
  justify-content: center;
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
