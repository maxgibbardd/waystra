import { useState } from "react";
import styled from 'styled-components';
import { useAuth } from "@/backend/Auth";
import { useRouter } from "next/router";

export default function Route() {
    return(
        <Display>
            Route
        </Display>

    );
}

const Display = styled.div`
height: 100%;
display: flex;
overflow: column;
padding: 20px;
`