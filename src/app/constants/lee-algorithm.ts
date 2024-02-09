import {TArrayPoints, TMatrix, TPosition} from "../types/global-types";
import {DEFAULT_ITEM, START_ITEM, WAY_ITEM} from "./global-constants";

export class LeeAlgorithm {
    private  _matrix: TMatrix;
    private readonly _end: TPosition;
    private readonly _i: number;
    private readonly _j: number;

    constructor(matrix: TMatrix, end: TPosition) {
        this._j = matrix[0].length
        this._i = matrix.length
        this._matrix = matrix
        this._end = end
    }

    public findWay(): void {
        let currentValue = START_ITEM;

        while (!this.isFinished() && !this.isNoWays()) {
            const boxes = this.findBoxes(currentValue);

            boxes.forEach(({i, j}) => {
                this.setNeighbours(i, j, currentValue + 1);
            });

            currentValue++;
        }

        const wayPoints =  this.findTheShortestWay(currentValue);
        this.fillTheWay(wayPoints);
    }

    private fillTheWay(wayPoints: TPosition[]): void {
        const newMatrix = [...this._matrix];

        wayPoints.forEach(([i, j]) => {
            newMatrix[i][j] = WAY_ITEM;
        });

        this._matrix = newMatrix;
    }

    private isFinished(): boolean {
        const [i, j] = this._end;

        return (
            i > 0 && this._matrix[i - 1][j] !== 0 ||
            i < this._i - 1 && this._matrix[i + 1][j] !== 0 ||
            j > 0 && this._matrix[i][j - 1] !== 0 ||
            j < this._j - 1 && this._matrix[i][j + 1] !== 0
        );
    }

    private isNoWays(): boolean {
        for (let i = 0; i < this._i; i++) {
            for (let j = 0; j < this._j; j++) {
                if (this._matrix[i][j] === DEFAULT_ITEM) {
                    return false;
                }
            }
        }

        return true;
    }

    private findBoxes(value: number): TArrayPoints[] {
        const boxes = [];

        for (let i = 0; i < this._i; i++) {
            for (let j = 0; j < this._j; j++) {
                if (this._matrix[i][j] === value) {
                    boxes.push({i, j});
                }
            }
        }

        return boxes;
    }

    private setNeighbours(i: number, j: number, currentValue: number): void {
        if (j > 0 && this._matrix[i][j - 1] === 0) {
            this._matrix[i][j - 1] = currentValue
        }

        if (j + 1 < this._j && this._matrix[i][j + 1] === 0) {
            this._matrix[i][j + 1] = currentValue
        }

        if (i + 1 < this._i && this._matrix[i + 1][j] === 0) {
            this._matrix[i + 1][j] = currentValue
        }

        if (i > 0 && this._matrix[i - 1][j] === 0) {
            this._matrix[i - 1][j] = currentValue
        }
    }

    private findTheShortestWay(theLastValue: number): TPosition[] {
        const [i, j] = this._end;
        const shortestPath: TPosition[] = [];
        let tempValue = theLastValue;
        let temp: TPosition;

        if(j > 0 && (this._matrix[i][j - 1] === theLastValue)) {
            shortestPath.push([i, j - 1]);
            temp = [i, j - 1];
        }else if(i > 0 && (this._matrix[i - 1][j] === theLastValue)) {
            shortestPath.push([i - 1, j]);
            temp = [i - 1, j];
        }else if(i + 1 < this._i && (this._matrix[i + 1][j] === theLastValue)) {
            shortestPath.push([i + 1, j]);
            temp = [i + 1, j];
        }else if(j + 1 < this._j && (this._matrix[i][j + 1] === theLastValue)) {
            shortestPath.push([i, j + 1]);
            temp = [i, j + 1];
        }

        while (tempValue > 1){
            const [i, j] = temp!;
            if (j > 0 && (this._matrix[i][j - 1] === this._matrix[i][j] - 1)) {
                temp = [i, j - 1];
                shortestPath.push([i, j - 1]);
                tempValue--;
                continue;
            }

            if (j + 1 < this._j && (this._matrix[i][j + 1] === this._matrix[i][j] - 1)) {
                temp = [i, j + 1];
                shortestPath.push([i, j + 1]);
                tempValue--;
                continue;
            }

            if (i + 1 < this._i && (this._matrix[i + 1][j] === this._matrix[i][j] - 1)) {
                temp = [i + 1, j];
                shortestPath.push([i + 1, j]);
                tempValue--;
                continue;
            }

            if (i - 1 < this._i && (this._matrix[i - 1][j] === this._matrix[i][j] - 1)) {
                temp = [i - 1, j];
                shortestPath.push([i - 1, j]);
                tempValue--;
            }
        }

        shortestPath.push(this._end);

        return shortestPath;
    }
}
