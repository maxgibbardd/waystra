import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa"; // Social icons

export default function Footer () {
  return (
    <FooterSection>
      <FooterContainer>
        <LeftContainer>
          © {new Date().getFullYear()} Waystra - AI-Powered Travel Planner
        </LeftContainer>

        <CenterContainer>
          
        </CenterContainer>

        <RightContainer>
          <SocialIcon href="https://github.com/maxgibbardd" target="_blank">
            <FaGithub />
          </SocialIcon>
          <SocialIcon href="https://www.linkedin.com/in/maxwellgibbard/" target="_blank">
            <FaLinkedin />
          </SocialIcon>
        </RightContainer>
      </FooterContainer>
    </FooterSection>
  );
};

// Styled Components
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

const CenterContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 14px;

  &:hover {
    text-decoration: underline;
  }
`;

const Separator = styled.span`
  color: white;
`;

const RightContainer = styled.div`
  display: flex;
  gap: 15px;
`;

const SocialIcon = styled.a`
  color: white;
  font-size: 20px;
  transition: color 0.3s;

  &:hover {
    color: var(--scnd-light);
  }
`;