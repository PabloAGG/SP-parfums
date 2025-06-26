
import React from "react";
import "./AlertMsg.css";

const AlertMsg = ({ message, type }) => {
    return (
        <div className={`${type}-message`}>
            <p>{message}</p>
        </div>
    );
}

export default AlertMsg;