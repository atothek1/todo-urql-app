import { StyledLink, Ul } from "./Navbar.styled.tsx";

export function Navbar() {
    return (
        <Ul>
            <li><StyledLink to="/">Home</StyledLink></li>
            <li><StyledLink to="/todos">Todos</StyledLink></li>
        </Ul>
    );
}
