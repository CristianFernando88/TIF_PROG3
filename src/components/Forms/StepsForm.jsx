import { useContext , useEffect, useState } from "react";
import { CrudContext } from "../../context/CrudContext";
import ItemSteps from "./ItemSteps";
import StepsModal from "./StepsModal";
import useFetch2 from "../../hooks/useFetch2";
export default function StepsForm({isOpendModal}){
    const {newSteps , recipe} = useContext(CrudContext);
    const [isOpenModalStep,setIsOpenModalStep] = useState(false);

    //fetchs crud
    const {data,isLoading,isError,doFetch} = useFetch2();
    const {data:addStep,isLoading:addIsLoading,isError:addIsError,doFetch:addFetch} = useFetch2();
    const {data:stepUpdate,isLoading:updateIsLoading,isError:updateIsError,doFetch:doFetchUpdate} = useFetch2();
    const {isDelete:deleteStep,isLoading:deleteIsLoading,isError:deleteIsError,doFetch:doFetchDelete} = useFetch2();

    useEffect(()=>{
        if(recipe){
            doFetch(`${import.meta.env.VITE_API_BASE_URL}reciperover/steps/?recipe=${recipe.id}&ordering=order&page_size=20`)
        }
    },[recipe])

    useEffect(()=>{
        if(addStep || deleteStep || stepUpdate){
            doFetch(`${import.meta.env.VITE_API_BASE_URL}reciperover/steps/?recipe=${recipe.id}&ordering=order&page_size=20`)
        }
    },[addStep,deleteStep,stepUpdate])
    
    return(
        <div>
            <div>
                <h1 className="title">Pasos</h1>
                <div className="field">
                    <div className="control">
                        <button className="button is-link is-light" onClick={()=>setIsOpenModalStep(true)}>Agregar Instruccion</button>
                    </div>
                </div>
                <div>
                    {
                        data ? (
                            data.results.map((step)=>(
                                <ItemSteps
                                    key={step.id} 
                                    step={step}
                                    onDelete={{deleteStep,deleteIsLoading,deleteIsError,doFetchDelete}}
                                    onUpdate={{stepUpdate,updateIsLoading,updateIsError,doFetchUpdate}}
                                />
                            ))
                        ) : (
                            null
                        )
                    }
            
                </div>
            </div>
            {
                data ? (
                    <StepsModal 
                        openModal={isOpenModalStep}
                        onClose={()=>setIsOpenModalStep(false)}
                        actionFetch={{addStep,addIsLoading,addIsError,addFetch}}
                        stepsOnRecipe={data.results}
                    />
                ) : (null)  
            }
            
        </div>
    )
}