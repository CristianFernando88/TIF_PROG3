import { useState, useEffect, useRef, Children } from "react";
import { useAuth } from "../../context/AuthContext";
import ProfileImageModal from "./ProfileImageModal";
import useFetch2 from "../../hooks/useFetch2";
import { Link, NavLink } from "react-router-dom";
import imageDefaultUser from "../../assets/images/usuario.png"


function Profile({children}){
    const {token} = useAuth("state");
    const {data,isLoading,isError,doFetch} = useFetch2();
    useEffect(()=>{
        if(token){
            doFetch(`${import.meta.env.VITE_API_BASE_URL}/users/profiles/profile_data/`,{
                method: "GET",
                headers: {
                    Authorization: `Token ${token}`,
                },
            })
        }
        
    },[token])

return(
    <>
        <div className="container box my-5 mx-5 has-background-warning-90">
            
            <article className="media">
                <div className="media-left">
                    
                    <figure className="image is-64x64">
                        {
                            data ? ( data.image ? (
                                <img className="is-rounded " src={`${import.meta.env.VITE_API_BASE_URL}${data.image}`} alt="Image" />
                                ) : (<img className="is-rounded has-background-link-85" src={imageDefaultUser} alt="Image" />)  
                                ) : (
            
                                <img className="is-rounded" src="https://bulma.io/assets/images/placeholders/128x128.png" alt="Image" />)
                            }
                    </figure>
                </div>
                <div className="media-content">
                    <div className="content">
                        <h1 className="title">Bienvenido</h1>
                        {
                            data ? (<p><strong>{data.first_name}</strong></p>):(null)
                        }
                        
                    </div>
                </div>
            </article>
            <div className="tabs">
                <ul>
                    <li><NavLink to="/my-account/me" className={({isActive,isPending,isTransitiioning})=>
                            [
                                isPending ? "peding" : "",
                                isActive ? "active" : "",
                                isTransitiioning ? "transitioning" :"",
                            ].join(" ")

                        }>Mi cuenta</NavLink></li>
                    <li><NavLink to="/my-account/my-recipes" className={({isActive,isPending,isTransitiioning})=>
                            [
                                isPending ? "peding" : "",
                                isActive ? "active" : "",
                                isTransitiioning ? "transitioning" :"",
                            ].join(" ")

                        }>Mis recetas</NavLink></li>
                    <li><NavLink to="/my-account/my-favorites" className={({isActive,isPending,isTransitiioning})=>
                            [
                                isPending ? "peding" : "",
                                isActive ? "active" : "",
                                isTransitiioning ? "transitioning" :"",
                            ].join(" ")

                        }>Favoritos</NavLink></li>
                </ul>
            </div>
        </div>
        {children}
    </>
)
}
export default Profile;