import { type Connection, type Edge, type Node } from "../../types.ts";

export type TodoStatus = "OPEN" | "IN_PROGRESS" | "DONE";

export interface TodoDto extends Node {
    readonly text: string
    readonly status: TodoStatus
}
export type TodoEdge = Edge<TodoDto>;
export type TodoConnection = Connection<TodoDto>;

export interface Todo extends Omit<TodoDto, "__typename" | "_id"> {
    readonly id: string
}
