import { TodoPage } from "./TodoPage.tsx";

export const TodoRoutes = [ {
    path: "/todos/dashboard",
    element: <TodoPage view="dashboard" /> }, {
    path: "/todos/list",
    element: <TodoPage view="list" /> }, {
    path: "/todos/board",
    element: <TodoPage view="board" />,
} ];
