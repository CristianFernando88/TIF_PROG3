import { useEffect } from "react";
import useFetch2 from "../../hooks/useFetch2"
import RecipeCard from "./RecipeCard";
import useFetch from "../../hooks/useFetch";

export default function Recipes({urlPath="/reciperover/recipes/?page_size=100"}){
    /* const url = "https://sandbox.academiadevelopers.com/reciperover/recipes/?ordering=-view_count&page_size=10"; */
    const url = `${import.meta.env.VITE_API_BASE_URL}${urlPath}`;
    /* const {data, isLoading, isError, doFetch} = useFetch2(url,{}); */
    const [state,doFetch] = useFetch(url,{});

    useEffect(()=>{
        doFetch();
    },[]);


    if(state.isLoading) return (
        <div className="grid">
            <div className="cell is-skeleton">-</div>
            <div className="cell is-skeleton">-</div>
            <div className="cell is-skeleton">-</div>
            <div className="cell is-skeleton">-</div>
        </div>
    );
    /* console.log(state.data); */
    if(state.isError) return <p>No se pudieron cargar las recetas</p>;

    if (!state.data) return <p>No hay canciones disponibles</p>;
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