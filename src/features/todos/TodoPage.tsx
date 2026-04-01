import { Box } from "../../core/layout/Box.tsx";
import { Dashboard } from "./components/Dashboard.tsx";
import { FilteredTodoList } from "./components/FilteredTodoList";
import { SwimlanesTodoList } from "./components/SwimlanesTodoList";
import { TodoForm } from "./components/TodoForm";

function getView( view: string ) {
    switch ( view ) {
        case "list": return {
            title: "Todos List View",
            element: <FilteredTodoList />,
        };
        case "board": return {
            title: "Todos Board View",
            element: <SwimlanesTodoList />,
        };
        case "dashboard": return {
            title: "Todos Dashboard",
            element: <Dashboard />,
        };
        default: return {
            title: "Invalid View",
            element: ( <div>
                Invalid view:
                {view}
                       </div> ),
        };
    }
}
interface TodoPageProps {
    readonly view: "list" | "board" | "dashboard"
}
export function TodoPage( props: TodoPageProps ) {
    const { view } = props;
    const { title, element } = getView( view );
    return (
        <Box direction="column" gap="20px">
            <h1>{title}</h1>
            <TodoForm />
            {element}
        </Box>
    );
}
