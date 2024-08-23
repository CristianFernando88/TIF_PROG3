import { useContext, useState } from "react";
import { CrudContext } from "../../context/CrudContext";
import DeleteForm from "./DeleteForm";
import { useAuth } from "../../context/AuthContext";
import StepsModal from "./StepsModal";
import useFetch2 from "../../hooks/useFetch2";
export default function ItemSteps({step,onDelete,onUpdate}){
    const {token} = useAuth("state");
    const [openModal,setOpenModal] = useState(false);
    const [openModalEdit,setOpenModalEdit] = useState(false);

    
    /* const {newSteps,setNewSteps} = useContext(CrudContext)
    const deleteNewStep = (event)=>{
        event.preventDefault
        
        let lista = newSteps.filter((sp)=>{
            return step.order !== sp.order
        });
        console.log(lista);
        setNewSteps(lista);
        
    } */

    return(
        <div key={step.order} className="columns">
            
            <div className="field column is-two-thirds">
                
                <div className="control">
                    <textarea className="textarea" rows={4} name="instruction" type="text"  value={`${step.order} -  ${step.instruction}`} aria-hidden readOnly></textarea>
                </div>
            </div>
               
            <div className="column field is-grouped">
                <div className="control">
                    <button className="button is-link" onClick={()=>setOpenModalEdit(true)}>Editar</button>
                </div>
                <div className="control">
                    <button className="button is-link is-light" onClick={()=>setOpenModal(true)}>Eliminar</button>
                </div>
            </div> 

            <DeleteForm
                isOpenModal = {openModal}
                onCloseModal = {()=>setOpenModal(false)}
                title = {"Elimnar instruccion"}
                message = {"Estas seguro/a de eliminar esta instruccion"}
                onDelete = {onDelete}
                apiUrl = {`${import.meta.env.VITE_API_BASE_URL}reciperover/steps/${step.id}/`}
                actionApi = {
                    {
                        method: "DELETE",
                        headers: {
                            Authorization: `Token ${token}`,
                        },
                    }
                }
            />
            <StepsModal
                openModal = {openModalEdit}
                onClose = {()=>setOpenModalEdit(false)}
                editMode={true}
                step={step}
                actionFetch = {onUpdate}
            />
        </div>
    )
}