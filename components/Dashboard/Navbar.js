'use client';

import React, { useState } from 'react';
import Image from "next/image";
import styled from 'styled-components';
import Link from 'next/link';
import { logOut } from '@/backend/Auth';
import { useStateContext } from '@/context/StateContext';
import Home from '@/components/Dashboard/Home';

const Navbar = () => {
  // const { setUser } = useStateContext();

  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode');
  };

  return (
    <Nav className={darkMode ? 'dark-mode' : ''}>
      <Image src="/Waystra_Logo.png" alt="Waystra" width={75} height={55} />
      <Link href="/"><NavButton>Home</NavButton></Link>
      <Link href="/plan"><NavButton>Plan</NavButton></Link>
      <Link href="/dashboard"><NavButton>Dashboard</NavButton></Link>
      <NavButton onClick={toggleDarkMode} id="toggle">{darkMode ? '⚪️' : '⚫️'}</NavButton>
    </Nav>
  );
};

const Logo = styled(Link)`

`;

const NavLinks = styled.div`

`;

const ButtonLink = styled(Link)`

`;

export default Navbar;


const Nav = styled.nav`
  width: 100%;
  height: 55px;
  background-color: var(--prm-light);
  border-bottom: 3px solid var(--scnd-light);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  position: fixed;
  top: 0;
  left: 0;

  &.dark-mode {
    background-color: var(--prm-dark);
    border-bottom: 3px solid var(--scnd-dark);
  }
`;

const NavButton = styled.button`
  background: transparent;
  font-size: 18px;
  border: none;
  color: var(--txt-dark);
  cursor: pointer;
  transition: color 0.3s ease-in-out;

  &:hover {
    text-decoration: underline;
    color: var(--txt-dark);
  }
`;