import { useContext , useEffect, useRef, useState} from "react";
import { CrudContext } from "../../context/CrudContext";
import { useAuth } from "../../context/AuthContext";

export default function StepsModal({openModal,onClose,editMode=false,step=null,actionFetch,stepsOnRecipe=[]}){
    const {token} = useAuth("state");
    const {recipe} = useContext(CrudContext);
   
    /* const [form,setForm] = useState({id:null,order:"",instruction:""});
    const lista = newSteps; */

    const refOrder = useRef();
    const refInstruction = useRef();

    

    useEffect(()=>{
        if(step){
            refOrder.current.value = step.order;
            refInstruction.current.value = step.instruction;
        }
    },[step])

    const onSubmit = (e)=>{
        e.preventDefault();       
        console.log(stepsOnRecipe);
        if(refOrder.current.value!="" && refInstruction.current.instruction !=""){
            if(!editMode){
                let existStep = stepsOnRecipe.filter((stp)=>stp.order==refOrder.current.value);
                if(existStep.length==0){
                    actionFetch.addFetch(`${import.meta.env.VITE_API_BASE_URL}reciperover/steps/`,{
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Token ${token}`,
                        },
                        body: JSON.stringify({
                            order: refOrder.current.value,
                            instruction: refInstruction.current.value,
                            recipe: recipe.id
                        }),
                    })
                }else{
                    console.log("ya existe una isntruccion con ese orden")
                }
                
            }else{
                actionFetch.doFetchUpdate(`${import.meta.env.VITE_API_BASE_URL}/reciperover/steps/${step.id}/`,{
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Token ${token}`,
                    },
                    body: JSON.stringify({
                        order: refOrder.current.value,
                        instruction: refInstruction.current.value,
                        recipe: recipe.id
                    }),
                })
            }
            refOrder.current.value = "";
            refInstruction.current.value = "";
            onClose();

        }else{
            alert("El campo esta vacio");
        }
    }
    /* const {newSteps,setNewSteps} = useContext(CrudContext);
    const handleInputChange = (e) => {
        setForm({
          ...form,
          [e.target.name]: e.target.value,
        });
    }

    const onSubmit = (e)=>{
        e.preventDefault();

        
        const lista = newSteps;

        if(form.instruction!=""){
            lista.push(form);
            setNewSteps(lista);
            setForm({order:"",instruction:""});

            console.log(form);
            console.log(lista);
            onClose();

        }else{
            alert("El campo esta vacio");
        }
    } */
    return(
        
        <>  
            <div className={openModal ? ("modal is-active"):("modal")} >
                    <div className="modal-background" onClick={onClose}></div>
                    <div className="modal-content">
                        <div className="box">
                            <h1 className="title">{!editMode ? ("Nueva instruccion") : ("Editar Instruccion")}</h1>
                            <div className="content">
                                <form className="field " onSubmit={onSubmit}>
                                    
                                    <div className="field">
                                            <label className="label">Orden</label>
                                            <div className="control">
                                                    <input className="input" name="order" ref={refOrder} /* onChange={handleInputChange} value={form.order} */ type="number" />
                                            </div>
                                    </div>
                                    <div className="field">
                                        <label className="label">Instruccion</label>
                                        <div className="control">
                                            <textarea className="textarea"  name="instruction" ref={refInstruction} /* onChange={handleInputChange} value={form.instruction} */ placeholder="Descripcion del paso..." required></textarea>
                                        </div>
                                    </div>
                                    <div className="field is-grouped "> 
                                        <div className="field">
                                            <button type="submit" className="button is-primary" >Aceptar</button>
                                        </div>
                                        <div>
                                            <button className="button is-danger" onClick={onClose}>Cerrar</button>
                                        </div>
                                    </div>   
                                    
                                </form>
                            </div>
                            
                        </div> 
                    </div>
                    <button className="modal-close is-large" aria-label="close" onClick={onClose}></button>
            </div>
        </>
      
    );
        
}