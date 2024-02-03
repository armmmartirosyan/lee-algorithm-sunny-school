import React, {Fragment, JSX} from 'react';
import {useGetMatrix} from "./hooks/useGetMatrix";
import {Row} from "./components/Row";
import {Item} from "./components/Item";
import {useMatrixClick} from "./hooks/useMatrixClick";
import {useShiftPress} from "./hooks/useShiftPress";
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

    useShiftPress({
        addEvent: !!start && !!end,
        onPress:  () => {
            if (!end || !start || !matrix) return;

        }
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
