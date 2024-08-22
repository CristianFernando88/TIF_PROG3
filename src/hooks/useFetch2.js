import { useState } from "react";

function useFetch2(initialUrl, initialOptions = {}) {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(null);
    const [isDelete,setIsDelete] = useState(false);

    function doFetch(url = initialUrl, options = initialOptions) {
        setIsLoading(true);
        setIsError(null);
        setIsDelete(false);

        fetch(url, options)
            .then((response) => {
                /* if (!response.ok) {
                    throw new Error("Error al obtener datos");
                } */
                if (response.status === 204) {
                    new Promise(
                        () => {
                            // Resolve
                            setIsDelete(true);
                            return {
                                message: "Recurso eliminado",
                            };
                        },
                        () => {
                            // Reject
                            throw Error("Error al obtener datos");
                        }
                    );
                }
                if (!response.ok) {
                    throw new Error("Error al obtener datos");
                } 
                return response.json();
            })
            .then((data) => {
                setData(data);
            })
            .catch((error) => {
                setIsError(error.message);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    return { data, isLoading, isError, isDelete, doFetch };
}

export default useFetch2;