import styled from "@emotion/styled";
import { useCallback } from "react";

import { Button } from "../../../components/ui/Button";
import { useCreateTodoMutation } from "../graphql/useCreateTodoMutation";

const Form = styled.form`
    display: flex;
    flex-direction: row;
`;

const TextInput = styled.input`
    flex: 2;
    padding: 5px;
    margin-right: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
`;

export function TodoForm() {
    const { createTodo } = useCreateTodoMutation();
    const handleSubmit = useCallback( async ( data: FormData ) => {
        const text = data.get( "text" ) as string;
        if ( text.trim() === "" ) {
            return;
        }
        await createTodo( { text: text.trim() } );
    }, [ createTodo ] );

    return (
        <Form action={handleSubmit}>
            <TextInput type="text" name="text" placeholder="Todo text" />
            <Button type="submit">Add Todo</Button>
        </Form>
    );
}
