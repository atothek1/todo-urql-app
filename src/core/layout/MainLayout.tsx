import styled from "@emotion/styled";
import { Outlet } from "react-router";

import { Appbar } from "../app/components/Appbar.tsx";
import { Navbar } from "../app/components/Navbar.tsx";
import { Box } from "./Box.tsx";
import { Header } from "./Header.tsx";
import { Main } from "./Main.tsx";
import { Nav } from "./Nav.tsx";

const Container = styled( Box )`
    min-height: calc(100vh - 80px);
`;

export function MainLayout() {
    return (
        <>
            <Header>
                <Appbar />
            </Header>
            <Container direction="row">
                <Nav>
                    <Navbar />
                </Nav>
                <Main>
                    <Outlet />
                </Main>
            </Container>
        </>
    );
}
