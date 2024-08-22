import { useContext , useRef, useState, useEffect} from "react";
import { CrudContext } from "../../context/CrudContext";
import useFetch2 from "../../hooks/useFetch2";
import { useAuth } from "../../context/AuthContext";
export default function CategoryFormModal({isOpenModal,onCloseModal,onAddCategory}){
    const {recipe} = useContext(CrudContext);
    const {token} = useAuth('state');
    const refCategory = useRef();
    //para cargar las categorias
    const {data:categories,isLoading:isLoadingCategries,isError:isErrorCateories,doFetch:categoriesFetch} = useFetch2();
    

    //para cargar al iniciar el formulario las opciones de categorias
    useEffect(()=>{
        categoriesFetch(`${import.meta.env.VITE_API_BASE_URL}reciperover/categories/?page_size=100`,{});
    },[]);

    

    const addCategory = (e)=>{
        e.preventDefault();

        if(refCategory.current.value!=""){
            const category = categories.results.filter((cat)=>cat.id == refCategory.current.value)[0];
            console.log(category);

            onAddCategory.newCategoryFetch(`${import.meta.env.VITE_API_BASE_URL}reciperover/recipes/${recipe.id}/categories/`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${token}`,
                },
                body: JSON.stringify({
                        "recipe": recipe.id,
                        "category": refCategory.current.value
                }),
            })
            onCloseModal();
        }else{
            alert("El campo esta vacio");
        }
    }

    
    return(
        
        <>  
            <div className={isOpenModal ? ("modal is-active"):("modal")} >
                    <div className="modal-background" onClick={onCloseModal}></div>
                    <div className="modal-content">
                        <div className="box">
                            <h1 className="title">Asignar Categoria</h1>
                            <div className="content">
                            <form className="field ">   
                                <div className="field">
                                    <label className="label">Categorías</label>
                                    <div className="select is-fullwidth is-multiple ">
                                        <select ref={refCategory} >
                                            <option value={""}></option>
                                            {
                                                categories ? (
                                                    categories.results.map((category)=>(
                                                        <option key={category.id} value={category.id}>{category.name}</option>
                                                    ))
                                                ) :
                                                (null)
                                            }
                                        </select>
                                    </div>
                                </div>
                            </form>
                            </div>
                            <div className="field is-grouped">
                                <div className="field">
                                    <button className="button is-primary" onClick={addCategory}>Aceptar</button>
                                </div>
                                <div className="field">
                                    <button className="button is-danger" onClick={onCloseModal}>Cerrar</button>
                                </div>
                                
                            </div>
                        </div> 
                    </div>
                    <button className="modal-close is-large" aria-label="close" onClick={onCloseModal}></button>
            </div>
        </>
      
    );
        
}