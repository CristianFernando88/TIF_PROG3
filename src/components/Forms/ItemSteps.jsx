import { useContext } from "react";
import { CrudContext } from "../../context/CrudContext";
export default function ItemSteps({step}){
    const {newSteps,setNewSteps} = useContext(CrudContext)
    const deleteNewStep = (event)=>{
        event.preventDefault
        
        let lista = newSteps.filter((sp)=>{
            return step.order !== sp.order
        });
        console.log(lista);
        setNewSteps(lista);
        
    }
    return(
        <div key={step.order} className="columns">
            {/* <div className="column is-two-thirds is-inline-flex">
                <p>{step.order} -  {step.instruction} </p>
            </div> */}
            <div className="field column is-two-thirds">
                <div className="control">
                    <textarea className="textarea" rows={2} name="instruction" type="text"  value={`${step.order} -  ${step.instruction}`} aria-hidden readOnly></textarea>
                </div>
            </div>
               
            <div className="column field is-grouped">
                <div className="control">
                    <button class="button is-link" >Editar</button>
                </div>
                <div className="control">
                    <button className="button is-link is-light" onClick={deleteNewStep}>Eliminar</button>
                </div>
            </div> 
        </div>
    )
}