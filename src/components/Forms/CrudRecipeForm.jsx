import { useContext, useEffect, useRef, useState } from "react"
import useFetch2 from "../../hooks/useFetch2";
import {useAuth} from "../../context/AuthContext"
import {CrudContext} from "../../context/CrudContext";
import IngredientsForm from "./IngredientsForm";
import StepsForm from "./StepsForm";
import StepsFormModal from "./StepsModal";
import { useParams } from "react-router-dom";
import CategoriesForm from "./CategoriesForm";
import RecipeForm from "./RecipeForm";
import { Link } from "react-router-dom";

export default function CrudRecipeForm(){
    const { recipe , setRecipe} = useContext(CrudContext);
    /* const [recipe , setRecipe] = useState(null); */
    const {id} = useParams();
    const {data,isLoading,isError,doFetch} = useFetch2();

    //si exite el id traemos la receta
    useEffect(()=>{
        if(id){
            doFetch(`${import.meta.env.VITE_API_BASE_URL}reciperover/recipes/${id}/`);   
        }
    },[])

    //almacenamos la receta en el contexto
    useEffect(()=>{
        if(data){
            setRecipe(data);
        }
    },[data])
    
    return(        
        
        <div className="container my-5 mx-5">
            {recipe ? (
                <div>
                    <nav className="breadcrumb has-arrow-separator" aria-label="breadcrumbs">
                        <ul>
                            <li><Link to="/my-account/my-recipes">Mis recetas</Link></li>
                            <li><Link to="#">editar</Link></li>
                            
                        </ul>
                    </nav>
                    <div className="box has-background-link-70">
                        <h2 className="title">Editar receta</h2>
                    </div>
                </div>
                

            ) : (
                <div>
                    <nav className="breadcrumb has-arrow-separator" aria-label="breadcrumbs">
                        <ul>
                            <li><Link to="/my-account/my-recipes">Mis recetas</Link></li>
                            <li><Link to="#">nuevo</Link></li>
                            
                        </ul>
                    </nav>
                    <div className="box has-background-primary-70">
                        <h2 className="title">Crea tu propia receta</h2>
                    </div>
                </div>
                
            )}
            
            <div className="box">
                <RecipeForm 
                recipe={data}
                />
            </div>

            <div className={recipe ? ("box") : ("box is-hidden")}>
                <CategoriesForm/>
            </div>
  
            <div className={recipe ? ("box") : ("box is-hidden")}>
                <IngredientsForm/>
            </div>
            
            <div className={recipe ? ("box") : ("box is-hidden")}>
                <StepsForm/>
            </div>
        
        </div>
            
            
    )
}