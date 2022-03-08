import React, {useState} from "react";
import {Ingredient} from "./models/ingredient";




const RecipeDetails = ({recipe, close, deleteRecipe, glasses, cancel}) => {

    const [newQ, setNewQ] = useState(1)
    const [glass, setGlass] = useState(glasses[0].name)
    const sum = recipe.ingredients.reduce((total, amount) =>
        total + parseInt(amount.quantity), 0);
    const handleChange =(e) => {
        setGlass(e.target.value);
    }
    // const volume = glass.match(/\d/g);
    console.log(glass)

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
            <div className={"container"}>
                <h2> Prepare Your {recipe.name}!</h2>
                <h4>How Many Drinks You want to do?</h4>

                <form key={recipe.id} className={"form"} onSubmit={close}>
                    <input type="number" className={"new-recipe-ing"} placeholder='set Value'onChange={e => drinksQuantity(e.target.value)}/>
                    <h4>What type of Glass You Have?</h4>
                    <select className={"button"} value={glasses} onChange={handleChange}>
                        {glasses.map((glass,index) => (
                            <option>{glass.name} {glass.volume}.ml</option>
                        ))}
                    </select>
                    <h4>You Need</h4>
                    <ul>
                        {recipe.ingredients.map((ingredient,index) => (
                            <li>{ingredient.name} {Math.round(ingredient.quantity*newQ/sum*100)/100}</li>
                        ))}
                    </ul>
                    <h4>Process</h4>
                    <p>{recipe.process}</p>
                    <button className={"cancel--btn"} onClick={cancel}>Cancel</button>
                    <button className={"button"} key={recipe.id} onClick={handleDelete}>Delete Recipe</button>
                </form>


            </div>

        </>
    )
}

export {RecipeDetails}