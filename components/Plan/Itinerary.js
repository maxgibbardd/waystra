import { useState } from "react";
import styled from 'styled-components';
import { useAuth } from "@/backend/Auth";
import { useRouter } from "next/router";

export default function Itinerary() {
    return(
        <Display>
            <Table>
                <TableHeader>
                    <HeaderCol>
                        Location
                    </HeaderCol>
                    <HeaderCol>
                        Duration
                    </HeaderCol>
                </TableHeader>

                <TableContent>
                    <ContentRow>
                        <ContentCol>
                            <Location>Location</Location>
                        </ContentCol>
                        <ContentCol>Col2</ContentCol>
                    </ContentRow>
                    
                </TableContent>

                <TableFooter>
                    <FooterCol>
                        Total
                    </FooterCol>
                    <FooterCol></FooterCol>
                    <FooterCol></FooterCol>
                    <FooterCol></FooterCol>
                    <FooterCol></FooterCol>
                    <FooterCol>
                        $420.69
                    </FooterCol>
                </TableFooter>
            </Table>
        </Display>

    );
}

const Display = styled.div`
height: 100%;
display: flex;
overflow: column;
`

const Table = styled.table`
font-family: var(--font-prm);
width: 100%;
// border: 1px dashed pink;
border-radius: 5px;
`

const TableHeader = styled.tr`
display: flex;
font-family: var(--font-prm);
font-weight: 600;
font-size: 20px;
height: 10%;
border-bottom: 1px solid var(--prm-light);
`

const HeaderCol = styled.th`
flex: 1;
font-family: var(--font-prm);
padding-left: 10px;
`

const TableContent = styled.div`
height: 70vh;
overflow: scroll;
`

const ContentRow = styled.tr`
display: flex;
font-family: var(--font-prm);
font-size: 20px;
height: 10%;
`

const ContentCol = styled.td`
flex: 1;
padding-left: 10px;
align-content: center;
`

const Location = styled.div`
`

const TableFooter = styled.tr`
display: flex;
font-family: var(--font-prm);
height: 10%;
font-weight: 600;
font-size: 20px;
background-color: #F00000;
color: #6B0000;
`

const FooterCol = styled.td`
flex: 1;
padding-left: 10px;
`