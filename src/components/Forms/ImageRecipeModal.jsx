import { useContext , useRef, useState, useEffect} from "react";
import { CrudContext } from "../../context/CrudContext";
import useFetch2 from "../../hooks/useFetch2";
import { useAuth } from "../../context/AuthContext";
export default function ImageRecipeModal({isOpenModal,onCloseModal,imageFecth}){
    const {recipe} = useContext(CrudContext);
    const {token} = useAuth('state');
    const refImage = useRef();
    
    const handlesubmit = (e)=>{
        e.preventDefault();

        const newForm = new FormData();
        if(refImage.current.value!=""){
            newForm.append("image",refImage.current.files[0]);
        }
        imageFecth.imageRecipeFetch(`${import.meta.env.VITE_API_BASE_URL}reciperover/recipes/${recipe.id}/`,{
            method: "PATCH",
            headers: {
                Authorization: `Token ${token}`,
            },
            body: newForm,
        }) 

        onCloseModal();
    
    }


    
    return(
        
        <>  
            <div className={isOpenModal ? ("modal is-active"):("modal")} >
                    <div className="modal-background" onClick={onCloseModal}></div>
                    <div className="modal-content">
                        <div className="box">
                            <h1 className="title">Subir Imagen</h1>
                            <div className="content">
                            <form className="field ">   
                            <div className="file is-boxed">
                                <label className="file-label">
                                    <input className="file-input" ref={refImage} type="file" accept="image/*" name="resume" />
                                    <span className="file-cta">
                                    <span className="file-icon">
                                        <i className="fas fa-upload"></i>
                                    </span>
                                    <span className="file-label"> Choose a file… </span>
                                    </span>
                                </label>
                                </div>
                            </form>
                            </div>
                            <div className="field is-grouped">
                                <div className="field">
                                    <button className="button is-primary" onClick={handlesubmit}>Aceptar</button>
                                </div>
                                <div className="field">
                                    <button className="button is-danger" onClick={onCloseModal}>Cerrar</button>
                                </div>
                                
                            </div>
                        </div> 
                    </div>
                    <button className="modal-close is-large" aria-label="close" onClick={onCloseModal}></button>
            </div>
        </>
      
    );
        
}