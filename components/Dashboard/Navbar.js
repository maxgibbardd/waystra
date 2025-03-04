'use client';

import React, { useState } from 'react';
import Image from "next/image";
import styled from 'styled-components';
import Link from 'next/link';
import { useAuth } from '@/backend/Auth';

/**
 * Navbar component for navigation and authentication controls.
 * Includes dark mode toggle and login/logout functionality.
 */
export default function Navbar() {
  const { user, logout } = useAuth();
  const [darkMode, setDarkMode] = useState(false);

  // Toggles dark mode and applies the theme class to body
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode');
  };

  // Handles authentication button click
  const handleAuthClick = () => {
    if (user) {
      logout();
    }
  };

  return (
    <Nav className={darkMode ? 'dark-mode' : ''}>
      {/* Logo */}
      <Image src="/Waystra_Logo.png" alt="Waystra Logo" width={75} height={55} />
      
      {/* Navigation Links */}
      <NavLinks>
        <StyledLink href="/">Home</StyledLink>
        <StyledLink href="/plan">Plan</StyledLink>
        <StyledLink href="/dashboard">Dashboard</StyledLink>
      </NavLinks>
      
      {/* Right Section: Dark mode toggle & Authentication */}
      <RightSection>
        <ToggleButton onClick={toggleDarkMode} aria-label="Toggle Dark Mode">
          {darkMode ? '⚪️' : '⚫️'}
        </ToggleButton>
        <AuthButton onClick={handleAuthClick}>
          {user ? "Logout" : <StyledLink href="/auth">Login</StyledLink>}
        </AuthButton>
      </RightSection>
    </Nav>
  );
}

// -------------------- Styled Components --------------------

const Nav = styled.nav`
  width: 100%;
  height: 55px;
  background-color: var(--prm-light);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  position: fixed;
  top: 0;
  left: 0;

  &.dark-mode {
    background-color: var(--prm-dark);
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 20px;
`;

const StyledLink = styled(Link)`
  font-size: 18px;
  font-family: var(--font-prm);
  font-weight: 500;
  text-decoration: none;
  color: var(--txt-dark);
  padding: 10px;
  border-radius: 10px;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: var(--bg-light);
    color: var(--txt-light);
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const ToggleButton = styled.button`
  background: transparent;
  border: none;
  font-size: 24px;
  cursor: pointer;
`;

const AuthButton = styled.button`
  background: transparent;
  border: none;
  font-size: 18px;
  font-family: var(--font-prm);
  font-weight: 500;
  color: var(--txt-dark);
  cursor: pointer;
  padding: 10px;
  text-decoration: none;
`;
