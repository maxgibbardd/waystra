/**
 * components/Dashboard/Navbar.js
 * Renders the top navigation bar including logo, navigation links, dark mode toggle, and auth button.
 */

'use client';

import React, { useState } from 'react';
import Image from "next/image";
import styled from 'styled-components';
import Link from 'next/link';
import { useAuth } from '@/backend/Auth';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode');
  };

  const handleAuthClick = () => {
    if (user) {
      logout();
    }
  };

  return (
    <Nav className={darkMode ? 'dark-mode' : ''}>
      <Image src="/Waystra_Logo.png" alt="Waystra Logo" width={75} height={55} />
      <NavLinks>
        <Link href="/"><NavButton>Home</NavButton></Link>
        <Link href="/plan"><NavButton>Plan</NavButton></Link>
        <Link href="/dashboard"><NavButton>Dashboard</NavButton></Link>
      </NavLinks>
      <RightSection>
        <ToggleButton onClick={toggleDarkMode}>
          {darkMode ? '⚪️' : '⚫️'}
        </ToggleButton>
        <AuthButton onClick={handleAuthClick}>
          {user ? "Logout" : <Link href="/auth">Login</Link>}
        </AuthButton>
      </RightSection>
    </Nav>
  );
};

export default Navbar;

// Styled Components
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

const NavButton = styled.button`
  background: transparent;
  font-size: 18px;
  font-family: var(--font-prm);
  font-weight: 500;
  border: none;
  color: var(--txt-dark);
  cursor: pointer;
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

  a {
    text-decoration: none;
    color: inherit;
  }
`;
