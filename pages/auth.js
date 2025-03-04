import { useState } from "react";
import styled from "styled-components";
import Login from "@/components/Auth/Login";
import SignUp from "@/components/Auth/SignUp";
import Navbar from "@/components/Dashboard/Navbar";

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <>
      <Navbar />
      <AuthContainer>
        <TabContainer>
          {/* Tab for switching between Login and Sign Up */}
          <Tab active={activeTab === "login"} onClick={() => setActiveTab("login")}>
            Login
          </Tab>
          <Tab active={activeTab === "signup"} onClick={() => setActiveTab("signup")}>
            Sign Up
          </Tab>
        </TabContainer>

        {/* Render the selected tab's content */}
        <TabContent>{activeTab === "login" ? <Login /> : <SignUp />}</TabContent>
      </AuthContainer>
    </>
  );
}

// Styled components for layout and design
const AuthContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 60px;
`;

const TabContainer = styled.div`
  display: flex;
  border-radius: 50px;
  overflow: hidden;
`;

const Tab = styled.button`
  background: ${({ active }) => (active ? "var(--scnd-light)" : "transparent")};
  color: var(--txt-light);
  border: none;
  font-size: 18px;
  padding: 12px 24px;
  cursor: pointer;
  transition: background 0.2s ease-in-out;
  outline: none;

  &:hover {
    background: ${({ active }) => (active ? "var(--scnd-dark)" : "var(--scnd-light)")};
  }
`;

const TabContent = styled.div`
  margin-top: 24px;
  width: 400px;
  min-height: 300px;
`;
