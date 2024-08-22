import { useContext, useEffect, useRef, useState } from "react"
import useFetch2 from "../../hooks/useFetch2";
import {useAuth} from "../../context/AuthContext"
import {CrudContext} from "../../context/CrudContext";
import IngredientsForm from "./IngredientsForm";
import StepsForm from "./StepsForm";
import StepsFormModal from "./StepsModal";
import { useParams } from "react-router-dom";
import CategoriesForm from "./CategoriesForm";
import RecipeForm from "./RecipeForm";


export default function CrudRecipeForm(){
    const { recipe , setRecipe} = useContext(CrudContext);
    /* const [recipe , setRecipe] = useState(null); */
    const {id} = useParams();
    const {data,isLoading,isError,doFetch} = useFetch2();

    //si exite el id traemos la receta
    useEffect(()=>{
        if(id){
            doFetch(`${import.meta.env.VITE_API_BASE_URL}reciperover/recipes/${id}/`);   
        }
    },[])

    //almacenamos la receta en el contexto
    useEffect(()=>{
        if(data){
            setRecipe(data);
        }
    },[data])
    
    /* const { token } = useAuth('state');
    const {newIngredients,setNewIngredients,newSteps,setNewSteps} = useContext(CrudContext); */

    
    
    
    


    //agregamos receta 
    //const {data:addRecipe,isLoading:isLoadingRecipe,isError:isErrorRecipe,doFetch:addRecipeFetch} = useFetch2();

    //para cargar las categorias

    //para cargar al iniciar el formulario las opciones de categorias
    /* useEffect(()=>{
        categoriesFetch(`${import.meta.env.VITE_API_BASE_URL}reciperover/categories/?page_size=100`,{});
    },[]); */

    /* useEffect(()=>{
        if(addRecipe && !(selectedCategories.length===0)){
            selectedCategories.map((category)=>{
                fetch(`${import.meta.env.VITE_API_BASE_URL}reciperover/recipe-categories/`,{
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Token ${token}`,
                    },
                    body: JSON.stringify({
                            "recipe": addRecipe.id,
                            "category": category.id
                    }),
                })
                .then((response)=>{
                    if(!response.ok){
                        throw new Error("Error al obtener datos");
                    }
                })
                .catch((e)=>{
                    console.error("Error al asignar categoria")
                });
            })
        }
        if(addRecipe && newIngredients.length>0){
            newIngredients.map((newIngredient)=>{
                fetch(`${import.meta.env.VITE_API_BASE_URL}reciperover/recipe-ingredients/`,{
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Token ${token}`,
                    },
                    body: JSON.stringify({
                            "quantity": newIngredient.quantity,
                            "measure": newIngredient.measure.key,
                            "recipe": addRecipe.id,
                            "ingredient": newIngredient.ingredient.id
                      }),
                })
                .then((response)=>{
                    if(!response.ok){
                        throw new Error("Error al obtener datos");
                    }
                })
                .catch((e)=>{
                    console.error("Error al asignar categoria")
                });
            })
        }
        if(addRecipe && newSteps.length>0){
            newSteps.map((newStep)=>{
                fetch(`${import.meta.env.VITE_API_BASE_URL}reciperover/steps/`,{
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Token ${token}`,
                    },
                    body: JSON.stringify({
                        "order": newStep.order,
                        "instruction": newStep.instruction,
                        "recipe": addRecipe.id
                      }),
                })
                .then((response)=>{
                    if(!response.ok){
                        throw new Error("Error al obtener datos");
                    }
                })
                .catch((e)=>{
                    console.error("Error al asignar categoria")
                });
            })
        }
        
    },[addRecipe]); */


    /* const handleCategoryChange = (event) => {
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
    } */
    
    return(        
        
        <div className="container my-5 mx-5">
            <div className="box">
                <RecipeForm />
            </div>

            <div className={recipe ? ("box") : ("box is-hidden")}>
                <CategoriesForm/>
            </div>
  
            <div className={recipe ? ("box") : ("box is-hidden")}>
                <IngredientsForm
                    isOpendModal={()=>{
                        if(isOpenModalIngredient){
                            setIsOpenModalIngredient(false);
                        }else{
                            setIsOpenModalIngredient(true);
                        }
                    }}
                />
            </div>
            
            <div className={recipe ? ("box") : ("box is-hidden")}>
                <StepsForm
                    isOpendModal={()=>{
                        if(isOpenModalStep){
                            setIsOpenModalStep(false);
                        }else{
                            setIsOpenModalStep(true);
                        }
                    }}

                />
            </div>
        
        </div>
            
            
    )
}