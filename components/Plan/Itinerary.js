import styled from "styled-components";

export default function Itinerary({
  selections,
  updateDuration,
  removeLocation,
}) {
  // Compute total duration by summing the duration values (assuming duration is in hours)
  const totalDuration = selections.reduce(
    (sum, item) => sum + Number(item.duration || 0),
    0
  );

  return (
    <Display>
      <Table>
        <TableHeader>
          <HeaderCol>Location</HeaderCol>
          <HeaderCol>Duration (days)</HeaderCol>
          <HeaderCol>Remove</HeaderCol>
        </TableHeader>
        <TableBody>
          {selections.map((location, index) => (
            <ContentRow key={index}>
              <ContentCol>{location.place_name}</ContentCol>
              <ContentCol>
                <DurationInput
                  type="number"
                  min="0"
                  value={location.duration || 1}
                  onChange={(e) => updateDuration(index, e.target.value)}
                />
              </ContentCol>
              <ContentCol>
                <RemoveButton onClick={() => removeLocation(index)}>
                  Remove
                </RemoveButton>
              </ContentCol>
            </ContentRow>
          ))}
        </TableBody>
        <TableFooter>
          <FooterCol>Total Locations: {selections.length}</FooterCol>
          <FooterCol>Total Duration: {totalDuration} days</FooterCol>
        </TableFooter>
      </Table>
    </Display>
  );
}

const Display = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Table = styled.table`
  font-family: var(--font-prm);
  width: 100%;
  border-radius: 5px;
  border-collapse: collapse;
`;

const TableHeader = styled.thead`
  font-family: var(--font-prm);
  font-weight: 600;
  font-size: 20px;
  border-bottom: 1px solid var(--prm-light);
`;

const HeaderCol = styled.th`
  flex: 1;
  padding: 10px;
  text-align: left;
  overflow: column;
`;

const TableBody = styled.tbody`
  height: 70vh;
  overflow-y: auto;
  display: block;
`;

const ContentRow = styled.tr`
  font-family: var(--font-prm);
  font-size: 20px;
  height: 50px;
  align-items: center;
  overflow: column;
`;

const ContentCol = styled.td`
  flex: 1;
  padding: 10px;
`;

const DurationInput = styled.input`
  width: 60px;
  padding: 5px;
  font-size: 16px;
  background: white;
  border: none;
`;

const RemoveButton = styled.button`
  color: red;
  background: none;
  border: none;
  cursor: pointer;
`;

const TableFooter = styled.tfoot`
  font-family: var(--font-prm);
  font-weight: 600;
  font-size: 20px;
  background-color: white;
  border-radius: 10px;
  color: var(--ac-light);
`;

const FooterCol = styled.td`
  flex: 1;
  padding: 10px;
  text-align: left;
`;
