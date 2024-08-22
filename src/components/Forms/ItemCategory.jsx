import { useContext, useEffect, useState } from "react";
import { CrudContext } from "../../context/CrudContext";
import useFetch2 from "../../hooks/useFetch2";
import DeleteFormCategory from "./DeleteFormCategory";
import { useAuth } from "../../context/AuthContext";
export default function ItemCategory({category,onDelete}){

    const {data,isLoading,isError,doFetch} = useFetch2();
    
    const [openDeleteModal,setOpenDeleteModal] = useState(false)
    useEffect(()=>{
        doFetch(`${import.meta.env.VITE_API_BASE_URL}reciperover/categories/${category.category}/`,{});
    },[category])

    if(isLoading)return (<div>
        <div className="field column is-two-thirds">
                <div className="control">
                    <input className="input is-skeleton" name="name" type="text" disabled/>
                </div>
                </div>   
                <div className="field column is-grouped">
                    <div className="control">
                        <button className="button is-danger is-skeleton" >
                            Eliminar
                        </button>
                    </div>
                </div>
    </div>)

    if(isError)return <p>No se pudo cargar item</p>


    return(
        data ? (
            <div key={category.id} className="field columns">
                <div className="field column is-two-thirds">
                    <div className="control">
                        <input className="input" name="name" type="text" value={`${data.name}`} disabled/>
                    </div>
                </div>   
                <div className="field column is-grouped">
                    <div className="control">
                        <button className="button is-danger" onClick={()=>setOpenDeleteModal(true)}>
                            Eliminar
                        </button>
                    </div>
                </div>
                <DeleteFormCategory
                    isOpenModal={openDeleteModal}
                    onCloseModal={()=>setOpenDeleteModal(false)}
                    title={"Eliminar de categoria"}
                    message={"Esta seguro que desea quitar la receta de esta categoria?"}
                    onDelete={onDelete}
                    element={category}
                />
            </div> ) : (null)
    )
}