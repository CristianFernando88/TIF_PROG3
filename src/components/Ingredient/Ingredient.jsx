import { useEffect, useState } from "react";
import useFetch2 from "../../hooks/useFetch2"

export default function Ingredient({idIngredient,idRecipe}){
    
    const {data,isLoading,isError,doFetch} = useFetch2(`https://sandbox.academiadevelopers.com/reciperover/ingredients/${idIngredient}`);
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
        detailFetch(`https://sandbox.academiadevelopers.com/reciperover/recipe-ingredients/?recipe=${idRecipe}&ingredient=${idIngredient}`,{});
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