import { useContext , useState} from "react";
import { CrudContext } from "../../context/CrudContext";
export default function IngredientFormModal({closeModal,onClose}){
    const {newIngredients,setNewIngredients,dataIngredient,measures} = useContext(CrudContext);
    const [form,setForm] = useState({id:null,ingredient : "",quantity:"",measure:""})
    const handleInputChange = (e) => {
        setForm({
          ...form,
          [e.target.name]: e.target.value,
        });
      };

    const handleIngredientChange = (event) => {
        const selectedOptions = Array.from(
            event.target.selectedOptions,
            (option) => option.value
        );
        const updatedSelectedIngredient = dataIngredient.results.filter((cat) =>
            selectedOptions.includes(String(cat.id))
        );
        
        setForm({
            ...form,
            ingredient : updatedSelectedIngredient[0],
        })

        
    };

    const handleMeasureChange = (event) => {
        const selectedOptions = Array.from(
            event.target.selectedOptions,
            (option) => option.value
        );
        const updatedSelectedMeasure = measures.filter((cat) =>
            selectedOptions.includes(String(cat.key))
        );
        
        setForm({
            ...form,
            [event.target.name] : updatedSelectedMeasure[0],
        })

        
    };


    const addIngredient = (e)=>{
        e.preventDefault();

        /* setLoadList(true); */
        const lista = newIngredients;

        if(form.ingredient!="" && form.quantity!="" && form.measure != ""){
            lista.push(form);
            setNewIngredients(lista);
            setForm({ingredient : "",quantity : "",measure : ""});

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
                        <h1 className="title">Nuevo Ingrediente</h1>
                        <div className="content">
                        <form className="field is-grouped ">
                            <div className="field">
                                <label className="label">Ingrediente</label>
                                <div className="select is-fullwidth is-multiple ">
                                    <select name="ingredient" onChange={handleIngredientChange}>
                                        {
                                            dataIngredient ? (
                                                dataIngredient.results.map((ing)=>(
                                                    <option key={ing.id} value={ing.id}>{ing.name}</option>
                                                ))
                                            ) :
                                            (null)
                                        }
                                    </select>
                                </div>
                            </div>
                                
                            <div className="field">
                                <label className="label">Cant.</label>
                                <div className="control">
                                        <input className="input" name="quantity" onChange={handleInputChange} value={form.quantity} type="number" />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Unidad</label>
                                <div className="select is-fullwidth">
                                    <select name="measure" onChange={handleMeasureChange}>
                                        {
                                            measures ? (
                                                measures.map((measure)=>(
                                                    <option key={measure.key} value={measure.key}>{measure.value}</option>
                                                ))
                                            ) :
                                            (null)
                                        }
                                    </select>
                                </div>
                            </div>
        

                        </form>
                        </div>
                        <button className="button is-primary" onClick={addIngredient}>Aceptar</button>
                        <button className="button is-danger" onClick={onClose}>Cerrar</button>
                        
                    </div> 
                </div>
                <button className="modal-close is-large" aria-label="close" onClick={onClose}></button>
            </div>
        </>
      
    )
        
    
}