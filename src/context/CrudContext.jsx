import { createContext, useEffect, useState } from "react";
import useFetch2 from "../hooks/useFetch2";

const CrudContext = createContext({});

function CrudProvider({ children }){
  const url_base = import.meta.env.VITE_API_BASE_URL;
  
  const {data:dataRecipe,isLoading:loadingRecipe,isError:errorRecipe,doFetch:recipeFecth} = useFetch2();
  const {data:detailIngrediente,isLoading:loadingDetailIngredient,isError:errorDetailIngredient,doFetch:detailIngredienteFetch} = useFetch2();
  
  

  //nuevos ingredientes y pasos a agregar
  const [newIngredients,setNewIngredients] = useState([]);
  const [newSteps,setNewSteps] = useState([]);
  const [newCategory,setNewCategory] = useState(false);
  const [recipe,setRecipe] = useState(null);
  const [editMode,setEditMode] = useState(false);
  
  const data = {
    newIngredients,
    setNewIngredients,
    newSteps,
    setNewSteps,
    newCategory,
    setNewCategory,
    recipe,
    setRecipe,
    editMode,
    setEditMode
  }
  /* const stateRecipe = {dataRecipe,loadingRecipe,errorRecipe,recipeFecth} */
  /* const stateCategories = {categories,isLoadingCategries,isErrorCateories,categoriesFetch}; */
  return <CrudContext.Provider value={data}>{children}</CrudContext.Provider>;
};

export { CrudProvider, CrudContext };
/* export default CrudContext; */