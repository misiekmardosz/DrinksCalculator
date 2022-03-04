import React from "react";

const RecipeForm = (saveRecipe, modalClose) => {
    const handleSave = () => {
        const recipe = new Recipe();
        saveRecipe(recipe);
        modalClose();
    }
    return (
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
    )
}