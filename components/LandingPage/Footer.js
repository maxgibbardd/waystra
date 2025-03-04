import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";

/**
 * Footer component displaying copyright information and social links.
 */
export default function Footer() {
  return (
    <FooterSection>
      <FooterContainer>
        {/* Left side - Copyright notice */}
        <LeftContainer>
          © {new Date().getFullYear()} Waystra - AI-Powered Travel Planner
        </LeftContainer>

        {/* Right side - Social Media Links */}
        <RightContainer>
          <SocialIcon href="https://github.com/maxgibbardd" target="_blank" aria-label="GitHub">
            <FaGithub />
          </SocialIcon>
          <SocialIcon href="https://www.linkedin.com/in/maxwellgibbard/" target="_blank" aria-label="LinkedIn">
            <FaLinkedin />
          </SocialIcon>
        </RightContainer>
      </FooterContainer>
    </FooterSection>
  );
}

// -------------------- Styled Components --------------------

const FooterSection = styled.footer`
  width: 100%;
  background-color: var(--prm-light);
  color: white;
  padding: 10px 0;
  font-size: 16px;
`;

const FooterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: auto;
  padding: 0 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    gap: 10px;
  }
`;

const LeftContainer = styled.div`
  font-family: var(--font-prm);
  font-size: 14px;
`;

const RightContainer = styled.div`
  display: flex;
  gap: 15px;
`;

const SocialIcon = styled.a`
  color: white;
  font-size: 20px;
  transition: color 0.3s ease-in-out;

  &:hover {
    color: var(--scnd-light);
  }
`;
