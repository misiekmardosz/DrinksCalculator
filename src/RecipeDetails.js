import React, {useState} from "react";
import Select from "react-select";

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
                    <Select
                        className={"selector"}
                        defaultValue={selectedOption}
                        onChange={setSelectedOption}
                        options={glassesSelector}
                    />

                    <div className={"recipe--details--table"}>

                        <div className={"list"}>
                            <h4 className={"recipe--details--text"}>Recipe for One Drink</h4>
                            <ul className={"process"}>
                                {recipe.ingredients.map((ingredient,index) => (
                                    <li>{ingredient.name}</li>
                                ))}
                            </ul>
                            <ul>
                                {recipe.ingredients.map((ingredient,index) => (
                                    <li>{Math.round(ingredient.quantity*selectedOption.value/sum)}.ml</li>
                                ))}
                            </ul>
                        </div>

                        <div className={"list"}>
                            <h4 className={"recipe--details--text"}>You Need</h4>
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
                    </div>


                    <h4 className={"recipe--details--text"}>Process</h4>
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