import { useEffect } from "react";
import useFetch2 from "../../hooks/useFetch2"
import RecipeCard from "./RecipeCard";
import useFetch from "../../hooks/useFetch";

export default function Recipes({urlFilter="?page_size=100"}){
    const url = `${import.meta.env.VITE_API_BASE_URL}/reciperover/recipes/${urlFilter}`;
    const [state,doFetch] = useFetch(url,{});

    useEffect(()=>{
        doFetch();
    },[urlFilter]);


    if(state.isLoading) return (
        <div className="grid">
            <div className="cell is-skeleton">-</div>
            <div className="cell is-skeleton">-</div>
            <div className="cell is-skeleton">-</div>
            <div className="cell is-skeleton">-</div>
        </div>
    );
    if(state.isError) return <p>No se pudieron cargar las recetas</p>;
    if (state.data.results.length==0) return <p>No hay recetas disponibles</p>;
    return(
            <div className="columns is-multiline">
                {state.data.results.map((recipe)=>(
                        <div key={recipe.id} className="column is-one-quarter">
                            <RecipeCard
                                recipe={recipe}
                            />
                        </div>
                    ))}
            </div>
        
    )
}