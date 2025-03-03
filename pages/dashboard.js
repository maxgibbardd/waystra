import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Navbar from "@/components/Dashboard/Navbar";
import { useAuth } from "@/backend/Auth";
import { useRouter } from "next/router";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [savedTrips, setSavedTrips] = useState([]);

  useEffect(() => {
    if (!user) {
      router.push("/auth");
    }
  }, [user, router]);

  // Load trips from localStorage when component mounts
  useEffect(() => {
    const trips = JSON.parse(localStorage.getItem("savedTrips")) || [];
    setSavedTrips(trips);
  }, []);

  // Remove a trip by index
  const handleRemove = (index) => {
    const updatedTrips = savedTrips.filter((_, i) => i !== index);
    setSavedTrips(updatedTrips);
    localStorage.setItem("savedTrips", JSON.stringify(updatedTrips));
  };

  return user ? (
    <Section>
      <Navbar />

      {/* Top row for Logout button */}
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
                <ContentRow key={index}>
                  <ContentCol style={{ width: "20%" }}>{trip.savedAt}</ContentCol>
                  <ContentCol style={{ width: "70%" }}>
                    {trip.selections.map((loc) => loc.place_name || "Unnamed Location").join(", ")}
                  </ContentCol>
                  <ContentCol style={{ width: "10%" }}>
                    <RemoveButton onClick={() => handleRemove(index)}>Remove</RemoveButton>
                  </ContentCol>
                </ContentRow>
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
