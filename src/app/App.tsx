import React, {Fragment, JSX, useCallback, useState} from 'react';
import {useGetMatrix} from "./hooks/useGetMatrix";
import {Row} from "./components/Row";
import {Item} from "./components/Item";
import {useMatrixClick} from "./hooks/useMatrixClick";
import {useSpacePress} from "./hooks/useSpacePress";
import {LeeAlgorithm} from "./constants/lee-algorithm";
import "../assets/styles/style.scss";

export default function App(): JSX.Element {
    const [allowClick, setAllowClick] = useState(true);

    const {
        matrix,
        updateMatrix
    } = useGetMatrix();

    const {
        start,
        end,
        onMatrixClick
    } = useMatrixClick(updateMatrix, allowClick);

    const onSpacePress = useCallback(() => {
        if (!end || !matrix) return;
        const leeAlgorithm = new LeeAlgorithm(
            matrix,
            end
        );

        leeAlgorithm.findWay();
        setAllowClick(false);
    }, [matrix, end]);

    const handleReset = useCallback(() => {
        setAllowClick(true);
    }, []);

    useSpacePress({
        addEvent: !!start && !!end,
        onPress: onSpacePress
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
