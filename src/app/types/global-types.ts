import React, {JSX, SetStateAction} from "react";

export type TMatrix = Array<Array<number>>;

export type TRowProps = { children: JSX.Element[] };

export type TPosition = [number, number];

export type TMatrixSetterFunction = React.Dispatch<SetStateAction<TMatrix>>;

export type TItemProps = {
    number: number
    position: TPosition,
    onClick: (position: TPosition) => void
};

export type TGetMatrixReturn = {
    matrix: TMatrix | undefined,
    onChangeMatrix: TMatrixSetterFunction
};

export type TShiftPressArgs = {
    addEvent: boolean,
    onPress: () => void
};

export interface IPathFinder {
    end: TPosition,
    start: TPosition,
    matrix: TMatrix,
    onChangeMatrix: TMatrixSetterFunction
}
