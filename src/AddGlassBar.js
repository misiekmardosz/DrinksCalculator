import React, {useState} from "react";

const AddGlassBar = ({glassBar, cancelButton, saveGlassModal, setGlassName, setVolume}) => {
    if (glassBar === false)
        return (
            <>
                <section className={"add--glass"}>
                    <form className={"glass--form"}>
                        <input className={""} placeholder={'Glass Name'} onChange={e => setGlassName(e.target.value)}/>
                        <input className={""} type={"number"} placeholder={'Volume'} onChange={e => setVolume(e.target.value)}/>
                        <button className={"save--btn"} onClick={saveGlassModal}>Save</button>
                        <button className={""} onClick={cancelButton}>Close</button>
                    </form>
                </section>
            </>
        )
    else return <></>
}

export {AddGlassBar}