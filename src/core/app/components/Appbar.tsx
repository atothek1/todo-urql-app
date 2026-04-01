import { Box } from "../../layout/Box.tsx";
import { Navbar } from "./Navbar.tsx";

export function Appbar() {
    return (
        <Box direction="row" gap="50px" alignItems="center">
            <h2>TaskFlow</h2>
            <Navbar />
        </Box>
    );
}
