import CardCategory from "./CardCategory";
import { useEffect, useState } from "react";
function CardCategories({props}){
    const [data,setData] = useState(null);
    const [isError, setIsError] = useState(false);
    const [isLoading,setIsLoading] = useState(true);
    const url = "https://sandbox.academiadevelopers.com/reciperover/categories/?page_size=100";
    useEffect(()=>{
        fetch(url)
        .then((response)=>{
            if(response.ok){
                return response.json();
            }
            throw Error("La peticion no pudo ser realizada");
        })
        .then((data)=>{
            setData(data);
        })
        .catch((e)=>{
            setIsError(true);
        })
        .finally(()=>{
            setIsLoading(false);
        })
    },[url]);

    if(isLoading) return (
        <div className="grid">
            <div className="cell is-skeleton">-</div>
            <div className="cell is-skeleton">-</div>
            <div className="cell is-skeleton">-</div>
            <div className="cell is-skeleton">-</div>
        </div>
    )
    if(isError) return <p>ha ocurrido un error no se pudo realizar la peticion</p>
    return(
        <section className="section is-justify-content-center">
            <h1 className="title has-text-danger">Categorias</h1>
            <div className="grid is-justify-content-center">
                {data.results.map((categoria)=>(
                    (categoria.recipes.length > 0)?(
                        <div key={categoria.id} className="cell">
                            <CardCategory
                            categoria={categoria}
                            />
                        </div>
                    ):(null)
                    
                ))}
            </div> 
        </section>
    )
}
export default CardCategories;