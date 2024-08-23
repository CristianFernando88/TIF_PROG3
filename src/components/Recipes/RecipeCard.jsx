import imagePreparacion from "../../assets/images/tabla-de-cortar.png";
import imageCocina from "../../assets/images/maceta.png";
import imagePlato from "../../assets/images/plato.png";
import { useNavigate, redirect, useLocation } from "react-router-dom";
import { AuthContext, useAuth } from "../../context/AuthContext";
import { useContext, useState } from "react";
import useFetch2 from "../../hooks/useFetch2";
import DeleteForm from "../Forms/DeleteForm";
import { Link } from "react-router-dom";

export default function RecipeCard({recipe=null,onDelete = null}){
    const {user__id, isAuthenticated, token} = useAuth("state");
    const navigate = useNavigate();
    const [openModal,setOpenModal] = useState(false);
    
    const location = useLocation();
    const pathnamePrivate = location.pathname == "/my-account/my-recipes";

    
    
    return(
        <div>
            <div className="card" onClick={(event)=> (
                event.stopPropagation(),
                navigate(`/recipes/${recipe.id}`))
            }>
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
                    isAuthenticated && user__id == recipe.owner && pathnamePrivate? (
                        <div className="card">
                            <footer className="card-footer">
                                <Link to={`/my-account/my-recipes/edit/${recipe.id}`} onClick={(e)=>{
                                    e.stopPropagation();
                                }} className="card-footer-item">Edit</Link>
                                <a className="card-footer-item" onClick={(e)=>{
                                    e.stopPropagation();
                                    setOpenModal(true)}}>Delete</a>
                            </footer>
                        </div>
            
                    ) : (null)
                }
                
            </div>
            <DeleteForm
            isOpenModal={openModal}
            onCloseModal={()=>setOpenModal(false)}
            title={"Eliminar receta"}
            message={"Esta seguro de eliminar esta receta"}
            onDelete={onDelete}
            apiUrl={`${import.meta.env.VITE_API_BASE_URL}reciperover/recipes/${recipe.id}/`}
            actionApi={
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                }
            }
            />
        </div>
    )
}