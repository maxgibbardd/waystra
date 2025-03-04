import Hero from "@/components/LandingPage/Hero";
import Navbar from "@/components/Dashboard/Navbar";
import Footer from "@/components/LandingPage/Footer";
import styled from "styled-components";
import { useRouter } from "next/router";
import { useAuth } from "@/backend/Auth";

export default function Home() {
  const router = useRouter();
  const { user } = useAuth();

  // Redirects user to the plan page, but requires login
  const handlePlanClick = () => {
    if (user) {
      router.push("/plan");
    } else {
      router.push("/auth");
    }
  };

  return (
    <>
      <Navbar />
      <MainContent>
        <Hero />
        <PlanButton onClick={handlePlanClick}>Plan Your Trip Today!</PlanButton>
      </MainContent>
      <Footer />
    </>
  );
}

// -------------------- Styled Components --------------------

// Wrapper for the main content of the landing page
const MainContent = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 94.52vh;
  padding: 20px;
`;

const PlanButton = styled.button`
  padding: 14px 28px;
  font-size: 20px;
  font-weight: 600;
  font-family: var(--font-prm);
  color: white;
  background-color: var(--prm-light);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s ease-in-out;

  &:hover {
    // background-color: var(--prm-dark);
  }
`;