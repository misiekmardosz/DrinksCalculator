import React, {useState} from "react";

const AddGlassBar = ({glassBar, cancelButton, glasses, handleGlassDelete, saveGlassModal, setGlassName, setVolume}) => {
    if (glassBar === false)
        return (
            <>
                <section className={"add--glass"}>
                    <form className={"glass--form"}>
                        <input className={""} placeholder={'Glass Name'} onChange={e => setGlassName(e.target.value)}/>
                        <input className={""} type={"number"} placeholder={'Volume in mililiters'} onChange={e => setVolume(e.target.value)}/>
                        <button className={""} onClick={saveGlassModal}>Save</button>
                        <button className={"cancel-btn"} onClick={cancelButton}>Close</button>
                    </form>
                    {/*<h3 className={"my--glasses"}>MY GLASSES</h3>*/}
                    {/*<ul className={"glassList"}>*/}
                    {/*    {glasses.map((glass,index) => (*/}
                    {/*        <li key={index} className={"glassListItem"}>*/}
                    {/*            <button className={"delete--glass"}*/}
                    {/*                    onClick={ (e) => handleGlassDelete(e, glass.id)}>*/}
                    {/*                Del*/}
                    {/*            </button>*/}
                    {/*            {glass.name} {glass.volume}.ml*/}
                    {/*        </li>*/}
                    {/*    ))}*/}
                    {/*</ul>*/}
                </section>
            </>
        )
    else return <></>
}

export {AddGlassBar}