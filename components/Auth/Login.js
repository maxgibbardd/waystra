import { useState } from "react";
import styled from "styled-components";
import { useAuth } from "@/backend/Auth";
import { useRouter } from "next/router";

/**
 * Login component that handles user authentication.
 */
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  // Handles user login attempt
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setError(""); // Clear previous errors
      const userCredential = await login(email, password);
      if (userCredential) {
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Login failed:", error.message);
      setError("Login failed: " + error.message);
    }
  };

  return (
    <Section>
      <LoginContainer>
        <LoginHeading>Login</LoginHeading>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <LoginForm onSubmit={handleLogin}>
          <StyledInput
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <StyledInput
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <LoginButton type="submit">Login</LoginButton>
        </LoginForm>
      </LoginContainer>
    </Section>
  );
}

// -------------------- Styled Components --------------------

const Section = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40vh;
  background-color: var(--bg-light);
  font-family: var(--font-prm);
`;

const LoginContainer = styled.div`
  width: 350px;
  padding: 30px;
  background-color: var(--bg-light);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: var(--font-prm);
`;

const LoginHeading = styled.h2`
  font-size: 28px;
  margin-bottom: 20px;
  color: var(--txt-light);
  font-family: var(--font-prm);
`;

const LoginForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
  font-family: var(--font-prm);
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 12px;
  font-size: 20px;
  border-radius: 8px;
  border: 1px solid var(--prm-light);
  background-color: #f0f0f0;
  color: #333;
  outline: none;
  font-family: var(--font-prm);
  
  &::placeholder {
    color: #666;
    font-family: var(--font-prm);
  }
`;

const LoginButton = styled.button`
  width: 100%;
  padding: 12px;
  font-size: 20px;
  font-weight: 600;
  color: white;
  background-color: var(--prm-light);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s ease-in-out;
  font-family: var(--font-prm);

  &:hover {
    background-color: var(--scnd-light);
  }
`;

const ErrorMessage = styled.p`
  color: var(--ac-light);
  font-size: 16px;
  margin-bottom: 10px;
  font-family: var(--font-prm);
`;
