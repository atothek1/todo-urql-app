import styled from "@emotion/styled";

interface ListElementProps {
    readonly direction?: "row" | "column"
}
export const ListElement = styled.li<ListElementProps>`
    display: flex;
    flex-direction: ${ props => props.direction ?? "row" };
    padding: 0;
    margin: 0;
`;
