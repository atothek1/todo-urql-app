import { useCallback, useState } from "react";

import { ServiceStatus } from "../../../components/ui/AsyncStatus";
import { List } from "../../../components/ui/List";
import { Box } from "../../../core/layout/Box";
import { useReadTodosQuery } from "../graphql/useReadTodosQuery";
import type { TodoStatus } from "../types";
import { TodoElement } from "./TodoElement";

interface TodoListProps {
    readonly filter?: TodoStatus
    readonly title?: string
}

export function TodoList( props: TodoListProps ) {
    const { filter, title } = props;
    const [ , setSelected ] = useState<string[]>( [] );
    const { data, fetching, error } = useReadTodosQuery( { first: 10, filter: { status: filter } } );
    const handleSelected = useCallback( ( id: string ) => {
        setSelected( ( prev ) => {
            if ( prev.includes( id ) ) {
                return prev.filter( todoId => todoId !== id );
            }
            return [ ...prev, id ];
        } );
    }, [] );

    const listElements = data.map( todo => <TodoElement key={todo.id} data={todo} onSelected={handleSelected} /> );
    return (
        <Box direction="column" gap="10px" flex="1">
            <h2>{title}</h2>
            <ServiceStatus fetching={fetching} error={error} data={data}>
                <List>
                    {listElements}
                </List>
            </ServiceStatus>
        </Box>
    );
}
