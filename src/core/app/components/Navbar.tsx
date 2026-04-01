import { ListElement } from "../../../components/ui/ListElement";
import { NavList, StyledLink } from "./Navbar.styled";

export function Navbar() {
    return (
        <NavList direction="row">
            <ListElement><StyledLink to="/" title="Home">Home</StyledLink></ListElement>
            <ListElement><StyledLink to="/todos/dashboard" title="Todos">Todos</StyledLink></ListElement>
            <ListElement><StyledLink to="/todos/list" title="List">List</StyledLink></ListElement>
            <ListElement><StyledLink to="/todos/board" title="Board">Board</StyledLink></ListElement>
            <ListElement><StyledLink to="/todos/new" title="Add Todo">Add Todo</StyledLink></ListElement>
        </NavList>
    );
}
