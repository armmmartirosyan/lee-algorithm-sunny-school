import {TMatrix, TPosition} from "../types/global-types";

export class LeeAlgorithm{
    private _matrix: TMatrix;
    private _start: TPosition;
    private _end: TPosition;

    constructor(matrix: TMatrix, start: TPosition, end: TPosition) {
        this._matrix = matrix
        this._start = start
        this._end = end
    }

    public findWay(){
        let currentValue = 1;

        while(!this.isFinished()){
            const boxes = this.findBoxes(currentValue);

            boxes.forEach(({i, j}) => {
                this.setNeighbours(i, j, currentValue + 1);
            });

            currentValue++;
        }
    }

    private isFinished(): boolean{

        return false;
    }

    private findBoxes(currentValue: number): any[]{
        return [];
    }

    private setNeighbours(i: number, j: number, currentValue: number){

    }
}
