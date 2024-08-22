import { useEffect, useState } from "react";
import useFetch2 from "../../hooks/useFetch2";
import useFetch from "../../hooks/useFetch";
import Recipes from "../Recipes/Recipes";
import { useAuth } from "../../context/AuthContext";
import RecipeCard from "../Recipes/RecipeCard";
/* import DeleteForm from "../Forms/DeleteForm"; */

export default function MyRecipes(){
    const { user__id} = useAuth("state")
    const url = `${import.meta.env.VITE_API_BASE_URL}reciperover/recipes/?page_size=100`;
    const {data,isLoading,isError,doFetch} = useFetch2(url,{});
    const [openDeleteForm,setOpenDeleteForm] = useState();
    useEffect(()=>{
        doFetch();
    },[]);


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
            <button className="button is-success is-right">
                <span>Crear Receta</span>
            </button>
            <hr />
            <div className="columns is-multiline"> 
                {
                    data ? (
                        data.results.filter((recipe)=>recipe.owner==user__id).map((recipe)=>(
                            <div key={recipe.id} className="column is-one-quarter">
                                <RecipeCard
                                recipe={recipe}
                                />
                            </div>
                        ))
                    ) : (null)
                }

            </div>
           {/* <DeleteForm title={"Mis recetas"} message={"¿Esta seguro de eliminar esta receta?"}/> */}
            
        </div>
    )
}