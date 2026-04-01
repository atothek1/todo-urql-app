import styled from "@emotion/styled";

import { Box } from "../../../core/layout/Box";
import type { Todo } from "../types.ts";
import { TodoElementActions } from "./TodoElementActions";

const statusColors = {
    OPEN: "var(--todo-status-open-color)",
    IN_PROGRESS: "var(--todo-status-progress-color)",
    DONE: "var(--todo-status-done-color)",
};

interface TodoElementProps {
    readonly data: Todo
    readonly onSelected: ( id: string ) => void
}
export function TodoElement( props: TodoElementProps ) {
    const { data: { id, text, status }, onSelected } = props;

    return (
        <StyledTodoElement as="li" direction="row">
            <input type="checkbox" onChange={() => onSelected( id )} />
            <div>
                <span>
                    ID:
                    {id}
                </span>
                <p>{text}</p>
            </div>
            <TodoStatusPill bgColor={statusColors[ status ]}>{status}</TodoStatusPill>
            <TodoElementActions id={id} status={status} />
        </StyledTodoElement>
    );
}
interface TodoStatusPillProps {
    readonly bgColor?: string
}
const TodoStatusPill = styled( Box )<TodoStatusPillProps>`
    border-radius: 10px;
    height: 22px;
    padding: 0 10px;
    max-width: fit-content;
    font-size: 10px;
    justify-content: center;
    align-items: center;
    background-color: ${ props => props.bgColor };
`;
interface ListElementProps {
    readonly bgColor?: string
}
const StyledTodoElement = styled( Box )<ListElementProps>`
    display: flex;
    gap: 10px;
    border: 1px solid rgba(161, 161, 161, 0.16);
    box-shadow: 0px 2px 7px 1px rgba(161, 161, 161, 0.16);
    padding: 10px;
    border-radius: 5px;
    & > div > span {
        font-size: 10px;
        color: gray;
    }
    & > div {
        flex: 1;
    }
`;
