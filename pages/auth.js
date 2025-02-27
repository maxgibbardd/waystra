import { useState } from 'react';
import styled from 'styled-components';
import Login from '@/components/Auth/Login';
import SignUp from '@/components/Auth/SignUp';

export default function AuthPage() {
    const [activeTab, setActiveTab] = useState('login');
    
    return (
    <AuthContainer>
        <TabContainer>
            <Tab 
            active={activeTab === 'login'} 
            onClick={() => setActiveTab('login')}
            >
                Login
                </Tab>
            <Tab 
            active={activeTab === 'signup'} 
            onClick={() => setActiveTab('signup')}
            >
                Sign Up
            </Tab>
        </TabContainer>
        {activeTab === 'login' ? <Login /> : <SignUp />}
    </AuthContainer>
    );
}

const AuthContainer = styled.div`
margin: 5% auto;
width: 400px;
padding: 20px;
border-radius: 10px;
background-color: var(--bg-light);
box-shadow: 0 0 10px rgba(0,0,0,0.1);
`;

const TabContainer = styled.div`
display: flex;
justify-content: space-around;
margin-bottom: 20px;
`;

const Tab = styled.button`
background: transparent;
border: none;
font-size: 18px;
padding: 10px;
color: ${({ active }) => (active ? "var(--prm-light)" : "var(--txt-light)")};
border-bottom: ${({ active }) => (active ? "2px solid var(--prm-light)" : "none")};
cursor: pointer;
`;

