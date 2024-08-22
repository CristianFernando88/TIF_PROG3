import { useAuth } from "../../context/AuthContext";
export default function DeleteFormCategory({isOpenModal,onCloseModal,title,message,element,onDelete}){
    const {token} = useAuth("state");
    const handleDelete = ()=>{
        onDelete.doFetchDelete(`${import.meta.env.VITE_API_BASE_URL}reciperover/recipes/${element.recipe}/categories/${element.id}/`,{
            method: "DELETE",
            headers: {
                Authorization: `Token ${token}`,
            },
        })
        onCloseModal();
    }
    return(
        
        <>  
            <div className={isOpenModal ? ("modal is-danger is-active"):("modal")} >
                    <div className="modal-background" onClick={onCloseModal}></div>
                    <div className="modal-content">
                        <div className="box">
                            <h1 className="title">{title}</h1>
                            <div className="content">
                                <p>{message}</p>
                            </div>

                            <div className="column field is-grouped">
                                <div className="control">
                                    <button className="button is-primary" onClick={handleDelete}>Confirmar</button>
                                </div>
                                <div className="control">
                                    <button className="button is-danger" onClick={onCloseModal}>Cancelar</button>
                                </div>
                            </div> 
                        </div> 
                    </div>
                    <button className="modal-close is-large" aria-label="close" onClick={onCloseModal}></button>
            </div>
        </>
      
    );
        
}