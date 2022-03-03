import React, {useEffect, useState,} from 'react';
import Modal from 'react-modal';
import {RecipeDetails} from "./RecipeDetails";
//uuid

const API_URL = 'http://localhost:3000';

const Recipe = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openedRecipe, setOpenedRecipe] = useState(null);
    const [name, setName] = useState("");
    const [process, setProcess] = useState("");
    const [ingName, setIngName] = useState("");
    const [ingValue, setIngValue] = useState();
    const [ingredients, setIngredients] = useState([]);
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
    const addNewRecipe = () => {
        fetch(`${API_URL}/recipes`, {
            method: 'POST',
            body: JSON.stringify({
                name,
                recipe,
                process,
            }),
            headers: {
                'Content-type': 'application/json',
            },
        })
            .then((resp) => resp.json())
            .then((newRecipes) => {
                setRecipes((prevState) => [...prevState, {name,recipe,process}]);
            });
    };
    console.log(recipe)
    console.log(recipes)
    // console.log(ingValue)
    const handleClickIng = (e) => {
        e.preventDefault()
        setIngredients((preState)=>[...preState,ingName])
        setIngredientsValue((preState)=>[...preState,ingValue])

    }
    function openNewModal() {
        setNewRecipeModalIsOpen(true);
    }


    function closeNewModal(e) {
        e.preventDefault()
        addNewRecipe()
        setIngredients((preState)=>[...preState,ingName, ])
        setIngredientsValue((preState)=>[...preState,ingValue])
        setIngredients((prevState) => [])
        setIngredientsValue((prevState) => [])
        setNewRecipeModalIsOpen(false);
    }
    function openModal(recipe) {
        setOpenedRecipe(recipe);
        setRecipeModalIsOpen(true);
    }
    function closeModal(close) {
        setRecipeModalIsOpen(false);
    }
    // console.log(recipes)

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
                            <div className={'new-ing-div'}>
                                <input className={"new-recipe-title"} placeholder={'ingredient 1'} onChange={e => setIngName(e.target.value)}/>
                                <input type={'number'} className={"new-recipe-title"} placeholder={`quantity`} onChange={e => setIngValue(e.target.value)}/>
                            </div>

                            {ingredients.map((item,index)=>(
                                <div key={index} className={'new-ing-div'}>
                                    <input  className={"new-recipe-title"} placeholder={`ingredient ${index+2}`} onChange={e => setIngName(e.target.value)}/>
                                    <input type={'number'} className={"new-recipe-title"} placeholder={"quantity"} onChange={e => setIngValue(e.target.value)}/>
                                </div>
                            ))}
                            <textarea className={"new-recipe-title"} onChange={e => setProcess(e.target.value)}/>
                            <button className={"button"} onClick={handleClickIng}>Add ingreedient</button>
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