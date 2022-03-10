import React, {useState} from "react";

const AddGlassBar = ({glassBar}) => {
    if (glassBar === false)
        return (
            <>
                <div>GEnius</div>
            </>
        )
    else return <></>
}

export {AddGlassBar}