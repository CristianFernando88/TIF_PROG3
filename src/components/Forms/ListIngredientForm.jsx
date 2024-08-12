import { useContext } from "react";
import { CrudContext } from "../../context/CrudContext";
import ItemIngredient from "./ItemIngredient";
export default function ListIngredientForm({isOpendModal}){
    const {newIngredients} = useContext(CrudContext);
    return(
        <div>
            <div>
                <h1 className="title">Ingredientes</h1>
                <div className="field">
                    <div className="control">
                        <button className="button is-link is-light" onClick={isOpendModal}>Agregar ingrediente</button>
                    </div>
                </div>
                <div>
                {
                    newIngredients ? (
                        newIngredients.map((ing)=>(
                            <ItemIngredient key={ing.ingredient.id} ingredient={ing}/>
                        ))
                    ) : (null) 
                }
                </div>
            </div>
        </div>
    )
}