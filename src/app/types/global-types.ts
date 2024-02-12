import React, {JSX, SetStateAction} from "react";

export type TMatrix = Array<Array<number>>;

export type TRowProps = { children: JSX.Element[] };

export type TPosition = [number, number];

export type TMatrixSetterFunction = React.Dispatch<SetStateAction<TMatrix>>;

export type TArrayPoints = {i: number, j: number};

export type TItemProps = {
    number: number
    position: TPosition,
    onClick: (position: TPosition) => void
};

export type TGetMatrixReturn = {
    matrix: TMatrix | undefined,
    updateMatrix: TMatrixSetterFunction
};

export type TShiftPressArgs = {
    addEvent: boolean,
    onPress: () => void
};
