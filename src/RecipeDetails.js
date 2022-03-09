import React, {useState} from "react";
import Select from "react-select";
import AsyncSelect from 'react-select/async';
import {Ingredient} from "./models/ingredient";


const RecipeDetails = ({recipe, close, deleteRecipe, glasses, cancel}) => {

    const [newQ, setNewQ] = useState(1)
    const [selectedOption, setSelectedOption] = useState({label:'select glass type', value:0});
    const sum = recipe.ingredients.reduce((total, amount) =>
        total + parseInt(amount.quantity), 0);
    const glassesSelector = glasses.map(glass => ({ label: `${glass.name} - ${glass.volume}.ml`, value: glass.volume }));

    const handleDelete =()=>{
        deleteRecipe(recipe.id)
        close()
    }
    const drinksQuantity = (newQuantity) =>{
        const drinksQuantity = [newQuantity];
        setNewQ(drinksQuantity);
    }
    return(
        <>
            <div className={"container"}>
                <h2 className={"recipe--title"}>{recipe.name}</h2>
                <h5 className={"recipe--details--text"}>How Many Drinks You want to do?</h5>

                <form key={recipe.id} className={"form"} onSubmit={close}>
                    <input type="number" className={"new-recipe-ing"} placeholder='set Value'onChange={e => drinksQuantity(e.target.value)}/>
                    <h5 className={"recipe--details--text"}>What type of Glass You Have?</h5>
                    {/*<select className={"button"}>*/}
                    {/*    {glasses.map((glass,index) => (*/}
                    {/*        <option>{glass.name} {glass.volume}.ml</option>*/}
                    {/*    ))}*/}
                    {/*</select>*/}
                    <Select
                        className={"selector"}
                        defaultValue={selectedOption}
                        onChange={setSelectedOption}
                        options={glassesSelector}
                    />
                    <h4 className={"recipe--details--text"}>You Need</h4>
                    <div className={"list"}>
                    <ul className={"process"}>
                        {recipe.ingredients.map((ingredient,index) => (
                            <li>{ingredient.name}</li>
                        ))}
                    </ul>
                        <ul className={"process"}>
                            {recipe.ingredients.map((ingredient,index) => (
                                <li>{Math.round(ingredient.quantity*newQ*selectedOption.value/sum)}.ml</li>
                            ))}
                        </ul>
                    </div>
                    <h4 className={"recipe--details--text"}>Recipe</h4>
                    <div className={"list--process"}>
                        <ul>
                        {recipe.ingredients.map((ingredient,index) => (
                            <li>{ingredient.name}{ingredient.quantity}.ml</li>
                        ))}
                        </ul>
                    </div>
                    <h4 className={"recipe--details--text"}>Recipe</h4>
                    <div className={"list--process"}>
                        <p>{recipe.process}</p>
                    </div>
                    <button className={"button"} onClick={cancel}>Close</button>
                    <button className={"cancel--btn"} key={recipe.id} onClick={handleDelete}>Delete Recipe</button>
                </form>


            </div>

        </>
    )
}

export {RecipeDetails}