import styled from "@emotion/styled";

interface ListProps {
    readonly direction?: "row" | "column"
}

export const List = styled.ul<ListProps>`
    display: flex;
    flex-direction: ${ props => props.direction ?? "column" };
    list-style-type: none;
    padding: 0;
    margin: 0;
    gap: 5px;
`;
