/**
 * This page handles user sign-up for new credentials.
 * Users are redirected to the dashboard upon successful sign-up.
 */

import React, { useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { useStateContext } from "@/context/StateContext";
import { useAuth } from "@/backend/Auth";
import Link from "next/link";
import Navbar from "@/components/Dashboard/Navbar";

const Signup = () => {
  const { user, setUser } = useStateContext();
  const { register } = useAuth(); // Our updated register function
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  async function handleSignup() {
    setError("");
    if (!email || !password) {
      setError("Email and password must not be empty.");
      return;
    }

    // Basic example of email format check:
    const emailRegex = /^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      const userCredential = await register(email, password);
      setUser(userCredential.user);
      router.push("/dashboard");
    } catch (err) {
      setError("Sign-up failed. Please try again.");
      console.error("Sign up error:", err);
    }
  }

  return (
    <>
      <Navbar />
      <Section>
        <SignupContainer>
          <Header>Signup</Header>
          {error && <ErrorMessage>{error}</ErrorMessage>}

          <InputTitle>Email</InputTitle>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputTitle>Password</InputTitle>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <UserAgreementText>
            By signing up, you agree to our{" "}
            <UserAgreementSpan href="/legal/terms-of-use" target="_blank">
              Terms of Use
            </UserAgreementSpan>{" "}
            and{" "}
            <UserAgreementSpan href="/legal/privacy-policy" target="_blank">
              Privacy Policy
            </UserAgreementSpan>.
          </UserAgreementText>

          <MainButton onClick={handleSignup}>Signup</MainButton>
        </SignupContainer>
      </Section>
    </>
  );
};

const Section = styled.section`
  display: flex;
  justify-content: center;
  margin-top: 80px;
`;

const SignupContainer = styled.div`
  width: 400px;
  padding: 20px;
  border-radius: 10px;
  background-color: var(--bg-light);
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
`;

const Header = styled.h1`
  font-size: 24px;
  text-align: center;
  margin-bottom: 16px;
`;

const InputTitle = styled.label`
  font-size: 14px;
  color: #666;
  margin-top: 10px;
`;

const Input = styled.input`
  font-size: 16px;
  width: 100%;
  margin-bottom: 10px;
  margin-top: 4px;
  padding: 8px;
`;

const UserAgreementText = styled.p`
  font-size: 12px;
  color: #666;
  margin-top: 20px;
  text-align: center;
`;

const UserAgreementSpan = styled(Link)`
  color: #007bff;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const MainButton = styled.button`
  background-color: var(--scnd-light);
  color: var(--txt-light);
  width: 100%;
  padding: 10px;
  margin-top: 20px;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: var(--scnd-dark);
  }
`;

const ErrorMessage = styled.p`
  color: var(--ac-light);
  font-size: 14px;
  margin-bottom: 10px;
  text-align: center;
`;

export default Signup;
