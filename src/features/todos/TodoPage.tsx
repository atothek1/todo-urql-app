import { useCallback, useState } from "react";

import { Button } from "../../components/ui/Button.tsx";
import { Box } from "../../core/layout/Box.tsx";
import { FilteredTodoList } from "./components/FilteredTodoList";
import { SwimlanesTodoList } from "./components/SwimlanesTodoList";
import { TodoForm } from "./components/TodoForm";

export function TodoPage() {
    const [ view, setView ] = useState<"list" | "swimlanes">( "list" );

    const handleViewChange = useCallback( ( event: React.MouseEvent<HTMLButtonElement> ) => {
        const newView = event.currentTarget.dataset.view as "list" | "swimlanes";
        setView( newView );
    }, [ setView ] );

    return (
        <Box direction="column" gap="20px">
            <h1>Todos</h1>
            <TodoForm />
            <Box gap="10px">
                <Button onClick={handleViewChange} data-view="list" outlined={view === "list"}>List</Button>
                <Button onClick={handleViewChange} data-view="swimlanes" outlined={view === "swimlanes"}>Swimlanes</Button>
            </Box>
            {view === "list" ? <FilteredTodoList /> : <SwimlanesTodoList /> }
        </Box>
    );
}
