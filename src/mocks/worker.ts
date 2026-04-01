import { setupWorker } from "msw/browser";

import { handlers } from "../features/todos/mocks/handlers";

export const worker = setupWorker( ...handlers );
