import React, {useEffect, useState} from "react";





const RecipeDetails = ({recipe, close, deleteRecipe}) => {
    const [currentSum,setCurrentSum]=useState(0);
    const [clear,setClear]=useState(false);
    useEffect(()=>{
        document.querySelector('#result').value="";
    },[])

    useEffect(()=>{
        if(clear)
            document.querySelector('#result').value="";
    })

    const Add=(e)=>{
        e.preventDefault();
        if(clear) setClear(false);
        let currentNum=document.querySelector('#num').value
        if(currentNum === '')
            return;
        let sum= currentSum+parseInt(currentNum);
        setCurrentSum(sum);
        document.querySelector('#num').value="";

    }

    const Clear=(e)=>{
        e.preventDefault();
        console.log('sum:', currentSum);
        document.querySelector('form').reset();
        setClear(true);
        setCurrentSum(0);
    }
    return(
      <>
          <div className="new-ing-div">
              <div className="app-title">
                  <h1>{recipe.name}</h1>
              </div>
              <form className={"form"}>
                  <input className={'new-recipe-title'} type="text" id="num" placeholder="enter a number" />

                  <button className={"button"} onClick={Add}>Add</button>
                  <button onClick={Clear}>Clear</button>
                  <input className={"new-recipe-title"} type="text" id="result" value={currentSum}  readOnly />
              </form>
          </div>
      </>
    )
}

export {RecipeDetails}