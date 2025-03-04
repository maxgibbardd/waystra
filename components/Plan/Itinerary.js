import styled from "styled-components";

/**
 * Displays an itinerary table with selected locations, durations, and removal options.
 */
export default function Itinerary({ selections, updateDuration, removeLocation }) {
  // Compute total duration by summing up the duration values
  const totalDuration = selections.reduce(
    (sum, item) => sum + Number(item.duration || 0),
    0
  );

  return (
    <Display>
      {/* Scrollable container for itinerary table */}
      <TableContainer>
        <Table>
          <TableHeader>
            <tr>
              <HeaderCol style={{ width: "70%" }}>Location</HeaderCol>
              <HeaderCol style={{ width: "20%" }}>Duration (days)</HeaderCol>
              <HeaderCol style={{ width: "10%" }}>Remove</HeaderCol>
            </tr>
          </TableHeader>

          <TableBody>
            {selections.map((location, index) => (
              <ContentRow key={index}>
                <ContentCol style={{ width: "70%" }}>{location.place_name}</ContentCol>
                <ContentCol style={{ width: "20%" }}>
                  <DurationInput
                    type="number"
                    min="0"
                    value={location.duration || 1}
                    onChange={(e) => updateDuration(index, e.target.value)}
                  />
                </ContentCol>
                <ContentCol style={{ width: "10%" }}>
                  <RemoveButton onClick={() => removeLocation(index)}>
                    Remove
                  </RemoveButton>
                </ContentCol>
              </ContentRow>
            ))}
          </TableBody>

          <TableFooter>
            <tr>
              <FooterCol style={{ width: "70%" }}>Total Locations: {selections.length}</FooterCol>
              <FooterCol style={{ width: "20%" }}>Total Duration: {totalDuration} days</FooterCol>
              <FooterCol style={{ width: "10%" }}></FooterCol>
            </tr>
          </TableFooter>
        </Table>
      </TableContainer>
    </Display>
  );
}

// -------------------- Styled Components --------------------

const Display = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

/* TABLE CONTENTS */
const TableContainer = styled.div`
  max-height: 70vh;
  overflow-y: auto;
  position: relative;
  flex: 1;
`;

const Table = styled.table`
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

const ContentCol = styled.td`
  padding: 10px;
  vertical-align: top;
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
`;

const FooterCol = styled.td`
  padding: 10px;
  text-align: left;
`;

/* DURATION & REMOVE BUTTONS */
const DurationInput = styled.input`
  width: 60px;
  padding: 5px;
  font-size: 16px;
  font-family: var(--txt-scnd);
  border-radius: 5px;
  border: 1px solid var(--prm-light);
`;

const RemoveButton = styled.button`
  color: var(--ac-light);
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: var(--ac-dark);
  }
`;
