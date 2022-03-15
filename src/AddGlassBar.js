import React, {useState} from "react";
import {faCancel, faClose, faSave, faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const AddGlassBar = ({glassBar, cancelButton, saveGlassModal, setGlassName, setVolume}) => {
    if (glassBar === false)
        return (
            <>
                <section className={"add--glass"}>
                    <form className={"glass--form"}>
                        <input className={""} placeholder={'Glass Name'} onChange={e => setGlassName(e.target.value)}/>
                        <input className={""} type={"number"} placeholder={'Volume'} onChange={e => setVolume(e.target.value)}/>
                        <button className={"button"} onClick={saveGlassModal}><FontAwesomeIcon icon={faSave}/></button>
                    </form>
                </section>
            </>
        )
    else return <></>
}

export {AddGlassBar}