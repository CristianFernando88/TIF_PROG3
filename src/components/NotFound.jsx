import { Link } from "react-router-dom"
export default function NotFound(){
    return(
        <div className="box content mx-5 my-5 has-text-centered">
            <h1 className="title">Pagina no encontrada</h1>
            <p>Esta ruta no se encuntra definida regresa al <Link to="/">home</Link></p>
        </div>
    )
}