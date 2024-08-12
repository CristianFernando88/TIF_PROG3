import { useContext } from "react";
import { CrudContext } from "../../context/CrudContext";
export default function ItemIngredient({ingredient}){
    const {newIngredients,setNewIngredients} = useContext(CrudContext)
    const deleteNewIngrediente = (event)=>{
        event.preventDefault
        
        let lista = newIngredients.filter((ing)=>{
            return ingredient.ingredient.id !== ing.ingredient.id
        });
        console.log(lista);
        setNewIngredients(lista);
        
    }
    return(
        <div key={ingredient.ingredient.id} className="field columns">
            <div className="field column is-two-thirds">
                <div className="control">
                    <input className="input" name="title" type="text" value={`${ingredient.ingredient.name} ${ingredient.quantity} ${ingredient.measure.value}`} disabled/>
                </div>
            </div>   
            <div className="field column is-grouped">
                <div className="control">
                    <button class="button is-link" >Editar</button>
                </div>
                <div className="control">
                    <button className="button is-link is-light" onClick={deleteNewIngrediente}>Eliminar</button>
                </div>
            </div> 
        </div>
    )
}