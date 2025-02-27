import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Navbar from "@/components/Dashboard/Navbar"
// import Link from 'next/link'
// import Navbar from '@/components/Dashboard/Navbar'
// import PhotoUploader from '@/components/PhotoUploader'
import { useStateContext } from '@/context/StateContext'
// import { getAllUserPhotos } from '@/backend/Database'
import { useAuth } from "@/backend/Auth";
import { useRouter } from "next/router";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/auth');
    }
  }, [user, router]);

  return user ? (
    <Section>
      <Navbar />
      <TopHeader>
        Welcome, {user.email}
      </TopHeader>

      <button onClick={logout}>Logout</button>
    </Section>
  ) : null;
}

// STYLED COMPONENTS
const Section = styled.section`
  width: 100%;
  height: 100vh;
  padding-top: 55px;
  display: flex;
  justify-content: center;
`;

const TopHeader = styled.h1`
  font-size: 20px;
  display: flex;
`;