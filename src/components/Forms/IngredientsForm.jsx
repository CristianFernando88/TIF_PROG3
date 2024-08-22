import { useContext, useEffect, useState } from "react";
import { CrudContext } from "../../context/CrudContext";

import IngredientModal from "./IngredientModal";
import ItemIngredient from "./ItemIngredient";
import useFetch2 from "../../hooks/useFetch2";
export default function IngredientsForm(){
    const {newIngredients,recipe} = useContext(CrudContext);
    const [isOpenModalIngredient,setIsOpenModalIngredient] = useState(false);
    //carga los ingredientes de la receta
    const {data,isLoading,isError,doFetch} = useFetch2();

    useEffect(()=>{
        if(recipe){
            doFetch(`${import.meta.env.VITE_API_BASE_URL}reciperover/recipes/${recipe.id}/ingredients/`,{});
        }    
    },[recipe]);
    
    //Fetchs para crud
    const {data:addIngredient,isLoading:isLoadingAdd,isError:isErrorAdd,doFetch:doFetchAdd} = useFetch2();
    const {isDelete:dataDelete,isLoading:isLoadingDelete,isError:isErrorDelete,doFetch:doFetchDelete} = useFetch2();
    const {data:updateIngredient,isLoading:isLoadingUpdate,isError:isErrorUpdate,doFetch:doFetchUpdate} = useFetch2();

    useEffect(()=>{
        if(dataDelete){
            doFetch(`${import.meta.env.VITE_API_BASE_URL}reciperover/recipes/${recipe.id}/ingredients/`,{});
        }
    },[dataDelete])

    useEffect(()=>{
        if(addIngredient || updateIngredient){
            doFetch(`${import.meta.env.VITE_API_BASE_URL}reciperover/recipes/${recipe.id}/ingredients/`,{});
        }
    },[addIngredient,updateIngredient])

    if(isLoading) return <p>Cargando Ingredientes...</p>
    if(isError) return <p>Ah ocurrido un error</p>
    return(
        <div>
            <div>
                <h1 className="title">Ingredientes</h1>
                <div className="field">
                    <div className="control">
                        <button className="button is-link is-light" onClick={()=>setIsOpenModalIngredient(true)}>Agregar ingrediente</button>
                    </div>
                </div>
                <div>
                {
                    data ? (
                        data.results.map((ing)=>(
                            <ItemIngredient key={ing.id} ingredient={ing} 
                            onDelete={{dataDelete,isLoadingDelete,isErrorDelete,doFetchDelete}}
                            onUpdate={{updateIngredient,isLoadingUpdate,isErrorUpdate,doFetchUpdate}}/>
                        ))
                    ) : (null) 
                }
                </div>
            </div>
            
            <IngredientModal
                openModal = {isOpenModalIngredient}
                onClose = {()=>setIsOpenModalIngredient(false)}
                onAction = {{addIngredient,isLoadingAdd,isErrorAdd,doFetchAdd}}
            />
        </div>
    )
}