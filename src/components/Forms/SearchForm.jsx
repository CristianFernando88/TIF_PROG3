import { useRef } from "react";

export default function SearchForm({filtros=[],stateFilter}){
    const refSelect = useRef();
    const refInputSearch = useRef();
    const handleSubmit = (e)=>{
        e.preventDefault();
        console.log(refSelect.current.value);
        console.log(refInputSearch.current.value);
        stateFilter({key:refSelect.current.value,value:refInputSearch.current.value})
    }
    return(
        <div>
            <div className="field has-addons has-addons-centered ">
            <p className="control">
                <span className="select">
                <select ref={refSelect}>
                    <option value="0"></option>
                    {
                        filtros ? (
                            filtros.map((opt)=>(
                                <option key={opt.key} value={opt.key}>{opt.value}</option>
                            ))
                        ) : (null)
                    }
                </select>
                </span>
            </p>
            <p className="control is-expanded">
                <input className="input" ref={refInputSearch} type="text" placeholder="que estas bucando..."/>
            </p>
            <p className="control">
                <button className="button is-primary" onClick={handleSubmit}>
                    Buscar
                </button>
            </p>
            </div>
        </div>
    )
}