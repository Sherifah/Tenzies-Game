import React from "react";

function Die(props) {

    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "#FFFFFF"
    }

    return (
        <div>
            <div className="dice" style={styles} onClick={props.holdDice}>
                <h2 className="dice-num">{props.value}</h2>
            </div>
        </div>
    )
}

export default Die;
