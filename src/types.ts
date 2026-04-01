export interface Typename {
    readonly __typename?: string
}
export interface Node extends Typename {
    readonly _id: string
}

export interface Edge<TNode extends Node> {
    readonly cursor: string
    readonly node: TNode
}

export interface Connection<TData extends Node> extends Typename {
    readonly totalCount: number
    readonly pageInfo: CursorPaginationInfo
    readonly edges: Edge<TData>[]
}

export interface CursorPaginationInfo extends Typename {
    readonly hasNextPage: boolean
    readonly hasPreviousPage: boolean
    readonly startCursor: string
    readonly endCursor: string
}

export interface CursorPaginationVars {
    readonly first?: number
    readonly after?: string
    readonly last?: number
    readonly before?: string
    readonly filter?: Record<string, unknown>
};
