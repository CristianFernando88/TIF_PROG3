import { useContext } from "react";
import { CrudContext } from "../../context/CrudContext";
import ItemSteps from "./ItemSteps";
export default function ListStepsForm({isOpendModal}){
    const {newSteps} = useContext(CrudContext);
    return(
        <div>
            <div>
                <h1 className="title">Pasos</h1>
                <div className="field">
                    <div className="control">
                        <button className="button is-link is-light" onClick={isOpendModal}>Agregar Instruccion</button>
                    </div>
                </div>
                <div>
                {
                    newSteps ? (
                        newSteps.map((stp)=>(
                            <ItemSteps key={stp.order} step={stp}/>
                        ))
                    ) : (null) 
                }
                </div>
            </div>
        </div>
    )
}