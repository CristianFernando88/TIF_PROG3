import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function CardCategory({categoria}){
    const navigate = useNavigate();
    return(
        <>
            <div class="card has-background-warning" onClick={()=> navigate(`/recipes/category/${categoria.id}`)}>
                <div class="card-content">
                    <div class="media-content">
                        <p class="title is-5">{categoria.name}</p>
                    </div>

                    {/* <div class="content">
                        {categoria.description ? categoria.description : "Sin descripcion" }
                        <br />
                        <time datetime="2016-1-1">{categoria.created_at}</time>
                    </div> */}
                </div>
            </div>
        </>
    )
}

export default CardCategory;