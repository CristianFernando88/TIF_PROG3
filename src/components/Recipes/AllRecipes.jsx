import Recipes from "./Recipes";
import SearchForm from "../Forms/SearchForm";
import { useEffect, useState } from "react";
import useFetch2 from "../../hooks/useFetch2";
export default function AllRecipes(){
    const {data:categories,isLoading:categoriesIsLoading,isError:categoriesIsError,doFetch:doFetchCategories} = useFetch2();
    const {data:ingredients,isLoading:ingredientsIsLoading,isError:ingredientsIsError,doFetch:doFetchIngredients} = useFetch2();

    useEffect(()=>{
        doFetchCategories(`${import.meta.env.VITE_API_BASE_URL}reciperover/categories/?page_size=100`);
        doFetchIngredients(`${import.meta.env.VITE_API_BASE_URL}reciperover/ingredients/?page_size=200`)
    },[]);

    const filtro = [
        {
            key:"title",
            value:"Titulo"
        },
        {
            key:"categories",
            value:"Categoria"
        },
        {
            key:"ingredients",
            value:"Ingrediente"
        },
    ];

    const [filterState,setFilterSate] = useState(null);
    const [urlFilter,setUrlFilter] = useState("");
    
    useEffect(()=>{
        if(filterState && ingredients){
            console.log(filterState);
            switch(filterState.key){
                case "title" : 
                    setUrlFilter(`?${filterState.key}=${filterState.value}`)
                    break;
                case "ingredients" : {
                    let ingredient = ingredients.results.filter((ing)=>ing.name.toLowerCase().includes(filterState.value.toLowerCase()))[0];
                    if(ingredient){
                        setUrlFilter(`?${filterState.key}=${ingredient.id}`)
                    }else{
                        setUrlFilter(`?title=""`)
                    }
                    
                    break;
                }
                    
                case "categories" :
                    {
                        let category = categories.results.filter((cat)=>cat.name.toLowerCase().includes(filterState.value.toLowerCase()))[0];
                        if(category){
                            setUrlFilter(`?${filterState.key}=${category.id}`)
                        }else{
                            setUrlFilter(`?title=""`)
                        }
                        
                        break;
                    }
                
            }
        }
             
    },[filterState,ingredients])
    
  
    const changeStateFilter = (value)=>{
       setFilterSate(value)
    };
    return(
        <div className="my-5 mx-5 ">
            <div className="box has-background-danger-90">
                <h1 className="title">Que estas buscando? </h1>
            </div>
            <div className="box">
                <div className="content">
                    <SearchForm
                    filtros={filtro}
                    stateFilter={changeStateFilter}
                    />
                </div>
                <div>
                    <Recipes
                    urlFilter={urlFilter}
                    />
                </div>   
            </div>
        </div>
    )
}