import { useContext, useEffect, useRef, useState } from "react"
import useFetch2 from "../../hooks/useFetch2";
import {useAuth} from "../../context/AuthContext"
import {CrudContext} from "../../context/CrudContext";
import Ingredient from "../Ingredient/Ingredient";
import ListIngredientForm from "./ListIngredientForm";
import IngredientFormModal from "./IngredientFormModal";
import ListStepsForm from "./ListStepsForm";
import StepsFormModal from "./StepsFormModal";


export default function RecipeForm(){
    
    const { token } = useAuth('state');
    const {categories,categoriesFetch,newIngredients,setNewIngredients,newSteps,setNewSteps} = useContext(CrudContext); 
    const [formInput,setFormInput] = useState({});
    const [formImage,setFormImage] = useState(null);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [closeModal,setCloseModal] = useState(false);
    const [closeModalStep,setCloseModalStep] = useState(false);
    /* const {data,isLoading,isError,doFetch} = useFetch2(`${import.meta.env.VITE_API_BASE_URL}reciperover/categories/?page_size=100`,{}); */
    /* const {data:resultData,isError:resultIsError,doFetch:addRecipeFetch} = useFetch2(); */
    const {data:resultCategory,isError:resultCategoriaIsError,doFetch:addCategoryRecipe} = useFetch2();

    useEffect(()=>{
        if(categories && !(selectedCategories.length===0)){
            selectedCategories.map((category)=>{
                addCategoryRecipe(`${import.meta.env.VITE_API_BASE_URL}/reciperover/recipes/${categories.result.id}/categories/`,{
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Token ${token}`,
                    },
                    body: JSON.stringify({
                            "recipe": resultData.id,
                            "category": category.id
                    }),
                });
            })
            
        }
        
    },[categories]);


    const handleCategoryChange = (event) => {
        const selectedOptions = Array.from(
            event.target.selectedOptions,
            (option) => option.value
        );
        const updatedSelectedCategories = categories.results.filter((cat) =>
            selectedOptions.includes(String(cat.id))
        );
        console.log(updatedSelectedCategories);
        setSelectedCategories(updatedSelectedCategories);
        
    };


    const handleInputChange = (e) => {
        setFormInput({
          ...formInput,
          [e.target.name]: e.target.value,
        });
      };

    const handleFileChange = (e)=>{
        setFormImage(e.target.files[0]);
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const newForm = new FormData();
        newForm.append("title",formInput.title);
        newForm.append("description",formInput.description);
        newForm.append("preparation_time",formInput.preparation);
        newForm.append("cooking_time",formInput.cooking);
        newForm.append("servings",formInput.servings);
        if(formImage){
            newForm.append("image",formImage);
        }
        addRecipeFetch(`${import.meta.env.VITE_API_BASE_URL}/reciperover/recipes/`,{
            method: "Post",
            headers: {
                Authorization: `Token ${token}`,
            },
            body: newForm,
        })
    };

    const saveIngredients = (e)=>{
        e.preventDefault();
        if(newIngredients.length > 0){
            
        }
    }
    
    return(
        
            <div className="container my-5 mx-5">
                <form onSubmit={handleSubmit} className="box">

                    <div className="field">
                        <label className="label">Seleccionar Imagen</label>
                            <div className="control is-primary">
                                <input type="file" name="image" accept="image/*" onChange={handleFileChange}/>
                            </div>
                        </div>
                    <div className="field">
                        <label className="label">Titulo de la Receta</label>
                        <div className="control">
                            <input className="input" name="title" type="text" onChange={handleInputChange} placeholder="Titulo de la Receta" required/>
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Cuentanos un poco sobre tu receta...</label>
                        <div className="control">
                            <textarea className="textarea"  name="description" onChange={handleInputChange} placeholder="Agrega descripcion...." required></textarea>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Categorías</label>
                        <div className="select is-fullwidth is-multiple ">
                            <select multiple size="4" value={selectedCategories.map((cat) => cat.id)} onChange={handleCategoryChange}>
                                {
                                    categories ? (
                                        categories.results.map((category)=>(
                                            <option key={category.id} value={category.id}>{category.name}</option>
                                        ))
                                    ) :
                                    (null)
                                }
                            </select>
                        </div>
                    </div>
                    
                    <div className="field is-grouped">
                        <label className="label">Minutos de preparacion</label>
                        <div className="control">
                            <input className="input" name="preparation" onChange={handleInputChange} type="number" required/>
                        </div>
                        <label className="label">Minutos de coccion</label>
                        <div className="control">
                            <input className="input" name="cooking" onChange={handleInputChange} type="number" required/>
                        </div>
                        <label className="label">Cantidad de personas</label>
                        <div className="control">
                            <input className="input" name="servings" onChange={handleInputChange} type="number" required/>
                        </div>
                    </div>
                    <div className="field is-grouped">
                        <div className="control">
                            <input type="submit" className="button is-link" value={"Submit"}/>
                            
                        </div>
                        <div className="control">
                            <button className="button is-link is-light">Cancel</button>
                        </div>
                    </div>
                </form>
                
                <div className="box">
                    <ListIngredientForm
                        isOpendModal={()=>{
                            if(closeModal){
                                setCloseModal(false);
                            }else{
                                setCloseModal(true);
                            }
                        }}
                    />
                </div>
                
                <IngredientFormModal
                    closeModal={closeModal}
                    onClose={()=>{
                        if(closeModal){
                            setCloseModal(false);
                        }else{
                            setCloseModal(true);
                        }
                    }}
                />
                <div className="box">
                    <ListStepsForm
                        isOpendModal={()=>{
                            if(closeModalStep){
                                setCloseModalStep(false);
                            }else{
                                setCloseModalStep(true);
                            }
                        }}

                    />
                </div>
                

                <StepsFormModal 
                    closeModal={closeModalStep}
                    onClose={()=>{
                        if(closeModalStep){
                            setCloseModalStep(false);
                        }else{
                            setCloseModalStep(true);
                        }
                    }}
                />


                <form>
                    <div className="field is-grouped">
                        <div className="control">
                            <input type="submit" className="button is-link" value={"Crear Receta"}/>
                            
                        </div>
                        <div className="control">
                            <button className="button is-link is-light">Cancelar</button>
                        </div>
                    </div>
                </form>
                
               
            </div>
    )
}