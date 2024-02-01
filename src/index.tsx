import React from "react";
import ReactDOM from "react-dom/client";

const Some = () => {
    return(
        <div>Something</div>
    )
}

const root =  ReactDOM.createRoot(document.getElementById("root")!);

root.render(<Some/>);