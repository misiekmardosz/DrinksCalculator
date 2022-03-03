import React, {useState} from "react";


const RecipeDetails = ({recipe, close, deleteRecipe}) => {
    console.log(recipe.ingridients)
    return(
        <>
            <div key={recipe.id} className={"form"}>
                <h2 onClick={close}>{recipe.name}</h2>
                <button key={recipe.id} onClick={deleteRecipe}>Delete Recipe</button>
            </div>
        </>
    )
}

export {RecipeDetails}