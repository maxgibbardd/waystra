import { useState } from "react";
import styled from "styled-components";
import Login from "@/components/Auth/Login";
import SignUp from "@/components/Auth/SignUp";
import Navbar from "@/components/Dashboard/Navbar";

/**
 * Authentication page with tab-based navigation for Login and Sign Up.
 */
export default function AuthPage() {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <>
      <Navbar />
      <AuthContainer>
        {/* Tab selection for Login and Sign Up */}
        <TabContainer>
          <Tab active={activeTab === "login"} onClick={() => setActiveTab("login")}>Login</Tab>
          <Tab active={activeTab === "signup"} onClick={() => setActiveTab("signup")}>Sign Up</Tab>
        </TabContainer>

        {/* Render the selected tab's content */}
        <TabContent>{activeTab === "login" ? <Login /> : <SignUp />}</TabContent>
      </AuthContainer>
    </>
  );
}

// -------------------- Styled Components --------------------

const AuthContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
  font-family: var(--font-prm);
`;

const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  border-radius: 20px;
  overflow: hidden;
  background: var(--bg-light);
  padding: 5px;
  margin-bottom: 20px;
`;

const Tab = styled.button`
  flex: 1;
  font-size: 18px;
  padding: 10px;
  margin: 10px;
  font-weight: 500;
  width: 80px;
  font-family: var(--font-prm);
  background: ${({ active }) => (active ? "var(--scnd-light)" : "transparent")};
  color: ${({ active }) => (active ? "var(--txt-dark)" : "var(--txt-light)")};
  border: none;
  cursor: pointer;
  transition: background 0.2s ease-in-out, color 0.2s ease-in-out;
  outline: none;
  border-radius: 50px;

  &:hover {
    background: ${({ active }) => (active ? "var(--scnd-dark)" : "var(--scnd-light)")};
  }
`;

const TabContent = styled.div`
  width: 400px;
  min-height: 320px;
  background: var(--bg-light);
  border-radius: 12px;
  padding: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;
