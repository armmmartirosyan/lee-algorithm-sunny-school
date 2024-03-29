import {useCallback, useState} from 'react';
import {TMatrix, TMatrixSetterFunction, TPosition} from "../types/global-types";
import {END_ITEM, START_ITEM, WALL_ITEM} from "../constants/global-constants";

export function useMatrixClick(onChangeMatrix:  TMatrixSetterFunction, allowClick: boolean) {
    const [start, setStart] = useState<TPosition>();
    const [end, setEnd] = useState<TPosition>();

    const handleClick = useCallback(([row, column]: TPosition) => {
        if (!start) {
            setStart([row, column]);

            onChangeMatrix((prevMatrix: TMatrix) => {
                const newMatrix = [...prevMatrix];
                newMatrix[row][column] = START_ITEM;

                return newMatrix;
            })
            return;
        }

        if (!end && !(start && start[0] === row && start[1] === column)) {
            setEnd([row, column]);

            onChangeMatrix((prevMatrix: TMatrix) => {
                const newMatrix = [...prevMatrix];
                newMatrix[row][column] = END_ITEM;

                return newMatrix;
            })
        }

        if (start && end && allowClick) {
            onChangeMatrix((prevMatrix: TMatrix) => {
                const newMatrix = [...prevMatrix];
                newMatrix[row][column] = WALL_ITEM;

                return newMatrix;
            });
        }
    }, [onChangeMatrix, start, end, allowClick]);

    return {
        start,
        end,
        onMatrixClick: handleClick
    }
}
