import { useQuery } from "urql";

import type { CursorPaginationVars } from "../../../types";
import { sanitizePaginationResponse } from "../../../utils/graphql/sanitizePaginationResponse";
import type { TodoDto } from "../types";
import { readTodosQuery } from "./queries";

export function useReadTodosQuery( variables: CursorPaginationVars = { first: 10 } ) {
    const [ result, readTodos ] = useQuery( { query: readTodosQuery, variables, requestPolicy: "network-only" } );
    const resolvedData = sanitizePaginationResponse<TodoDto>( result, "readTodos", "TodoConnection" );
    return { ...result, data: resolvedData.data, meta: resolvedData.meta, readTodos };
}
