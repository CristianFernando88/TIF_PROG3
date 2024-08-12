import { useContext , useState} from "react";
import { CrudContext } from "../../context/CrudContext";

export default function StepsFormModal({closeModal,onClose}){
    const {newSteps,setNewSteps} = useContext(CrudContext);
    const [form,setForm] = useState({id:null,order:"",instruction:""});
    const handleInputChange = (e) => {
        setForm({
          ...form,
          [e.target.name]: e.target.value,
        });
    }

    const addSteps = (e)=>{
        e.preventDefault();

        /* setLoadList(true); */
        const lista = newSteps;

        if(form.instruction!=""){
            lista.push(form);
            setNewSteps(lista);
            setForm({order:"",instruction:""});

            /* console.log(form);
            console.log(lista); */
            /* setLoadList(false); */
            onClose();

        }else{
            alert("El campo esta vacio");
        }
    }
    return(
        
        <>  
            <div className={closeModal ? ("modal is-active"):("modal")} >
                    <div className="modal-background" onClick={onClose}></div>
                    <div className="modal-content">
                        <div className="box">
                            <h1 className="title">Nuevo Paso</h1>
                            <div className="content">
                            <form className="field ">
                                
                                <div className="field">
                                        <label className="label">Orden</label>
                                        <div className="control">
                                                <input className="input" name="order" onChange={handleInputChange} value={form.order} type="number" />
                                        </div>
                                </div>
                                <div className="field">
                                    <label className="label">Instruccion</label>
                                    <div className="control">
                                        <textarea className="textarea"  name="instruction" onChange={handleInputChange} value={form.instruction} placeholder="Descripcion del paso..." required></textarea>
                                    </div>
                                </div>

                            </form>
                            </div>
                            <button className="button is-primary" onClick={addSteps}>Aceptar</button>
                            <button className="button is-danger" onClick={onClose}>Cerrar</button>
                            
                        </div> 
                    </div>
                    <button className="modal-close is-large" aria-label="close" onClick={onClose}></button>
            </div>
        </>
      
    );
        
}