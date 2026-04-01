import { useMutation, type UseMutationState } from "urql";

import { sanitizeResponseDto } from "../../../utils/graphql/sanitizeResponseDto";
import { updateTodoMutation } from "./queries.ts";

function resolveResponseData( response: UseMutationState ) {
    if ( response.data?.createTodo?.__typename === "Todo" ) {
        return sanitizeResponseDto( response.data.createTodo );
    }
}

export function useUpdateTodoMutation() {
    const [ result, updateTodo ] = useMutation( updateTodoMutation );
    return { ...result, data: resolveResponseData( result ), updateTodo };
}
