import {useEffect, useMemo, useState} from 'react';
import {
    DEFAULT_COLUMNS_COUNT,
    DEFAULT_ROWS_COUNT,
    MAXIMUM_COLUMNS_COUNT,
    MAXIMUM_ROWS_COUNT, MINIMUM_COLUMNS_COUNT, MINIMUM_ROWS_COUNT
} from "../constants/global-constants";
import type {TGetMatrixReturn, TMatrix} from "../types/global-types";

export function useGetMatrix(): TGetMatrixReturn {
    const [rows, setRows] = useState(DEFAULT_ROWS_COUNT);
    const [columns, setColumns] = useState(DEFAULT_COLUMNS_COUNT);

    useEffect(() => {
        if (!rows) {
            const rowsPrompt = prompt(`Please enter rows count. (<= ${MAXIMUM_ROWS_COUNT})`);
            let rowsCount = rowsPrompt ? +rowsPrompt || DEFAULT_ROWS_COUNT : DEFAULT_ROWS_COUNT;

            if (rowsCount < MINIMUM_ROWS_COUNT) rowsCount = MINIMUM_ROWS_COUNT;
            if (rowsCount > MAXIMUM_ROWS_COUNT) rowsCount = MAXIMUM_ROWS_COUNT;

            setRows(rowsCount);
        }

        if (!columns) {
            const columnsPrompt = prompt(`Please enter columns count. (<= ${MAXIMUM_COLUMNS_COUNT})`);
            let columnsCount = columnsPrompt ? +columnsPrompt || DEFAULT_COLUMNS_COUNT : DEFAULT_COLUMNS_COUNT;

            if (columnsCount < MINIMUM_COLUMNS_COUNT) columnsCount = MINIMUM_COLUMNS_COUNT;
            if (columnsCount > MAXIMUM_COLUMNS_COUNT) columnsCount = MAXIMUM_COLUMNS_COUNT;

            setColumns(columnsCount);
        }
    }, []);

    return useMemo((): TGetMatrixReturn => {
        if (!rows || !columns) {
            setRows(DEFAULT_ROWS_COUNT);
            setColumns(DEFAULT_COLUMNS_COUNT);
            return undefined;
        }

        let matrix: TMatrix = [];

        for (let i = 0; i < rows; i++) {
            matrix[i] = [];

            for (let j = 0; j < columns; j++) {
                matrix[i][j] = 0;
            }
        }

        return matrix;
    }, [rows, columns]);
}