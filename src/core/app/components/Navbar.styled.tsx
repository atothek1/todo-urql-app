import styled from "@emotion/styled";
import { NavLink } from "react-router";

import { List } from "../../../components/ui/List.tsx";

export const NavList = styled( List )`
    gap: 20px;
`;

export const StyledLink = styled( NavLink )`
    font-size: 18px;
    cursor: pointer;
    :hover:not(.active) {
        font-weight: bold;
    }
    &.active {
        font-weight: bold;
        padding-bottom: 3px;
        border-bottom: 2px solid #000;
    }
    :before {
        display: block;
        content: attr(title);
        font-weight: bold;
        height: 0;
        overflow: hidden;
        visibility: hidden;
    }
`;
