import { useParams } from "react-router-dom"
import Recipes from "../Recipes/Recipes";
import useFetch2 from "../../hooks/useFetch2";
import { useEffect } from "react";

export default function RecipesCategory(){
    const {id} = useParams();
    const filter = `?categories=${id}`
    const {data,isLoading,isError,doFetch} = useFetch2();
    useEffect(()=>{
        doFetch(`${import.meta.env.VITE_API_BASE_URL}reciperover/categories/${id}/`);

    },[id])
    if(isLoading)return <p>Cargando la categoria...</p>
    if(isError)return <p>No se pudo cargar la categoria</p>
    return(
        <div className="container my-5 mx-5">
            {data ? (
                <div>
                    <div className="box has-background-warning-90">
                        <h1 className="title">{data.name}</h1>
                    </div>
                    <Recipes
                        urlFilter={filter} 
                    />
                </div>      
                
            ) : (null)}
        </div>
        
    )
};