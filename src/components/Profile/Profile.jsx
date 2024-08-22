import { useState, useEffect, useRef, Children } from "react";
import { useAuth } from "../../context/AuthContext";
import ProfileImageModal from "./ProfileImageModal";
import useFetch2 from "../../hooks/useFetch2";
import { Link, NavLink } from "react-router-dom";

 const stateLink=({isActive,isPending,isTransitiioning})=>{
    [
        isPending ? "peding" : "",
        isActive ? "active" : "",
        isTransitiioning ? "transitioning" :""
    ].join(" ")

}
 function Profile({children}){
    return(
        <>
            <div className="container box my-5 mx-5">
                <h2 className="title">Perfil</h2>
                <article className="media">
                    <div className="media-left">
                    <figure className="image is-64x64">
                        <img src="https://bulma.io/assets/images/placeholders/128x128.png" alt="Image" />
                    </figure>
                    </div>
                    <div className="media-content">
                    <div className="content">
                        <p>
                        <strong>John Smith</strong> <small>@johnsmith</small>
                        <small>31m</small>
                        <br />
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                        efficitur sit amet massa fringilla egestas. Nullam condimentum luctus
                        turpis.
                        </p>
                    </div>
                    <nav className="level is-mobile">
                        <div className="level-left">
                        <a className="level-item" aria-label="reply">
                            <span className="icon is-small">
                            <i className="fas fa-reply" aria-hidden="true"></i>
                            </span>
                        </a>
                        <a className="level-item" aria-label="retweet">
                            <span className="icon is-small">
                            <i className="fas fa-retweet" aria-hidden="true"></i>
                            </span>
                        </a>
                        <a className="level-item" aria-label="like">
                            <span className="icon is-small">
                            <i className="fas fa-heart" aria-hidden="true"></i>
                            </span>
                        </a>
                        </div>
                    </nav>
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