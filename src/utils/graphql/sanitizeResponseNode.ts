import type { Typename } from "../../types.ts";

export function sanitizeResponseNode<TData extends Typename>( obj: TData ) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { __typename, ...rest } = obj;
    return { ...rest };
}
