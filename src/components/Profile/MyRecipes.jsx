import { useEffect, useState } from "react";
import useFetch2 from "../../hooks/useFetch2";
import { useAuth } from "../../context/AuthContext";
import RecipeCard from "../Recipes/RecipeCard";
import { useNavigate } from "react-router-dom";

export default function MyRecipes(){
    const { user__id} = useAuth("state")
    const url = `${import.meta.env.VITE_API_BASE_URL}reciperover/recipes/?page_size=100`;
    const {data,isLoading,isError,doFetch} = useFetch2(url,{});
    const navigate = useNavigate()
    
    const {isDelete:deleteRecipe,isLoading:deleteIsLoading,isError:deleteIsError,doFetch:doFetchDelete} = useFetch2();
    useEffect(()=>{
        doFetch();
    },[]);

    useEffect(()=>{
        if(deleteRecipe){
            doFetch();

        }
    },[deleteRecipe])


    if(isLoading) return (
        <div className="grid">
            <div className="cell is-skeleton">-</div>
            <div className="cell is-skeleton">-</div>
            <div className="cell is-skeleton">-</div>
            <div className="cell is-skeleton">-</div>
        </div>
    );
    
    if(isError) return <p>No se pudieron cargar las recetas</p>;

    if (!data) return <p>No hay recetas disponibles</p>;
    
    return(
        <div className="container box my-5 mx-5">
            <div>
                <h1 className="title is-4">Mis recetas</h1>
            </div>
            <div>
                <button className="button is-success is-right" onClick={()=>navigate(`/my-account/my-recipes/new`)}>
                    <span>Crear Receta</span>
                </button>
            </div>
            
            <hr />
            <div className="columns is-multiline"> 
                {
                    data ? (
                        data.results.filter((recipe)=>recipe.owner==user__id).map((recipe)=>(
                            <div key={recipe.id} className="column is-one-quarter">
                                <RecipeCard
                                recipe={recipe}
                                onDelete={{deleteRecipe,deleteIsLoading,deleteIsError,doFetchDelete}}
                                />
                            </div>
                        ))
                    ) : (null)
                }

            </div>
           
            
        </div>
    )
}