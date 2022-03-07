import React, {useState} from "react";
import {Ingredient} from "./models/ingredient";


const glassType = [{
        name: "shot glass",
        size: 40,
    },
    {
        name: "long glass",
        size: 310
    }
]



const RecipeDetails = ({recipe, close, deleteRecipe}) => {

    const [newQ, setNewQ] = useState(1)
    const [glass, setGlass] = useState(glassType[0].name)
    const sum = recipe.ingredients.reduce((total, amount) =>
        total + parseInt(amount.quantity), 0);
    const handleChange =(e) => {
        setGlass(e.target.value);
    }
    const volume = glass.match(/\d/g);
    console.log(volume)

    console.log(sum)
    const handleDelete =()=>{
        deleteRecipe(recipe.id)
        close()
    }
    // const updateSum = (newQuantity) =>{
    //     newQuantity.map
    // }
    const drinksQuantity = (newQuantity) =>{
        const drinksQuantity = [newQuantity];
        setNewQ(drinksQuantity);
    }
    console.log(newQ)
    // console.log(newQ)

    return(
        <>
            <h2> Prepare Your {recipe.name}!</h2>
            <h3>How Many Drinks You want to do?</h3>

            <form key={recipe.id} className={"form"} onSubmit={close}>
                <input type="number" placeholder='set Value'onChange={e => drinksQuantity(e.target.value)}/>
                <h3>What type of Glass You Have?</h3>
                <select value={glass} onChange={handleChange}>
                    {glassType.map((glass,index) => (
                        <option>{glass.name} {glass.size}.ml</option>
                    ))}
                </select>
                <h4>You Need</h4>
                {recipe.ingredients.map((ingredient,index) => (
                    <h5>{ingredient.name} {ingredient.quantity*newQ/sum}</h5>
                ))}
                <button key={recipe.id} onClick={handleDelete}>Delete Recipe</button>
            </form>
            <p>{recipe.process}</p>
        </>
    )
}

export {RecipeDetails}