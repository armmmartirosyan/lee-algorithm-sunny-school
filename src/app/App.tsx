import React, {Fragment, JSX} from 'react';
import "../assets/styles/style.scss";
import {useGetMatrix} from "./hooks/useGetMatrix";
import {Row} from "./components/Row";
import {Item} from "./components/Item";

export default function App(): JSX.Element {
    const matrix = useGetMatrix();

    if(!matrix) return (<Fragment/>);

    return (
        <div className="wrapper">
            <div className="box">
                {matrix.map((row, rowIndex) => (
                    <Row key={rowIndex}>
                        {row.map((_, itemIndex) => (
                            <Item key={itemIndex}/>
                        ))}
                    </Row>
                ))}
            </div>
        </div>
    );
}