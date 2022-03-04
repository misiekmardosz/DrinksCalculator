import React, {useState} from "react";


const RecipeDetails = ({recipe, close, deleteRecipe}) => {

    const [newQ, setNewQ] = useState(0)
    const [sumQ, setSumQ] = useState(0)
    // console.log(recipe.ingredients)
    const handleDelete =()=>{
        deleteRecipe(recipe.id)
        close()
    }
    // const updateSum = (newQuantity) =>{
    //     newQuantity.map
    // }
    const updateIngValue = (index, newQuantity) =>{
        setNewQ((prevState) => newQuantity);
        recipe.ingredients[index].value = newQuantity
    }

    return(
        <>
            <h2>{recipe.name}</h2>
            <form key={recipe.id} className={"form"}>
                {recipe.ingredients.map((ingredient,index) => (
                    <input placeholder={ingredient.name}
                           value={ingredient.value}
                           onChange={e => updateIngValue(index,e.target.value)} />
                ))}
                <button key={recipe.id} onClick={handleDelete}>Delete Recipe</button>
            </form>
            <p>{recipe.process}</p>
        </>
    )
}

export {RecipeDetails}