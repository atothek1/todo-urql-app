import { RouterProvider } from "react-router";
import { cacheExchange, Client, fetchExchange, Provider } from "urql";

import { GlobalStyles } from "./GlobalStyles.tsx";
import { routes } from "./Routing.tsx";

const client = new Client( {
    url: "http://localhost:5173/graphql",
    fetchOptions: {
        credentials: "include",
        headers: {
            // remove text/event-stream for MSW to intercept request
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
    },
    exchanges: [ cacheExchange, fetchExchange ],
} );

export function App() {
    return (
        <>
            <GlobalStyles />
            <Provider value={client}>
                <RouterProvider router={routes} />
            </Provider>
        </>
    );
}
