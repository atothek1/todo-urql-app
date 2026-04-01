import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { App } from "./core/App";
import { worker } from "./mocks/worker";

worker.start( {
    onUnhandledRequest: "warn",
} ).then( () => {
    console.log( "✓ MSW (Mock Service Worker) started successfully" );
    const root = createRoot( document.getElementById( "root" )! );
    root.render(
        <StrictMode>
            <App />
        </StrictMode>
    );
} ).catch( ( error ) => {
    console.error( "✗ Failed to start MSW:", error );
} );
