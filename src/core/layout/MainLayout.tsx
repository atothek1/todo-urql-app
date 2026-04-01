import styled from "@emotion/styled";
import { Outlet } from "react-router";

import { Appbar } from "../app/components/Appbar";
import { Box } from "./Box";
import { Header } from "./Header";
import { Main } from "./Main";

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
                <Main>
                    <Outlet />
                </Main>
            </Container>
        </>
    );
}
