import React, {useEffect, useState} from "react";
import {Glass} from "./models/glass";
import {Ingredient} from "./models/ingredient";

const API_URL = 'http://localhost:3000';

const GlassDetails = ({glass, openGlass, addGlass,})=>{
    const [loading, setLoading] = useState(false);
    const [glasses, setGlasses] = useState([new Glass("",null)]);
    const [glassName, setGlassName] = useState("")
    const [volume, setVolume] = useState("")

    useEffect(() => {
        setLoading(true);
        fetch(`${API_URL}/glasses`)
            .then((response) => response.json())
            .then((data) => {
                setGlasses(data);
                setLoading(false);
            });
    }, []);
    const addNewGlass = (addGlass) => {
        // TODO :: to remove after moving fomr to seperate compoenent
        const glass = new Glass(glassName,volume);
        fetch(`${API_URL}/glasses`, {
            method: 'POST',
            body: JSON.stringify(glass),
            headers: {
                'Content-type': 'application/json',
            },
        })
            .then((resp) => resp.json())
            .then((newGlass) => {
                console.log(newGlass);
                glass.setId(newGlass.id)
                setGlasses((prevState) => [...prevState, glass]);
            });
    };
    return(
        <>
            <div>
                <form className={"form"} onSubmit={openGlass}>
                <input className={"new-recipe-title"} placeholder={'Glass Name'} onChange={e => setGlassName(e.target.value)}/>
                <input className={"new-recipe-title"} placeholder={'Volume'} onChange={e => setVolume(e.target.value)}/>
                </form>
            </div>
        </>
    )
}

export {GlassDetails}