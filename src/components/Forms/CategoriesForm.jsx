import { useContext, useEffect, useState } from "react";
import { CrudContext } from "../../context/CrudContext";
import ItemCategory from "./ItemCategory";
import CategoryFormModal from "./CategoryFormModal";
import useFetch2 from "../../hooks/useFetch2";
export default function CategoriesForm(){
    
    const {recipe} = useContext(CrudContext);
    //carga las categorias de la receta
    const {data,isLoading,isError,doFetch} = useFetch2();

    //para hacer crud de las categorias
    const {data:newCategory,isLoading:isLoadingNewCategry,isError:isErrorNewCateory,doFetch:newCategoryFetch} = useFetch2();
    const {isDelete:dataDelete,isLoading:isLoadingDelete,isError:isErrorDelete,doFetch:doFetchDelete} = useFetch2();
    const [isOpenModalCategory,setIsOpenModalCategory] = useState(false);
    

    //si hay receta 
    useEffect(()=>{
        if(recipe){
            
            doFetch(`${import.meta.env.VITE_API_BASE_URL}reciperover/recipes/${recipe.id}/categories/`,{});
        }
    },[recipe])

    useEffect(()=>{
        if(newCategory){
            doFetch(`${import.meta.env.VITE_API_BASE_URL}reciperover/recipes/${recipe.id}/categories/`,{});
        }
        if(dataDelete){
            doFetch(`${import.meta.env.VITE_API_BASE_URL}reciperover/recipes/${recipe.id}/categories/`,{});
        }
    },[newCategory,dataDelete])

    
    if(isLoading)return <p>Cargando categorias...</p>
    if(isError)return <p>Algo salio mal</p>

    
    return(
        <div>
            <div>
                <h1 className="title">Categorias</h1>
                <div className="field">
                    <div className="control">
                        <button className="button is-link is-light" onClick={()=>setIsOpenModalCategory(true)}>Asignar categoria</button>
                    </div>
                </div>
                <div>
                {
                    data ? (
                        data.results.map((category)=>(
                            <ItemCategory
                            key={category.id}
                            category={category}
                            onDelete={{dataDelete,isLoadingDelete,isErrorDelete,doFetchDelete}}
                            />
                            
                        ))
                       
                    ) : (null) 
                }
                </div>
            </div>
            <CategoryFormModal
                isOpenModal={isOpenModalCategory}
                onCloseModal={()=> setIsOpenModalCategory(false)}
                onAddCategory={{newCategory,isLoadingNewCategry,isErrorNewCateory,newCategoryFetch}}
            />
        </div>
    )
}