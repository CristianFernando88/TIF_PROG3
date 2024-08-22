import { useRef , useEffect, useContext } from "react";
import useFetch2 from "../../hooks/useFetch2";
import { useAuth } from "../../context/AuthContext";
import { CrudContext } from "../../context/CrudContext";

export default function RecipeForm(){
    const { recipe , setRecipe} = useContext(CrudContext)

    const refImg = useRef();
    const refTitle = useRef();
    const refDescription = useRef();
    const refPreparation = useRef();
    const refCooking = useRef();
    const refServings = useRef();
    
    const { token } = useAuth('state');

    //agregamos receta 
    const {data:addRecipe,isLoading:isLoadingRecipe,isError:isErrorRecipe,doFetch:addRecipeFetch} = useFetch2();
    //actualizar receta
    
    useEffect(()=>{
        if(recipe){
            refTitle.current.value = recipe.title;
            refDescription.current.value = recipe.description;
            refPreparation.current.value = recipe.preparation_time;
            refCooking.current.value = recipe.cooking_time;
            refServings.current.value = recipe.servings;
        }
    },[recipe])


    useEffect(()=>{
        if(addRecipe){
            setRecipe(addRecipe);
        }
    },[addRecipe])
     
    const handleSubmit = (e) => {
        e.preventDefault();
        const newForm = new FormData();
        newForm.append("title",refTitle.current.value);
        newForm.append("description",refDescription.current.value);
        newForm.append("preparation_time",refPreparation.current.value);
        newForm.append("cooking_time",refCooking.current.value);
        newForm.append("servings",refServings.current.value);
        if(refImg.current.value!=""){
            newForm.append("image",refImg.current.files[0]);
        }
        addRecipeFetch(`${import.meta.env.VITE_API_BASE_URL}/reciperover/recipes/`,{
            method: "Post",
            headers: {
                Authorization: `Token ${token}`,
            },
            body: newForm,
        }) 
    };

     /* const saveIngredients = (e)=>{
        e.preventDefault();
        if(newIngredients.length > 0){
            
        }
    } */
    
    return(
        
            <div>
                <form onSubmit={handleSubmit} >
                    <div className="field columns">
                        <div className="field column">
                            <label className="label">Seleccionar Imagen</label>
                                <div className="control is-primary">
                                    <input type="file" name="image" accept="image/*" ref={refImg}/>
                                </div>
                            </div>

                        <div className="field column">
                            <label className="label">Titulo de la Receta</label>
                            <div className="control">
                                <input className="input" name="title" type="text" ref={refTitle} placeholder="Titulo de la Receta" required/>
                            </div>
                        </div>
                    </div>
                    

                    <div className="field">
                        <label className="label">Cuentanos un poco sobre tu receta...</label>
                        <div className="control">
                            <textarea className="textarea"  name="description" ref={refDescription} placeholder="Agrega descripcion...." required></textarea>
                        </div>
                    </div>
                    
                    
                    <div className="field columns">
                        <div className="field column">
                            <label className="label">Minutos de preparacion</label>
                            <div className="control">
                                <input className="input" name="preparation" ref={refPreparation} type="number" required/>
                            </div>
                        </div>
                        <div className="field column">
                            <label className="label">Minutos de coccion</label>
                            <div className="control">
                                <input className="input" name="cooking" ref={refCooking} type="number" required/>
                            </div>
                        </div>
                        <div className="field column">
                            <label className="label">Cantidad de personas</label>
                            <div className="control">
                                <input className="input" name="servings" ref={refServings} type="number" required/>
                            </div>
                        </div>
                        
                    </div>
                    <div className="field is-grouped">
                        <div className="control">
                            {recipe ? (
                                <input type="submit" className="button is-primary" value={"Editar"}/>
                            ) : (<input type="submit" className="button is-primary" value={"Guardar"}/>)}   
                        </div>
                        <div className="control">
                            <button className="button is-link is-danger">Cancel</button>
                        </div>
                    </div>
                </form>
            </div>)
};
