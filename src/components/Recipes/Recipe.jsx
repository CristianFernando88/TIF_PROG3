
import imagePreparacion from "../../assets/images/tabla-de-cortar.png";
import imageCocina from "../../assets/images/maceta.png";
import imagePlato from "../../assets/images/plato.png";
import imageChef from "../../assets/images/cocinero.png";
import { useState, useEffect} from "react";
import useFetch from "../../hooks/useFetch.js";
import useFetch2 from "../../hooks/useFetch2.js";
import { useParams } from "react-router-dom";

import Ingredient from "../Ingredient/Ingredient.jsx";
function Recipe(){
    
    const {id}=useParams();
    
    const {
        data: recipeData,
        isLoading: recipeIsLoading,
        isError: recipeIsError,
        doFetch: recipeFetch,
    } = useFetch2();

    const {
        data: stepData,
        isLoading: stepIsLoading,
        isError: stepIsError,
        doFetch: stepFetch,
    } = useFetch2();

    useEffect(()=>{
        recipeFetch(`https://sandbox.academiadevelopers.com/reciperover/recipes/${id}/`);
    },[]);

    useEffect(()=>{
        stepFetch(`https://sandbox.academiadevelopers.com/reciperover/steps/?recipe=${id}&ordering=order`)
    },[]);
    

    if(recipeIsLoading) return <p>Cargando...</p>;
    if(recipeIsError) return <p>ha ocurrido un error no se pudo realizar la peticion</p>;
    if(!recipeData) return <p>La receta no existe</p>
    return (
        <div>
            <div className="box my-5 mx-5">
                <div className="columns">
                    <div className="column is-two-fifths">
                        <figure className="image is-5by3">
                            <img src= {recipeData.image} />
                        </figure>
                    </div>
                    <div className="column content is-justify-content-center">
                        <h1 className="title is-size-4">{recipeData.title}</h1>
                        <div className="media">
                            <div className="media-left m-4 mr-6">
                                <figure className="image is-64x64">
                                    <img className="is-rounder"  src={imageChef} />
                                </figure>
                                <p>{recipeData.owner}</p>
                            </div>
                            <div className="is-flex is-justify-content-center">
                                <div className="m-4">
                                    <figure className="media-left image is-48x48">
                                        <img src={imagePreparacion}/>
                                    </figure>
                                    <div className="media-content ">
                                        <p className="is-size-7">Preparacion: {recipeData.preparation_time} min</p>
                                    </div>
                                </div>
                                <div className="m-4">
                                    <figure className="media-left image is-48x48">
                                        <img src={imageCocina}/>
                                    </figure>
                                    <p className="media-content is-size-7">Coccion: {recipeData.cooking_time} min</p>
                                </div>
                                <div className="m-4">
                                    <figure className="media-left image is-48x48">
                                        <img src={imagePlato}/>
                                    </figure>
                                    <p className="media-content is-size-7">Personas: {recipeData.servings}</p>
                                </div>
                                
                            </div>
                        </div>
                        
                    </div>
                </div>
                <div>
                    <h2 className="subtitle is-size-4">Description</h2>
                    <p className="is-size-6">{recipeData.description}</p>
                </div>
                
            </div>
            <div className="box my-5 mx-5 columns">

                <div className="column is-three-quarters px-2">
                    <h2 className="subtitle is-size-4">Pasos</h2>
                    <ul>
                        {
                            stepIsLoading ? (<p>Cargando pasos</p>):
                            stepIsError?(<p>Error al cargar los pasos</p>):
                            stepData ? (
                                stepData.results.map((step)=>(
                                    <li key={step.id} className="is-size-6">
                                        {step.order} - {step.instruction}
                                    </li>
                                ))
                            ) : (null)
                        }
                    </ul>
                </div>

                <div className="column">
                    <h2 className="subtitle is-size-4">Ingredientes</h2>
                    {
                        recipeData ? (<ul>
                            {recipeData.ingredients.map((ingredient)=>(
                                <li key={ingredient} className="is-size-6">
                                    <Ingredient
                                        idIngredient={ingredient}
                                        idRecipe={id}
                                    />
                                </li>
                                ))}
                            </ul>
                        ):(null)
                    }
                </div>
                
            </div>
            
        </div>
    )}
export default Recipe;