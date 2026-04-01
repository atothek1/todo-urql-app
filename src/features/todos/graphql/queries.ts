import { buildSchema } from "graphql/utilities";
import { gql } from "urql";

export const schema = buildSchema( `
    type Todo {
      _id: ID!
      text: String!
      status: TodoStatus!
    }
    enum TodoStatus {
      OPEN,
      IN_PROGRESS,
      DONE,
    }
    type TodoConnection {
      edges: [TodoEdge!]!
      pageInfo: PageInfo!
      totalCount: Int!
    }
    type TodoEdge {
        cursor: String!
        node: Todo!
    }
    type PageInfo {
        hasNextPage: Boolean!
        hasPreviousPage: Boolean!
        startCursor: String
        endCursor: String
    }
    input TodoFilterInput {
      status: TodoStatus
    }
    
    type Query {
      readTodos(first: Int, after: String, last: Int, before: String, filter: TodoFilterInput): TodoConnection!
      todo(id: ID!): Todo
    }
    type Mutation {
      createTodo(text: String!): Todo
      updateTodo(id: ID!, text: String, status: TodoStatus): Todo
      deleteTodo(id: ID!): Todo
    }
` );

export const readTodosQuery = gql`query ReadTodos($first: Int, $after: String, $last: Int, $before: String, $filter: TodoFilterInput) {
    readTodos (first: $first, after: $after, last: $last, before: $before, filter: $filter) {
        totalCount
        pageInfo {
            hasNextPage
            hasPreviousPage
            startCursor
            endCursor
        },
        edges {
            cursor
            node { _id text status }
        }
    }
}`;
export const readTodoQuery = gql`query ReadTodo { todo { _id, text, status } }`;
export const createTodoMutation = gql`mutation CreateTodo($text: String!) { createTodo(text: $text) { _id, text, status } }`;
export const updateTodoMutation = gql`mutation UpdateTodo($id: ID!, $text: String, $status: TodoStatus) { updateTodo(id: $id, text: $text, status: $status) { _id, text, status } }`;
export const deleteTodoMutation = gql`mutation DeleteTodo($id: ID!) { deleteTodo(id: $id) { _id, text, status } }`;
