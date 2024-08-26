import { useEffect, useState } from "react";
import { NavLink , Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import useFetch2 from "../hooks/useFetch2";
import imageDefaultUser from "../assets/images/usuario.png";
import Logo from "../assets/images/Gorro.png";
function HeaderNav(){
    const [activeMenu,setActiveMenu] = useState(false);
    const {logout} = useAuth("actions");
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
        <header >
            <nav className="navbar has-background-warning-75" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <picture>
                        <img className="image is-48x48" src={Logo} alt="Logo" />
                    </picture>

                </div>

                <div id="navbarBasicExample" className="navbar-menu">
                    <div className="navbar-start">
                        <Link to="/" className="navbar-item" onClick={()=>{setActiveMenu(false)}}>
                            Home
                        </Link>

                        <Link to="/Recipes" className="navbar-item" onClick={()=>{setActiveMenu(false)}}>
                            Recetas
                        </Link>

    
                    </div>
                    
                   
                        {
                            data && token? (
                                <div className="navbar-end">
                                    <div className="media full-heigth">
                                        <div className="media-content">
                                            <div className="content">
                                                <p className="has-text-centered">
                                                <small>{data.email}</small>
                                                </p>
                                            </div>
                                        </div>
                                        <div className="media-right p-1 ">
                                            <figure className="image is-24x24 ">
                                            {
                                            data ? ( data.image ? (
                                                <img className="is-rounded " src={`${import.meta.env.VITE_API_BASE_URL}${data.image}`} alt="Image" />
                                                ) : (<img className="is-rounded has-background-link-85" src={imageDefaultUser} alt="Image" />)  
                                                ) : (
                            
                                                <img className="is-rounded" src="https://bulma.io/assets/images/placeholders/128x128.png" alt="Image" />)
                                            }
                                            </figure>
                                        </div>
                                    </div>
                                    <div className={`navbar-item has-dropdown ${activeMenu ? ("is-active"):(null) }`} onBlur={()=>setActiveMenu(false)}>
                                        <a className="navbar-link" onClick={()=>activeMenu ? setActiveMenu(false): setActiveMenu(true)}>
                                        </a>
                                        <div className="navbar-dropdown is-right" >
                                            <ul>
                                                <li>
                                                    <Link to="/my-account/me" className="navbar-item" onClick={()=>setActiveMenu(false)}>Mi perfil</Link>
                                                </li>
                                                <li>
                                                    <Link to="/my-account/my-recipes"  className="navbar-item" onClick={()=>setActiveMenu(false)}>Mis recetas</Link>
                                                </li>
                                                <li>
                                                    <Link to="/my-account/my-favorites" className="navbar-item" onClick={()=>setActiveMenu(false)}>Mis favoritos</Link>
                                                </li>
                                            </ul>
                
                                            <hr className="navbar-divider"/>
                                            <Link className="navbar-item" onClick={()=>{logout()}}>
                                                Cerrar sesión
                                            </Link>
                                        </div>
                                    </div>
                            </div>
                            ) : (<div className="navbar-end">
                                <div className="navbar-item">
                                  <div className="buttons">
                                    <Link to="/Login" className="button is-primary is-light">Log in</Link>
                                  </div>
                                </div>
                              </div>)
                        }
                        
                        
                    
                    
                </div>
            </nav>
        </header>
    )
}

export default HeaderNav;