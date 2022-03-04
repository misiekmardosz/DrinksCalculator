import React, {useState} from "react";


const RecipeDetails = ({recipe, close, deleteRecipe}) => {
    console.log(recipe.ingredients)
    const handleDelete =()=>{
        deleteRecipe(recipe.id)
        close()
    }
    return(
        <>
            <h2>{recipe.name}</h2>
            <form key={recipe.id} className={"form"}>
                {recipe.ingredients.map((ingriedient) => (
                    <input value={ingriedient.value} />
                ))}
                <button key={recipe.id} onClick={handleDelete}>Delete Recipe</button>
            </form>
        </>
    )
}

export {RecipeDetails}