import { useContext , useEffect , useState } from "react";
import { CrudContext } from "../../context/CrudContext";
import useFetch2 from "../../hooks/useFetch2";
import DeleteForm from "./DeleteForm";
import { useAuth } from "../../context/AuthContext";
import IngredientModal from "./IngredientModal";

export default function ItemIngredient({ingredient,onDelete,onUpdate}){
    const {newIngredients,setNewIngredients,recipe} = useContext(CrudContext)
    const {token} = useAuth('state');
    const {data,isLoading,isError,doFetch} = useFetch2(`${import.meta.env.VITE_API_BASE_URL}reciperover/ingredients/${ingredient.ingredient}`);
    const [openDeleteModal,setOpenDeleteModal] = useState(false)
    const [openUpdateModal,setOpenUpdateModal] = useState(false)
    const {
        data: detailsData,
        isLoading: detailsIsLoading,
        isError: detailIsError,
        doFetch: detailFetch,
    } = useFetch2();

    const {data:measures,isLoading:isLoadingMeasures,isError:isErrorMeasures,doFetch:measuresFetch} = useFetch2();

    useEffect(()=>{
        doFetch();
    },[]);

    /* useEffect(()=>{
        measuresFetch(`${import.meta.env.VITE_API_BASE_URL}reciperover/measures/`,{});
    },[]) */

    useEffect(()=>{
        detailFetch(`${import.meta.env.VITE_API_BASE_URL}reciperover/recipes/${recipe.id}/ingredients/${ingredient.id}/`,{});
    },[]);

    //variables delete
    const apiUrlDelete = `${import.meta.env.VITE_API_BASE_URL}reciperover/recipes/${recipe.id}/ingredients/${ingredient.id}/`;
    const actionDelete = {
        method: "DELETE",
        headers: {
            Authorization: `Token ${token}`,
        },
    };

    const deleteNewIngrediente = (event)=>{
        event.preventDefault
        
        let lista = newIngredients.filter((ing)=>{
            return ingredient.ingredient.id !== ing.ingredient.id
        });
        console.log(lista);
        setNewIngredients(lista);
        
    }
    if(isLoading || detailsIsLoading)return null;
    if(isError || detailIsError)return null;
    if(!data) return null;
    return(
        <div key={ingredient.id} className="field columns">
            <div className="field column is-two-thirds">
                <div className="control">
                    <input className="input" name="title" type="text" value={`${data.name} ${detailsData.quantity} ${detailsData.measure}`} disabled/>
                </div>
            </div>   
            <div className="field column is-grouped">
                <div className="control">
                    <button className="button is-success is-light" onClick={()=>setOpenUpdateModal(true)}>Editar</button>
                </div>
                <div className="control">
                    <button className="button is-danger is-light" onClick={()=>setOpenDeleteModal(true)}>Eliminar</button>
                </div>
            </div>
            <DeleteForm
                isOpenModal = {openDeleteModal}
                onCloseModal = {()=>setOpenDeleteModal(false)}
                title = {"Quitar Ingredeinte"}
                message = {"Estas seguro/a de eliminar este ingrediente?"}
                onDelete = {onDelete}
                apiUrl = {apiUrlDelete}
                actionApi = {actionDelete} 
            />
            <IngredientModal
                openModal = {openUpdateModal}
                onClose = {()=>setOpenUpdateModal(false)}
                onAction = {onUpdate}
                ingredient = {ingredient}
            />
        </div>
    )
}