import { type Connection, type Edge, type Node } from "../../types.ts";
import { sanitizeResponseDto } from "./sanitizeResponseDto.ts";
import { sanitizeResponseNode } from "./sanitizeResponseNode.ts";

type IndexedConnection<TData extends Node, TKey extends string | number | symbol> = {
    readonly [P in TKey]: Connection<TData>;
};

interface PaginationResponse<TData extends Node, TKey extends string | number | symbol> {
    readonly data?: IndexedConnection<TData, TKey> & {
        readonly __typename: string
    }
}

export function sanitizePaginationResponse<TData extends Node>(
    response: PaginationResponse<TData, string>,
    key: string,
    typename: string
) {
    const resData = response.data?.[ key ];
    if ( resData && resData.__typename === typename ) {
        const data = sanitizeResponseNode<Connection<TData>>( resData );
        const pageInfo = sanitizeResponseNode( resData.pageInfo );
        const totalCount = resData.totalCount;
        return {
            data: data.edges.map( ( node: Edge<TData> ) => {
                return sanitizeResponseDto( node.node );
            } ),
            meta: { pageInfo, totalCount },
        };
    }
    return { data: [], meta: {} };
}
