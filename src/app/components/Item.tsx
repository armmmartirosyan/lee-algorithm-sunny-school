import React, {JSX, useMemo} from 'react';
import {TItemProps} from "../types/global-types";
import {DEFAULT_ITEM, END_ITEM, START_ITEM} from "../constants/global-constants";

export function Item({
                         position,
                         onClick,
                         number
}: TItemProps): JSX.Element {
    const className: string = useMemo(() => {
        if (number === START_ITEM) {
            return "start"
        }

        if (number === END_ITEM) {
            return "end"
        }

        return "";
    }, [number]);

    return (
        <div
            className={`item ${className}`}
            onClick={() => onClick(position)}
        >
            {number > DEFAULT_ITEM && number}
        </div>
    );
}
