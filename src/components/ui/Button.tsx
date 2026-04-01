import styled from "@emotion/styled";

interface ButtonProps {
    readonly outlined?: boolean
}
export const Button = styled.button<ButtonProps>`
    display: flex;
    flex: 1 1 0px;
    align-items: center;
    justify-content: center;
    background-color: ${ props => props.outlined ? undefined : "#007bff" };
    color: ${ props => props.outlined ? "#007bff" : "white" };
    border: none;
    padding: 5px 10px;
    border: ${ props => props.outlined ? "1px solid #007bff" : undefined };
    border-radius: 5px;
    cursor: pointer;
    white-space: nowrap;
    &:hover {
        background-color: #0056b3;
        color: ${ props => props.outlined ? "white" : undefined };
    }
`;
