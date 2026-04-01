import { useCallback } from "react";

import { Button } from "../../../components/ui/Button";
import { Box } from "../../../core/layout/Box";
import { useDeleteTodoMutation } from "../graphql/useDeleteTodoMutation";
import { useUpdateTodoMutation } from "../graphql/useUpdateTodoMutation";
import type { TodoStatus } from "../types";

function getNextStatus( status: TodoStatus ) {
    return status === "OPEN" ? "IN_PROGRESS" : status === "IN_PROGRESS" ? "DONE" : "OPEN";
}
interface TodoElementActionsProps {
    readonly id: string
    readonly status: TodoStatus
}
export function TodoElementActions( props: TodoElementActionsProps ) {
    const { id, status } = props;
    const { updateTodo } = useUpdateTodoMutation();
    const { deleteTodo } = useDeleteTodoMutation();

    const handleStatusChange = useCallback( async () => {
        await updateTodo( { id, status: getNextStatus( status ) } );
    }, [ id, status, updateTodo ] );

    const handleDeleteClick = useCallback( async () => {
        await deleteTodo( { id } );
    }, [ id, deleteTodo ] );

    return (
        <Box direction="row" gap="5px">
            <Button outlined onClick={handleStatusChange}>{getNextStatus( status ).toLowerCase()}</Button>
            <Button outlined onClick={() => console.log( `Edit ${ id }` )}>E</Button>
            <Button outlined onClick={handleDeleteClick}>D</Button>
        </Box>
    );
}
