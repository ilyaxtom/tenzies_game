import React from "react";

function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "#FFFFFF"
    }

    return (
        <div onClick={props.holdDice} style={styles} className="Die">
            {props.value}
        </div>
    )
}

export default Die;