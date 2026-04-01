import { createBrowserRouter } from "react-router";

import { HomeRoute } from "../features/home/routes.ts";
import { TodoRoutes } from "../features/todos";
import { MainLayout } from "./layout/MainLayout.tsx";

const RootRoute = {
    path: "/",
    Component: MainLayout,
    children: [
        HomeRoute,
        ...TodoRoutes,
    ],
};

export const routes = createBrowserRouter( [
    RootRoute,
] );
