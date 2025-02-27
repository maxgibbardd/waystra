import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Navbar from "@/components/Dashboard/Navbar";
import { useStateContext } from '@/context/StateContext'
import { getAllUserPhotos } from '@/backend/Database'
import { useAuth } from "@/backend/Auth";
import { useRouter } from "next/router";
import Head from "next/head";

export default function Plan() {
  const [sidebarWidth, setSidebarWidth] = useState(300); // Default sidebar width
  const [isResizing, setIsResizing] = useState(false);

  const handleMouseDown = (e) => {
    setIsResizing(true);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e) => {
    if (isResizing) {
      const newWidth = Math.max(220, e.clientX); // Prevent sidebar from becoming too small
      setSidebarWidth(newWidth);
    }
  };

  const handleMouseUp = () => {
    setIsResizing(false);
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  return (
    <Section>
      <Navbar />
      <PlanContainer>
        <Sidebar style={{ width: `${sidebarWidth}px` }}>
          <SearchInput placeholder="Search..." />
          <DestinationList></DestinationList>
        </Sidebar>

        <ResizeHandle onMouseDown={handleMouseDown} />

        <MainContent>
          <TabContainer>
            <Tab>Cost</Tab>
            <Tab>Route</Tab>
            <Tab>Itinerary</Tab>
          </TabContainer>
          <ContentArea>{/* Put your main content here */}</ContentArea>
        </MainContent>
      </PlanContainer>
    </Section>
  );
}

// ~~~~~~~~~~~~~ STYLED COMPONENTS ~~~~~~~~~~~~~

const Section = styled.section`
  width: 100%;
  height: 100vh;
  padding-top: 55px;
  display: flex;
  border: 2px dashed black;
`;

const PlanContainer = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  border: 2px dashed red;
`;

const Sidebar = styled.div`
  min-width: 25%;
  //   background-color: #f0f0f0;
  padding: 20px;
  overflow: hidden;
  border-right: 2px solid #ccc;
  border: 2px dashed black;
`;

const ResizeHandle = styled.div`
  width: 5px;
  cursor: ew-resize;
  background-color: #ccc;
  transition: background 0.2s;

  &:hover {
    background-color: var(--bg-scnd);
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 8px;
  border-radius: 8px;
  border: 2px solid #ccc;
  margin-bottom: 20px;
  font-size: 14px;
  outline: none;
  background-color: transparent;
  color: var(--prm-light);

  &::placeholder {
    color: var(--prm-light);
  }

  &.dark-mode {
    // background-color: var(--bg-dark);
  }
`;

const DestinationList = styled.ul`
  list-style-type: disc;
  padding-left: 20px;
`;

const MainContent = styled.div`
  flex: 1;
  min-width: 25%;
  padding: 20px;
  border: 2px dashed green;
  justify-content: center;
`;

const TabContainer = styled.div`
  display: flex;
  padding-left: 100px;
  padding-right: 100px;
  border: 2px solid #ccc;
  border-radius: 50px;
  width: 60%;
  margin-left: 20%;
  margin-right: 20%;
  justify-content: space-between;
  background-color: var(--prm-light);
`;

const Tab = styled.button`
  padding: 8px 16px;
  margin: 3px;
  border: none;
  border-radius: 50px;
  background-color: var(--prm-light);
//   box-shadow: 0 0 10px rgba(0,0,0,0.1);
  cursor: pointer;
  color: var(--txt-light);
  font-weight: 600;
  outline: none;
  transition: background 0.2s ease-in-out, color 0.2s ease-in-out;
//   border: 2px dashed black;

  &:hover {
    background-color: var(--scnd-light);
  }
`;

const ContentArea = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
//   height: 90%;
  border: 2px dashed black;
  flex: 1;
`;
