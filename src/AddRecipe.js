import React from "react";


const AddRecipe =({closeNewModal, recipeBar,
                      cancelButton,
                      setName,ingredients,
                      updateIngredientName,
                      updateIngredientValue,
                      handleAddIng,setProcess})=>{
    if (recipeBar === false)
    return(
        <>
        <section className={"add--recipe"}>
            <form className={"recipe--form"} onSubmit={closeNewModal}>
                <input className={"add--recipe--name"} placeholder={'Drink Name'} onChange={e => setName(e.target.value)}/>
                {ingredients.map((item,index)=>(
                    <div key={index} className={'add--ing'}>
                        <input  className={""}
                                placeholder={`ingredient ${index+1}`}
                                onChange={e => updateIngredientName(index,e.target.value)}
                                value={ingredients[index].name}
                        />
                        <input type={'number'} className={""}
                               placeholder={"quantity"}
                               onChange={e => updateIngredientValue(index,e.target.value)}
                               value={ingredients[index].quantity}
                        />
                    </div>
                ))}
                <button className={""} onClick={handleAddIng}>add</button>
                <textarea className={"add--process"} placeholder={"Type Process"} onChange={e => setProcess(e.target.value)}/>
                <button className={""} type={""}>Save</button>
                <button className={""} onClick={cancelButton}>Cancel</button>

            </form>
        </section>
        </>
    )
    else return <></>
};

export {AddRecipe};