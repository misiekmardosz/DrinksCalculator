import React, {useState} from "react";
import Select from "react-select";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

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
    const colourStyles = {
        control: styles => ({ ...styles, background: 'none', color: "white" }),
        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
            return {
                ...styles,
                backgroundColor: isDisabled ? 'red' : "#269dbe",
                color: '#FFF',
                cursor: isDisabled ? 'not-allowed' : 'default',
            };
        },
    };
    return(
        <>
            <div className={"container"}>
                <h2 key={recipe.id} className={"recipe--title"}>{recipe.name}</h2>
                <form key={recipe.id} className={"form"} onSubmit={close}>
                    <Select
                        defaultValue={selectedOption}
                        onChange={setSelectedOption}
                        options={glassesSelector}
                        styles={colourStyles}
                    />
                    <div className={"recipe--selectors"}>
                        <h5 className={"recipe--details--text"}>how many drinks?</h5>
                        <input type="number" max="99" className={"new-recipe-ing"} placeholder='0'onChange={e => drinksQuantity(e.target.value)}/>
                    </div>

                    <h5 className={"recipe--details--text"}>Recipe</h5>
                    <div className={"recipe--details--table"}>


                        <div className={"list"}>
                            <h4 className={"recipe--details--text"}>For One</h4>
                            <div className={"list--item"}>
                            <ul className={"process"}>
                                {recipe.ingredients.map((ingredient,index) => (
                                    <li key={recipe.id}>{ingredient.name}</li>
                                ))}
                            </ul>
                            <ul>
                                {recipe.ingredients.map((ingredient,index) => (
                                    <li key={recipe.id}>{Math.round(ingredient.quantity*selectedOption.value/sum)}.ml</li>
                                ))}
                            </ul>
                            </div>
                        </div>
                        <div className={"list"}>
                            <h4 className={"recipe--details--text"}>For All</h4>
                            <div className={"list--item"}>
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
                    </div>


                    <h4 className={"recipe--details--text"}>Process</h4>
                    <div className={"list--process"}>
                        <p>{recipe.process}</p>
                    </div>
                </form>
            </div>
            <div className={"div--button"}>
                <button className={"cancel--btn"} key={recipe.id} onClick={handleDelete}><FontAwesomeIcon icon={faTrash}/></button>
            </div>
        </>
    )
}

export {RecipeDetails}