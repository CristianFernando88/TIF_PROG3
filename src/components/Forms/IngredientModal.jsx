import { useContext , useEffect, useRef, useState} from "react";
import { CrudContext } from "../../context/CrudContext";
import useFetch2 from "../../hooks/useFetch2";
import { useAuth } from "../../context/AuthContext";
import Ingredient from "../Ingredient/Ingredient";
export default function IngredientModal({openModal,onClose,onAction,ingredient=null}){
    const {recipe} = useContext(CrudContext);
    const {token} = useAuth("state");
    //variables
    const refIngredient = useRef();
    const refQuantity = useRef();
    const refMeasure = useRef();

    //para cargar selects del ingrediente
    const {data:dataIngredient,isLoading:loadingIngredient,isError:errorIngredient,doFetch:ingredientFecth} = useFetch2();
    const {data:measures,isLoading:isLoadingMeasures,isError:isErrorMeasures,doFetch:measuresFetch} = useFetch2();

    /* if(ingredient){
        refIngredient.current.value = [ingredient.ingredient];
        refQuantity.current.value = ingredient.quantity;
        refMeasure.current.value = [ingredient.measure];
    }else{
        refIngredient.current.value = "";
        refQuantity.current.value = 0;
        refMeasure.current.value = "";
    } */


    /* const [form,setForm] = useState({id:null,ingredient : "",quantity:"",measure:""}) */

    useEffect(()=>{
        ingredientFecth(`${import.meta.env.VITE_API_BASE_URL}reciperover/ingredients/?page_size=200`,{});
        measuresFetch(`${import.meta.env.VITE_API_BASE_URL}reciperover/measures/`,{});
    },[])

    useEffect(()=>{
        if(ingredient && dataIngredient && measures){
            refIngredient.current.value = ingredient.ingredient;
            refQuantity.current.value = ingredient.quantity;
            refMeasure.current.value = ingredient.measure;
        }

    },[dataIngredient,measures])

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
        //guarda todo el ingrediente en el form temporal
        const updatedSelectedIngredient = dataIngredient.results.filter((cat) =>
            selectedOptions.includes(String(cat.id))
        );
        
        setForm({
            ...form,
            ingredient : updatedSelectedIngredient[0],
        })

        
    };



    const handleSubmit = (e)=>{
        e.preventDefault();

        if(refIngredient.current.value != "" && refQuantity.current.value != "" && refMeasure.current.value != "" ){
            /* const ingredient = categories.results.filter((cat)=>cat.id == refCategory.current.value)[0]; */
            /* console.log(refIngredient.current.value);
            console.log(refQuantity.current.value);
            console.log(refMeasure.current.value) */

            if(ingredient){
                onAction.doFetchUpdate(`${import.meta.env.VITE_API_BASE_URL}reciperover/recipes/${ingredient.recipe}/ingredients/${ingredient.id}/`,{
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Token ${token}`,
                    },
                    body: JSON.stringify({
                        quantity: refQuantity.current.value,
                        measure: refMeasure.current.value,
                        recipe: ingredient.recipe,
                        ingredient: refIngredient.current.value
                    }),
        
                });
            }else{
                onAction.doFetchAdd(`${import.meta.env.VITE_API_BASE_URL}reciperover/recipe-ingredients/`,{
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Token ${token}`,
                    },
                    body: JSON.stringify({
                        quantity: refQuantity.current.value,
                        measure: refMeasure.current.value,
                        recipe: recipe.id,
                        ingredient: refIngredient.current.value
                    }),
        
                });
            }
            refIngredient.current.value = "";
            refQuantity.current.value = 0;
            refMeasure.current.value = "";
            
            onClose();
        }else{
            alert("El campo esta vacio");
        }

        
    }
    return(
        
        <>  
        <div className={openModal ? ("modal is-active"):("modal")} >
                <div className="modal-background" onClick={onClose}></div>
                <div className="modal-content">
                    <div className="box">
                        {ingredient?(<h1 className="title">Modificar Ingrediente</h1>):(<h1 className="title">Nuevo Ingrediente</h1>)}
                        <div className="content">
                        <form className="field is-grouped ">
                            <div className="field">
                                <label className="label">Ingrediente</label>
                                <div className="select is-fullwidth">
                                    <select name="ingredient" ref={refIngredient} /* value={[id]} *//* onChange={handleIngredientChange} */>
                                        <option value=""></option>
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
                                        <input className="input" name="quantity" ref={refQuantity} /* onChange={handleInputChange} value={form.quantity} */ type="number" />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Unidad</label>
                                <div className="select is-fullwidth">
                                    <select name="measure" ref={refMeasure} /* onChange={handleMeasureChange} */>
                                        <option value=""></option>
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
                        <button className="button is-primary" onClick={handleSubmit}>Aceptar</button>
                        <button className="button is-danger" onClick={onClose}>Cerrar</button>
                        
                    </div> 
                </div>
                <button className="modal-close is-large" aria-label="close" onClick={onClose}></button>
            </div>
        </>
      
    )
        
    
}