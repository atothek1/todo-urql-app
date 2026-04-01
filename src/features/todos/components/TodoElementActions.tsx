import { useCallback, useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";

import ThreeDotIcon from "../../../assets/dot-menu-more-svgrepo-com.svg?react";
import { Button } from "../../../components/ui/Button";
import { Box } from "../../../core/layout/Box";
import { useDeleteTodoMutation } from "../graphql/useDeleteTodoMutation";
import { useUpdateTodoMutation } from "../graphql/useUpdateTodoMutation";
import type { TodoStatus } from "../types";

function getNextStatus( status: TodoStatus ) {
    return status === "OPEN" ? "IN_PROGRESS" : status === "IN_PROGRESS" ? "DONE" : "OPEN";
}
interface TodoElementActionsProps {
    readonly id: string
    readonly status: TodoStatus
}
export function TodoElementActions( props: TodoElementActionsProps ) {
    const { id, status } = props;
    const { updateTodo } = useUpdateTodoMutation();
    const { deleteTodo } = useDeleteTodoMutation();
    const [ isMenuOpen, setIsMenuOpen ] = useState( false );
    const [ position, setPosition ] = useState( { x: 0, y: 0 } );
    const anchorRef = useRef<SVGSVGElement | null>( null );
    const menuRef = useRef<HTMLDivElement | null>( null );

    const handleStatusChange = useCallback( async () => {
        await updateTodo( { id, status: getNextStatus( status ) } );
    }, [ id, status, updateTodo ] );

    const handleDeleteClick = useCallback( async () => {
        await deleteTodo( { id } );
    }, [ id, deleteTodo ] );

    const handleMenuClick = useCallback( () => {
        const pos = anchorRef.current?.getBoundingClientRect();
        const w = menuRef.current?.offsetWidth;
        console.log( "Menu Clicked", anchorRef.current, pos, w );
        setPosition( { x: pos?.x - 150 ?? 0, y: pos?.y ?? 0 } );
        setIsMenuOpen( prev => !prev );
    }, [ anchorRef.current, menuRef.current, setPosition, setIsMenuOpen ] );

    const handleClickOutside = () => {
        // Your custom logic here
        console.log( "clicked outside" );
        setIsMenuOpen( false );
    };

    useOnClickOutside( menuRef, handleClickOutside );

    return (
        <>
            <ThreeDotIcon ref={anchorRef} style={{ width: "20px", height: "20px" }} onClick={handleMenuClick} />
            <Box ref={menuRef} direction="row" gap="5px" style={{ display: isMenuOpen ? "flex" : "none", zIndex: "1000", position: "absolute", left: position.x, top: position.y, backgroundColor: "white", padding: "5px", borderRadius: "5px", border: "1px solid black" }}>
                <Button outlined onClick={handleStatusChange}>{getNextStatus( status ).toLowerCase()}</Button>
                <Button outlined onClick={() => console.log( `Edit ${ id }` )}>E</Button>
                <Button outlined onClick={handleDeleteClick}>D</Button>
            </Box>
        </>
    );
}
