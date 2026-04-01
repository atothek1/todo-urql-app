import type { Node } from "../../types.ts";

type Out<TData> = Omit<TData, "__typename" | "_id"> & { readonly id: string };

export function sanitizeResponseDto<TData extends Node>( obj: TData ): Out<TData> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { __typename, _id, ...rest } = obj;
    return { ...rest, id: _id };
}
