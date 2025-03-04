import Hero from "@/components/LandingPage/Hero";
import Navbar from "@/components/Dashboard/Navbar";
import Footer from "@/components/LandingPage/Footer";
import styled from "styled-components";

export default function Home() {
  return (
    <>
      <Navbar />
      <MainContent>
        <Hero />
      </MainContent>
      <Footer />
    </>
  );
}

// Styled Components

// Wrapper for the main content of the landing page
const MainContent = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 94.52vh;
  padding: 20px;
  background-color: var(--bg-light);
`;
