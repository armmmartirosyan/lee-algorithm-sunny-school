import {IPathFinder, TMatrix, TMatrixSetterFunction, TPosition} from "../types/global-types";
import {DEFAULT_ITEM, STAR_ITEM, WAY_START_ITEM} from "./global-constants";

export class PathFinder{
    private readonly end: TPosition;
    private readonly start: TPosition;
    private readonly onChangeMatrix: TMatrixSetterFunction;
    private readonly wayNumber = WAY_START_ITEM;
    private matrix: TMatrix;

    constructor({
                    end,
                    start,
                    matrix,
                    onChangeMatrix
                } : IPathFinder) {
        this.end = end;
        this.start = start;
        this.matrix = matrix;
        this.onChangeMatrix = onChangeMatrix;
    }

    public find() {
        this.leeAlgorithm({
            tempPosition: [...this.start],
            newNumber: this.wayNumber,
            matrix: this.matrix,
            end: this.end,
        });
    }

    public leeAlgorithm({
                         tempPosition,
                         end,
                         matrix,
                         newNumber
    }: {
        tempPosition: TPosition,
        end: TPosition,
        matrix: TMatrix,
        newNumber: number,
    }) {
        console.log({tempPosition, matrix, newNumber});

        if (this.isReachedEnd({position: tempPosition, end})) {
            // todo finish
            console.log("finish");
            return;
        }

        if ( !this.canMove({position: tempPosition, matrix}) ) {
            console.log("can't move");
            return;
        }

        let siblings = this.getSiblings({
            position: tempPosition,
            matrix,
            end
        });

        siblings.forEach(sibling => {
            const [i, j] = sibling;
            const matrixItem = matrix[i][j];

            if (matrixItem === STAR_ITEM || matrixItem > DEFAULT_ITEM) {
                console.log("not 0");
                return;
            }

            matrix[i][j] = newNumber;

            this.updateMatrix(matrix);
        });
    }

    private updateMatrix (newMatrix: TMatrix) {
        this.onChangeMatrix(newMatrix);
        this.matrix = newMatrix;
    }

    private getRight(position: TPosition): TPosition{
        return [position[0], position[1] + 1];
    }

    private getLeft(position: TPosition): TPosition{
        return [position[0], position[1] - 1];
    }

    private getTop(position: TPosition): TPosition{
        return [position[0] - 1, position[1]];
    }

    private getBottom(position: TPosition): TPosition{
        return [position[0] + 1, position[1]];
    }

    private getSiblings ({position, matrix, end}: {position: TPosition, matrix: TMatrix, end: TPosition}): TPosition[] {
        const siblings:TPosition[] = [];

        if (
            !this.isReachedRightBorder({matrix, position})  &&
            !this.theEndIsAtRight({position, end})
        ) {
            siblings.push(this.getRight(position))
        }

        if (
            !this.isReachedLeftBorder(position) &&
            !this.theEndIsAtLeft({position, end})
        ) {
            siblings.push(this.getLeft(position))
        }

        if (
            !this.isReachedTopBorder(position) &&
            !this.theEndIsAtTop({position, end})
        ) {
            siblings.push(this.getTop(position))
        }

        if (
            !this.isReachedBottomBorder({matrix, position}) &&
            !this.theEndIsAtBottom({position, end})
        ) {
            siblings.push(this.getBottom(position))
        }

        return siblings;
    }

    private isReachedRightBorder({matrix, position}: {matrix: TMatrix, position: TPosition}): boolean {
        return position[1] === matrix[0].length - 1;
    }

    private isReachedLeftBorder(position: TPosition): boolean {
        return position[1] === 0;
    }

    private isReachedTopBorder(position: TPosition): boolean {
        return position[0] === 0;
    }

    private isReachedBottomBorder({matrix, position}: {matrix: TMatrix, position: TPosition}): boolean {
        return position[0] === matrix.length - 1;
    }

    private theEndIsAtRight({position, end}: {position: TPosition, end: TPosition}): boolean{
        return position[0] === end[0] && position[1] + 1 === end[1]
    }

    private theEndIsAtLeft({position, end}: {position: TPosition, end: TPosition}): boolean{
        return position[0] === end[0] && position[1] - 1 === end[1]
    }

    private theEndIsAtTop({position, end}: {position: TPosition, end: TPosition}): boolean{
        return position[0] - 1 === end[0] && position[1] === end[1]
    }

    private theEndIsAtBottom({position, end}: {position: TPosition, end: TPosition}): boolean{
        return position[0] + 1 === end[0] && position[1] === end[1]
    }

    private isReachedEnd({position, end}: {position: TPosition, end: TPosition}): boolean{
        return (
            (
                (
                    position[0] - 1 ===  end[0] ||
                    position[0] + 1 ===  end[0]
                ) &&  position[1] === end[1]
            ) ||
            (
                (
                    position[1] - 1 ===  end[1] ||
                    position[1] + 1 ===  end[1]
                ) &&  position[0] === end[0]
            )
        );
    }

    private canMove({position, matrix}: {position: TPosition, matrix: TMatrix}) {
        return (
            !this.isReachedLeftBorder(position) ||
            !this.isReachedTopBorder(position) ||
            !this.isReachedRightBorder({matrix, position}) ||
            !this.isReachedBottomBorder({matrix, position})
        )
    }
}
