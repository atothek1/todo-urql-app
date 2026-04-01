import { useMutation, type UseMutationState } from "urql";

import { sanitizeResponseDto } from "../../../utils/graphql/sanitizeResponseDto.ts";
import { deleteTodoMutation } from "./queries.ts";

function resolveResponseData( response: UseMutationState ) {
    if ( response.data?.createTodo?.__typename === "Todo" ) {
        return sanitizeResponseDto( response.data.createTodo );
    }
}

export function useDeleteTodoMutation() {
    const [ result, deleteTodo ] = useMutation( deleteTodoMutation );
    return { ...result, data: resolveResponseData( result ), deleteTodo };
}
