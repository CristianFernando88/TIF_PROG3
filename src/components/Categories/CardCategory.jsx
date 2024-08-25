import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function CardCategory({categoria}){
    const navigate = useNavigate();
    return(
        <>
            <div className="card has-background-warning" onClick={()=> navigate(`/recipes/category/${categoria.id}`)}>
                <div className="card-content">
                    <div className="media-content">
                        <p className="title is-5">{categoria.name}</p>
                    </div>

                </div>
            </div>
        </>
    )
}

export default CardCategory;