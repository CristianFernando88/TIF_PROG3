import { useEffect, useState } from "react";
import useFetch2 from "../../hooks/useFetch2"

export default function Ingredient({idIngredient,idRecipe}){
    
    const {data,isLoading,isError,doFetch} = useFetch2(`${import.meta.env.VITE_API_BASE_URL}reciperover/ingredients/${idIngredient}`);
    const {
        data: detailsData,
        isLoading: detailsIsLoading,
        isError: detailIsError,
        doFetch: detailFetch,
    } = useFetch2();

    useEffect(()=>{
        doFetch();
    },[]);

    useEffect(()=>{
        detailFetch(`${import.meta.env.VITE_API_BASE_URL}reciperover/recipe-ingredients/?recipe=${idRecipe}&ingredient=${idIngredient}`,{});
    },[]);


    if(isLoading && detailsIsLoading)return <p>cargando...</p>
    return(
        <li>
            {data && detailsData ? (
                <p>{data.name} {detailsData.results[0].quantity} {detailsData.results[0].measure}</p>
            ):(null)}
        </li>
    )
}