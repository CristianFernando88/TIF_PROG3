import { useAuth } from "../../context/AuthContext";
import useFetch2 from "../../hooks/useFetch2";
import { useEffect } from "react";
export default function MyAccount(){
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

    if(isLoading)return <p>Cargando perfil...</p>
    if(isError) return <p>no se pudo cargar el perfil</p>
    return(
        <>
            <div className="container box my-5 mx-5">
                <h1 className="title is-4">Mi cuenta</h1>
                <hr />
                    {data ? (
                            <div>
                                <div>
                                    <p><strong>Nombre/s: </strong>{data.first_name}</p>
                                </div>
                                <div>
                                    <p><strong>Apellido/s: </strong>{data.last_name}</p>
                                </div>
                                <div>
                                    <p><strong>Email: </strong>{data.email}</p>
                                </div>
                                <div>
                                    <p><strong>Description: </strong>{data.bio}</p>
                                </div>
                            </div>
                    ):(null)}
                <hr />
            </div>
            
        </>
    )
}