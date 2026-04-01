import styled from "@emotion/styled";
import { useMemo } from "react";

import { Box } from "../../core/layout/Box.tsx";

interface AsyncStatusProps {
    readonly children: React.ReactNode
    readonly fetching: boolean
    readonly error?: unknown
    readonly data?: unknown
}

const Status = styled( Box )<{ type: "error" | "info" }>`
    flex: 1;
    padding: 10px;
    border-radius: 5px;
    background-color: ${ props => props.type === "error" ? "var(--error-color)" : "var(--info-color)" };
`;

export function ServiceStatus( props: AsyncStatusProps ) {
    const {
        children,
        fetching,
        error,
        data,
    } = props;

    const { isError, hasData, isEmpty } = useMemo( () => {
        const isError = Boolean( error );
        const hasData = Boolean( data );
        const isEmpty = !isError
          && !fetching
          && ( ( Array.isArray( data ) && data.length === 0 ) || !hasData );
        return { isError, hasData, isEmpty };
    }, [ fetching, error, data ] );

    if ( fetching ) {
        return <span>Loading ...</span>;
    }

    if ( isError ) {
        return (
            <Status type="error">
                We are sorry, loading of the data has caused an error.
            </Status>
        );
    }

    if ( isEmpty ) {
        return <Status type="info">Empty data Set.</Status>;
    }

    if ( !hasData ) {
        return <Status type="info">No Data found.</Status>;
    }

    return <>{children}</>;
}
