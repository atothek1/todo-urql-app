import styled from "@emotion/styled";
import { NavLink } from "react-router";

export const Ul = styled.ul`
    padding-left: 10px;
`;

export const StyledLink = styled( NavLink )`
    text-decoration: underline;
    cursor: pointer;
    :hover {
        font-weight: bold;
    }
    &.active {
        font-weight: bold;
    }
`;
