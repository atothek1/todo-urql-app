import { useCallback, useState } from "react";

import { Button } from "../../../components/ui/Button";
import { Box } from "../../../core/layout/Box";
import type { TodoStatus } from "../types";
import { TodoList } from "./TodoList";

export function FilteredTodoList() {
    const [ filter, setFilter ] = useState<TodoStatus | undefined>( undefined );

    const handleChangeFilter = useCallback( ( event: React.MouseEvent<HTMLButtonElement> ) => {
        const newFilter = event.currentTarget.dataset.filter as TodoStatus;
        setFilter( newFilter );
    }, [ setFilter ] );

    return (
        <>
            <Box direction="row" gap="5px" justifyItems="stretch">
                <Button onClick={handleChangeFilter} outlined={filter === undefined} data-filter={undefined}>All</Button>
                <Button onClick={handleChangeFilter} outlined={filter === "OPEN"} data-filter="OPEN">Open</Button>
                <Button onClick={handleChangeFilter} outlined={filter === "IN_PROGRESS"} data-filter="IN_PROGRESS">In Progress</Button>
                <Button onClick={handleChangeFilter} outlined={filter === "DONE"} data-filter="DONE">Done</Button>
            </Box>
            <TodoList filter={filter} />
        </>
    );
}
