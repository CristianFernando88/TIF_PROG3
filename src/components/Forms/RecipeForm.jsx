import { useRef , useEffect, useContext, useState } from "react";
import useFetch2 from "../../hooks/useFetch2";
import { useAuth } from "../../context/AuthContext";
import { CrudContext } from "../../context/CrudContext";
import ImageRecipeModal from "./ImageRecipeModal";
import { useNavigate } from "react-router-dom";

export default function RecipeForm(){
    const { recipe , setRecipe} = useContext(CrudContext)
    
    const [isEdit,setIsEdit] = useState(false);
    const [openModalImage,setIsOpenModalImage] = useState(false);
    const navigate = useNavigate();

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
    const {data:updateRecipe,isLoading:isLoadingUpdate,isError:isErrorUpdate,doFetch:updateRecipeFetch} = useFetch2();
    //actualizar imagen
    const {data:updateImage,isLoading:isLoadingImage,isError:isErrorImage,doFetch:imageRecipeFetch} = useFetch2();

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

    useEffect(()=>{
        if(updateRecipe){
            setRecipe(updateRecipe)
        }
    },[updateRecipe])

    useEffect(()=>{
        if(updateImage){
            setRecipe(updateImage)
        }
    },[updateImage])
     
    const handleSubmit = (e) => {
        e.preventDefault();
        if(!recipe){
            const newForm = new FormData();
            newForm.append("title",refTitle.current.value);
            newForm.append("description",refDescription.current.value);
            newForm.append("preparation_time",refPreparation.current.value);
            newForm.append("cooking_time",refCooking.current.value);
            newForm.append("servings",refServings.current.value);
            addRecipeFetch(`${import.meta.env.VITE_API_BASE_URL}/reciperover/recipes/`,{
                method: "Post",
                headers: {
                    Authorization: `Token ${token}`,
                },
                body: newForm,
            }) 
        }else{
            updateRecipeFetch(`${import.meta.env.VITE_API_BASE_URL}reciperover/recipes/${recipe.id}/`,{
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${token}`,
                },
                body: JSON.stringify({
            
                    title: refTitle.current.value,
                    description: refDescription.current.value,
                    preparation_time: refPreparation.current.value,
                    cooking_time: refCooking.current.value,
                    servings: refServings.current.value
                      
                }),
            }) 
        }
        setIsEdit(false);
        
    };

     /* const saveIngredients = (e)=>{
        e.preventDefault();
        if(newIngredients.length > 0){
            
        }
    } */
    
    return(
        
            <div>
                    {recipe ? (
                        <form onSubmit={handleSubmit}>
                            <div className="field columns">
                                <div className="field column">
                                    <div className="media-left">
                                        
                                        <figure className="image is-3by2">
                                            {
                                                recipe.image ? (
                                                    <img  src={recipe.image} alt="Image" />
                                                    ) : (
                                                    <img src="https://bulma.io/assets/images/placeholders/128x128.png" alt="Image" />
                                                )  
                                                    
                                            }
                                        </figure>
                                        
                                    </div>
                                    <div className="control">
                                        <button className="button is-primary" onClick={()=>setIsOpenModalImage(true)}>Modificar Iamgen</button>
                                    </div>
                                </div>
    
                                <div className="field column">
                                    <label className="label">Titulo de la Receta</label>
                                    <div className="control">
                                        {isEdit ? (
                                            <input className="input is-desactive" name="title" type="text" ref={refTitle} placeholder="Titulo de la Receta" required/>
                                        ):(
                                            <input className="input is-desactive" name="title" type="text" ref={refTitle} placeholder="Titulo de la Receta" disabled required/>
                                        )}
                                        
                                    </div>
                                </div>
                            </div>
                            

                            <div className="field">
                                <label className="label">Cuentanos un poco sobre tu receta...</label>
                                <div className="control">
                                    {isEdit ? (
                                        <textarea className="textarea"  name="description" ref={refDescription} placeholder="Agrega descripcion...." required></textarea>
                                    ):(
                                        <textarea className="textarea"  name="description" ref={refDescription} placeholder="Agrega descripcion...." disabled required></textarea>
                                    )}
                                    
                                </div>
                            </div>
                            
                            
                            <div className="field columns">
                                <div className="field column">
                                    <label className="label">Minutos de preparacion</label>
                                    <div className="control">
                                        {isEdit ? (
                                            <input className="input" name="preparation" ref={refPreparation} min={1} type="number" required/>
                                            ):(
                                                <input className="input" name="preparation" ref={refPreparation} min={1} type="number" disabled required/>
                                            )}
                                        
                                    </div>
                                </div>
                                <div className="field column">
                                    <label className="label">Minutos de coccion</label>
                                    <div className="control">
                                    {isEdit ? (
                                        <input className="input" name="cooking" ref={refCooking} min={1} type="number" required/>
                                    ):(
                                        <input className="input" name="cooking" ref={refCooking} min={1} type="number" disabled required/>
                                    )}
                                        
                                    </div>
                                </div>
                                <div className="field column">
                                    <label className="label">Cantidad de personas</label>
                                    <div className="control">
                                    {isEdit ? (
                                        <input className="input" name="servings" ref={refServings} min={1} type="number" required/>
                                    ):(
                                        <input className="input" name="servings" ref={refServings} min={1} type="number" disabled required/>
                                    )}
                                        
                                    </div>
                                </div>
                                
                            </div>
                            {!isEdit ? (
                                <div className="field is-grouped">
                                    <div className="control">
                                        <button className="button is-primary" onClick={(e)=>{
                                            e.preventDefault();
                                            setIsEdit(true);}}>Editar</button>
                                    </div>
                                </div>) : (
                                    <div className="field is-grouped">
                                        <div className="control">
                                            <button type="onSubmit" className="button is-primary">Guardar Cambios</button>
                                        </div>
                                        <div className="control">
                                            <button className="button is-link is-danger" onClick={()=>{
                                                refTitle.current.value = recipe.title;
                                                refDescription.current.value = recipe.description;
                                                refPreparation.current.value = recipe.preparation_time;
                                                refCooking.current.value = recipe.cooking_time;
                                                refServings.current.value = recipe.servings;
                                                setIsEdit(false)}}>Cancelar</button>
                                        </div>
                                    </div>
                                )}   
                                
                        </form>
                    ):(<form onSubmit={handleSubmit}>
                        <div className="field columns">
                            <div className="field column">
                                <div className="media-left">
                                    
                                    <figure className="image is-3by2">
                                        <img src="https://bulma.io/assets/images/placeholders/128x128.png" alt="Image" />
                                    </figure>
                                    
                                </div>
                                <div className="control">
                                    <button className="button is-primary" onClick={()=>setIsOpenModalImage(true)} disabled>Modificar Iamgen</button>
                                </div>
                            </div>

                            <div className="field column">
                                <label className="label">Titulo de la Receta</label>
                                
                                <div className="control">
                                    <input className="input is-desactive" name="title" type="text" ref={refTitle} placeholder="Titulo de la Receta" required/>   
                                    
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
                                    <input className="input" name="preparation" ref={refPreparation} min={1} type="number" required/>
                                    
                                </div>
                            </div>
                            <div className="field column">
                                <label className="label">Minutos de coccion</label>
                                <div className="control">
                                    <input className="input" name="cooking" ref={refCooking} min={1} type="number" required/>
                                </div>
                            </div>
                            <div className="field column">
                                <label className="label">Cantidad de personas</label>
                                <div className="control">
                                    <input className="input" name="servings" ref={refServings} min={1} type="number" required/>
                                    
                                </div>
                            </div>
                            
                        </div>
                        <div className="field is-grouped">
                                    <div className="control">
                                        <button type="onSubmit" className="button is-primary">Guardar</button>
                                    </div>
                                    <div className="control">
                                        <button className="button is-link is-danger" onClick={(e)=>{
                                            e.preventDefault();
                                            navigate(`/my-account/my-recipes/`);

                                        }}>Cancelar</button>
                                    </div>
                                </div>
                        
                            
                    </form>)}
                    
                    <ImageRecipeModal
                        imageFecth={{updateImage,isLoadingImage,isErrorImage,imageRecipeFetch}}
                        isOpenModal={openModalImage}
                        onCloseModal={()=>setIsOpenModalImage(false)}
                    />
            </div>)
};
