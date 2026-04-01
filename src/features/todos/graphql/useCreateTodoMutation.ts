import { useMutation, type UseMutationState } from "urql";

import { sanitizeResponseDto } from "../../../utils/graphql/sanitizeResponseDto.ts";
import { createTodoMutation } from "./queries.ts";

function resolveResponseData( response: UseMutationState ) {
    if ( response.data?.createTodo?.__typename === "Todo" ) {
        return sanitizeResponseDto( response.data.createTodo );
    }
}

export function useCreateTodoMutation() {
    const [ result, createTodo ] = useMutation( createTodoMutation );
    return { ...result, data: resolveResponseData( result ), createTodo };
}
