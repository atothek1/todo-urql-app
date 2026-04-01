import { en, Faker, generateMersenne53Randomizer } from "@faker-js/faker";

import type { TodoDto } from "../types.ts";

const randomizer = generateMersenne53Randomizer();

const faker = new Faker( {
    locale: en,
    randomizer,
} );
randomizer.seed( 12345 );

const todos = localStorage.getItem( "todos" ) ? JSON.parse( localStorage.getItem( "todos" )! ) : seedData();
const todosMap = new Map<string, Omit<TodoDto, "__typename">>();
todos.forEach( ( todo: Omit<TodoDto, "__typename"> ) => todosMap.set( todo._id, todo ) );

export const mockedTodosStore: { readonly todos: Omit<TodoDto, "__typename">[], readonly todosMap: Map<string, Omit<TodoDto, "__typename">> } = {
    todos,
    todosMap,
};

function _getRandomStatus<TValue>(): TValue {
    const enumValues = [ "OPEN", "IN_PROGRESS", "DONE" ];
    return enumValues[ Math.floor( Math.random() * enumValues.length ) ] as TValue;
}

function _getId() {
    return Math.random().toString( 36 ).substring( 2, 9 );
}

function _createTodo( text: string, status: TodoDto[ "status" ] ) {
    return { _id: _getId(), text, status };
}

function seedData( amount: number = 15 ) {
    const todos = [];
    for ( let i = 0; i < amount; i++ ) {
        todos.push( _createTodo( faker.lorem.sentence(), _getRandomStatus() ) );
    }
    return todos;
}

export function deleteTodo( id: string ) {
    const idx = mockedTodosStore.todos.findIndex( o => o._id === id );
    if ( idx === -1 ) {
        throw new Error( `Todo with id ${ id } not found` );
    }

    const todo = mockedTodosStore.todos.splice( idx, 1 ).pop();
    mockedTodosStore.todosMap.delete( id );
    localStorage.setItem( "todos", JSON.stringify( mockedTodosStore.todos ) );

    return todo;
}

export function updateTodo( id: string, text?: string, status?: TodoDto[ "status" ] ) {
    const idx = mockedTodosStore.todos.findIndex( o => o._id === id );
    if ( idx === -1 ) {
        throw new Error( `Todo with id ${ id } not found` );
    }

    const todo = mockedTodosStore.todos[ idx ];
    const newTodo = { ...todo, text: text ?? todo.text, status: status ?? todo.status };

    mockedTodosStore.todos.splice( idx, 1, newTodo );
    mockedTodosStore.todosMap.delete( newTodo._id );
    mockedTodosStore.todosMap.set( newTodo._id, newTodo );
    localStorage.setItem( "todos", JSON.stringify( mockedTodosStore.todos ) );

    return newTodo;
}

export function createTodo( text: string, status: TodoDto[ "status" ] ) {
    const _id = _getId();
    const todo = {
        _id, text, status,
    };
    mockedTodosStore.todos.push( todo );
    mockedTodosStore.todosMap.set( _id, todo );
    localStorage.setItem( "todos", JSON.stringify( mockedTodosStore.todos ) );
    return todo;
}
export function readTodos( first?: number, after?: string, last?: number, before?: string, filter: Record<string, unknown> = {} ) {
    const direction = last === undefined ? "next" : "prev";
    const size = last === undefined ? first! : last!;
    const cursor = direction === "next" ? after : before;
    const curserIndex = mockedTodosStore.todos.findIndex( todo => todo._id === cursor );
    const startIndex = Math.max( curserIndex >= 0 ? direction === "next" ? curserIndex + 1 : curserIndex - size : 0, 0 );
    const endIndex = Math.min( startIndex + size, mockedTodosStore.todos.length );

    console.log( "readTodos()", { first, after, last, before, filter, direction, size, startIndex, endIndex } );

    let filteredData: Omit<TodoDto, "__typename">[] = [ ...mockedTodosStore.todos ];
    for ( const [ key, value ] of Object.entries( filter ) ) {
        filteredData = filteredData.reduce( ( filtered: Omit<TodoDto, "__typename">[], todo ) => {
            if ( todo[ key as keyof Omit<TodoDto, "__typename"> ] === value ) {
                filtered.push( todo );
            }
            return filtered;
        }, [] );
    }

    const accountsSlice = filteredData.slice( startIndex, endIndex );

    return {
        edges: accountsSlice.map( todo => ( { node: todo, cursor: todo._id } ) ),
        pageInfo: {
            hasNextPage: endIndex < mockedTodosStore.todos.length,
            hasPreviousPage: startIndex > 0,
            startCursor: accountsSlice[ 0 ]?._id ?? null,
            endCursor: accountsSlice[ accountsSlice.length - 1 ]?._id ?? null,
        },
        totalCount: mockedTodosStore.todos.length,
    };
}
