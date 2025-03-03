/**
 * This page handles user login using existing credentials.
 * Users are redirected to the dashboard upon successful login.
 */

import React, { useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { useStateContext } from "@/context/StateContext";
import { useAuth } from "@/backend/Auth";
import Link from "next/link";
import Navbar from "@/components/Dashboard/Navbar";

const Login = () => {
  const { user, setUser } = useStateContext(); // if you’re using a different context
  const { login } = useAuth(); // Our updated login function
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const [error, setError] = useState("");

  async function handleLogin() {
    try {
      setError("");
      const userCredential = await login(email, password);
      // userCredential.user is the actual user object
      setUser(userCredential.user);
      router.push("/dashboard");
    } catch (err) {
      setError("Failed to log in. Please check your email and password.");
      console.error("Login error:", err);
    }
  }

  return (
    <>
      <Navbar />
      <Section>
        <LoginContainer>
          <Header>Login</Header>
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
            By signing in, you agree to our{" "}
            <UserAgreementSpan href="/legal/terms-of-use" target="_blank">
              Terms of Use
            </UserAgreementSpan>{" "}
            and{" "}
            <UserAgreementSpan href="/legal/privacy-policy" target="_blank">
              Privacy Policy
            </UserAgreementSpan>.
          </UserAgreementText>

          <MainButton onClick={handleLogin}>Login</MainButton>
        </LoginContainer>
      </Section>
    </>
  );
};

const Section = styled.section`
  display: flex;
  justify-content: center;
  margin-top: 80px;
`;

const LoginContainer = styled.div`
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

export default Login;
