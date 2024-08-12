import { createContext, useEffect, useState } from "react";
import useFetch2 from "../hooks/useFetch2";

const CrudContext = createContext({});

function CrudProvider({ children }){
  const {data:dataIngredient,isLoading:loadingIngredient,isError:errorIngredient,doFetch:ingredientFecth} = useFetch2();
  const {data:dataRecipe,isLoading:loadingRecipe,isError:errorRecipe,doFetch:recipeFecth} = useFetch2();
  const {data:detailIngrediente,isLoading:loadingDetailIngredient,isError:errorDetailIngredient,doFetch:detailIngredienteFetch} = useFetch2();
  const {data:categories,isLoading:isLoadingCategries,isError:isErrorCateories,doFetch:categoriesFetch} = useFetch2();
  const {data:measures,isLoading:isLoadingMeasures,isError:isErrorMeasures,doFetch:measuresFetch} = useFetch2();

  //nuevos ingredientes a agregar
  const [newIngredients,setNewIngredients] = useState([]);
  const [newSteps,setNewSteps] = useState([]);


  useEffect(()=>{
    categoriesFetch(`${import.meta.env.VITE_API_BASE_URL}reciperover/categories/?page_size=100`,{});
    ingredientFecth(`${import.meta.env.VITE_API_BASE_URL}reciperover/ingredients/?page_size=200`,{});
    
  },[]);

  useEffect(()=>{
    measuresFetch(`${import.meta.env.VITE_API_BASE_URL}reciperover/measures/`,{});
  },[])
  
  const data = {
    newIngredients,
    setNewIngredients,
    categories,
    isLoadingCategries,
    isErrorCateories,
    categoriesFetch,
    dataIngredient,
    measures,
    newSteps,
    setNewSteps
  }
  /* const stateRecipe = {dataRecipe,loadingRecipe,errorRecipe,recipeFecth} */
  /* const stateCategories = {categories,isLoadingCategries,isErrorCateories,categoriesFetch}; */
  return <CrudContext.Provider value={data}>{children}</CrudContext.Provider>;
};

export { CrudProvider, CrudContext };
/* export default CrudContext; */