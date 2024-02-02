import React, {JSX} from "react";

export type TMatrix = Array<Array<number>>;

export type TGetMatrixReturn = {
    matrix: TMatrix | undefined,
    onChangeMatrix: React.Dispatch<TMatrix | undefined>
};

export type TRowProps = {children: JSX.Element[]};
