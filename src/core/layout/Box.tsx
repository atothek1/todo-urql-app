import styled from "@emotion/styled";

interface BoxProps {
    readonly direction?: "row" | "column"
    readonly gap?: React.CSSProperties[ "gap" ]
    readonly justifyContent?: React.CSSProperties[ "justifyContent" ]
    readonly justifyItems?: React.CSSProperties[ "justifyItems" ]
    readonly justifySelf?: React.CSSProperties[ "justifySelf" ]
    readonly alignItems?: React.CSSProperties[ "alignItems" ]
    readonly flex?: React.CSSProperties[ "flex" ]
}
export const Box = styled.div<BoxProps>`
    display: flex;
    flex-direction: ${ props => props.direction ?? "row" };
    gap: ${ props => props.gap };
    justify-content: ${ props => props.justifyContent };
    justify-items: ${ props => props.justifyItems };
    justify-self: ${ props => props.justifySelf };
    align-items: ${ props => props.alignItems };
    flex: ${ props => props.flex };
`;
