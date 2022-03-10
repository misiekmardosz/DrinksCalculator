import React, {useEffect, useState,} from 'react';
import Modal from 'react-modal';
import {RecipeDetails} from "./RecipeDetails";
import {Ingredient} from "./models/ingredient";
import {Recipe as RecipeModel} from "./models/Recipe"
import {Glass} from "./models/glass";
import '../node_modules/font-awesome/css/font-awesome.min.css';
//uuid

const API_URL = 'http://localhost:3000';

const Recipe = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openedRecipe, setOpenedRecipe] = useState(null);
    const [name, setName] = useState("");
    const [process, setProcess] = useState("");
    const [ingredients, setIngredients] = useState([new Ingredient("",null)]);
    const [newRecipeModalIsOpen, setNewRecipeModalIsOpen] = React.useState(false);
    const [recipeModalIsOpen, setRecipeModalIsOpen] = React.useState(false);
    const [glassModalIsOpen, setGlassModalIsOpen] = React.useState(false);
    const [glasses, setGlasses] = useState([]);
    const [glassName, setGlassName] = useState("")
    const [volume, setVolume] = useState("")

    recipes.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))

    // RECIPE SOURCE//

    useEffect(() => {
        setLoading(true);
        fetch(`${API_URL}/recipes`)
            .then((response) => response.json())
            .then((data) => {
                setRecipes(data);
                setLoading(false);
            });
    }, []);

    const addNewRecipe = () => {
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
                recipe.setId(newRecipe.id)
                setRecipes((prevState) => [...prevState, recipe]);
            });
    };
    const deleteRecipe = (id) => {
        setLoading(true);
        fetch(`${API_URL}/recipes/${id}`, { method: 'DELETE' })
            .then((response) => response.json())
            .then(() => {
                setRecipes((prevState) => prevState.filter((recipe) => recipe.id !== id));
                setLoading(false);
            });
    };


    // GLASS SOURCE//

    useEffect(() => {
        setLoading(true);
        fetch(`${API_URL}/glasses`)
            .then((response) => response.json())
            .then((data) => {
                setGlasses(data);
                setLoading(false);
            });
    }, []);


    const addNewGlass = () => {
        const glass = new Glass(glassName,volume);
        fetch(`${API_URL}/glasses`, {
            method: 'POST',
            body: JSON.stringify(glass),
            headers: {
                'Content-type': 'application/json',
            },
        })
            .then((resp) => resp.json())
            .then((newGlass) => {
                glass.setId(newGlass.id)
                setGlasses((prevState) => [...prevState, glass]);
            });
    };


    const deleteGlass = (id) => {
        //setLoading(true);
        fetch(`${API_URL}/glasses/${id}`, { method: 'DELETE' })
            .then((response) => response.json())
            .then(() => {
                setGlasses((prevState) => prevState.filter((glass) => glass.id !== id));
                setLoading(false);
            });
    };
    const handleGlassDelete =(e, id)=>{
        e.preventDefault()
        deleteGlass(id)
    }

    const handleAddIng = (e) => {
        e.preventDefault()
        const ingredient = new Ingredient("", null);
        setIngredients( prevState => [...prevState, ingredient]);
    }
    function openNewModal() {
        setNewRecipeModalIsOpen(true);
    }

    function closeNewModal(e) {
        e.preventDefault()
        if (name === "") return setNewRecipeModalIsOpen(true)
        addNewRecipe();
        setNewRecipeModalIsOpen(false);
        setIngredients([new Ingredient("",null)])
        setName("")
    }

    function openModal(recipe) {
        setOpenedRecipe(recipe);
        setRecipeModalIsOpen(true);
    }
    function closeModal() {
        setRecipeModalIsOpen(false);
    }
    function openGlassModal(){
        setGlassModalIsOpen(true)
    }
    function saveGlassModal(e){
        e.preventDefault()
        if (glassName === "" || volume==="") return setGlassModalIsOpen(true)
        addNewGlass()
        setGlassName("")
        setVolume("")
    }

    function cancelButton() {
        setNewRecipeModalIsOpen(false);
        setRecipeModalIsOpen(false);
        setGlassModalIsOpen(false)
        setIngredients([new Ingredient("",null)])
        setName("")
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

    if (loading) return <p>Trwa ładowanie...</p>;
    return (
        <>
            <header>
                <h1 className={"app--name"}>DRINKS CALCULATOR</h1>
            </header>
            <section className={"container"}>
                <div className={"recipe"} onClick={openNewModal}>
                    <h2>Add New</h2>
                </div>
                <div className={"recipe"} onClick={openGlassModal}>
                    <h2>Add New Glass</h2>
                </div>
                <h2 className={"app--recipes"}>MY RECIPES</h2>
                {recipes.map((recipe) => (
                    <div key={recipe.id} className={"recipe"} onClick={ () => openModal(recipe)}>
                        <h2>{recipe.name}</h2>
                    </div>
                ))}
                <Modal
                    isOpen={recipeModalIsOpen}
                    onRequestClose={closeModal}
                    ariaHideApp={false}
                    portalClassName={"modal"}
                >
                    <RecipeDetails recipe={openedRecipe} glasses={glasses} open={recipeModalIsOpen} close={closeModal} deleteRecipe={deleteRecipe} cancel={cancelButton}/>
                </Modal>
                <Modal
                    isOpen={glassModalIsOpen}
                    onRequestClose={cancelButton}
                    portalClassName={"modal"}
                    ariaHideApp={false}
                >
                    <section className={"container"}>
                        <form className={"form"}>
                            <input className={"new-recipe-title"} placeholder={'Glass Name'} onChange={e => setGlassName(e.target.value)}/>
                            <input className={"new-glass-title"} type={"number"} placeholder={'Volume in mililiters'} onChange={e => setVolume(e.target.value)}/>
                            <button className={"button"} onClick={saveGlassModal}>Save</button>
                            <button className={"cancel--btn"} onClick={cancelButton}>Close</button>
                        </form>
                        <h3 className={"my--glasses"}>MY GLASSES</h3>
                        <ul className={"glassList"}>
                            {glasses.map((glass,index) => (
                                <li key={index} className={"glassListItem"}>
                                    <button className={"delete--glass"}
                                            onClick={ (e) => handleGlassDelete(e, glass.id)}>
                                        Del
                                    </button>
                                    {glass.name} {glass.volume}.ml
                                </li>
                            ))}
                        </ul>
                    </section>
                </Modal>
                <Modal
                    s
                    isOpen={newRecipeModalIsOpen}
                    onRequestClose={closeNewModal}
                    ariaHideApp={false}
                    portalClassName={"modal"}
                >
                    <section className={"container"}>
                        <form className={"form"} onSubmit={closeNewModal}>
                            <input className={"new-recipe-title"} placeholder={'Drink Name'} onChange={e => setName(e.target.value)}/>
                            {ingredients.map((item,index)=>(
                                <div key={index} className={'new-ing-div'}>
                                    <input  className={"new-recipe-ing"}
                                            placeholder={`ingredient ${index+1}`}
                                            onChange={e => updateIngredientName(index,e.target.value)}
                                            value={ingredients[index].name}
                                    />
                                    <input type={'number'} className={"new-recipe-ing"}
                                           placeholder={"quantity"}
                                           onChange={e => updateIngredientValue(index,e.target.value)}
                                           value={ingredients[index].quantity}
                                    />
                                </div>
                            ))}
                            <button className={"ing--button"} onClick={handleAddIng}>Add ingredient</button>
                            <textarea className={"new-recipe-textarea"} placeholder={"Type Process"} onChange={e => setProcess(e.target.value)}/>
                            <button className={"button"} type={"submit"}>Save</button>
                            <button className={"cancel--btn"} onClick={cancelButton}>Cancel</button>

                        </form>
                    </section>
                </Modal>
            </section>
        </>
    );
}

export { Recipe };

// check on click for recipe to prevent refreshiing