import { useState } from "react";
import styled from 'styled-components';
import { useAuth } from "@/backend/Auth";
import { useRouter } from "next/router";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const user = await login(email, password);
            if (user) {
                router.push("/dashboard");
            }
        } catch (error) {
            console.error("Login failed:", error.message);
        }
    };

    return (
        <Section>
            <LoginContainer>
                <LoginHeading>Login</LoginHeading>
                <LoginForm onSubmit={handleLogin}>
                    <StyledInput
                        type="email"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <StyledInput
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <LoginButton type="submit">Login</LoginButton>
                </LoginForm>
            </LoginContainer>
        </Section>
    );
}


// ~~~~~~~~~~~~~~ STYLES ~~~~~~~~~~~~~~

const Section = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40vh;
  background-color: var(--bg-light);
`;

const LoginContainer = styled.div`
  width: 350px;
  padding: 30px;
  background-color: var(--bg-light);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LoginHeading = styled.h2`
  font-family: var(--font-scnd);
  font-size: 28px;
  margin-bottom: 20px;
  color: var(--txt-light);
`;

const LoginForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
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
  
  &::placeholder {
    color: #666;
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

  &:hover {
    background-color: var(--scnd-light);
  }
`;
