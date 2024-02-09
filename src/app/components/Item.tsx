import React, {JSX, useMemo} from 'react';
import {TItemProps} from "../types/global-types";
import {END_ITEM, START_ITEM, WALL_ITEM, WAY_ITEM} from "../constants/global-constants";

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

        if (number === WAY_ITEM) {
            return "way"
        }

        if (number === WALL_ITEM) {
            return "wall"
        }

        return "";
    }, [number]);

    return (
        <div
            className={`item ${className}`}
            onClick={() => onClick(position)}
        />
    );
}
