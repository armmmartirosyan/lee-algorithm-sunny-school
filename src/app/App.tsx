import React, {Fragment, JSX, useCallback} from 'react';
import {useGetMatrix} from "./hooks/useGetMatrix";
import {Row} from "./components/Row";
import {Item} from "./components/Item";
import {useMatrixClick} from "./hooks/useMatrixClick";
import {useShiftPress} from "./hooks/useShiftPress";
import {LeeAlgorithm} from "./constants/lee-algorithm";
import "../assets/styles/style.scss";

export default function App(): JSX.Element {
    const {
        matrix,
        onChangeMatrix
    } = useGetMatrix();

    const {
        start,
        end,
        onMatrixClick
    } = useMatrixClick(onChangeMatrix);

    const onPressSpace = useCallback(() => {
        if (!end || !matrix) return;
        const leeAlgorithm = new LeeAlgorithm(
            matrix,
            end
        );

        leeAlgorithm.findWay();
    }, [matrix, end, onChangeMatrix]);

    useShiftPress({
        addEvent: !!start && !!end,
        onPress: onPressSpace
    });

    if(!matrix) return (<Fragment/>);

    return (
        <div className="wrapper">
            <div className="box">
                {matrix.map((row, rowIndex) => (
                    <Row key={rowIndex}>
                        {row.map((number, itemIndex) => (
                            <Item
                                key={itemIndex}
                                number={number}
                                onClick={onMatrixClick}
                                position={[rowIndex, itemIndex]}
                            />
                        ))}
                    </Row>
                ))}
            </div>
        </div>
    );
}
