import { useEffect, useState } from "react";
import useFetch2 from "../../hooks/useFetch2"

export default function Ingredient({idIngredient,idRecipe}){
    
    const {data,isLoading,isError,doFetch} = useFetch2(`${import.meta.env.VITE_API_BASE_URL}reciperover/ingredients/${idIngredient}`);

    const {data:measure,
        isLoading:measureIsLoading,
        isError:measureIsError,
        doFetch:doFetchMeasure} = useFetch2(`${import.meta.env.VITE_API_BASE_URL}/reciperover/measures/`);
    const {
        data: detailsData,
        isLoading: detailsIsLoading,
        isError: detailIsError,
        doFetch: detailFetch,
    } = useFetch2();

    useEffect(()=>{
        doFetch();
        detailFetch(`${import.meta.env.VITE_API_BASE_URL}reciperover/recipe-ingredients/?recipe=${idRecipe}&ingredient=${idIngredient}`,{});
    },[]);

    useEffect(()=>{
        doFetchMeasure();
    },[])


    if(isLoading && detailsIsLoading && measureIsLoading)return null;
    return(
        <li >
            {data && detailsData && measure ? (
                <p>{data.name} {detailsData.results[0].quantity} {measure.filter((m)=>m.key == detailsData.results[0].measure)[0].value}</p>
            ):(null)}
        </li>
    )
}