import imagePreparacion from "../../assets/images/tabla-de-cortar.png";
import imageCocina from "../../assets/images/maceta.png";
import imagePlato from "../../assets/images/plato.png";
import { useNavigate, redirect } from "react-router-dom";
import { AuthContext, useAuth } from "../../context/AuthContext";
import { useContext } from "react";

export default function RecipeCard({recipe=null}){
    const {user__id, isAuthenticated} = useAuth("state");
    const navigate = useNavigate();
    return(
        <div>
            <div className="card" onClick={()=> navigate(`/recipes/${recipe.id}`)}>
                <div className="card-image">
                    <figure className="image is-3by2">
                    <img
                        src={recipe.image?(
                            `${recipe.image}`
                        ):(
                            "https://bulma.io/assets/images/placeholders/1280x960.png"
                        )}
                        alt="Placeholder image"
                    />
                    </figure>
                </div>
                <div className="card-content">
                    <div className="media">
                        <div className="media-content">
                            <p className="title is-6">{recipe.title}</p>
                            <p className="subtitle is-6">{recipe.view_count}</p>
                        </div>
                    </div>

                    <div className="media">
                            <div className="is-flex is-justify-content-center">
                                <div className="media-content">
                                    <figure className="media-left image is-24x24">
                                        <img src={imagePreparacion}/>
                                    </figure>
                                    <div className="media-content">
                                        <p className="is-size-7">Preparacion: {recipe.preparation_time} min</p>
                                    </div>
                                </div>
                                <div className="media-content">
                                    <figure className="media-left image is-24x24">
                                        <img src={imageCocina}/>
                                    </figure>
                                    <p className="media-content is-size-7">Coccion: {recipe.cooking_time} min</p>
                                </div>
                                <div className="media-content">
                                    <div className="media-content">
                                        <figure className="media-left image is-24x24">
                                            <img src={imagePlato}/>
                                        </figure>
                                        <p className="media-content is-size-7">Personas: {recipe.servings}</p>
                                        
                                    </div>
                                    
                                </div>

                                    
                            </div>
                        </div>

                </div>
                {
                    isAuthenticated && user__id == recipe.owner? (
                        <div class="card">
                            <footer class="card-footer">
                                <a href="#" class="card-footer-item">Save</a>
                                <a href="#" class="card-footer-item">Edit</a>
                                <a href="#" class="card-footer-item">Delete</a>
                            </footer>
                        </div>
            
                    ) : (null)
                }
                
            </div>
        </div>
    )
}