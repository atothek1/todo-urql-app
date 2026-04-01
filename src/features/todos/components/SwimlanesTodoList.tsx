import { Box } from "../../../core/layout/Box.tsx";
import { TodoList } from "./TodoList.tsx";

export function SwimlanesTodoList() {
    return (
        <Box direction="row" gap="20px">
            <TodoList filter="OPEN" title="Open Tasks" />
            <TodoList filter="IN_PROGRESS" title="In Progress Tasks" />
            <TodoList filter="DONE" title="Completed Tasks" />
        </Box>
    );
}
