import React, {JSX} from 'react';
import {TRowProps} from "../types/global-types";

export function Row({children}: TRowProps): JSX.Element {
    return (
        <div className="row">
            {children}
        </div>
    );
}