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
        <StyledTodoElement as="li" direction="row" bgColor={statusColors[ status ]}>
            <input type="checkbox" onChange={() => onSelected( id )} />
            <div>
                <span>
                    ID:
                    {id}
                </span>
                <p>{text}</p>
            </div>
            <TodoElementActions id={id} status={status} />
        </StyledTodoElement>
    );
}

interface ListElementProps {
    readonly bgColor?: string
}
const StyledTodoElement = styled( Box )<ListElementProps>`
    display: flex;
    gap: 10px;
    align-items: center;
    background-color: ${ props => props.bgColor };
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
