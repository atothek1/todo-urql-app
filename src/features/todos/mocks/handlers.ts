import { graphql as executeGraphql } from "graphql";
import { graphql, GraphQLHandler, HttpResponse } from "msw";

import { schema } from "../graphql/queries";
import type { Todo } from "../types.ts";
import { createTodo, deleteTodo, readTodos, updateTodo } from "./data";

const api = graphql.link( "http://localhost:5173/graphql" );

interface DeleteTodoVars {
    readonly id: string
}
interface CreateTodoVars {
    readonly text: string
}
type UpdateTodoVars = Todo;

interface ReadTodosVars {
    readonly first: number
    readonly after: string
    readonly last: number
    readonly before: string
    readonly filter: Record<string, unknown>
}

const handler = api.operation( async ( info ) => {
    const { query, variables } = info;
    console.info( "handler()", info );
    const { data, errors } = await executeGraphql( {
        schema,
        source: query,
        variableValues: variables,
        rootValue: {
            deleteTodo( vars: DeleteTodoVars ) {
                const data = deleteTodo( vars.id );
                console.log( "handler.deleteTodo()", vars, data );
                if ( data ) {
                    return { ...data, __typename: "Todo" };
                }
            },
            updateTodo( vars: UpdateTodoVars ) {
                const data = updateTodo( vars.id, vars.text, vars.status );
                console.log( "handler.updateTodo()", vars, data );
                if ( data ) {
                    return { ...data, __typename: "Todo" };
                }
            },
            createTodo( vars: CreateTodoVars ) {
                const data = createTodo( vars.text, "OPEN" );
                console.log( "handler.createTodo()", vars, data );
                if ( data ) {
                    return { ...data, __typename: "Todo" };
                }
            },
            readTodos( vars: ReadTodosVars ) {
                const data = readTodos( vars.first, vars.after, vars.last, vars.before, vars.filter );
                console.log( "handler.readTodos()", vars, data );
                if ( data ) {
                    return { ...data, __typename: "TodoConnection" };
                }
            },
        },
    } );

    return HttpResponse.json( { errors, data } );
} );

export const handlers: GraphQLHandler[] = [ handler ];
