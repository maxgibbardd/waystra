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

  // On mount, load the saved trips from localStorage
  useEffect(() => {
    const trips = JSON.parse(localStorage.getItem("savedTrips")) || [];
    setSavedTrips(trips);
  }, []);

  return user ? (
    <Section>
      <Navbar />
      <div>
        <TopHeader>Welcome, {user.email}</TopHeader>
        <button onClick={logout}>Logout</button>

        <h2>Saved Trips</h2>
        <TripsTable>
          <thead>
            <tr>
              <th>Saved At</th>
              <th>Locations</th>
            </tr>
          </thead>
          <tbody>
            {savedTrips.map((trip, index) => (
              <tr key={index}>
                <td>{trip.savedAt}</td>
                <td>
                  {/* Show a comma-separated list of location names */}
                  {trip.selections.map((loc, i) => loc.name).join(", ")}
                </td>
              </tr>
            ))}
          </tbody>
        </TripsTable>
      </div>
    </Section>
  ) : null;
}

// STYLED COMPONENTS
const Section = styled.section`
  width: 100%;
  height: 100vh;
  padding-top: 55px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const TopHeader = styled.h1`
  font-size: 20px;
  margin-bottom: 16px;
`;

const TripsTable = styled.table`
  border-collapse: collapse;
  width: 80%;
  margin-top: 20px;

  th,
  td {
    border: 1px solid #ccc;
    padding: 8px 12px;
    text-align: left;
  }

  th {
    background-color: #eee;
  }
`;
