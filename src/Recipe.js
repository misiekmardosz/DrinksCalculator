import React, {useEffect, useState,} from 'react';
import Modal from 'react-modal';
import {RecipeDetails} from "./RecipeDetails";
import {Ingredient} from "./models/ingredient";
import {Recipe as RecipeModel} from "./models/Recipe"
//uuid

const API_URL = 'http://localhost:3000';

const Recipe = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openedRecipe, setOpenedRecipe] = useState(null);
    const [name, setName] = useState("");
    const [process, setProcess] = useState("");
    const [ingredients, setIngredients] = useState([new Ingredient("","")]);
    const [ingredientsValue, setIngredientsValue] = useState([]);
    const [newRecipeModalIsOpen, setNewRecipeModalIsOpen] = React.useState(false);
    const [recipeModalIsOpen, setRecipeModalIsOpen] = React.useState(false);

    useEffect(() => {
        setLoading(true);
        fetch(`${API_URL}/recipes`)
            .then((response) => response.json())
            .then((data) => {
                setRecipes(data);
                setLoading(false);
            });
    }, []);

    const deleteRecipe = (id) => {
        setLoading(true);
        fetch(`${API_URL}/recipes/${id}`, { method: 'DELETE' })
            .then((response) => response.json())
            .then(() => {
                setRecipes((prevState) => prevState.filter((recipe) => recipe.id !== id));
                setLoading(false);
            });
    };
    const recipe =  ingredientsValue.reduce(function(recipe, field, index) {
        recipe[ingredients[index]] = field;
        return recipe;
    }, {})
    // const addNewRecipe = (recipe) => {
     const addNewRecipe = () => {
       // TODO :: to remove after moving fomr to seperate compoenent
        const recipe = new RecipeModel( name, ingredients, process);
        fetch(`${API_URL}/recipes`, {
            method: 'POST',
            body: JSON.stringify(recipe),
            headers: {
                'Content-type': 'application/json',
            },
        })
            .then((resp) => resp.json())
            .then((newRecipe) => {
                console.log(newRecipe);
                recipe.setId(newRecipe.id)
                setRecipes((prevState) => [...prevState, recipe]);
            });
    };
    const handleClickIng = (e) => {
        e.preventDefault()
        const ingredient = new Ingredient("", "");
        setIngredients( prevState => [...prevState, ingredient]);
    }
    function openNewModal() {
        setNewRecipeModalIsOpen(true);
    }

    function closeNewModal(e) {
        e.preventDefault()
        addNewRecipe();
        setNewRecipeModalIsOpen(false);
    }
    function openModal(recipe) {
        setOpenedRecipe(recipe);
        setRecipeModalIsOpen(true);
    }
    function closeModal(close) {
        setRecipeModalIsOpen(false);
    }
    const updateIngredientName = (index, newName) => {
        const updatedIngredients = [...ingredients];
        updatedIngredients[index].name=newName;
        setIngredients(updatedIngredients)
    }
    const updateIngredientValue = (index, newQuantity) =>{
        const updatedIngredients = [...ingredients];
        updatedIngredients[index].quantity= newQuantity;
        setIngredients(updatedIngredients);
    }
    // console.log(ingredients);

    if (loading) return <p>Trwa ładowanie...</p>;
    if (recipe.length === 0) return null;
    return (
        <>
            <section className={"container"}>
                <div className={"recipe"} onClick={openNewModal}>
                    <h1>Add New</h1>
                </div>
                {recipes.map((recipe) => (
                    <div key={recipe.id} className={"recipe"} onClick={ () => openModal(recipe)}>
                        <h2>{recipe.name}</h2>
                    </div>
                ))}
                <Modal
                    isOpen={recipeModalIsOpen}
                    onRequestClose={closeModal}
                    ariaHideApp={false}
                >
                    <RecipeDetails recipes={recipes} recipe={openedRecipe} open={recipeModalIsOpen} close={closeModal} deleteRecipe={deleteRecipe}/>
                </Modal>
                <Modal
                    isOpen={newRecipeModalIsOpen}
                    onRequestClose={closeNewModal}
                    ariaHideApp={false}
                >
                    <section className={"container"}>
                        <form className={"form"} onSubmit={closeNewModal}>
                            <input className={"new-recipe-title"} placeholder={'Drink Name'} onChange={e => setName(e.target.value)}/>
                            {ingredients.map((item,index)=>(
                                <div key={index} className={'new-ing-div'}>
                                    <input  className={"new-recipe-title"}
                                            placeholder={`ingredient ${index+1}`}
                                            onChange={e => updateIngredientName(index,e.target.value)}
                                            value={ingredients[index].name}
                                    />
                                    <input type={'number'} className={"new-recipe-title"}
                                           placeholder={"quantity"}
                                           onChange={e => updateIngredientValue(index,e.target.value)}
                                           value={ingredients[index].quantity}
                                    />
                                </div>
                            ))}
                            <textarea className={"new-recipe-title"} onChange={e => setProcess(e.target.value)}/>
                            <button className={"button"} onClick={handleClickIng}>Add ingredient</button>
                            <button className={"button"} type={"submit"}>Save</button>

                        </form>
                    </section>
                </Modal>
            </section>
        </>
    );
}

export { Recipe };

// check on click for recipe to prevent refreshiing